import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: '免責事項。本サイトの情報は投資助言ではありません。',
  alternates: { canonical: 'https://gaizen.xyz/disclaimer/' },
}

export default function DisclaimerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-12">
        <p className="text-xs tracking-widest mb-2 font-semibold" style={{ color: 'var(--accent)' }}>LEGAL</p>
        <h1 className="text-3xl font-bold" style={{ color: 'var(--foreground)' }}>免責事項</h1>
      </div>
      <div className="prose max-w-none">
        <h2>投資助言ではありません</h2>
        <p>
          本サイト（GAIZEN FINANCE）に掲載されている情報は、一般的な情報提供を目的としており、
          投資助言・投資勧誘・特定の金融商品の推奨を目的としたものではありません。
        </p>

        <h2>DYOR（Do Your Own Research）</h2>
        <p>
          投資に関する最終的な判断は、必ずご自身で調査・検討の上、自己責任で行ってください。
          本サイトの情報を参考にして行った投資行動により生じた損失について、当サイトは一切の責任を負いません。
        </p>

        <h2>情報の正確性</h2>
        <p>
          本サイトの情報は作成時点での情報に基づいており、その正確性・完全性を保証するものではありません。
          市場環境の変化等により、掲載情報が実態と異なる場合があります。
        </p>

        <h2>過去の実績</h2>
        <p>
          本サイトで言及されている過去の運用実績は、将来の運用成果を保証するものではありません。
          投資にはリスクが伴い、元本を割り込む可能性があります。
        </p>

        <h2>リンク先について</h2>
        <p>
          本サイトからリンクしている外部サイトについて、その内容の正確性・合法性等について責任を負いません。
          リファラルリンクを含む場合があります。
        </p>
      </div>
    </div>
  )
}
