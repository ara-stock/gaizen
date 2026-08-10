import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '編集・検証方針',
  description: 'GAIZEN FINANCEの記事作成、一次情報の確認、実体験の扱い、AI利用、広告との分離、訂正対応について説明します。',
  alternates: {
    canonical: 'https://gaizen.xyz/editorial-policy/',
  },
}

const policies = [
  {
    number: '01',
    title: '読者が自分で判断できることを目的にする',
    body: '記事の目的は、特定の商品を買わせることではありません。制度、コスト、リスク、比較基準を整理し、読者が自分の状況に合わせて判断できる状態を目指します。結論が一つに決まらないテーマでは、筆者の選択と一般的な選択肢を分けて記載します。',
  },
  {
    number: '02',
    title: '実体験と一般情報を区別する',
    body: '投資を始めたときの失敗、実際に利用している証券口座、積立方法、資産管理の習慣などは、筆者自身の経験として明記します。個人的な経験を、すべての読者に当てはまる事実のようには扱いません。',
  },
  {
    number: '03',
    title: '数値と制度は一次情報で確認する',
    body: 'NISAや税制は金融庁・国税庁、投資信託は運用会社の目論見書・月報、企業情報は決算資料・有価証券報告書などを優先します。重要な数値や制度には記事末尾で参照元を示し、比較時点が重要な情報には基準日を記載します。',
  },
  {
    number: '04',
    title: 'リスクと利益相反を省略しない',
    body: '筆者が保有する商品や、価格変動・為替・税・流動性などの主要なリスクを、判断に必要な範囲で記載します。広告、アフィリエイト、紹介報酬の有無によって記事の結論を変えません。報酬が発生するリンクは、読者が判別できるよう表示します。',
  },
  {
    number: '05',
    title: 'AIは編集補助として使い、最終判断は筆者が行う',
    body: '構成案、文章の推敲、翻訳、確認項目の洗い出しにAIを利用する場合があります。投資経験や意見をAIに作らせることはせず、テーマ選定、筆者コメント、出典確認、結論、公開可否は運営者が判断します。自動生成した文章を無確認で公開しません。',
  },
  {
    number: '06',
    title: '誤りを見つけたら訂正する',
    body: '制度変更や事実誤認が確認できた場合は、内容を修正し、重要な変更では更新日を改めます。ご指摘はContactページ記載の連絡先で受け付けています。投資商品の条件は変わるため、実際の取引前には必ず公式情報も確認してください。',
  },
]

export default function EditorialPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <header className="mb-12 max-w-2xl">
        <p className="text-xs tracking-widest mb-2 font-semibold" style={{ color: 'var(--accent)' }}>EDITORIAL POLICY</p>
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight" style={{ color: 'var(--foreground)' }}>編集・検証方針</h1>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
          GAIZEN FINANCEは、個人投資家araが自身の判断と失敗を記録する投資メディアです。金融情報を扱う責任として、記事をどのように作り、何を確認するかを公開します。
        </p>
        <p className="text-xs mt-4" style={{ color: 'var(--muted)' }}>最終更新: 2026年7月</p>
      </header>

      <div className="space-y-4">
        {policies.map(policy => (
          <section key={policy.number} className="p-5 sm:p-6 rounded-2xl border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
            <div className="flex gap-4">
              <span className="text-xs font-mono pt-0.5" style={{ color: 'var(--accent)' }}>{policy.number}</span>
              <div>
                <h2 className="text-base font-semibold mb-2" style={{ color: 'var(--foreground)' }}>{policy.title}</h2>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{policy.body}</p>
              </div>
            </div>
          </section>
        ))}
      </div>

      <div className="mt-10 p-5 rounded-2xl border text-sm leading-relaxed" style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>
        運営者の投資方針は<Link href="/about/" style={{ color: 'var(--accent)' }}>About</Link>、広告・投資リスクの詳細は<Link href="/disclaimer/" style={{ color: 'var(--accent)' }}>免責事項</Link>をご確認ください。誤りのご指摘は<Link href="/contact/" style={{ color: 'var(--accent)' }}>Contact</Link>から受け付けています。
      </div>
    </div>
  )
}
