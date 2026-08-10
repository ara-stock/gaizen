---
title: "Earning Yield on Jupiter DeFi — How Earn, Multiply, and Strategies Work"
date: "2026-05-29"
updatedAt: "2026-07-29"
description: "A breakdown of how Jupiter Earn, Multiply, and Strategies generate yield on Solana — including the mechanics of how that yield is created, the risks involved, and the protocol's scale."
tags: ["DeFi", "Solana", "Jupiter", "crypto", "Yield", "Lending", "JUP"]
category: "crypto"
published: false
featured: false
coverImage: "/images/jupiter_earn_top.webp"
---

> **Disclaimer**: This article is for educational and informational purposes only. It does not constitute investment advice or a solicitation to use any protocol. DeFi participation carries significant risks including smart contract vulnerabilities and asset loss. If you are a resident of Japan, please read the regulatory note at the end of this article.

> **Holdings and conflict disclosure:** The author holds JUP and uses Jupiter Earn. The article includes a referral link near the end, and the author may receive a benefit depending on its use.
>
> **Data date:** APY, supply, LTV, and liquidation figures in this article are a record of screens and public data reviewed in May 2026. They are not current quotes. Check Jupiter's official interface and current terms before making any decision.

---

## What Is Jupiter?

[Jupiter](https://jup.ag) is best known as Solana's largest DEX aggregator — routing token swaps to find the best available rates. But in 2025 it expanded into a **full DeFi super-app**, adding lending, leveraged yield, and automated strategies under the Jupiter Earn umbrella.

:::comment
Jupiter started as the dominant swap aggregator on Solana, but its August 2025 launch of Jupiter Lend signaled a shift toward a comprehensive yield platform. The speed at which it reached scale — over $1B in deposits within eight days — is part of what makes this ecosystem worth watching closely.
:::

---

## Jupiter Lend: Scale and Industry Position

Jupiter Lend's total **supply (deposits) stands at approximately $2.09 billion**.

Jupiter Lend's **Overall Supply is approximately $2.09 billion**, with a Total Supply within the Lend product of approximately $1.56 billion and Total Borrowed of approximately $658 million (as of May 2026).

Here's how that compares to other major DeFi lending protocols:

| Protocol | Chain | TVL (approx.) | Notes |
|----------|-------|--------------|-------|
| **Aave** | Ethereum + 13 chains | ~$14–24B | Global DeFi lending leader |
| **Kamino Finance** | Solana | ~$4.4B | Solana #1 lending |
| **Compound** | Ethereum + others | ~$2–2.7B | Established Ethereum protocol |
| **Jupiter Lend** | Solana | ~$2.09B (Overall Supply) | Solana #2 · launched August 2025 |

Compared to Aave's dominance across 13 blockchains, Jupiter Lend is smaller. But for a protocol that launched its public beta in August 2025, hitting $500M within 24 hours and $1B within eight days makes it the fastest-growing lending protocol ever on Solana.

:::comment
When I first saw the $2.09B supply figure, my question was: is that big? Relative to Aave it's modest, but Aave has operated for years across many chains. On Solana specifically, Jupiter Lend is already the second-largest lending protocol — and it only launched mid-2025. The growth trajectory and Jupiter's existing reputation as Solana's default DEX aggregator give it credibility that newer entrants don't have.
:::

---

## Three Ways to Earn Yield

Jupiter Earn offers three approaches, ranging from simple to complex.

### 1. Earn (Simple Lending)

**The most straightforward approach.** You deposit assets into a pool, and borrowers pay interest that flows back to you as yield.

- Deposit USDC, SOL, or other supported assets
- Jupiter automatically routes to the highest-yielding vault across the protocol
- Interest accrues in real time
- Zero fees

Current APYs for major assets (as of May 2026 — rates fluctuate with market conditions):

| Asset | APY |
|-------|-----|
| JupUSD | 5.70% |
| USDC | 5.57% |
| SOL | 4.06% |
| USDT | 3.61% |
| EURC | 2.90% |

The APY reflects current borrowing demand — higher demand for borrowed assets means higher rates for depositors.

### 2. Multiply (Leveraged Yield Amplification)

**Multiply uses automated looping to amplify your APY on a given asset.**

The mechanics:

1. Deposit JUICED, SOL, or another supported asset as collateral
2. Borrow USDT or USDC against that collateral
3. Swap the borrowed stablecoin back into the collateral asset
4. Add it back to your collateral position
5. Repeat — automated via flash loan technology (Flash Loan Fee: Free)

![Jupiter Multiply — JUICED/USDT](/images/jupiter_multiply_juiced.webp)

#### Real Example: JUICED/USDT (May 2026)

| Metric | Value |
|--------|-------|
| Supply APY (yield earned on JUICED) | 5.54% |
| Borrow APY (cost of borrowing USDT) | 4.94% |
| Net spread (1x) | ~0.60% |
| At 5x Multiplier → Final APY | **7.9%** |
| Max Multiplier | 8.90x |
| LTV | 89% |
| Liquidation Threshold | 91% |
| Liquidation Penalty | 1% on the interface reviewed in May 2026 |

The **spread between Supply APY and Borrow APY is what Multiply amplifies**. The higher that spread, the more effective a leveraged position becomes.

:::comment
Choosing the right pair for Multiply is really about finding where the Supply APY - Borrow APY spread is widest. When USDC borrow rates spike, JUICED/USDC Multiply becomes unattractive — the borrowing cost eats into the yield. That's why this screenshot shows JUICED/USDT instead: at that moment, USDT's borrow rate left a better net spread. DeFi yields move in real time — what looks good today can look very different tomorrow.
:::

However, **leverage magnifies losses as well as gains** — a sharp drop in the collateral asset's price can trigger liquidation. The interface reviewed in May 2026 displayed a 1% liquidation penalty; verify the current figure and complete terms before opening a position.

### 3. Strategies (Automated Yield Strategies)

**Strategies use the same mechanics as Multiply, but with leverage dialed to the maximum that Jupiter's risk parameters allow.**

In Multiply, you set your own leverage ratio anywhere from 1x to the maximum. In Strategies, Jupiter pre-configures that leverage at its upper limit to maximize APY. The trade-off: higher returns come with higher liquidation risk. If you want to manage leverage yourself, use Multiply. If you want a fully automated setup and accept the higher risk, Strategies is the path.

:::comment
I personally stick to Multiply at 5–6x rather than using Strategies. Having control over the leverage level makes me feel more in command of the risk. JUICED × USDC and JUICED × USDT Strategies are reasonable choices mechanically, but I'd recommend understanding Multiply first before moving to Strategies — the structure is the same, just with the dial turned up.
:::

---

## Where Does the Yield Come From?

Understanding the yield source is critical to assessing risk.

### Borrower Interest Payments

The primary yield source for Earn depositors is **interest paid by borrowers**. Jupiter Lend is an overcollateralized lending market — borrowers must provide collateral exceeding the value of what they borrow, which reduces default risk. The interest borrowers pay is distributed to depositors proportionally.

### Protocol Incentives (Launch Phase)

At launch, Jupiter distributed **$2M+ in protocol incentives** (JUP tokens and other rewards) to boost effective APYs and attract early liquidity. This is a common practice for new DeFi protocols. Incentive-boosted APYs tend to normalize over time as the incentive budget is distributed.

### Flash Loan Fees (Multiply)

The looping mechanism in Multiply uses flash loans — instant uncollateralized loans repaid within the same transaction. A small fee is charged for each flash loan, which contributes to protocol revenue.

---

## Key Risks

DeFi yield is fundamentally different from bank interest. These risks apply:

| Risk | Description |
|------|-------------|
| Smart contract risk | Bugs or exploits in the protocol's code can lead to asset loss |
| Liquidation risk (Multiply) | If collateral value drops below the threshold, your position is force-liquidated |
| Liquidity risk | Withdrawals may be restricted during high-demand periods |
| Oracle risk | Price feed manipulation or failure can cause incorrect liquidations |
| APY volatility | Yields fluctuate with market conditions — advertised rates are not guaranteed |

Multiply positions carry the highest risk — a sudden drop in the collateral asset's price can wipe out your position. Even Earn (simple lending) carries smart contract risk that is non-zero.

### Wallet Security: The Most Critical Risk of All

Beyond protocol risk, **how you manage your wallet is the single most important security decision in DeFi**. Follow these rules without exception:

- **Write your seed phrase by hand in a notebook.** Never store it digitally.
- **Never enter your private key or seed phrase anywhere** — no legitimate service will ever ask for it.
- **Never click links sent via DM on any social platform.**
- **Never interact with links from unofficial or unverified accounts.**

Phishing and social engineering are major risks alongside smart contract exploits. Their relative frequency cannot be generalized reliably across protocols and periods, so manage both protocol-level and user-level security risks.

:::comment
I use Jupiter Earn myself, and I stay aware of liquidation risk on leveraged positions at all times. For USDC-based simple lending, the risk profile is relatively lower — but "lower" does not mean zero. My personal rule with DeFi is to treat it as money I could afford to lose entirely. If that's not the case for a given position, it's too large.

On wallet security: write the seed phrase in a notebook, keep it somewhere safe, and treat any request for it as a scam — no exceptions. If someone DMs you on X or Discord offering to "help" with a wallet issue, it's a phishing attempt. Always.
:::

---

## A Note on Risks for Non-US/International Users

DeFi protocols like Jupiter use on-chain smart contracts, but their legal and tax treatment can still depend on the protocol's operation, how access is provided, and the user's country of residence.

Key considerations:
- Yield earned through DeFi may be taxable as income in your jurisdiction
- Some countries regulate access to unregistered foreign financial services
- Tax reporting requirements for DeFi earnings are evolving — consult a qualified tax advisor in your region

This article does not constitute legal or tax advice. If you are considering using Jupiter Earn, ensure you understand the applicable rules in your jurisdiction.

---

## Learn More About Jupiter Earn

- [Jupiter Official Site](https://jup.ag)
- [Jupiter Lend (Earn)](https://jup.ag/lend)
- [Jupiter Developer Docs — Earn](https://dev.jup.ag/docs/lend/earn)

> **Referral disclosure:** The following is a referral link. The site operator may receive a benefit if you use it.
>
> [Open Jupiter](https://jup.ag/?ref=zmz6ke75ec3p)

---

## Sources

- [DeFiLlama — Jupiter Lend TVL](https://defillama.com/protocol/jupiter-lend)
- [DeFiLlama — Aave TVL](https://defillama.com/protocol/aave)
- [Jupiter Lend Public Beta Announcement (PR Newswire)](https://www.prnewswire.com/news-releases/the-most-advanced-money-market-on-solana-is-here-jupiter-lend-public-beta-is-live-302541430.html)
- [Jupiter Developer Documentation — Earn](https://dev.jup.ag/docs/lend/earn)
- [The Defiant — Jupiter Lend Attracts $500M in TVL](https://thedefiant.io/news/defi/solana-based-jupiter-lend-attracts-usd500-million-in-tvl)
