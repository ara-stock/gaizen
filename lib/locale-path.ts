const JA_ONLY_PATHS = new Set([
  '/tools/solana-usd-yield',
  '/tools/x-copy',
])

const EN_ONLY_PATHS = new Set([
  '/en/blog/welcome',
])

function normalizePath(pathname: string) {
  if (pathname === '/') return pathname
  return pathname.replace(/\/$/, '')
}

export function getLocalePaths(pathname: string) {
  const path = normalizePath(pathname)
  const isEnglish = path === '/en' || path.startsWith('/en/')

  if (EN_ONLY_PATHS.has(path)) {
    return { jaPath: '/blog/', enPath: `${path}/` }
  }

  if (JA_ONLY_PATHS.has(path)) {
    return { jaPath: `${path}/`, enPath: '/en/tools/' }
  }

  const jaPath = isEnglish ? path.slice(3) || '/' : path
  const enPath = isEnglish ? path : `/en${path === '/' ? '' : path}`

  return {
    jaPath: jaPath === '/' ? jaPath : `${jaPath}/`,
    enPath: enPath === '/en' ? '/en/' : `${enPath}/`,
  }
}
