import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'About',
  description: 'GAIZEN — high-probability investing through long-term accumulation. Investment philosophy, core principles, and portfolio sectors.',
  alternates: {
    canonical: 'https://gaizen.xyz/en/about',
    languages: { 'ja': 'https://gaizen.xyz/about' },
  },
}

const principles = [
  {
    number: '01',
    title: 'Evaluate investments by profitability, durability, and future potential',
    body: 'Three axes: ① Is the business generating profit today? ② Is the revenue stream durable against competition? ③ Where can it grow from here? If I can\'t explain a stock in my own words across all three, I don\'t invest.',
  },
  {
    number: '02',
    title: 'Focus on large-cap companies',
    body: 'Companies with strong market share have established brand equity and switching costs. Industry leaders tend to hold up better in downturns, making them well-suited for long-term holding.',
  },
  {
    number: '03',
    title: 'Only invest in what I understand',
    body: 'Limit holdings to businesses whose model, revenue structure, and competitive moat I can explain clearly. Deeper knowledge sharpens the ability to judge fair value and stay calm through volatility.',
  },
  {
    number: '04',
    title: 'Core-satellite structure, held for the long term',
    body: 'Monthly automatic accumulation in S&P500 index funds via the NISA accumulation allowance (core), combined with individual stocks targeting alpha via the growth allowance and taxable accounts (satellite). Both held with a 5+ year horizon, diversified by asset class and geography.',
  },
]

const sectors = [
  {
    sector: 'Trading Companies',
    region: 'JP',
    reason: 'Rights × Hub × Agility',
    detail: 'Hold resource, energy, and food concession rights while functioning as business integration hubs across industries. Asset-light structure enables high capital efficiency and steady cash flow.',
    examples: ['Mitsubishi Corp', 'Itochu', 'Mitsui & Co', 'Sumitomo Corp', 'Marubeni', 'Kanematsu'],
  },
  {
    sector: 'Banking',
    region: 'JP',
    reason: 'Fee income × Rate tailwind',
    detail: 'Revenue from fund management and distribution generates recurring fee income. In a rising rate environment, expanding net interest margins provide an additional direct benefit.',
    examples: ['MUFG', 'SMFG'],
  },
  {
    sector: 'Insurance',
    region: 'JP',
    reason: 'Essential / quasi-essential services',
    detail: 'Marine, fire, and auto insurance are mandated or socially expected, creating stable premium income largely independent of economic cycles.',
    examples: ['Tokio Marine HD'],
  },
  {
    sector: 'Finance',
    region: 'JP',
    reason: 'Fintech × Leasing × Diversification',
    detail: 'SBI is a fintech platform spanning brokerage, banking, and crypto. Orix, Mitsubishi HC Capital, and Mizuho Leasing generate stable cash flows through leasing and infrastructure finance.',
    examples: ['SBI Holdings', 'Orix', 'Mitsubishi HC Capital', 'Mizuho Leasing'],
  },
  {
    sector: 'Real Estate',
    region: 'JP',
    reason: 'Integrated developer × Logistics × Commercial',
    detail: 'Mitsui Fudosan is a diversified developer spanning residential, commercial, logistics, and hotel assets. Offers both stable rental income and latent gains from redevelopment projects.',
    examples: ['Mitsui Fudosan'],
  },
  {
    sector: 'AI / Cloud',
    region: 'US',
    reason: 'Current earnings × AI expansion',
    detail: 'Microsoft (Azure + OpenAI), Alphabet (GCP + Gemini + Ads), and Amazon (AWS) each build AI infrastructure on top of strong revenue bases. Cloudflare continues high growth through edge networking and zero-trust security.',
    examples: ['Microsoft', 'Alphabet', 'Amazon', 'Cloudflare'],
  },
  {
    sector: 'Hardware / AI Infra',
    region: 'US',
    reason: 'Chip design × Devices × AI flywheel',
    detail: 'Apple integrates devices with Apple Intelligence to own the on-device AI hardware layer. SoftBank HD sits at the center of AI infrastructure through ARM IP licensing and its OpenAI stake.',
    examples: ['Apple', 'SoftBank HD'],
  },
  {
    sector: 'Defense / Data',
    region: 'US',
    reason: 'Government AI data analytics',
    detail: 'Palantir provides AI-driven data analytics platforms to government and defense agencies. Long-term public-sector contracts underpin stable revenue while commercial expansion is underway.',
    examples: ['Palantir'],
  },
  {
    sector: 'Fintech / Crypto Infra',
    region: 'US',
    reason: 'Stablecoin infrastructure',
    detail: 'Circle Internet sits at the center of stablecoin infrastructure as the issuer of USDC. Its position grows stronger as regulatory frameworks continue to mature.',
    examples: ['Circle Internet'],
  },
  {
    sector: 'Gold',
    region: 'Global',
    reason: 'Geopolitical & inflation hedge',
    detail: 'Held as a hedge against geopolitical risk and fiat currency debasement. As a physically supply-constrained hard asset, gold moves differently from equities and bonds, providing diversification.',
    examples: ['Gold accumulation'],
  },
  {
    sector: 'Crypto',
    region: 'Crypto',
    reason: 'Commodity position × Supply scarcity',
    detail: 'Crypto assets are treated as commodities, not equities. Like watches, wine, or art, price appreciation is driven by core user conviction and effective supply reduction from lost wallets. Also functions as a hedge against geopolitical risk and inflation alongside gold.',
    examples: ['BTC', 'JLP', 'OKB', 'JUP', 'EDGE', 'GRVT'],
  },
]

const REGION_COLOR: Record<string, string> = {
  JP: '#00c97a',
  US: '#00a862',
  Crypto: '#4ade80',
  Global: '#86efac',
}

export default function EnAboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">

      {/* Author Profile */}
      <div className="mb-16 p-6 rounded-2xl border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
        <div className="flex items-start gap-5">
          <div className="flex-shrink-0">
            <Image
              src="/images/profile.jpg"
              alt="ara — operator of GAIZEN FINANCE"
              width={72}
              height={72}
              className="rounded-full object-cover"
              style={{ border: '2px solid var(--border)' }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <p className="text-base font-bold" style={{ color: 'var(--foreground)' }}>ara</p>
              <a
                href="https://x.com/ara_stock"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded"
                style={{ backgroundColor: 'rgba(0,201,122,0.1)', color: 'var(--accent)', border: '1px solid rgba(0,201,122,0.2)' }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                @ara_stock
              </a>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
              A full-time professional who practices long-term, diversified investing on the side.
              Running a portfolio anchored in index accumulation, combined with individual stocks in trading companies, banks, AI, and fintech — plus a crypto allocation.
              Also shares thoughts on investing via X (@ara_stock).
            </p>
          </div>
        </div>
        {/* Speech bubble */}
        <div className="mt-4 ml-[88px] relative">
          <div className="absolute -top-2 left-4 w-0 h-0"
            style={{ borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderBottom: '8px solid var(--border)' }} />
          <div className="absolute -top-1.5 left-4 w-0 h-0"
            style={{ borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderBottom: '8px solid var(--surface)' }} />
          <div className="p-3 rounded-lg text-xs leading-relaxed italic"
            style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--muted)' }}>
            Don&apos;t predict the market — just keep making high-probability choices. That&apos;s all I do.
          </div>
        </div>
      </div>

      {/* GAIZEN Philosophy */}
      <div className="mb-16">
        <p className="text-xs tracking-widest mb-2 font-semibold" style={{ color: 'var(--accent)' }}>GAIZEN</p>
        <h1 className="text-3xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>Invest. Grow. Breathe.</h1>
        <div className="space-y-4 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
          <p>
            <strong style={{ color: 'var(--foreground)' }}>GAIZEN</strong> comes from the Japanese word <strong style={{ color: 'var(--foreground)' }}>蓋然 (gaizen)</strong>, meaning probability or likelihood — the degree to which something is expected to occur.
          </p>
          <p>
            Rather than trying to predict markets, the goal is to make <strong style={{ color: 'var(--foreground)' }}>high-probability choices</strong> consistently and patiently.
          </p>
          <p>
            The core strategy is <strong style={{ color: 'var(--foreground)' }}>long-term index accumulation</strong>. Individual stocks are held long-term with additional investments made as warranted — not mechanically accumulated.
          </p>
        </div>
      </div>

      <div className="mb-14">
        <p className="text-xs tracking-widest mb-2 font-semibold" style={{ color: 'var(--accent)' }}>ABOUT</p>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>Investment Philosophy</h2>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
          Built on long-term, diversified accumulation — combining index investing with selective individual stock picks focused on business continuity and scalability.
        </p>
      </div>

      {/* Core Principles */}
      <section className="mb-16">
        <p className="text-xs tracking-widest mb-6 font-semibold" style={{ color: 'var(--accent)' }}>CORE PRINCIPLES</p>
        <div className="space-y-4">
          {principles.map(p => (
            <div key={p.number} className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
              <div className="flex items-start gap-4">
                <span className="text-xs font-bold font-mono flex-shrink-0 mt-0.5" style={{ color: 'var(--accent)' }}>{p.number}</span>
                <div>
                  <h2 className="text-sm font-semibold mb-2" style={{ color: 'var(--foreground)' }}>{p.title}</h2>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{p.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sectors */}
      <section className="mb-16">
        <p className="text-xs tracking-widest mb-6 font-semibold" style={{ color: 'var(--accent)' }}>STOCKS — Key Sectors</p>
        <div className="space-y-4">
          {sectors.map(s => {
            const regionColor = REGION_COLOR[s.region] ?? 'var(--accent)'
            return (
              <div key={s.sector} className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono px-1.5 py-0.5 rounded"
                      style={{ backgroundColor: `${regionColor}18`, color: regionColor, border: `1px solid ${regionColor}30`, fontSize: '10px' }}>
                      {s.region}
                    </span>
                    <h2 className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>{s.sector}</h2>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded"
                    style={{ backgroundColor: 'rgba(0,201,122,0.1)', color: 'var(--accent)', border: '1px solid rgba(0,201,122,0.2)' }}>
                    {s.reason}
                  </span>
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>{s.detail}</p>
                <div className="flex flex-wrap gap-2">
                  {s.examples.map(e => (
                    <span key={e} className="text-xs px-2 py-0.5 rounded font-mono"
                      style={{ backgroundColor: 'var(--surface-2)', color: 'var(--muted)', border: '1px solid var(--border)' }}>
                      {e}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Summary */}
      <section>
        <p className="text-xs tracking-widest mb-6 font-semibold" style={{ color: 'var(--accent)' }}>SUMMARY</p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Core (Accumulation)', value: 'Index Funds' },
            { label: 'Satellite (Alpha)', value: 'Individual Stocks & Crypto' },
            { label: 'Time Horizon', value: '5+ Years' },
            { label: 'Key Sectors', value: 'Trading Co · AI · Finance · Infra' },
          ].map(({ label, value }) => (
            <div key={label} className="p-4 rounded-lg border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
              <p className="text-xs mb-1" style={{ color: 'var(--muted)' }}>{label}</p>
              <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>{value}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
