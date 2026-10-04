import type { Card, Tier } from './cards'

type TierText = Partial<Pick<Tier, 'name' | 'requirement' | 'cashback' | 'extra'>>
type CardText = Partial<Pick<Card, 'summary' | 'entryFee' | 'entryCashback' | 'entryMax' | 'payout' | 'fx' | 'kyc' | 'notes' | 'authorNote'>> & {
  /** Same order and length as the Japanese tiers. */
  tiers?: TierText[]
}

/** English text for /en/cards/, keyed by card id. Numbers, links and sources live in cards.ts. */
export const CARDS_EN: Record<string, CardText> = {
  etherfi: {
    summary: 'A credit-style Visa card backed by the crypto you deposit as collateral. You move up a tier through points, staking ETHFI, depositing in Liquid, or an annual fee.',
    entryFee: 'Free (Core)',
    entryCashback: '3% (first $2,000/mo) → 1% (to $3,000) → 0.5%',
    entryMax: 'About $70',
    payout: 'ETHFI (claimable after a 7-day lock, $5 minimum)',
    fx: 'About 1% + up to 0.5% on Core',
    kyc: 'Required (18+)',
    tiers: [
      { requirement: 'Free', cashback: '3%: first $2,000/mo → 1%: to $3,000 → 0.5%', extra: 'FX: about 1% + up to 0.5%' },
      { requirement: '5,000 points a month, or $15K in Liquid, 30K ETHFI staked, or $199/year', cashback: '3%: first $10K/mo → 1%: to $20K → 0.5%', extra: 'FX: about 1% + up to 0.25%. Free metal card' },
      { requirement: '25K points a month, or $100K in Liquid, 150K ETHFI staked, or $999/year', cashback: '3%: first $50K/mo → 1%: to $80K → 0.5%', extra: 'No FX markup. Free metal card' },
      { requirement: '$500K in Liquid or 500K ETHFI staked (invite only)', cashback: '4%: first $50K/mo', extra: 'No FX markup' },
    ],
    notes: [
      'Points: 1,000 per $1,000 of card spend, 5 a day per 1,000 ETHFI staked, and more. They reset every month and do not carry over.',
      'ATM: up to $1,000 per withdrawal, 5 withdrawals and $5,000 per 24 hours.',
      'Euro spending earns a lower cashback rate (it has no FX fee). USD and EUR spend share one monthly counter.',
      'Spending limits vary by account and depend on your collateral. There is no published fixed limit.',
    ],
    authorNote: 'I plan to make ether.fi Cash my main card from here on. What made me buy ETHFI in the first place was how good the product felt when I actually used it.',
  },
  'ethena-pay': {
    summary: 'An app that pays yield on USDe balances, with a Visa card. Beta launched on Avalanche on 2026-09-01. Not available in the US or EU; Japan is not on its list of restricted countries.',
    entryFee: 'Free (Standard)',
    entryCashback: '4% (first $2,500/mo) → 1% (to $4,000) → 0%',
    entryMax: 'About $115',
    payout: 'AVAX (credited daily)',
    fx: 'About 1%',
    kyc: 'Required (ID and liveness check)',
    tiers: [
      { requirement: 'Free', cashback: '4%: first $2,500/mo → 1%: to $4,000 → 0%', extra: '5% a year on balances up to $5,000' },
      { requirement: 'Lock $2,000 of ENA or refer 10 people (press)', cashback: '4.5%: first $8,000/mo → 2% → 1% → 0.5%', extra: '6% a year on balances up to $100K' },
      { requirement: 'Lock $10K of ENA or refer 50 people (press)', cashback: '5%: first $20K/mo → 2% → 1% → 0.5%', extra: '6% a year on balances up to $1M' },
    ],
    notes: [
      'The official pricing page and FAQ do not state the Pro and VIP requirements; the ones above come from press reports (The Block, 2026-09-01).',
      'The extra yield (Daily Boost) is a limited-time promotion, not a guaranteed rate. Balances above the cap earn only the base USDe rate.',
      'ATM: $1 + 0.65% of the amount (plus the ATM operator\'s fee). The card and monthly fee are free.',
      'Pro and VIP get up to 5% and 10% at some merchants (Uber, Spotify, Claude and others; press).',
    ],
  },
  kast: {
    summary: 'A Visa card you pay with stablecoins. Tiers are set by the annual fee; higher tiers add KAST Points on top of cashback.',
    entryFee: 'Free (Standard)',
    entryCashback: '1.5% (first $2,000/mo)',
    entryMax: 'About $30',
    payout: 'US dollars',
    fx: '0.5–1.75% (help center)',
    kyc: 'Required (light for virtual; ID + selfie for physical)',
    tiers: [
      { requirement: 'Free', cashback: '1.5%: first $2,000/mo', extra: 'Up to 2 free cards (Visa Platinum)' },
      { requirement: '$1,000/year', cashback: '2%: first $10K/mo', extra: '+1% KAST Points (Visa Infinite)' },
      { requirement: '$10,000/year', cashback: '3%: first $40K/mo', extra: '+2% KAST Points, gold-plated card' },
    ],
    notes: [
      'The monthly caps come from the official help center (the membership page on the website shows no cap).',
      'The yield on balances (Reserve) is shown as 8% Standard, 10% Premium and 12% Private, but it is a promotion until 2027-07-01 and then drops to 4–8%.',
      'The fee schedule page blocked automated access, so ATM fees and similar are unverified.',
    ],
  },
  tria: {
    summary: 'A Visa card linked to a self-custodial wallet. The tier is set by the card type (virtual, plastic, metal).',
    entryFee: '$0–$25 (Lite, virtual)',
    entryCashback: '1.5% (first $1,000/mo) → 0.5%',
    entryMax: 'About $15',
    payout: 'USDT (Arbitrum, claimed quarterly)',
    fx: 'About 1% from Visa (up to 3% in the terms)',
    kyc: 'Required (ID + selfie, 18+)',
    tiers: [
      { name: 'Lite (virtual)', requirement: '$0 (membership page) / $25 (card terms)', cashback: '1.5%: first $1,000/mo → 0.5%' },
      { name: 'Pro (plastic)', requirement: '$109', cashback: '4.5%: first $2,000/mo → 1%', extra: 'Lounges, baggage cover' },
      { name: 'Max (metal)', requirement: '$250', cashback: '6%: first $2,000/mo → 1%', extra: 'Pro perks plus a metal card' },
    ],
    notes: [
      'Since Season 3 in June 2026, cashback has a monthly cap. Before that there was no cap and staking TRIA raised the rate.',
      'Cashback is paid in USDT every quarter, with up to 90 days before it is final.',
      'Card prices differ: the membership page lists Lite at $0, while the card terms list issuance/annual fees of $25 virtual, $109 plastic and $250 metal. Which is current is unverified.',
      'ATM: up to $2 + 3%. Spending limits depend on your collateral (wallet balance).',
    ],
  },
  'plasma-one': {
    summary: 'The app and Visa card of Plasma (XPL), a stablecoin-focused chain. A Bitfinex/Tether-linked project; cashback is paid in XPL. Issued by Rain.',
    entryFee: 'Free (Lite; a $10 deposit in some regions)',
    entryCashback: '2% (first $500/mo; secondary source)',
    entryMax: 'About $10 (secondary source)',
    payout: 'XPL',
    fx: 'Partner fees apply (Plasma covers them on Platinum)',
    kyc: 'Required',
    tiers: [
      { requirement: 'Free', cashback: 'Up to 2%', extra: 'One virtual card' },
      { requirement: '$199/year, or lock 20K XPL for 12 months', cashback: '3%: first $1,000/mo → 2% → 1% → 0.25% (secondary source)', extra: 'Up to 5% on AI spend' },
      { requirement: 'Lock 100K XPL for 12 months (launch-period terms; reportedly 150K XPL afterwards)', cashback: '4%: first $3,000/mo → 3% → 2% → 1% (secondary source)', extra: 'Up to 10% on AI and flights, FX fees covered by Plasma, metal card' },
    ],
    notes: [
      'XPL is about $0.095 (2026-10-04, CoinGecko). A 20K XPL lock is worth about $1,900 and 100K XPL about $9,500, and it cannot be moved for 12 months even if the price falls.',
      'The official rewards terms say the monthly spend bands are "in the Help Center", but no figures were found there; the bands above come from review sites.',
      'The rewards terms are dated 2026-09-26. ATM withdrawals, P2P transfers, crypto purchases and similar earn nothing.',
      'Card volume in September 2026 was about $25.7M (Paymentscan, press).',
    ],
  },
  metamask: {
    summary: 'A Mastercard that pays straight from your MetaMask wallet. Cashback is paid in mUSD, MetaMask\'s stablecoin.',
    entryFee: 'Free (virtual)',
    entryCashback: '1% (no cap stated)',
    entryMax: 'No cap stated',
    payout: 'mUSD',
    fx: 'Mastercard rate (no MetaMask markup)',
    kyc: 'Required',
    tiers: [
      { requirement: 'Free', cashback: '1%', extra: '$15,000 a day, ATM $1,000 a day' },
      { requirement: '$199/year', cashback: '3%: first $10,000 a year → 1%', extra: '$30,000 a day, ATM $5,000 a day' },
    ],
    notes: [
      'Metal\'s 3% applies to the first $10,000 a year — a yearly cap, unlike the monthly caps on other cards.',
      'Japan is not among the 40+ supported countries listed on the official site.',
      'A small per-transaction fee is mentioned, but the amount could not be confirmed on the official page.',
    ],
  },
  bybit: {
    summary: 'A Mastercard that spends from your Bybit exchange balance. The tier is set by monthly spend or your Bybit VIP level; the rates are high but the monthly caps are small.',
    entryFee: 'Unverified',
    entryCashback: '2% (cashback capped at $5/mo)',
    entryMax: '$5',
    payout: 'USDT (via points)',
    fx: 'Unverified',
    kyc: 'Required (Bybit account verification)',
    tiers: [
      { requirement: 'Starting tier', cashback: '2% (cashback up to $5/mo)' },
      { requirement: '$500/mo spend, or VIP 1–2', cashback: '2% (up to $50/mo)' },
      { requirement: '$3,500/mo spend, or VIP 3', cashback: '4% (up to $150/mo)' },
      { requirement: '$9,500/mo spend, or VIP 4 / PRO 1', cashback: '6% (up to $250/mo)' },
      { requirement: '$12,500/mo spend, or VIP 5 / PRO 2', cashback: '8% (up to $400/mo)' },
      { requirement: '$25,000/mo spend, or Supreme VIP / PRO 3–5', cashback: '10% (up to $600/mo)' },
    ],
    notes: [
      'The cap is on the cashback amount. On the free Base tier you hit $5 after $250 of spend, and nothing more is paid that month.',
      'A tier reached through spend applies from the next day until the end of the following month.',
      'Payments funded from a fiat balance earn no points or cashback.',
      'FX and issuance fees could not be confirmed on the official pages.',
    ],
  },
  'bitget-wallet': {
    summary: 'A Visa card that spends USDT and USDC from Bitget Wallet. FX and conversion fees on the first $400 each month are refunded. Japan is among the officially supported regions.',
    entryFee: 'Free ($0.1 to activate within 72h of KYC approval, $10 after)',
    entryCashback: '2% (up to 3% after $200–400/mo of spend)',
    entryMax: 'No cap stated',
    payout: 'Your choice of BTC, gold, US stock tokens or USDC',
    fx: 'Effectively 0% up to $400/mo, 1.7% beyond',
    kyc: 'Required (ID + face check)',
    tiers: [
      { name: 'Standard', requirement: 'Free', cashback: '2%', extra: 'No fees on the first $400/mo' },
      { name: 'Boosted', requirement: 'New users, or $200–400+ of monthly spend', cashback: 'Up to 3%' },
    ],
    notes: [
      'Beyond the $400 monthly no-fee allowance, non-USD payments carry a 1.7% FX fee. For spending in yen, that allowance is effectively the cap.',
      'ATM: the higher of 1% or $5, plus 1.7% FX and more.',
      'Spending limits depend on card level, up to $3M a month at the top level.',
    ],
  },
  redotpay: {
    summary: 'A Hong Kong-based stablecoin payment card. The card itself pays no cashback; the paid RedotPay Pro membership adds rewards on Apple Pay and Google Pay.',
    entryFee: '$10 virtual, $100 physical',
    entryCashback: 'None',
    entryMax: '$0',
    payout: '—',
    fx: '1.2% outside the card currency',
    kyc: 'Required',
    tiers: [
      { name: 'Standard', requirement: '$10 virtual / $100 physical', cashback: 'None' },
      { name: 'Pro (monthly)', requirement: '$12.90/month', cashback: '3% on Apple Pay / Google Pay (up to $18/mo)', extra: 'Free virtual card' },
      { name: 'Pro (yearly)', requirement: '$129/year', cashback: '3% on Apple Pay / Google Pay (up to $18/mo)', extra: 'Free physical card, no ATM fees up to $1,000/mo' },
    ],
    notes: [
      'Pro rewards are credited as USDs, usable only inside RedotPay, and expire after 30 days.',
      'ATM: 2% (3% on USD-card withdrawals above $10K a month) plus the ATM operator\'s fee.',
    ],
  },
}
