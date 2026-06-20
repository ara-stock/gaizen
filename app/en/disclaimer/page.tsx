import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'Disclaimer for GAIZEN FINANCE. Content is not investment advice. Covers information accuracy, investment risks, external links, advertising, affiliate and referral disclosures.',
  alternates: {
    canonical: 'https://gaizen.xyz/en/disclaimer/',
    languages: { 'ja': 'https://gaizen.xyz/disclaimer/' },
  },
}

const sections = [
  {
    title: 'About the Operator',
    body: `GAIZEN FINANCE (URL: https://gaizen.xyz) is an independently operated personal media site run by individual investor ara. The operator is not a registered financial instruments business operator and does not provide regulated investment advisory services. This site is operated for financial education and personal commentary purposes.`,
  },
  {
    title: 'Not Investment Advice',
    body: `All articles, analysis, opinions, and data published on this site are provided for general informational and educational purposes only. Nothing on this site constitutes investment advice, discretionary investment management, or a solicitation to buy, sell, or hold any financial product, security, ETF, investment trust, crypto asset, or related service.\n\nMentions of individual stocks, ETFs, index funds, investment trusts, crypto assets, DeFi protocols, or other products reflect the author's personal experience and analysis. They should not be interpreted as recommendations for readers to purchase, hold, or sell those assets.`,
  },
  {
    title: 'Do Your Own Research',
    body: `All investment and asset management decisions must be made based on your own research, judgment, financial situation, and risk tolerance. The operator accepts no responsibility for any losses or damages arising from actions taken based on information published on this site.\n\nInvesting involves risk. Market price fluctuations, foreign exchange movements, issuer credit risk, liquidity risk, country risk, and other factors may cause losses, including loss of principal. Past performance does not guarantee future results.`,
  },
  {
    title: 'Accuracy and Timeliness of Information',
    body: `Information on this site, including figures, tax rules, product specifications, fees, yields, and regulatory descriptions, is based on information available at the time of writing. Laws, tax systems, product terms, and market conditions may change after publication.\n\nAlthough this site aims to review and update information periodically, it does not guarantee that all content is complete, accurate, or up to date at all times. Please confirm the latest information through official sources such as regulators, financial institutions, issuers, and service providers.`,
  },
  {
    title: 'Investment Risks',
    body: `The main asset classes discussed on this site involve the following risks.\n\nStocks, ETFs, and investment trusts: price fluctuation risk, foreign exchange risk, issuer credit risk, liquidity risk, and country risk. The value of investments may fall below the amount invested.\n\nCrypto assets: crypto assets can be highly volatile and may experience large losses over short periods. They also involve risks such as exchange failure, hacking, wallet loss, smart contract vulnerabilities, protocol changes, and regulatory uncertainty. Crypto assets are not bank deposits and may not be covered by deposit insurance or investor protection schemes.\n\nREITs and real estate-related investments: rental income fluctuations, property market changes, interest rate increases, leverage risk, and liquidity risk may affect prices and distributions.`,
  },
  {
    title: 'Advertising, Affiliate, and Referral Links',
    body: `This site may display advertisements through Google AdSense. It may also participate in affiliate or referral programs related to financial services, crypto services, software, or other external services. If users register or use a service through certain links, the site operator may receive compensation or referral benefits.\n\nRevenue from advertising, affiliate programs, or referral programs is used to support site operation. The site aims to disclose sponsored, affiliate, or referral links where relevant and to keep editorial opinions independent from compensation arrangements.`,
  },
  {
    title: 'External Links',
    body: `This site contains links to external websites. The operator is not responsible for the accuracy, legality, availability, security, privacy practices, or current status of content on linked external sites. Please review each external site's own terms, policies, and official information before using it.`,
  },
  {
    title: 'Copyright',
    body: `Unless otherwise stated, the text, images, data, design, and other content published on this site are owned by the site operator. Unauthorized reproduction, redistribution, modification, or commercial use is prohibited. When quoting content, please clearly indicate the site name and article URL as the source.`,
  },
  {
    title: 'Changes to This Disclaimer',
    body: `This disclaimer may be updated without prior notice in response to changes in laws, services, site operations, or published content. The updated version becomes effective when posted on this page.`,
  },
]

export default function EnDisclaimerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-12">
        <p className="text-xs tracking-widest mb-2 font-semibold" style={{ color: 'var(--accent)' }}>LEGAL</p>
        <h1 className="text-3xl font-bold mb-3" style={{ color: 'var(--foreground)' }}>Disclaimer</h1>
        <p className="text-xs" style={{ color: 'var(--muted)' }}>Last updated: June 2026</p>
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
        Please also review the <a href="/en/privacy" style={{ color: 'var(--accent)' }}>Privacy Policy</a>.
        For inquiries, please use the <a href="/en/contact" style={{ color: 'var(--accent)' }}>Contact page</a>.
      </div>
    </div>
  )
}
