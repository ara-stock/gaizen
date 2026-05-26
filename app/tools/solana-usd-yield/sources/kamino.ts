import type { YieldToken } from '../YieldTable'

const KAMINO_API = 'https://api.kamino.finance/kamino-market'

// Isolated lending markets that host USD yield-bearing collateral tokens
const ISOLATED_MARKETS = [
  {
    marketAddress: 'BJnbcRHqvppTyGesLzWASGKnmnF1wq9jZu6ExrjT7wvF',
    collateral: 'USDe',
    project: 'Ethena',
    twitter: 'ethena_labs',
  },
  {
    marketAddress: '47tfyEG9SsdEnUm9cw5kY9BXngQGqu3LBoop9j5uTAv8',
    collateral: 'ONyc',
    project: 'OnRe',
    twitter: 'onrefinance',
  },
  {
    marketAddress: '6WEGfej9B9wjxRs6t4BYpb9iCXd8CpTpJ8fVSNzHCC5y',
    collateral: 'syrupUSDC',
    project: 'Maple Finance',
    twitter: 'maplefinance',
  },
  {
    marketAddress: '9Y7uwXgQ68mGqRtZfuFaP4hc4fxeJ7cE9zTtqTxVhfGU',
    collateral: 'eUSX',
    project: 'Solstice',
    twitter: 'solsticefi',
  },
]

const USD_BORROW_TOKENS = new Set(['USDC', 'USDT', 'USDG', 'USDS', 'PYUSD', 'CASH', 'USX', 'USD1'])

type KaminoReserve = {
  liquidityToken: string
  maxLtv: string
  supplyApy: string
  borrowApy: string
  totalSupplyUsd: string
}

async function fetchReserves(marketAddress: string): Promise<KaminoReserve[]> {
  const res = await fetch(`${KAMINO_API}/${marketAddress}/reserves/metrics`, {
    next: { revalidate: 3600 },
  })
  if (!res.ok) return []
  return res.json()
}

// --- Native APY sources per collateral token ---

async function fetchEthenaAPY(): Promise<number> {
  try {
    const res = await fetch('https://app.ethena.fi/api/yields/protocol-and-staking-yield', {
      next: { revalidate: 3600 },
    })
    if (!res.ok) return 0
    const data = await res.json() as {
      stakingYield?: { value: number }
      avg30dSusdeYield?: { value: number }
    }
    // stakingYield = recent actual sUSDe yield; fallback to 30d avg
    return data.stakingYield?.value ?? data.avg30dSusdeYield?.value ?? 0
  } catch {
    return 0
  }
}

async function fetchDeFiLlamaPoolAPY(poolId: string): Promise<number> {
  try {
    const res = await fetch(`https://yields.llama.fi/chart/${poolId}`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) return 0
    const data = await res.json() as { data?: Array<{ apy: number }> }
    const latest = data.data?.at(-1)
    return latest?.apy ?? 0
  } catch {
    return 0
  }
}

// Fetch native APY for a collateral token from its own protocol
async function fetchNativeAPY(collateral: string): Promise<number> {
  switch (collateral) {
    case 'USDe':
      return fetchEthenaAPY()
    case 'ONyc':
      // DeFiLlama: onre project, ONYC, Solana
      return fetchDeFiLlamaPoolAPY('7083d6a5-e3cb-4eeb-8204-f1b735e4ecbb')
    case 'syrupUSDC':
      // DeFiLlama: Maple Finance USDC pool on Ethereum (syrupUSDC yield tracks this)
      return fetchDeFiLlamaPoolAPY('43641cf5-a92e-416b-bce9-27113d3c0db6')
    case 'eUSX':
      // DeFiLlama: OpenEden CUSDO on Solana
      return fetchDeFiLlamaPoolAPY('12169161-7815-4160-bd77-a4202cf7c2c1')
    default:
      return 0
  }
}

// ---

export async function fetchKaminoTokens(): Promise<YieldToken[]> {
  const results = await Promise.all(
    ISOLATED_MARKETS.map(async ({ marketAddress, collateral, project, twitter }) => {
      const [reserves, nativeAPY] = await Promise.all([
        fetchReserves(marketAddress),
        fetchNativeAPY(collateral),
      ])

      if (reserves.length === 0) return null

      // Find the collateral reserve
      const collateralReserve = reserves.find(r => r.liquidityToken === collateral)
      if (!collateralReserve) return null

      const ltv = parseFloat(collateralReserve.maxLtv)
      if (ltv <= 0) return null

      const tvlUsd = parseFloat(collateralReserve.totalSupplyUsd)
      if (tvlUsd < 1_000_000) return null

      // Skip if we don't have a native APY yet
      if (nativeAPY <= 0) return null

      // Best (lowest) borrow rate among available USD stablecoins
      const borrowRates = reserves
        .filter(r => USD_BORROW_TOKENS.has(r.liquidityToken) && parseFloat(r.borrowApy) * 100 > 0.5)
        .map(r => parseFloat(r.borrowApy) * 100)
      const minBorrowRate = borrowRates.length > 0 ? Math.min(...borrowRates) : 0

      // Max leverage = 1 / (1 - LTV)
      const maxLeverage = 1 / (1 - ltv)

      // Net APY = Leverage × supplyAPY - (Leverage - 1) × borrowAPY
      const maxMultiplyAPY = maxLeverage * nativeAPY - (maxLeverage - 1) * minBorrowRate

      return {
        pool: `kamino-${collateral.toLowerCase()}`,
        symbol: collateral,
        project,
        apy: nativeAPY,
        tvlUsd,
        apyBase: nativeAPY as number | null,
        apyReward: null,
        twitter,
        maxMultiplyAPY: maxMultiplyAPY > nativeAPY ? maxMultiplyAPY : null,
        multiplyProtocols: ['Kamino Multiply'],
        minBorrowRate,
        source: 'kamino' as const,
      } satisfies YieldToken
    })
  )

  return results.filter((t): t is NonNullable<typeof t> => t !== null) as YieldToken[]
}
