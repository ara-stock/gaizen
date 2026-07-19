import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tools',
  description: 'Investment simulation tools — portfolio allocation, FIRE calculator, real estate yield, and Sharpe ratio analysis.',
  alternates: {
    canonical: 'https://gaizen.xyz/en/tools/',
    languages: { ja: 'https://gaizen.xyz/tools/', en: 'https://gaizen.xyz/en/tools/' },
  },
}

const tools = [
  {
    href: '/en/tools/allocation',
    category: 'Portfolio',
    title: 'Portfolio Allocation Simulator',
    description: 'Adjust asset class weights and calculate expected return, risk, and Sharpe ratio in real time.',
    tags: ['Allocation', 'Expected Return', 'Sharpe'],
  },
  {
    href: '/en/tools/fire',
    category: 'FIRE',
    title: 'FIRE Asset Growth Simulator',
    description: 'Based on current assets, monthly contributions, and expected return — see how many years to FIRE and a chart of your growth trajectory.',
    tags: ['FIRE', 'Compounding', 'Projection'],
  },
  {
    href: '/en/tools/sharpe',
    category: 'Analytics',
    title: 'Sharpe Ratio Chart',
    description: 'Visualize rolling Sharpe ratios across major asset classes. Compare risk-adjusted returns over time.',
    tags: ['Sharpe Ratio', 'Risk-Adjusted', 'Chart'],
  },
  {
    href: '/en/tools/realestate',
    category: 'Real Estate',
    title: 'Real Estate Yield Calculator',
    description: 'Calculate gross yield, net yield, and monthly cash flow in real time.',
    tags: ['Yield', 'Cash Flow', 'Loan'],
  },
]

export default function EnToolsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-12">
        <p className="text-xs tracking-widest mb-2 font-semibold" style={{ color: 'var(--accent)' }}>TOOLS</p>
        <h1 className="text-3xl font-bold mb-3" style={{ color: 'var(--foreground)' }}>Investment Tools</h1>
        <p className="text-sm" style={{ color: 'var(--muted)' }}>
          Simulators and calculators for portfolio building and investment analysis.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {tools.map(tool => (
          <Link key={tool.href} href={tool.href}
            className="group p-6 rounded-xl border flex flex-col transition-colors hover:border-green-800"
            style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono px-2 py-0.5 rounded"
                style={{ backgroundColor: 'rgba(0,201,122,0.1)', color: 'var(--accent)', border: '1px solid rgba(0,201,122,0.2)' }}>
                {tool.category}
              </span>
              <span className="text-sm transition-transform group-hover:translate-x-0.5" style={{ color: 'var(--muted)' }}>→</span>
            </div>
            <h2 className="text-base font-semibold mb-2" style={{ color: 'var(--foreground)' }}>{tool.title}</h2>
            <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: 'var(--muted)' }}>{tool.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {tool.tags.map(tag => (
                <span key={tag} className="text-xs px-2 py-0.5 rounded font-mono"
                  style={{ backgroundColor: 'var(--surface-2)', color: 'var(--muted)', border: '1px solid var(--border)', fontSize: '10px' }}>
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
