// Which multiply/leverage protocols support each project's yield-bearing tokens
// Key: DeFiLlama project slug (lowercase)
// Value: array of protocol names that offer multiply/loop for this token

export const MULTIPLY_PROTOCOLS: Record<string, string[]> = {
  'kamino-finance': ['Kamino Multiply'],
  'marginfi': ['Kamino Multiply', 'Loopscale'],
  'save': ['Kamino Multiply', 'Loopscale'],
  'jito': ['Kamino Multiply', 'Loopscale'],
  'marinade-finance': ['Kamino Multiply'],
  'sanctum': ['Loopscale'],
  'exponent-finance': ['Loopscale'],
  'lulo': ['Kamino Multiply'],
  'drift-protocol': ['Loopscale'],
  'fragmetric': ['Loopscale'],
  'uxd-protocol': ['Loopscale'],
}
