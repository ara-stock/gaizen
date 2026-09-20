import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getProjectBySlug, getProjectsData } from '@/lib/projects'
import { STATUS_COLOR, STATUS_LABEL, T, countryFlag, formatFunding } from '@/components/tracker/labels'
import RatingDots from '@/components/tracker/RatingDots'
import { TgeCell } from '@/components/tracker/TrackerBoard'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getProjectsData().projects.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}
  return {
    title: `${project.name}のTGE時期・調達額・チーム情報`,
    description: `${project.name}（${project.category}）のTGE見込み、ポイントプログラム、VC調達額、運営チームと拠点、リスクを一次情報つきで整理。筆者の取組状況と評価も公開しています。`,
    alternates: { canonical: `https://gaizen.xyz/tracker/${slug}/` },
  }
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid sm:grid-cols-[10rem_1fr] gap-1 sm:gap-4 py-3 border-t text-sm" style={{ borderColor: 'var(--border)' }}>
      <dt style={{ color: 'var(--muted)' }}>{label}</dt>
      <dd style={{ color: 'var(--foreground)' }}>{children}</dd>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8 p-5 sm:p-6 rounded-xl border" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}>
      <h2 className="text-base font-semibold mb-3" style={{ color: 'var(--foreground)' }}>{title}</h2>
      {children}
    </section>
  )
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const p = getProjectBySlug(slug)
  if (!p) notFound()
  const t = T.ja
  const note = { color: 'var(--prose-body)' }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <Link href="/tracker/" className="text-xs underline" style={{ color: 'var(--accent)' }}>← トラッカー一覧</Link>

      <header className="mt-4 mb-8">
        <p className="text-xs mb-2" style={{ color: 'var(--muted)' }}>{p.category} · {p.chain}</p>
        <h1 className="text-3xl font-bold mb-3" style={{ color: 'var(--foreground)' }}>{p.name}</h1>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
          <span className="inline-flex items-center gap-1.5">
            <span aria-hidden="true" className="w-2 h-2 rounded-full" style={{ backgroundColor: STATUS_COLOR[p.status] }} />
            {t.authorStatus}: {STATUS_LABEL.ja[p.status]}
          </span>
          <span className="text-xs" style={{ color: 'var(--muted)' }}>最終更新: {p.updatedAt}</span>
        </p>
        {p.statusNote && <p className="mt-3 text-sm leading-relaxed" style={note}>{p.statusNote}</p>}
      </header>

      <Section title="TGE・ポイント">
        <dl>
          <Row label={t.tge}><TgeCell project={p} locale="ja" /></Row>
          <Row label="ポイントプログラム">
            {p.points.exists ? (
              <>
                {p.points.name}
                {p.points.status && <span className="block text-xs mt-1" style={{ color: 'var(--muted)' }}>{p.points.status}</span>}
              </>
            ) : t.noPoints}
          </Row>
          {p.points.communityAllocation && <Row label="コミュニティ配分">{p.points.communityAllocation}</Row>}
          <Row label={`${t.points}（主観）`}>
            <RatingDots value={p.points.exists ? p.points.expectation : undefined} emptyLabel={p.points.exists ? t.unrated : t.noPoints} />
            {p.points.expectationNote && <span className="block mt-2 leading-relaxed" style={note}>{p.points.expectationNote}</span>}
          </Row>
        </dl>
      </Section>

      <Section title="チーム・資金調達">
        <dl>
          <Row label="拠点">
            {countryFlag(p.team.countryCode)} {p.team.base}
            <span className="text-xs ml-2" style={{ color: 'var(--muted)' }}>（{p.team.baseKind === 'company HQ' ? '会社所在地' : p.team.baseKind === 'founder base' ? '創業者の拠点' : '未確認'}）</span>
          </Row>
          <Row label="創業者・トップ">
            {p.team.doxxed ? p.team.founders.join('、') : t.anonymous}
            {p.team.background && <span className="block text-xs mt-1" style={{ color: 'var(--muted)' }}>{p.team.background}</span>}
          </Row>
          <Row label={t.funding}>
            <span className="font-mono">{formatFunding(p.funding.totalUsdM, 'ja')}</span>
            {p.funding.rounds && <span className="block text-xs mt-1" style={{ color: 'var(--muted)' }}>{p.funding.rounds}</span>}
          </Row>
          {p.funding.investors.length > 0 && <Row label="主な投資家">{p.funding.investors.join('、')}</Row>}
          <Row label={`${t.trust}（主観）`}>
            <RatingDots value={p.team.trust} emptyLabel={t.unrated} />
            {p.team.trustNote && <span className="block mt-2 leading-relaxed" style={note}>{p.team.trustNote}</span>}
          </Row>
        </dl>
      </Section>

      {p.flags.length > 0 && (
        <Section title="リスク・注意点">
          <ul className="list-disc pl-5 space-y-1.5 text-sm leading-relaxed" style={note}>
            {p.flags.map(flag => <li key={flag}>{flag}</li>)}
          </ul>
        </Section>
      )}

      <Section title="リンク">
        <ul className="space-y-2 text-sm">
          <li><a href={p.links.site} target="_blank" rel="noopener nofollow" className="underline" style={{ color: 'var(--accent)' }}>公式サイト</a></li>
          {p.links.x && <li><a href={p.links.x} target="_blank" rel="noopener nofollow" className="underline" style={{ color: 'var(--accent)' }}>公式X</a></li>}
          {p.links.article && <li><Link href={p.links.article} className="underline" style={{ color: 'var(--accent)' }}>このプロジェクトについて書いた記事</Link></li>}
        </ul>
        {p.links.referral && (
          <div className="mt-5">
            <a href={p.links.referral} target="_blank" rel="sponsored nofollow noopener"
              className="inline-block text-sm font-semibold px-4 py-2.5 rounded-md"
              style={{ backgroundColor: 'var(--accent)', color: 'var(--background)' }}>
              {p.name}を始める（紹介リンク）
            </a>
            <p className="text-xs mt-2 leading-relaxed" style={{ color: 'var(--muted)' }}>
              紹介リンクです。登録や取引に応じて筆者が報酬を受け取る場合があります。評価は報酬と連動させていません。
            </p>
          </div>
        )}
      </Section>

      <Section title="出典">
        <ul className="space-y-2 text-sm">
          {p.sources.map(s => (
            <li key={s.url}>
              <a href={s.url} target="_blank" rel="noopener nofollow" className="underline break-words" style={{ color: 'var(--accent)' }}>{s.title}</a>
              {s.date && <span className="text-xs ml-2" style={{ color: 'var(--muted)' }}>{s.date}</span>}
            </li>
          ))}
        </ul>
      </Section>

      <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>
        本ページは情報提供を目的としており、特定の暗号資産やサービスの利用を勧誘するものではありません。エアドロップの実施・金額は保証されず、預けた資金を失う可能性があります。
      </p>
    </div>
  )
}
