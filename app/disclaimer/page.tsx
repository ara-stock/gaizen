import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '免責事項 | GAIZEN FINANCE',
  description: 'GAIZEN FINANCEの免責事項。投資助言ではない旨、情報の正確性、リスク、著作権、リンク先、広告・アフィリエイトに関する注意事項を記載しています。',
  alternates: { canonical: 'https://gaizen.xyz/disclaimer/' },
}

const sections = [
  {
    title: '運営者について',
    body: `本サイト「GAIZEN FINANCE」（URL: https://gaizen.xyz）は、個人投資家・ara（以下「運営者」）が個人として運営するウェブサイトです。運営者は金融商品取引業者ではなく、金融庁への登録・届出を行っていません。本サイトは投資情報・金融教育を目的とした個人メディアです。`,
  },
  {
    title: '投資助言ではありません',
    body: `本サイトに掲載されているすべての記事・分析・見解・データは、一般的な情報提供および教育目的のために作成されたものです。特定の金融商品・有価証券・暗号資産の売買を勧誘・推奨するものではなく、金融商品取引法に基づく投資助言・投資一任契約に該当するものでもありません。\n\n記事内で言及される個別銘柄・ETF・インデックス・投資信託・暗号資産は、あくまで筆者個人の経験・考察に基づく情報提供であり、購入・保有・売却を推奨するものではありません。`,
  },
  {
    title: '自己責任の原則',
    body: `投資・資産運用に関する最終的な意思決定は、必ずご自身で調査・検討のうえ、自己責任において行ってください。本サイトの情報を参考にした結果、生じた損失・損害について、運営者は一切の責任を負いません。\n\n投資にはリスクが伴います。市場価格の変動・為替変動・発行体の信用リスク・流動性リスク等により、投資元本を大きく下回る可能性があります。過去の運用実績は将来の成果を保証するものではありません。`,
  },
  {
    title: '情報の正確性・最新性',
    body: `記事に記載されている情報（数値・制度・商品スペック等）は、執筆時点のものです。税制・法令・各金融商品の仕様は変更されることがあり、掲載内容が現状と異なる場合があります。最新の情報は金融庁・各証券会社・発行体の公式情報をご確認ください。\n\n本サイトは定期的な情報更新を努めますが、すべての情報を常に最新の状態に保つことを保証するものではありません。`,
  },
  {
    title: '投資リスクについて',
    body: `本サイトで取り上げる主な資産クラスには、以下のようなリスクがあります。\n\n【株式・ETF・投資信託】価格変動リスク・為替変動リスク・信用リスク・流動性リスク・カントリーリスク。元本を割り込む可能性があります。\n\n【暗号資産（仮想通貨）】価格変動が非常に大きく、短期間で大幅な損失が生じる可能性があります。また、取引所の倒産・ハッキング・スマートコントラクトの脆弱性など、株式にはないリスクが存在します。暗号資産は金融商品取引法上の「金融商品」ではなく、預金保険・投資者保護基金の対象外です。\n\n【不動産投資信託（REIT）】賃料収入の変動・不動産市況の変化・金利上昇による価格下落リスクがあります。`,
  },
  {
    title: '広告・アフィリエイト・リファラルリンクについて',
    body: `本サイトでは、Google AdSenseによる広告配信を行っています。また、証券会社・金融サービスのアフィリエイトプログラムまたはリファラルプログラムに参加しており、リンク経由で口座開設・サービス利用が行われた場合に報酬を受け取ることがあります。\n\nこれらの収益は本サイトの運営費用に充てられます。アフィリエイト・リファラル収益の有無は、記事内容の公平性・中立性に影響しないよう努めています。広告・アフィリエイトリンクが含まれる箇所については、可能な限り明記するよう努めます。`,
  },
  {
    title: '外部リンクについて',
    body: `本サイトには外部サイトへのリンクが含まれます。リンク先サイトの内容・正確性・合法性・最新性については、各サイトの運営者が責任を負うものであり、本サイト運営者は一切の責任を負いません。リンク先サイトのプライバシーポリシーおよび利用規約は、各サイトの定めに従います。`,
  },
  {
    title: '著作権',
    body: `本サイトに掲載されているテキスト・画像・データ・デザイン等の著作権は、特段の記載がない限り運営者に帰属します。無断転載・複製・改変・商業利用を禁じます。引用する場合は出典（サイト名・記事URL）を明記してください。`,
  },
  {
    title: '免責事項の変更',
    body: `本免責事項は、法令の改正・サービス内容の変更等に応じて、予告なく変更する場合があります。変更後の内容は本ページに掲載した時点で効力を生じます。定期的にご確認ください。`,
  },
]

export default function DisclaimerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-12">
        <p className="text-xs tracking-widest mb-2 font-semibold" style={{ color: 'var(--accent)' }}>LEGAL</p>
        <h1 className="text-3xl font-bold mb-3" style={{ color: 'var(--foreground)' }}>免責事項</h1>
        <p className="text-xs" style={{ color: 'var(--muted)' }}>最終更新: 2026年6月</p>
      </div>

      <div className="space-y-8">
        {sections.map(({ title, body }) => (
          <section key={title}>
            <h2 className="text-base font-semibold mb-3" style={{ color: 'var(--foreground)' }}>{title}</h2>
            {body.split('\n\n').map((para, i) => (
              <p key={i} className="text-sm leading-relaxed mb-3" style={{ color: 'var(--muted)' }}>
                {para}
              </p>
            ))}
          </section>
        ))}
      </div>

      <div className="mt-12 p-4 rounded-lg border text-xs leading-relaxed" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--muted)' }}>
        本サイトのプライバシーポリシーは<a href="/privacy" style={{ color: 'var(--accent)' }}>こちら</a>をご覧ください。
        お問い合わせは<a href="/contact" style={{ color: 'var(--accent)' }}>Contactページ</a>よりどうぞ。
      </div>
    </div>
  )
}
