---
title: "NEAR Protocol Deep Dive — Intents, NEAR Mobile, and the Reality of Privacy Features"
date: "2026-06-07"
updatedAt: "2026-06-10"
description: "From NEAR's founding story to NEAR Intents and NEAR Mobile — including an honest look at what the privacy features actually do, their limits, and the ZEC vulnerability that hit in June 2026."
tags: ["NEAR", "NEAR Protocol", "NEAR Intents", "NEAR Mobile", "crypto", "Chain Abstraction", "ZEC", "Zcash"]
category: "crypto"
published: true
featured: false
coverImage: ""
---

> **Disclaimer**: This article is for educational and informational purposes only. It does not constitute investment advice or a solicitation to use any protocol. Cryptocurrency and DeFi participation involves significant risks including price volatility and smart contract vulnerabilities.

---

## What NEAR Actually Is

In 2026, NEAR's core identity is **chain abstraction infrastructure** — building the layer that lets users transact across blockchains without thinking about which chain they're on.

Privacy features exist, but they're a supplementary angle, not the main thesis. This article tries to be honest about that distinction.

---

## The Origins of NEAR

NEAR traces its roots to 2017, when **Illia Polosukhin** and **Alexander Skidanov** founded a startup called NEAR AI — initially focused on teaching machines to code.

Polosukhin is a former Google machine learning researcher and co-author of **"Attention Is All You Need" (2017)** — the paper that introduced the Transformer architecture underlying today's LLMs. One of the architects of modern AI built this blockchain. That's not incidental — NEAR has always positioned itself at the intersection of AI and crypto.

**So why did they end up building a blockchain?**

When paying contributors across borders, they ran into the reality that PayPal and Wise didn't work reliably in countries like China and Ukraine. Existing crypto was too expensive. That frustration with broken global payments became the catalyst for NEAR Protocol, developed from 2018.

**Timeline:**

| Year | Event |
|------|-------|
| 2017 | NEAR AI founded; "Attention Is All You Need" published |
| 2018 | NEAR Protocol development begins |
| April 2020 | Mainnet launch |
| September 2020 | Fully community-operated |
| October 2025 | Inflation halved from 5% → 2.5% via on-chain governance (House of Stake) |
| February 2026 | Confidential mode launched; NEAR token +17% on the day |
| April 2026 | NEAR Intents cumulative volume exceeds $6B |

---

## The Technical Foundation: Nightshade Sharding

NEAR's core technology is **Nightshade sharding** — distributing blockchain processing across multiple parallel shards to bypass the throughput limits of a single chain.

The May 2025 upgrade achieved **9 shards, 600ms block times, and 1.2-second finality**. Testnet benchmarks show 1 million TPS, though mainnet averages around 63 TPS with burst capacity exceeding 4,000 TPS.

NEAR also built in **account abstraction** and **human-readable account names** (e.g., `ara.near`) from the start — treating UX as a technical problem to be solved at the protocol level.

---

## NEAR Intents: The Core of What NEAR Does

### The Simple Explanation

NEAR Intents is a **chain abstraction layer**. The shift looks like this:

**Traditional cross-chain swap:**
- Choose a bridge manually
- Prepare gas on each chain
- Operate multiple wallets
- Execute every step yourself

**With NEAR Intents:**
- Declare your desired outcome: "I want to swap USDC for SOL"
- **Solvers** — third-party competitors — race to fill your order at the best rate
- You receive the result

Solvers stake their own capital to compete, creating market pressure for optimal execution. Bridge selection and cross-chain gas management are the solver's problem, not yours.

:::comment
I tried NEAR Intents firsthand — swapping USDC cross-chain. The fee was roughly on par with a regular bridge, and the overall feel was essentially identical. I was barely aware that Intents was running underneath. From a pure UX standpoint, there's no obvious differentiation from existing bridges today. But the structural logic — solvers competing for your order — should create downward pressure on fees over time. That's where the long-term thesis lives.
:::

### Adoption and Tokenomics

- **$6B+ cumulative volume** by April 2026 — growing from $1B in January 2026
- Integrated into Brave Browser, giving 70+ million users native access
- Since February 2026, **100% of Intents fee revenue** flows into open-market NEAR purchases
- A "deflationary threshold" exists at approximately **$177M daily Intents volume** — above this, NEAR becomes net deflationary

---

## Confidential Mode: NEAR Intents' Privacy Toggle

### Three Concepts That Get Confused

Privacy-related discussion around NEAR frequently conflates three distinct things:

| | What it does | Assets | Duration |
|---|---|---|---|
| **NEAR Intents (standard)** | Cross-chain swaps | Anything | — |
| **Confidential mode** | Hides swap details during processing | Anything | During processing only |
| **ZEC Shielded Pool** | Hides balance and full history | ZEC only | Indefinitely |

Confidential mode is a feature within NEAR Intents — think of it as a **privacy toggle**. Users switch between "Main Account" and "Confidential Account" in the near.com interface. It's not a separate product.

### How It Works

Confidential mode runs on NEAR's **Private Shard** — a restricted visibility execution environment.

```
Standard NEAR Intents:
[User] → [Public network] → [Results visible on-chain to anyone]

Confidential mode:
[User] → [Encrypted locally] → [TEE bridge] → [Private shard] → [Only result published]
```

The private shard is operated by **7 permissioned validators** within TEEs (Trusted Execution Environments). Validators can verify mathematical validity, but cannot see amounts, routing, or counterparty information.

### Why Hiding Details "Only During Processing" Still Matters

The final result is published on-chain after settlement. But hiding details *during* processing has real value.

On a public blockchain, submitted transactions sit in the **mempool** — publicly visible — until they're included in a block. That window is actively exploited:

- **Front-running**: A bot sees your large USDC→ETH swap coming, executes first, pushes the price up, and you settle at the inflated price
- **Sandwich attacks**: Bots insert transactions before and after yours to extract the spread
- **MEV**: Validators reorder pending transactions to profit at users' expense

With Confidential mode, the mempool sees an opaque payload — no amounts, no routing. By the time results are published, the intervention window is closed.

### Honest Comparison with Competitors

The MEV and front-running protection Confidential mode provides is **not unique to NEAR**.

BNB Chain's **ASTER DEX** launched Shield Mode before Confidential mode, offering equivalent functionality to hide orders from public books. 1inch Fusion and UniswapX address the same problems with solver-like architectures.

Confidential mode is NEAR's implementation of a category-level feature, not a moat.

### MPC: Why Distributed Key Management Isn't Overkill

Underpinning all of this is **MPC (Multi-Party Computation)** for distributed key management.

Standard wallet: private key stored in one place → if compromised, assets are gone.

NEAR's MPC approach: private key split into **shares distributed across multiple nodes**. No single node can reconstruct the key alone. Transaction signing requires coordinated participation.

:::comment
When I first heard about this, my reaction was essentially: "isn't that overkill?" The mental model of "distributed storage" read like simple redundancy. But the logic runs the other direction — distributing the key shares means **no single party ever possesses the complete key**. For a digital wallet where losing the key means losing everything, MPC addresses the root vulnerability rather than papering over it. Once that clicked, the architecture made much more sense.
:::

---

## NEAR Mobile: Non-Custodial Access to the NEAR Ecosystem

**NEAR Mobile** is the official iOS and Android wallet — fully non-custodial.

### Core Features

| Feature | Details |
|---------|---------|
| **NEAR Staking** | Stake directly from the app, up to 10% APY |
| **Cross-Chain Swaps** | NEAR Intents integration; BTC, ETH, SOL, XRP, and more |
| **Multi-Account** | Multiple accounts under a single seed phrase |
| **Custom NEAR ID** | Human-readable `name.near` addresses |
| **NPRO Token** | Native utility token; stake to unlock premium features |
| **Friend Support** | Discord-based ticketing with human agents |

:::comment
My actual workflow: swap into NEAR via NEAR Intents → send to NEAR Mobile wallet → stake on the NPRO node (NEAR Mobile's official validator). NEAR's roadmap includes staking directly from the NEAR Intents interface, which would mean swaps and staking in a single screen — a meaningful UX improvement when it lands.
:::

A note on staking economics: NEAR's inflation was halved from 5% to 2.5% annually in October 2025. Staking rewards are funded by new token issuance, so effective APY depends on the validator's fee after deduction. Verify the net yield before staking.

### NPRO Tier System: Reducing Staking Fees Over Time

NEAR Mobile has a tier system where locking NPRO tokens unlocks progressively lower fees. Tokens are locked, not spent — you get them back after the lock period.

| Tier | NPRO Required | Staking Fee | Swap Fee |
|------|--------------|------------|---------|
| Basic | 0 (default) | 5% | 0.875% |
| Ambassador | **75 NPRO (locked ≥ 1 month)** | 2.5% | 0.656% |
| Premium | **250 NPRO (locked ≥ 1 month)** | **0%** | 0.218% |

At Premium tier, staking is completely fee-free, maximizing the NPRO rewards you receive from the NPRO node.

### A Practical Problem: Gas Fees

:::comment
One thing I discovered staking on the NPRO node: NEAR staking rewards auto-compound on every validator — there's no way to claim just the rewards without unstaking (which takes 2–3 days). The only thing you can claim directly is NPRO.

This creates a real friction point: every swap needs a small amount of liquid NEAR for gas fees. If your NEAR is all staked, you're stuck. The practical fix is to keep 1–2 NEAR unstaked in the wallet as a permanent gas reserve.

For those who want liquid NEAR from staking rewards without the unbonding wait, liquid staking via Meta Pool (metapool.app) is an option — staking NEAR there gives you stNEAR, which can be swapped back to NEAR anytime via NEAR Intents. The tradeoff: no NPRO accumulates, so NEAR Mobile tier benefits don't apply. Whether that tradeoff makes sense depends on how much you value the tier discounts.
:::

## ZEC, NEAR, and the Realistic Risk Picture

### What the ZEC Shielded Pool Actually Is

ZEC (Zcash) is one token, but where you hold it determines its privacy properties:

| | Transparent address (t-address) | Shielded address (z-address) |
|---|---|---|
| Balance & transactions | Publicly visible | Encrypted, invisible |
| Technology | Standard public ledger | zk-SNARKs (zero-knowledge proofs) |

The "shielded pool" refers to the total ZEC sitting in shielded addresses. It grew from 8% of total supply in early 2024 to **30%+ (4.9M+ ZEC)** by May 2026.

### NEAR's Role

Moving funds into ZEC's shielded pool traditionally required using a dedicated wallet (like Zashi) and having ZEC already. **ZODL** (Zcash Open Development Lab) built a Zcash-focused mobile wallet that integrates NEAR Intents — allowing users to convert any token from any chain directly into shielded ZEC in a single step.

Cumulative ZEC volume through NEAR Intents reached **$1.5B by March 2026**.

An important structural note: **NEAR doesn't control ZODL**. ZODL chose to use NEAR Intents, and could theoretically switch to 1inch or another cross-chain provider. NEAR's position in this relationship is infrastructure provider, not platform owner.

### The Critical ZEC Vulnerability — June 2026

Anyone considering using ZEC for privacy purposes needs to know what happened on June 5, 2026.

**A four-year-old bug in Zcash's Orchard shielded pool was publicly disclosed.**

- A security researcher found a vulnerability allowing "unlimited" counterfeit ZEC minting within the Orchard pool (the latest shielded pool implementation)
- The bug had been present since Orchard's activation in 2022
- ZEC price dropped **31–38%** on the day of disclosure
- Arthur Hayes and other prominent investors sold their ZEC holdings immediately
- An emergency soft fork, followed by a hard fork (NU6.2), resolved the issue

There is a deeper problem here. The very feature that makes the shielded pool private — no one can see inside — **makes it impossible to verify whether the bug was actually exploited**. If counterfeit ZEC was minted, there's no on-chain way to confirm or deny it. The fix is deployed, but the question of "was it exploited before disclosure?" has no definitive answer.

### Honest Risk Table for ZEC-Based Privacy

| Risk | Details |
|------|---------|
| Price volatility | Borne the entire time ZEC is held; 31–38% drop on the bug disclosure |
| Protocol risk | Bugs can hide in shielded pool circuits for years (this one did for 4) |
| Verification impossibility | Privacy prevents auditing whether exploits occurred |
| Dependency risk | ZODL could switch away from NEAR Intents; NEAR doesn't control the relationship |
| On-chain trace | The fact that a swap occurred and ZEC entered/exited the pool is always recorded |

### Why Privacy Demand Persists Anyway

The structural forces driving privacy interest haven't changed:

- **AI-era financial surveillance**: Growing concern about AI-enabled monitoring is shifting the "privacy = criminality" narrative. Grayscale published institutional research framing ZEC as "financial privacy for the AI era."
- **Large traders and institutions**: Hiding a $100M position move from competitors and analysts is a legitimate business need, not a fringe use case.
- **Quantum computing awareness**: Concern about elliptic-curve cryptography's vulnerability to quantum computers continues to drive interest in zero-knowledge proof-based systems.

"Practical obscurity" rather than "perfect anonymity" is the honest framing — and for many legitimate use cases, it's enough.

---

## A Realistic Assessment of NEAR

Pulling together everything discussed:

**NEAR's genuine strengths:**
- **NEAR Intents**: Real chain abstraction infrastructure with $6B+ in proven volume. The solver-competition model is working.
- **Tokenomics**: Inflation halved + fee buyback mechanism. As Intents volume grows, token economics improve structurally.
- **Founder credibility**: A co-author of the transformer paper building an AI x blockchain protocol is a unique starting point.

**What was overstated:**
- **Confidential mode**: Real MEV/front-running protection, but ASTER DEX and UniswapX offer equivalent functionality. Not a NEAR-specific advantage.
- **ZEC connection**: ZODL using NEAR Intents is real, but NEAR doesn't own that relationship. And ZEC itself just took a serious credibility hit.

:::comment
I started writing this expecting to frame NEAR as interesting "privacy infrastructure." The deeper I dug, the more it became clear that privacy is a supplementary feature, not the core thesis. The real case for NEAR is NEAR Intents as chain abstraction infrastructure — and the tokenomics that tie Intents volume to NEAR token value.

True end-to-end privacy — where everything on-chain is hidden — is still a long way off. Confidential mode only hides details during processing, and ASTER DEX already does the same. The ZEC shielded pool integration, the closest thing to "full" privacy, just took a serious hit from the Orchard bug. The gap between "some privacy" and "complete privacy" is still wide.

That said, my expectation is that AI agents operating autonomously across chains will need exactly the kind of declarative execution infrastructure NEAR Intents provides. The current volume is mostly carried by ZEC users and Brave's passive integration — but I'm watching whether the AI agent use case materializes. In the meantime, I'm staking via NEAR Mobile and keeping my position sized accordingly.
:::

---

## Try NEAR

If you want to explore the NEAR ecosystem, you can create an account here:

> **Referral disclosure:** The following is a referral link. The site operator may receive a benefit if you use it.
>
> [Create a NEAR Account](https://near.com/login?ref=dbj2hyym)

---

## References

- [NEAR Protocol Overview in 2026: AI Infrastructure, Intents](https://changenow.io/blog/near-protocol-overview) — changenow.io
- [NEAR Intents - Official Documentation](https://docs.near.org/chain-abstraction/intents/overview) — docs.near.org
- [Shade Agents - Official Documentation](https://docs.near.org/ai/shade-agents/introduction) — docs.near.org
- [Confidential Intents on NEAR Protocol](https://www.kucoin.com/news/articles/enhancing-cross-chain-privacy-a-deep-dive-into-near-protocol-s-confidential-intents) — KuCoin
- [NEAR token jumps 17% after 'Confidential Intents' launch](https://www.coindesk.com/markets/2026/03/02/near-token-jumps-17-after-confidential-intents-launch-outpaces-privacy-tokens-sector) — CoinDesk
- [NEAR Intents Achieves $10B in Swap Volume](https://finance.yahoo.com/news/near-intents-achieves-10b-swap-183636390.html) — Yahoo Finance
- [Zcash plummets 38% as Shielded Labs reveals a major bug that went undetected for four years](https://www.coindesk.com/markets/2026/06/05/zcash-plummets-30-as-developer-reveals-a-major-bug-that-went-undetected-for-four-years) — CoinDesk
- [Security researcher finds Zcash vulnerability allowing 'unlimited' counterfeit minting](https://www.theblock.co/post/403698/zcash-vulnerability-zec-drops) — The Block
- [Zcash's Breakout and the Revival of On-Chain Privacy](https://coinmetrics.substack.com/p/state-of-the-network-issue-338) — Coin Metrics
- [NEAR Mobile Official Site](https://nearmobile.app/) — nearmobile.app
- [Aster rolls out Shield Mode for private high-leverage trades](https://crypto.news/aster-launches-shield-mode-private-trading-2025/) — crypto.news
- [NEAR Protocol 2026: Investment Case, Tokenomics](https://svrn.net/news/near-protocol-report) — svrn.net
