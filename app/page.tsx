import Link from 'next/link'
import type { Metadata } from 'next'
import { getProjectsData } from '@/lib/projects'
import TrackerBoard from '@/components/tracker/TrackerBoard'

export const metadata: Metadata = {
  title: { absolute: 'GAIZEN FINANCE | 仮想通貨プロジェクト トラッカー' },
  description: '筆者が実際に触っている仮想通貨プロジェクトを、TGE時期・進み具合・エアドロップ受取見込み・VC調達額・Xフォロワー・運営拠点で一覧比較。ステータスと保有ポイントは自分用に管理できます。',
  alternates: { canonical: 'https://gaizen.xyz/' },
}

export default function HomePage() {
  const { projects, updatedAt } = getProjectsData()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="mb-10">
        <p className="text-xs tracking-widest mb-2 font-semibold" style={{ color: 'var(--accent)' }}>PROJECT TRACKER</p>
        <h1 className="text-3xl font-bold mb-3" style={{ color: 'var(--foreground)' }}>仮想通貨プロジェクト トラッカー</h1>
        <p className="text-sm leading-relaxed max-w-3xl" style={{ color: 'var(--muted)' }}>
          筆者が実際に触っている、または参加を検討しているプロジェクトの一覧です。調達額・チーム・TGE時期は公式発表と報道で確認し、
          出典を各プロジェクトのページに載せています。受取見込みは「FDVの想定 × エアドロ配分」による機械的な試算です。
        </p>
        <p className="text-xs mt-3" style={{ color: 'var(--muted)' }}>最終更新: {updatedAt}</p>
      </div>

      <TrackerBoard projects={projects} />

      <section className="mt-12 p-5 rounded-xl border text-xs leading-relaxed" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)', color: 'var(--muted)' }}>
        <h2 className="text-sm font-semibold mb-2" style={{ color: 'var(--foreground)' }}>このページの読み方と注意</h2>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>フェーズ（序盤・中盤・終盤）は、ポイントプログラムの経過期間とTGEまでの距離から筆者が判断したものです。根拠は各プロジェクトのページに書いています。</li>
          <li>Xフォロワー数は利用者規模の目安です。ボットや休眠アカウントを含むため、実際の利用者数とは一致しません。</li>
          <li>「始める」ボタンは紹介（リファラル）リンクです。登録や取引に応じて筆者が報酬を受け取る場合があります。掲載内容は報酬と連動させていません。</li>
          <li>エアドロップやポイントの価値は保証されません。TGEが行われない、配布対象から外れる、預けた資金を失う可能性があります。</li>
          <li>海外のDEX・サービスは日本の金融庁に登録されていません。利用可否と税務はご自身で確認してください。詳しくは<Link href="/disclaimer/" className="underline" style={{ color: 'var(--accent)' }}>免責事項</Link>をご覧ください。</li>
        </ul>
      </section>
    </div>
  )
}
