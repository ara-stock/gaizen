import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getProjectBySlug, getProjectsData } from '@/lib/projects'
import { ACTIVITY_COLOR, ACTIVITY_LABEL, CHEAP_MULTIPLE, STATUS_COLOR, STATUS_LABEL, fdvMultiples, formatFollowers, formatFunding, formatMultiple, formatUsdM } from '@/components/tracker/labels'
import { PhaseMeter, ProjectLogo, TgeCell } from '@/components/tracker/cells'
import AirdropEstimate from '@/components/tracker/AirdropEstimate'
import InviteCodes from '@/components/tracker/InviteCodes'
import MyStatus from '@/components/tracker/MyStatus'

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
    description: `${project.name}（${project.category}）のTGE見込み、ポイントプログラムの進み具合、エアドロップの受取見込み試算、VC調達額、運営チームと拠点、リスクを出典つきで整理。`,
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

function Section({ title, id, children }: { title: string; id?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20 mb-8 p-5 sm:p-6 rounded-xl border" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}>
      <h2 className="text-base font-semibold mb-3" style={{ color: 'var(--foreground)' }}>{title}</h2>
      {children}
    </section>
  )
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const p = getProjectBySlug(slug)
  if (!p) notFound()
  const note = { color: 'var(--prose-body)' }
  const multiples = fdvMultiples(p)
  const v = p.valuation
  const phased = p.activity === 'perps' || p.activity === 'points'

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <Link href="/" className="text-xs underline" style={{ color: 'var(--accent)' }}>← 一覧に戻る</Link>

      <header className="mt-4 mb-8">
        <p className="text-xs mb-2" style={{ color: 'var(--muted)' }}>
          <span className="font-semibold mr-1.5" style={{ color: ACTIVITY_COLOR[p.activity] }}>{ACTIVITY_LABEL[p.activity]}</span>
          {p.category} · {p.chain}
        </p>
        <div className="flex items-center gap-4 mb-4">
          <ProjectLogo project={p} size={36} />
          <h1 className="text-2xl font-bold flex-1" style={{ color: 'var(--foreground)' }}>{p.name}</h1>
        </div>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
          <span className="inline-flex items-center gap-1.5">
            <span aria-hidden="true" className="w-2 h-2 rounded-full" style={{ backgroundColor: STATUS_COLOR[p.status] }} />
            筆者の状況: {STATUS_LABEL[p.status]}
          </span>
          {phased && <PhaseMeter phase={p.phase} />}
          <span className="text-xs" style={{ color: 'var(--muted)' }}>最終更新: {p.updatedAt}</span>
        </p>
        <p className="mt-3"><MyStatus project={p} /></p>
        {p.statusNote && <p className="mt-3 text-sm leading-relaxed" style={note}>{p.statusNote}</p>}
      </header>

      {p.staking && (
        <Section title={p.activity === 'defi' ? 'レンディング・利回り' : 'ステーキング'}>
          <dl>
            <Row label={p.activity === 'defi' ? '預ける資産' : 'トークン'}><span className="font-mono">{p.activity === 'defi' ? '' : '$'}{p.staking.token}</span></Row>
            {p.staking.apy && <Row label="APYの目安">{p.staking.apy}</Row>}
            <Row label="報酬">{p.staking.reward}</Row>
            {p.staking.note && <Row label="補足">{p.staking.note}</Row>}
          </dl>
        </Section>
      )}

      {v && multiples && (
        <Section title="バリュエーション">
          <dl>
            <Row label="FDV（希薄化後）">
              <span className="font-mono">{formatUsdM(v.fdvUsdM!)}</span>
              {v.marketCapUsdM ? <span className="text-xs ml-2" style={{ color: 'var(--muted)' }}>時価総額 {formatUsdM(v.marketCapUsdM)}</span> : null}
            </Row>
            {v.revenue365UsdM ? <Row label="FDV ÷ 収益">
              <span className="font-mono font-semibold" style={{ color: multiples.trailing !== null && multiples.trailing <= CHEAP_MULTIPLE ? 'var(--accent)' : undefined }}>{formatMultiple(multiples.trailing)}</span>
              <span className="text-xs ml-2" style={{ color: 'var(--muted)' }}>過去365日の収益 {v.revenue365UsdM ? formatUsdM(v.revenue365UsdM) : '—'}</span>
              <span className="block text-xs mt-1" style={{ color: 'var(--muted)' }}>直近90日×4では {formatMultiple(multiples.runRate)}（年換算 {v.revenue90UsdM ? formatUsdM(v.revenue90UsdM * 4) : '—'}）</span>
            </Row> : null}
            {multiples.atEntry !== null && (
              <Row label="筆者の取得価格で">
                <span className="font-mono font-semibold" style={{ color: multiples.atEntry <= CHEAP_MULTIPLE ? 'var(--accent)' : undefined }}>{formatMultiple(multiples.atEntry)}</span>
                <span className="text-xs ml-2" style={{ color: 'var(--muted)' }}>取得価格 ${v.entryPriceUsd} 以下 → FDV換算 {formatUsdM((v.fdvUsdM! * v.entryPriceUsd!) / v.priceUsd!)}（収益は現在の過去365日の値）</span>
              </Row>
            )}
            {v.holders90UsdM || v.holders365UsdM ? <Row label="FDV ÷ 保有者還元">
              <span className="font-mono">{formatMultiple(multiples.holdersRunRate)}</span>
              <span className="block text-xs mt-1" style={{ color: 'var(--muted)' }}>直近90日の買い戻し・バーン・分配 {v.holders90UsdM ? formatUsdM(v.holders90UsdM) : 'なし'}（×4で年換算）</span>
            </Row> : null}
            {v.note && <Row label="補足">{v.note}</Row>}
          </dl>
          <p className="text-xs leading-relaxed mt-3" style={{ color: 'var(--muted)' }}>
            {v.asOf}時点。FDVはCoinGecko、収益と保有者還元はDefiLlamaの数値です。
            {v.revenue365UsdM ? `分母は利益ではなく収益なので、株式のPERより売上倍率（PSR）に近い指標です。筆者は「FDV÷収益が${CHEAP_MULTIPLE}倍以下」を割安の目安にしていますが、収益の変動やアンロックで大きく変わります。` : null}
          </p>
        </Section>
      )}

      <Section title="TGE・ポイント">
        <dl>
          {phased && <Row label="フェーズ">
            <PhaseMeter phase={p.phase} />
            {p.phaseNote && <span className="block text-xs mt-1" style={{ color: 'var(--muted)' }}>{p.phaseNote}</span>}
          </Row>}
          {!phased && p.phaseNote && <Row label="現状">{p.phaseNote}</Row>}
          <Row label="TGE"><TgeCell project={p} /></Row>
          <Row label="ポイントプログラム">
            {p.points.exists ? (
              <>
                {p.points.name}
                {p.points.status && <span className="block text-xs mt-1" style={{ color: 'var(--muted)' }}>{p.points.status}</span>}
              </>
            ) : 'ポイントなし'}
          </Row>
          {p.points.communityAllocation && <Row label="コミュニティ配分">{p.points.communityAllocation}</Row>}
        </dl>
      </Section>

      {phased && (
        <Section title="エアドロップ受取見込みの試算" id="estimate">
          <AirdropEstimate project={p} />
        </Section>
      )}

      <Section title="チーム・資金調達・利用者規模">
        <dl>
          <Row label="拠点">
            {p.team.base}
            {p.team.baseKind !== 'unverified' && (
              <span className="text-xs ml-2" style={{ color: 'var(--muted)' }}>（{p.team.baseKind === 'company HQ' ? '会社所在地' : '創業者の拠点'}）</span>
            )}
          </Row>
          <Row label="創業者・トップ">
            {p.team.founders.length > 0 ? p.team.founders.join('、') : '未公表'}
            {!p.team.doxxed && <span className="text-xs ml-2" style={{ color: 'var(--muted)' }}>（チームの公開は限定的）</span>}
            {p.team.background && <span className="block text-xs mt-1" style={{ color: 'var(--muted)' }}>{p.team.background}</span>}
          </Row>
          <Row label="VC調達額">
            <span className="font-mono">{formatFunding(p.funding.totalUsdM)}</span>
            {p.funding.rounds && <span className="block text-xs mt-1" style={{ color: 'var(--muted)' }}>{p.funding.rounds}</span>}
          </Row>
          {p.funding.investors.length > 0 && <Row label="主な投資家">{p.funding.investors.join('、')}</Row>}
          {p.audience?.xFollowers && (
            <Row label="Xフォロワー">
              <span className="font-mono">{formatFollowers(p.audience.xFollowers)}</span>
              {p.audience.xHandle && (
                <a href={`https://x.com/${p.audience.xHandle}`} target="_blank" rel="noopener nofollow" className="underline ml-2" style={{ color: 'var(--accent)' }}>@{p.audience.xHandle}</a>
              )}
              {p.audience.asOf && <span className="text-xs ml-2" style={{ color: 'var(--muted)' }}>{p.audience.asOf}時点</span>}
            </Row>
          )}
          {p.audience?.users && (
            <Row label="利用者数の目安">
              {p.audience.users}
              {p.audience.usersSource && <span className="block text-xs mt-1" style={{ color: 'var(--muted)' }}>{p.audience.usersSource}</span>}
            </Row>
          )}
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
        </ul>
        {p.links.inviteCodes && (
          <div id="invite" className="mt-5 scroll-mt-20">
            <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--foreground)' }}>招待コード</h3>
            <InviteCodes codes={p.links.inviteCodes} />
            {p.links.inviteNote && <p className="text-xs mt-2 leading-relaxed" style={{ color: 'var(--muted)' }}>{p.links.inviteNote}</p>}
          </div>
        )}
        {p.links.referral && (
          <div className="mt-5">
            <a href={p.links.referral} target="_blank" rel="sponsored nofollow noopener"
              className="inline-block text-sm font-semibold px-4 py-2.5 rounded-md"
              style={{ backgroundColor: 'var(--accent)', color: 'var(--background)' }}>
              {p.name}を始める（紹介リンク）
            </a>
            <p className="text-xs mt-2 leading-relaxed" style={{ color: 'var(--muted)' }}>
              紹介リンクです。登録や取引に応じて筆者が報酬を受け取る場合があります。掲載内容は報酬と連動させていません。
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
