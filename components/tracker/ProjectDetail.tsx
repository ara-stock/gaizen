import Link from 'next/link'
import type { Metadata } from 'next'
import type { Project } from '@/types/project'
import { ACTIVITY_COLOR, CHEAP_MULTIPLE, STATUS_COLOR, fdvMultiples, formatFollowers, formatFunding, formatMultiple, formatUsdM } from './labels'
import { airdropHref, dict, type Locale } from './i18n'
import { PhaseMeter, ProjectLogo, TgeCell } from './cells'
import AirdropEstimate from './AirdropEstimate'
import InviteCodes from './InviteCodes'
import MyStatus from './MyStatus'

const TEXT = {
  ja: {
    metaTitle: (name: string) => `${name}のTGE時期・調達額・チーム情報`,
    metaDescription: (p: Project) => `${p.name}（${p.category}）のTGE見込み、ポイントプログラムの進み具合、エアドロップの受取見込み試算、VC調達額、運営チームと拠点、リスクを出典つきで整理。`,
    back: '← 一覧に戻る',
    authorStatus: '筆者の状況',
    updated: '最終更新',
    lending: 'レンディング・利回り',
    staking: 'ステーキング',
    deposit: '預ける資産',
    token: 'トークン',
    apy: 'APYの目安',
    reward: '報酬',
    note: '補足',
    valuation: 'バリュエーション',
    fdv: 'FDV（希薄化後）',
    marketCap: '時価総額',
    fdvRevenue: 'FDV ÷ 収益',
    revenue365: '過去365日の収益',
    runRate: (m: string, annual: string) => `直近90日×4では ${m}（年換算 ${annual}）`,
    entry: '筆者の取得価格',
    now: '現在',
    atEntry: '取得価格での倍率',
    atEntryNote: (price: number, fdv: string) => `取得価格 $${price} 以下 → FDV換算 ${fdv}（収益は現在の過去365日の値）`,
    holders: 'FDV ÷ 保有者還元',
    holdersNote: (v: string) => `直近90日の買い戻し・バーン・分配 ${v}（×4で年換算）`,
    valuationSource: (asOf: string | undefined, revenue: boolean) => `${asOf}時点。FDVと価格はCoinGecko${revenue ? '、収益と保有者還元はDefiLlama' : ''}の数値です。`,
    valuationCaveat: `分母は利益ではなく収益なので、株式のPERより売上倍率（PSR）に近い指標です。筆者は「FDV÷収益が${CHEAP_MULTIPLE}倍以下」を割安の目安にしていますが、収益の変動やアンロックで大きく変わります。`,
    tgePoints: 'TGE・ポイント',
    phase: 'フェーズ',
    current: '現状',
    program: 'ポイントプログラム',
    noPoints: 'ポイントなし',
    community: 'コミュニティ配分',
    estimate: 'エアドロップ受取見込みの試算',
    team: 'チーム・資金調達・利用者規模',
    base: '拠点',
    hq: '会社所在地',
    founderBase: '創業者の拠点',
    founders: '創業者・トップ',
    notPublished: '未公表',
    limited: 'チームの公開は限定的',
    funding: 'VC調達額',
    investors: '主な投資家',
    followers: 'Xフォロワー',
    asOf: (d: string) => `${d}時点`,
    users: '利用者数の目安',
    risks: 'リスク・注意点',
    links: 'リンク',
    site: '公式サイト',
    invite: '招待コード',
    startWith: (name: string) => `${name}を始める（紹介リンク）`,
    referralNote: '紹介リンクです。登録や取引に応じて筆者が報酬を受け取る場合があります。掲載内容は報酬と連動させていません。',
    sources: '出典',
    disclaimer: '本ページは情報提供を目的としており、特定の暗号資産やサービスの利用を勧誘するものではありません。エアドロップの実施・金額は保証されず、預けた資金を失う可能性があります。',
    list: '、',
    paren: (s: string) => `（${s}）`,
  },
  en: {
    metaTitle: (name: string) => `${name}: TGE timing, funding and team`,
    metaDescription: (p: Project) => `${p.name} (${p.category}): expected TGE, points program progress, an airdrop payout estimate, VC funding, team and base, and risks, with sources.`,
    back: '← Back to the list',
    authorStatus: "Author's status",
    updated: 'Updated',
    lending: 'Lending and yield',
    staking: 'Staking',
    deposit: 'Deposit',
    token: 'Token',
    apy: 'Typical APY',
    reward: 'Rewards',
    note: 'Note',
    valuation: 'Valuation',
    fdv: 'FDV (fully diluted)',
    marketCap: 'Market cap',
    fdvRevenue: 'FDV ÷ revenue',
    revenue365: 'Revenue, last 365 days',
    runRate: (m: string, annual: string) => `${m} on the last 90 days × 4 (annualized ${annual})`,
    entry: "Author's cost",
    now: 'Now',
    atEntry: 'Multiple at cost',
    atEntryNote: (price: number, fdv: string) => `Cost $${price} or less → FDV equivalent ${fdv} (revenue is the current 365-day figure)`,
    holders: 'FDV ÷ holder returns',
    holdersNote: (v: string) => `Buybacks, burns and distributions over the last 90 days: ${v} (×4 to annualize)`,
    valuationSource: (asOf: string | undefined, revenue: boolean) => `As of ${asOf}. FDV and price from CoinGecko${revenue ? '; revenue and holder returns from DefiLlama' : ''}.`,
    valuationCaveat: `The denominator is revenue, not profit, so this is closer to a price-to-sales ratio than a P/E. The author treats FDV ÷ revenue of ${CHEAP_MULTIPLE}x or less as cheap, but it moves a lot with revenue swings and unlocks.`,
    tgePoints: 'TGE and points',
    phase: 'Phase',
    current: 'Current state',
    program: 'Points program',
    noPoints: 'No points',
    community: 'Community allocation',
    estimate: 'Airdrop payout estimate',
    team: 'Team, funding and user base',
    base: 'Base',
    hq: 'company HQ',
    founderBase: "founders' base",
    founders: 'Founders / leads',
    notPublished: 'Not published',
    limited: 'team only partly public',
    funding: 'VC funding',
    investors: 'Key investors',
    followers: 'X followers',
    asOf: (d: string) => `as of ${d}`,
    users: 'User base',
    risks: 'Risks and caveats',
    links: 'Links',
    site: 'Official website',
    invite: 'Invite codes',
    startWith: (name: string) => `Start on ${name} (ref link)`,
    referralNote: 'This is a referral link. The author may be rewarded when you sign up or trade. What is written here is not tied to those rewards.',
    sources: 'Sources',
    disclaimer: 'This page is for information only and is not a solicitation to use any crypto asset or service. Airdrops and their amounts are not guaranteed, and you may lose the funds you deposit.',
    list: ', ',
    paren: (s: string) => ` (${s})`,
  },
}

export function projectMetadata(p: Project, locale: Locale): Metadata {
  const t = TEXT[locale]
  return {
    title: t.metaTitle(p.name),
    description: t.metaDescription(p),
    alternates: {
      canonical: `https://gaizen.xyz${airdropHref(locale, p.slug)}`,
      languages: {
        ja: `https://gaizen.xyz${airdropHref('ja', p.slug)}`,
        en: `https://gaizen.xyz${airdropHref('en', p.slug)}`,
      },
    },
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

export default function ProjectDetail({ project: p, locale }: { project: Project; locale: Locale }) {
  const t = TEXT[locale]
  const d = dict(locale)
  const note = { color: 'var(--prose-body)' }
  const multiples = fdvMultiples(p)
  const v = p.valuation
  const phased = p.activity === 'perps' || p.activity === 'points'
  const x = (value: number | null) => formatMultiple(value, locale)

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <Link href={airdropHref(locale)} className="text-xs underline" style={{ color: 'var(--accent)' }}>{t.back}</Link>

      <header className="mt-4 mb-8">
        <p className="text-xs mb-2" style={{ color: 'var(--muted)' }}>
          <span className="font-semibold mr-1.5" style={{ color: ACTIVITY_COLOR[p.activity] }}>{d.activity[p.activity]}</span>
          {p.category} · {p.chain}
        </p>
        <div className="flex items-center gap-4 mb-4">
          <ProjectLogo project={p} size={36} />
          <h1 className="text-2xl font-bold flex-1" style={{ color: 'var(--foreground)' }}>{p.name}</h1>
        </div>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
          <span className="inline-flex items-center gap-1.5">
            <span aria-hidden="true" className="w-2 h-2 rounded-full" style={{ backgroundColor: STATUS_COLOR[p.status] }} />
            {t.authorStatus}: {d.status[p.status]}
          </span>
          {phased && <PhaseMeter phase={p.phase} locale={locale} />}
          <span className="text-xs" style={{ color: 'var(--muted)' }}>{t.updated}: {p.updatedAt}</span>
        </p>
        <p className="mt-3"><MyStatus project={p} locale={locale} /></p>
        {p.statusNote && <p className="mt-3 text-sm leading-relaxed" style={note}>{p.statusNote}</p>}
      </header>

      {p.staking && (
        <Section title={p.activity === 'defi' ? t.lending : t.staking}>
          <dl>
            <Row label={p.activity === 'defi' ? t.deposit : t.token}><span className="font-mono">{p.activity === 'defi' ? '' : '$'}{p.staking.token}</span></Row>
            {p.staking.apy && <Row label={t.apy}>{p.staking.apy}</Row>}
            <Row label={t.reward}>{p.staking.reward}</Row>
            {p.staking.note && <Row label={t.note}>{p.staking.note}</Row>}
          </dl>
        </Section>
      )}

      {v && multiples && (
        <Section title={t.valuation}>
          <dl>
            <Row label={t.fdv}>
              <span className="font-mono">{formatUsdM(v.fdvUsdM!)}</span>
              {v.marketCapUsdM ? <span className="text-xs ml-2" style={{ color: 'var(--muted)' }}>{t.marketCap} {formatUsdM(v.marketCapUsdM)}</span> : null}
            </Row>
            {v.revenue365UsdM ? <Row label={t.fdvRevenue}>
              <span className="font-mono font-semibold" style={{ color: multiples.trailing !== null && multiples.trailing <= CHEAP_MULTIPLE ? 'var(--accent)' : undefined }}>{x(multiples.trailing)}</span>
              <span className="text-xs ml-2" style={{ color: 'var(--muted)' }}>{t.revenue365} {formatUsdM(v.revenue365UsdM)}</span>
              <span className="block text-xs mt-1" style={{ color: 'var(--muted)' }}>{t.runRate(x(multiples.runRate), v.revenue90UsdM ? formatUsdM(v.revenue90UsdM * 4) : '—')}</span>
            </Row> : null}
            {v.entryPriceUsd && v.priceUsd ? (
              <Row label={t.entry}>
                <span className="font-mono">${v.entryPriceUsd.toLocaleString('en-US')}</span>
                <span className="text-xs ml-2" style={{ color: 'var(--muted)' }}>
                  {t.now} ${v.priceUsd.toLocaleString('en-US', { maximumFractionDigits: 6 })}
                  {t.paren(`${v.priceUsd >= v.entryPriceUsd ? '+' : ''}${(((v.priceUsd - v.entryPriceUsd) / v.entryPriceUsd) * 100).toFixed(1)}%`)}
                </span>
              </Row>
            ) : null}
            {multiples.atEntry !== null && (
              <Row label={t.atEntry}>
                <span className="font-mono font-semibold" style={{ color: multiples.atEntry <= CHEAP_MULTIPLE ? 'var(--accent)' : undefined }}>{x(multiples.atEntry)}</span>
                <span className="text-xs ml-2" style={{ color: 'var(--muted)' }}>{t.atEntryNote(v.entryPriceUsd!, formatUsdM((v.fdvUsdM! * v.entryPriceUsd!) / v.priceUsd!))}</span>
              </Row>
            )}
            {v.holders90UsdM || v.holders365UsdM ? <Row label={t.holders}>
              <span className="font-mono">{x(multiples.holdersRunRate)}</span>
              <span className="block text-xs mt-1" style={{ color: 'var(--muted)' }}>{t.holdersNote(v.holders90UsdM ? formatUsdM(v.holders90UsdM) : d.none)}</span>
            </Row> : null}
            {v.note && <Row label={t.note}>{v.note}</Row>}
          </dl>
          <p className="text-xs leading-relaxed mt-3" style={{ color: 'var(--muted)' }}>
            {t.valuationSource(v.asOf, Boolean(v.revenue365UsdM))}
            {v.revenue365UsdM ? `${locale === 'en' ? ' ' : ''}${t.valuationCaveat}` : null}
          </p>
        </Section>
      )}

      <Section title={t.tgePoints}>
        <dl>
          {phased && <Row label={t.phase}>
            <PhaseMeter phase={p.phase} locale={locale} />
            {p.phaseNote && <span className="block text-xs mt-1" style={{ color: 'var(--muted)' }}>{p.phaseNote}</span>}
          </Row>}
          {!phased && p.phaseNote && <Row label={t.current}>{p.phaseNote}</Row>}
          <Row label="TGE"><TgeCell project={p} locale={locale} /></Row>
          <Row label={t.program}>
            {p.points.exists ? (
              <>
                {p.points.name}
                {p.points.status && <span className="block text-xs mt-1" style={{ color: 'var(--muted)' }}>{p.points.status}</span>}
              </>
            ) : t.noPoints}
          </Row>
          {p.points.communityAllocation && <Row label={t.community}>{p.points.communityAllocation}</Row>}
        </dl>
      </Section>

      {phased && (
        <Section title={t.estimate} id="estimate">
          <AirdropEstimate project={p} locale={locale} />
        </Section>
      )}

      <Section title={t.team}>
        <dl>
          <Row label={t.base}>
            {p.team.base}
            {p.team.baseKind !== 'unverified' && (
              <span className="text-xs ml-2" style={{ color: 'var(--muted)' }}>{t.paren(p.team.baseKind === 'company HQ' ? t.hq : t.founderBase)}</span>
            )}
          </Row>
          <Row label={t.founders}>
            {p.team.founders.length > 0 ? p.team.founders.join(t.list) : t.notPublished}
            {!p.team.doxxed && <span className="text-xs ml-2" style={{ color: 'var(--muted)' }}>{t.paren(t.limited)}</span>}
            {p.team.background && <span className="block text-xs mt-1" style={{ color: 'var(--muted)' }}>{p.team.background}</span>}
          </Row>
          <Row label={t.funding}>
            <span className="font-mono">{formatFunding(p.funding.totalUsdM, locale)}</span>
            {p.funding.rounds && <span className="block text-xs mt-1" style={{ color: 'var(--muted)' }}>{p.funding.rounds}</span>}
          </Row>
          {p.funding.investors.length > 0 && <Row label={t.investors}>{p.funding.investors.join(t.list)}</Row>}
          {p.audience?.xFollowers && (
            <Row label={t.followers}>
              <span className="font-mono">{formatFollowers(p.audience.xFollowers, locale)}</span>
              {p.audience.xHandle && (
                <a href={`https://x.com/${p.audience.xHandle}`} target="_blank" rel="noopener nofollow" className="underline ml-2" style={{ color: 'var(--accent)' }}>@{p.audience.xHandle}</a>
              )}
              {p.audience.asOf && <span className="text-xs ml-2" style={{ color: 'var(--muted)' }}>{t.asOf(p.audience.asOf)}</span>}
            </Row>
          )}
          {p.audience?.users && (
            <Row label={t.users}>
              {p.audience.users}
              {p.audience.usersSource && <span className="block text-xs mt-1" style={{ color: 'var(--muted)' }}>{p.audience.usersSource}</span>}
            </Row>
          )}
        </dl>
      </Section>

      {p.flags.length > 0 && (
        <Section title={t.risks}>
          <ul className="list-disc pl-5 space-y-1.5 text-sm leading-relaxed" style={note}>
            {p.flags.map(flag => <li key={flag}>{flag}</li>)}
          </ul>
        </Section>
      )}

      <Section title={t.links}>
        <ul className="space-y-2 text-sm">
          <li><a href={p.links.site} target="_blank" rel="noopener nofollow" className="underline" style={{ color: 'var(--accent)' }}>{t.site}</a></li>
        </ul>
        {p.links.inviteCodes && (
          <div id="invite" className="mt-5 scroll-mt-20">
            <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--foreground)' }}>{t.invite}</h3>
            <InviteCodes codes={p.links.inviteCodes} locale={locale} />
            {p.links.inviteNote && <p className="text-xs mt-2 leading-relaxed" style={{ color: 'var(--muted)' }}>{p.links.inviteNote}</p>}
          </div>
        )}
        {p.links.referral && (
          <div className="mt-5">
            <a href={p.links.referral} target="_blank" rel="sponsored nofollow noopener"
              className="inline-block text-sm font-semibold px-4 py-2.5 rounded-md"
              style={{ backgroundColor: 'var(--accent)', color: 'var(--background)' }}>
              {t.startWith(p.name)}
            </a>
            <p className="text-xs mt-2 leading-relaxed" style={{ color: 'var(--muted)' }}>{t.referralNote}</p>
          </div>
        )}
      </Section>

      <Section title={t.sources}>
        <ul className="space-y-2 text-sm">
          {p.sources.map(s => (
            <li key={s.url}>
              <a href={s.url} target="_blank" rel="noopener nofollow" className="underline break-words" style={{ color: 'var(--accent)' }}>{s.title}</a>
              {s.date && <span className="text-xs ml-2" style={{ color: 'var(--muted)' }}>{s.date}</span>}
            </li>
          ))}
        </ul>
      </Section>

      <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>{t.disclaimer}</p>
    </div>
  )
}
