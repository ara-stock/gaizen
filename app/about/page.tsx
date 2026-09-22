import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: '個人投資家ara。株式の長期投資を続けながら、現在はPerp DEXやDeFiなど仮想通貨のエアドロップ・ポイントプログラムに参加し、その状況を公開しています。',
  alternates: { canonical: 'https://gaizen.xyz/about/' },
}

const sections = [
  { title: 'いま取り組んでいること', body: '現在は仮想通貨のプロダクトを実際に触ることに時間を使っています。Perp DEX（Hyperliquid、Lighter、Extendedなど）での取引と、Solana上のDeFi（Jupiter、Meteoraなど）の利用が中心です。どのプロジェクトを触っていて、TGEやエアドロップがどの段階にあるのかを自分で見失わないために作ったのが、このサイトのプロジェクト一覧です。' },
  { title: '掲載の方針', body: '調達額・チーム・TGE時期などの事実は、公式発表と主要メディアの報道で確認し、出典を載せます。確認できなかった項目は「未確認」と書き、推測で埋めません。受取見込みは公開情報からの機械的な試算で、将来の金額を約束するものではありません。紹介リンクのあるプロジェクトもないプロジェクトも、同じ基準で載せます。' },
  { title: '投資を始めたきっかけ', body: '大学院1年生のとき、同期に投資家がいたことがきっかけで投資を始めました。最初の口座はSBI証券です。当時は株主優待や配当利回りにひかれて、会社をよく理解しないまま個別株を買い、数年保有して株価が半分になったところで損切りしました。この失敗が、調べてから買うという今の姿勢につながっています。' },
  { title: '株式投資について', body: '株式は、個別企業の事業の成長性と持続性を軸に、少なくとも5年以上を考えて保有しています。保有銘柄と資産配分は「保有方針」のページで公開しています。私自身の条件に基づくもので、読者向けのモデルポートフォリオではありません。' },
]

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <p className="eyebrow mb-5">ABOUT</p>
      <div className="flex items-center gap-5 mb-6">
        <Image src="/images/profile.jpg" width={72} height={72} alt="ara" className="rounded-full" />
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">あら。/ ara</h1>
          <p className="mt-2 text-sm text-muted leading-relaxed">株式の長期投資と、仮想通貨プロダクトの実践を続ける個人投資家。</p>
        </div>
      </div>
      <p className="text-muted leading-[1.9] mb-10">
        GAIZEN FINANCEは、確度の高い選択を積み重ねて資産を増やすことを目的にした個人サイトです。個別の投資助言を提供するサービスではありません。
      </p>
      <div className="space-y-9">
        {sections.map(section => (
          <section key={section.title}>
            <h2 className="text-xl font-semibold mb-3">{section.title}</h2>
            <p className="text-muted leading-[1.95]">{section.body}</p>
          </section>
        ))}
      </div>
      <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-accent">
        <Link className="inline-flex min-h-11 items-center underline underline-offset-4" href="/">プロジェクト一覧</Link>
        <Link className="inline-flex min-h-11 items-center underline underline-offset-4" href="/portfolio/">保有方針・資産配分</Link>
        <Link className="inline-flex min-h-11 items-center underline underline-offset-4" href="/contact/">お問い合わせ・訂正依頼</Link>
      </div>
    </div>
  )
}
