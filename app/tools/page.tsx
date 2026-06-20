import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tools',
  description: '投資シミュレーターツール集。ポートフォリオ配分・FIRE試算・不動産利回り・シャープレシオ分析。',
  alternates: { canonical: 'https://gaizen.xyz/tools/', languages: { 'en': 'https://gaizen.xyz/en/tools/' } },
}

const tools = [
  {
    href: '/tools/allocation',
    category: 'Portfolio',
    title: 'ポートフォリオ配分シミュレーター',
    description: '資産クラスの配分比率を調整し、期待リターン・リスク・シャープレシオをリアルタイムで試算します。',
    tags: ['配分', '期待リターン', 'シャープレシオ'],
  },
  {
    href: '/tools/fire',
    category: 'FIRE',
    title: 'FIRE 資産推移シミュレーター',
    description: '現在の資産・毎月の積立額・期待リターンをもとに、FIRE達成までの年数と資産推移グラフを表示します。',
    tags: ['FIRE', '複利', '資産推移'],
  },
  {
    href: '/tools/sharpe',
    category: 'Analytics',
    title: 'シャープレシオ チャート',
    description: '主要資産クラスのシャープレシオの推移を可視化。リスク調整後リターンで資産を比較します。',
    tags: ['シャープレシオ', 'リスク調整', 'チャート'],
  },
  {
    href: '/tools/realestate',
    category: 'Real Estate',
    title: '不動産利回り計算ツール',
    description: '表面利回り・実質利回り・月間キャッシュフローをリアルタイムで計算します。',
    tags: ['利回り', 'CF', 'ローン'],
  },
]

export default function ToolsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-12">
        <p className="text-xs tracking-widest mb-2 font-semibold" style={{ color: 'var(--accent)' }}>TOOLS</p>
        <h1 className="text-3xl font-bold mb-3" style={{ color: 'var(--foreground)' }}>投資計算ツール</h1>
        <p className="text-sm" style={{ color: 'var(--muted)' }}>
          資産形成・投資分析のためのシミュレーターツール集。
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
