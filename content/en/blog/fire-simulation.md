---
title: "FIRE Accumulation Simulation — Working Backwards from the 4% Rule at 7% Returns"
date: "2026-05-20"
updatedAt: "2026-06-11"
description: "Calculate the assets needed for FIRE using the 4% rule and 7% annual return. Simulations for ¥50K and ¥100K monthly saving, including realistic post-FIRE expenses like national pension and health insurance."
tags: ["FIRE", "index investing", "4% rule", "wealth building", "long-term investing"]
category: "us-stock"
published: true
featured: false
---

## What Is FIRE?

FIRE (Financial Independence, Retire Early) is a lifestyle concept built around **achieving financial independence early enough to retire on your own terms**. It originated in the US and spread widely through blogs and books in the 2010s.

But the core of FIRE isn't really about quitting work. **The real value is being in a position where you *could* quit at any time.** The freedom to turn down a bad job, to change your lifestyle, to have options — that's what FIRE is about.

---

## Types of FIRE

FIRE comes in several variations. Which type you aim for determines how much you need and how long it takes.

| Type | Overview |
|---|---|
| **Fat FIRE** | Full retirement while maintaining a comfortable lifestyle. Requires the most assets |
| **Lean FIRE** | Achieve FIRE by aggressively cutting expenses. Requires fewer assets but demands frugality |
| **Side FIRE (Barista FIRE)** | Assets aren't complete, but supplemented by part-time or enjoyable work |
| **Coast FIRE** | Accumulate enough early, then stop contributing and let compounding carry you to retirement |

---

## Why 7% Annual Return?

I use **7% annual return** as the baseline for accumulation simulations.

The S&P500's long-term nominal annual return is roughly 10%. Subtract inflation, and the inflation-adjusted real return has historically been around **7%**.

Future returns are not guaranteed, and 7% should not automatically be treated as conservative. This article uses it as one scenario informed by historical returns. A real plan should also test lower-return and different-inflation scenarios.

---

## The 4% Withdrawal Rule

The 4% rule states that **if you withdraw no more than 4% of your portfolio per year, your assets are unlikely to run out over 30+ years**. It comes from the Trinity Study (1998).

Working backwards:

> **Required assets = Annual expenses ÷ 0.04 = Annual expenses × 25**

| Monthly expenses | Annual expenses | Required assets (4% rule) |
|---|---|---|
| ¥150,000 | ¥1.8M | ~**¥45M** |
| ¥200,000 | ¥2.4M | ~**¥60M** |
| ¥250,000 | ¥3.0M | ~**¥75M** |
| ¥300,000 | ¥3.6M | ~**¥90M** |
| ¥400,000 | ¥4.8M | ~**¥120M** |

Required assets scale significantly with lifestyle. **Reducing expenses has a double effect: it lowers the target and increases the amount you can save simultaneously.**

---

## Accumulation Simulation ①

How many years does it take to reach your target at 7% annual return with a fixed monthly contribution?

### Pattern A: Lean FIRE (Living on ~¥170K/month)

- Target: **¥50M** (annual expenses ¥2M ÷ 4%)
- Monthly contribution: **¥50,000**

| Years | Principal | Portfolio value (7% p.a.) |
|---|---|---|
| 10 | ¥6.0M | ~¥8.65M |
| 20 | ¥12.0M | ~¥26.05M |
| **28** | **¥16.8M** | **~¥52M ✅** |
| 30 | ¥18.0M | ~¥61M |

At ¥50,000/month, you **cross ¥50M in about 28 years**.

### Pattern B: Standard FIRE (Living on ¥250K/month)

- Target: **¥75M** (annual expenses ¥3M ÷ 4%)
- Monthly contribution: **¥100,000**

| Years | Principal | Portfolio value (7% p.a.) |
|---|---|---|
| 10 | ¥12.0M | ~¥17.31M |
| 20 | ¥24.0M | ~¥52.09M |
| **24** | **¥28.8M** | **~¥74.4M ✅** |
| 30 | ¥36.0M | ~¥122M |

At ¥100,000/month, you **reach ¥75M in about 24 years**.

**Notice the ratio of principal to gains.** In Pattern B at year 30, ¥36M in principal becomes ¥122M total — over ¥86M in investment returns alone. Compounding accelerates in the back half. The earlier you start, the more dramatic this effect.

> The [FIRE simulator tool](/tools/fire) on this site lets you adjust monthly contribution, annual return, and target to run your own calculations.

---

## Post-FIRE Expenses Often Overlooked

When planning for FIRE, some expenses get overlooked — costs that your employer was covering that become your full responsibility after retiring.

### National Pension (Kokumin Nenkin)

After FIRE, you leave your company's employee pension (kosei nenkin) and **must enroll in the national pension (kokumin nenkin)**. The FY2026 monthly premium is **¥17,920 (about ¥215,000/year)**.

At 65, you'll start receiving benefits. **The full basic pension is ¥70,608/month (about ¥850,000/year)** (FY2026). Working backwards via the 4% rule, that's equivalent to about **¥21M in portfolio assets**.

### National Health Insurance (Kokumin Kenko Hoken)

Leaving company health insurance means **enrolling in national health insurance (kokumin kenko hoken)**. Premiums are calculated based on prior-year income by your municipality. Even with reduced income post-FIRE, expect **¥200,000–400,000/year**.

### Combined Post-FIRE Overhead

| Item | Annual estimate |
|---|---|
| National pension premium | ~¥215,000 |
| National health insurance | ~¥200,000–400,000 |
| **Total** | **~¥415,000–615,000** |

That's roughly **¥35,000–50,000/month** in additional overhead. This must be factored into your expense baseline.

---

## Accumulation Simulation ② (With Post-FIRE Overhead and Pension)

### Assumptions

- Living expenses: ¥250,000/month (¥3.0M/year)
- Post-FIRE overhead (health insurance + pension): ~¥500,000/year
- **Total annual spending: ¥3.5M**
- Required assets (4% rule): **¥87.5M**

From age 65, receiving pension (~¥850,000/year):

- Effective spending: ¥3.5M − ¥850K = **¥2.65M/year**
- Required assets at 4% rule: **¥66.25M**

The pension effectively replaces about **¥21M in portfolio assets** once it kicks in.

### Pattern B' (Including Post-FIRE Overhead)

- Target: **¥87.5M**
- Monthly contribution: ¥100,000

| Years | Principal | Portfolio value (7% p.a.) |
|---|---|---|
| 20 | ¥24.0M | ~¥52.09M |
| **26** | **¥31.2M** | **~¥88.1M ✅** |
| 30 | ¥36.0M | ~¥122M |

Adding post-FIRE overhead pushes the timeline from 24 years to about **26 years** — a two-year difference.

> **Pension income after 65 can be an important source of support.** However, the starting age and benefit amount depend on contribution history and future policy changes. Check your own projected benefit and include a margin of safety in the plan.

---

## Getting More Precise

### Make Your Expenses Visible

The accuracy of a FIRE simulation depends directly on **how accurately you know your spending**. Vague estimates like "about ¥250K a month" introduce significant error into your target calculation.

One to two months with a household budgeting app often reveals surprising amounts locked in unused fixed costs. Understanding your actual monthly spending is the first step toward FIRE.

### Cancel Unused Fixed Costs Now

Cutting ¥10,000/month in expenses reduces your FIRE target by **¥2.5M** (via the 4% rule inverse). Expense reduction is not frugality — it's target compression.

Commonly overlooked costs:

- Subscriptions barely used (streaming, music, news)
- Gym memberships you're not going to
- Insurance policies or services you've forgotten about

Services designed to be hard to cancel are the ones most likely to stay on your bill. One audit this month could shave years off your FIRE timeline.

---

:::comment
My own target: ¥120K/month in expenses (¥100K living costs + ¥20K for national pension and health insurance), which comes to ¥1.44M/year × 25 = ¥36M as a baseline. With an inflation buffer, I'm targeting around ¥33–36M in practice.

The key lesson I had to internalize: once you leave salaried employment, social insurance costs hit in full. National pension alone is roughly ¥17,500/month. Factor this in before your target looks "done." I'm also aiming for side-FIRE — a gradual pivot from full-time employment to freelance/side work — so even modest income post-FIRE meaningfully reduces the required portfolio.
:::

## Summary

- **Required assets = Annual expenses × 25 (4% rule)**
- **At 7% return: ¥50K/month reaches ~¥50M in 28 years; ¥100K/month reaches ~¥75M in 24 years**
- **Post-FIRE national pension and health insurance add ~¥415K–615K/year — always include this**
- **Pension from age 65 (~¥850K/year) is equivalent to ~¥21M in assets — a powerful safety net**
- **Cutting ¥10K/month in expenses reduces your required FIRE portfolio by ¥2.5M**

---

## References

- [William Bengen (1994) "Determining Withdrawal Rates Using Historical Data" — Journal of Financial Planning](https://www.financialplanningassociation.org/article/journal/OCT94-determining-withdrawal-rates-using-historical-data)
- [Cooley, Hubbard, Walz (1998) "Retirement Savings: Choosing a Withdrawal Rate That Is Sustainable" (Trinity Study)](https://www.aaii.com/files/pdf/6794_retirement-savings-choosing-a-withdrawal-rate-that-is-sustainable.pdf)
- [Japan Pension Service — National Pension Premium (2025)](https://www.nenkin.go.jp/service/kokunen/hokenryo/20150313.html)
- [Ministry of Health, Labour and Welfare — National Health Insurance Overview](https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryouhoken/database/index.html)

---

*This article is for informational purposes only and does not constitute investment advice. Please make investment decisions at your own discretion.*
