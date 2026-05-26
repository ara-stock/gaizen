// Manual X (Twitter) handle overrides for known Solana yield projects
// Key: DeFiLlama project slug (lowercase), Value: X handle without @
// Set to null to explicitly hide wrong handles from DeFiLlama

export const X_OVERRIDES: Record<string, string | null> = {
  // Confirmed correct
  'kamino-finance': 'KaminoFinance',
  'marginfi': 'marginfi',
  'save': 'save_finance',
  'drift-protocol': 'DriftProtocol',
  'meteora': 'MeteoraAG',
  'orca': 'orca_so',
  'jupiter': 'JupiterExchange',
  'uxd-protocol': 'UXDProtocol',
  'exponent-finance': 'ExponentFinance',
  'jito': 'jito_sol',
  'marinade-finance': 'MarinadeFinance',
  'sanctum': 'sanctumso',
  'fragmetric': 'fragmetric',
  'lulo': 'lulo_fi',

  // Known wrong — suppress DeFiLlama data
  'superstate': null,
  'raydium': null,
  'loopscale': 'Loopscale',
  'allbridge': null,
}

// Projects to exclude entirely from the list
export const PROJECT_BLOCKLIST = new Set([
  'lantern',
  'lantern-staked-sol',
  'allbridge',
  'superstate-uscc',
])
