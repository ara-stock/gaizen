---
title: "NEAR Protocol 入門 — Intents・NEAR Mobileとプライバシー機能の現実"
date: "2026-06-07"
updatedAt: "2026-06-10"
description: "NEARの成り立ちからNEAR Intents・NEAR Mobileまでを解説。プライバシー機能の期待と現実的な限界も包み隠さずまとめました。クリプト投資家向け。"
tags: ["NEAR", "NEAR Protocol", "NEAR Intents", "NEAR Mobile", "仮想通貨", "チェーン抽象化", "ZEC", "Zcash"]
category: "crypto"
published: false
featured: false
coverImage: ""
---

> **注意**: 本記事はNEAR Protocolの仕組みを教育・情報目的で解説するものです。特定のプロトコルへの参加・投資を推奨するものではありません。仮想通貨・DeFiへの参加には価格変動リスク・スマートコントラクトリスクが伴います。

---

## NEARって何をやっているのか

一言で言うと、「どのチェーンを使っているか気にしなくていい世界」を作ろうとしているプロジェクトだ。

プライバシー機能も持っているが、それはおまけに近い。この記事ではそこも正直に書く。

---

## NEARの成り立ち

NEARのルーツは2017年。**Illia Polosukhin**と**Alexander Skidanov**が立ち上げた「NEAR AI」というスタートアップから始まった。もともとはAIにコードを書かせる研究をしていた。

Polosukhinは元Google の機械学習エンジニアで、ChatGPTの根幹にあるTransformerアーキテクチャを提案した論文**「Attention Is All You Need」（2017年）**の共著者だ。今のAIブームを作った論文の著者が、このブロックチェーンを作っている。

**なぜブロックチェーンに？**

海外の開発者に報酬を送ろうとしたとき、PayPalやWiseが中国・ウクライナで使えないという壁にぶつかった。既存の仮想通貨は手数料が高すぎる。その不満からNEAR Protocolの開発が始まった（2018年）。

| 年 | 出来事 |
|---|---|
| 2017 | NEAR AI設立。「Attention Is All You Need」論文発表 |
| 2018 | NEAR Protocol開発開始 |
| 2020年4月 | メインネットローンチ |
| 2020年9月 | コミュニティ完全運営へ移行 |
| 2025年10月 | インフレ率を5%→2.5%に半減 |
| 2026年2月 | Confidential modeローンチ、NEARトークン17%急騰 |
| 2026年4月 | NEAR Intents累計取引量60億ドル超 |

---

## 技術の土台：Nightshadeシャーディング

NEARの処理能力を支えるのが**Nightshadeシャーディング**。ブロックチェーンの処理を複数の「シャード」に分けて並列で動かす仕組みで、単一チェーンのボトルネックを回避する。

2025年5月のアップグレードで**9シャード・ブロック生成600ms・ファイナリティ1.2秒**を達成。テストネットでは100万TPSが示されているが、メインネットの実績値は平均63TPS・バースト時4,000TPS超だ。

アカウント名が`ara.near`のように人間が読める形になっているのも特徴のひとつ。UXを「技術の問題」として解決しようとした設計思想が伝わる。

---

## NEAR Intents：NEARの本丸

### 「やりたいことを言うだけ」の仕組み

NEAR Intentsを一言で表すなら、**クロスチェーン取引を「注文」に変えた仕組み**だ。

従来のやり方：
- ブリッジを自分で選ぶ
- 各チェーンのガス代を別々に用意する
- ウォレットを複数操作する

NEAR Intentsの場合：
- 「USDCをSOLに換えたい」と宣言する（=Intent）
- **Solver**と呼ばれる第三者が競い合って実行してくれる
- 結果だけ受け取る

Solverは自分の資産を使って注文を処理するため、競合が生まれて条件が最適化される。ブリッジの選択もガス代の調達もSolverの仕事になる。

:::comment
実際にNEAR IntentsでUSDCをブリッジしてみた。手数料は通常のブリッジと変わらないし、使っていて「Intentsが動いている」と感じる場面はなかった。今の段階では既存ブリッジとの差を体感しにくいのが正直なところ。ただ、Solverが競合するという構造は長期的に手数料を下げる力になるはずで、そこには期待している。
:::

### 数字で見る成長

- 2026年4月：累計スワップ量**60億ドル超**（1月時点は$1B→3ヶ月で6倍）
- Brave Browserに統合 → 7,000万人がブラウザから直接アクセス可能
- 2026年2月：Intentsの手数料が全額NEAR買い付けに回る仕組みが始動
- 日次取引量が**$1億7,700万**を超えるとNEARが純デフレになる計算

---

## Confidential mode：プライバシーのON/OFF

### まず3つを整理する

NEARのプライバシー話題では3つの概念が混在しやすい。

| | 何をする | 対象 | いつまで |
|---|---|---|---|
| **NEAR Intents（通常）** | クロスチェーンスワップ | 何でも | — |
| **Confidential mode** | スワップ中の詳細を隠す | 何でも | 処理中だけ |
| **ZECシールドプール** | 残高・履歴ごと隠す | ZECのみ | ずっと |

Confidential modeはNEAR Intentsの中にある切り替えスイッチで、near.comで「Main Account」と「Confidential Account」を選ぶだけで使える。別のプロダクトではない。

### どう動くか

```
通常：[ユーザー] → [公開ネットワーク] → [誰でも見える]

Confidential mode：
[ユーザー] → [暗号化] → [TEEブリッジ] → [プライベートシャード] → [結果だけ公開]
```

処理を担うのは**7つのバリデーター**がTEE（改ざんできない専用の実行環境）内で運用するプライベートシャード。取引が有効かどうかは確認できるが、金額・ルート・相手先は誰にも見えない。

### 「処理中だけ」でも意味がある理由

取引を送信してからブロックに入るまでの間、通常は**mempool（待機列）で誰でも中身を見られる**。これを利用するのが：

- **フロントランニング**：大口スワップの予告を見たボットが先回りして価格を吊り上げる
- **サンドイッチ攻撃**：取引の前後にボットが挟み込み、差額を搾取する
- **MEV**：バリデーターが取引を都合のいい順番に並び替える

Confidential modeで暗号化されると、mempoolの段階から中身が見えないためこれらが成立しない。

### 競合と比べると

この機能はNEAR独自ではない。BNBチェーンの**ASTER DEX**はConfidential modeより先にShield Modeをリリースしており、同じような隠蔽機能を提供している。1inch FusionやUniswapXも同じ課題に取り組んでいる。プライバシーDEXの流れの中でNEARも追随した、というのが実態だ。

### MPCによる鍵の分散管理

Confidential modeを支える仕組みのひとつがMPC（マルチパーティコンピューテーション）だ。

通常のウォレット：秘密鍵は1箇所に保管 → 漏れたら終わり

NEARのMPC：秘密鍵を複数ノードに**断片に分けて分散保存**し、1つのノードだけでは復元できない。取引の署名には複数ノードの協力が必要になる。

:::comment
最初に聞いたとき「そこまでやるか」と思った。分散して保存するのは冗長化のイメージしかなかったから。でも本質は逆で、分散させることで「誰も秘密鍵の全体を知らない」状態が作れる。デジタルなウォレットは鍵を盗まれれば資産が消える。MPCはそこへの根本的な答えだとわかってから、見方が変わった。
:::

---

## NEAR Mobile：スマホで全部完結

**NEAR Mobile**はiOS・Android対応の公式ウォレット。秘密鍵を自分で管理する非カストディアル設計。

| 機能 | 内容 |
|------|------|
| **NEAR Staking** | アプリ内でステーキング、年利最大10% |
| **クロスチェーンスワップ** | NEAR Intents統合、BTC・ETH・SOL・XRP等に対応 |
| **マルチアカウント** | 1シードフレーズで複数アカウント管理 |
| **カスタムNEAR ID** | `名前.near`形式のアドレス |
| **NPRO トークン** | ステーキングでプレミアム機能が解放されるトークン |
| **友人サポート** | Discordチケット制の有人サポート |

:::comment
NEARをステーキングしようとして最初に出てきたのがNEAR Mobileだった。実際の使い方はこう。NEAR Intentsでスワップして手に入れたNEARをNEAR MobileのウォレットへSend → NPROノード（NEAR Mobile公式バリデーター）にステーク。将来はNEAR Intentsのページ上でもステーキングができるようになるらしく、そうなればスワップとステーキングが1画面で完結する。
:::

NEARのインフレ率は2025年10月に5%→2.5%に半減した。ステーキング報酬の原資はトークン発行なので、実効APYはバリデーターの手数料を引いた後の数字で確認する必要がある。

### NPROのティア制度

NPROトークンを一定量ロックするとステーク・スワップ手数料が下がる。使うのではなく「ロックするだけ」なので元本は戻ってくる。

| ティア | 必要NPRO | ステーク手数料 | スワップ手数料 |
|---|---|---|---|
| Basic | 0（デフォルト） | 5% | 0.875% |
| Ambassador | **75 NPRO（1ヶ月ロック）** | 2.5% | 0.656% |
| Premium | **250 NPRO（1ヶ月ロック）** | **0%** | 0.218% |

Premiumまで到達すればステーク手数料が完全無料になり、NPROノードから受け取れるNPRO報酬がそのまま最大化される。

### 使ってわかったガス代問題

:::comment
NPROノードにステークして気づいたことがある。NEARのステーキング報酬はどのバリデーターでも**自動複利**になっていて、「報酬だけ引き出す」ができない。アンステーク（2〜3日かかる）しないと手元にNEARが来ない。

クレームできるのはNPROだけなので、スワップのたびに必要なガス代（数円程度）を払えない状況が起きる。現実的な対策は、**1〜2NEARをステークせずウォレットに常備**しておくこと。

「NEARで報酬を受け取りたい」場合はリキッドステーキング（stNEAR）という選択肢もある。Meta Pool（metapool.app）でステークするとstNEARというLiquid Tokenがすぐに手に入り、アンボンディング待ちなしにNEAR IntentsでいつでもNEARに換えられる。ただしNPROは貯まらないので、NEAR Mobileのティア特典をどう評価するかで判断が分かれる。
:::

---

## ZECとNEARの接点、そしてリスク

### ZECのシールドプールとは

ZEC（Zcash）は置き場所によって性質が変わる。

| | 透明アドレス（t-address） | シールドアドレス（z-address） |
|---|---|---|
| 残高・取引 | 誰でも見える | 暗号化されて見えない |
| 技術 | Bitcoinと同じ公開台帳 | zk-SNARKs（ゼロ知識証明） |

「シールドプール」はシールドアドレスにあるZECの合計量のこと。2024年初頭には全供給の8%だったが、2026年5月には**30%超**に到達した。

### NEARはZECの入り口になった

ZECのシールドプールに資金を入れるには、従来はZECを別途用意して専用ウォレット（Zashiなど）で操作する必要があった。**ZODL**（Zcash Open Development Lab）がNEAR Intentsを組み込んだことで、USDCなど他チェーンのトークンからワンステップでシールドZECに変換できるようになった。

2026年3月末時点でNEAR Intents経由のZEC累計取引量は**15億ドル超**。

ただし構造上の注意点がある。**NEARはZODLを管理していない**。ZODLがNEAR Intentsを選んでいるだけで、他のクロスチェーンインフラに切り替えることも可能だ。

### 2026年6月に起きたこと

ZECをプライバシー目的で使うなら、見過ごせないニュースがあった。

**2026年6月5日、ZcashのOrchardシールドプールに4年間見つからなかったバグが発覚した。**

- 「無制限にZECを偽造発行できる」脆弱性
- 2022年のOrchardプール開始時から潜在していた
- ZEC価格が**31〜38%下落**
- Arthur Hayesら著名投資家が即座に売却
- 緊急ソフトフォーク→ハードフォーク（NU6.2）で修正済み

より深刻なのはここだ。シールドプールは「中が見えない」仕組みなので、**バグが実際に悪用されたかどうかを確認する手段がない**。修正はされたが「本当に悪用されなかったのか」は誰にも証明できない。

### ZEC関連のリスク一覧

| リスク | 内容 |
|--------|------|
| 価格変動 | 保有中ずっと負う。今回のバグで31〜38%下落 |
| プロトコルリスク | バグが何年も気づかれないことがある（今回は4年） |
| 検証不能 | 秘匿性ゆえに悪用の有無をオンチェーンで確認できない |
| 依存関係 | ZODLがNEAR Intentsを使い続ける保証はない |
| オンチェーン痕跡 | スワップの事実・ZECの出入りは記録に残る |

### それでもプライバシー需要はなくならない

- **AIによる金融監視への警戒**：「プライバシー＝犯罪者」という見方は薄れ、機関投資家でも金融データの保護を求める動きが増えている
- **大口の戦略を隠したい需要**：100億円規模のポジション移動を事前に読まれたくないのはシンプルなビジネスの要請だ
- **量子コンピュータリスク**：楕円曲線暗号への脅威意識が高まり、ゼロ知識証明ベースの仕組みへの注目が続いている

「完全な匿名性」ではなく「実用レベルの秘匿性」——これがZECもNEARも提供できるものの正確な表現だ。

---

## NEARをどう見るか

**本物の強み：**
- **NEAR Intents**：累計60億ドル超の取引量は本物。Solverが競合する仕組みは実際に動いている
- **トークノミクス**：インフレ半減＋Intents手数料の買い付け機構。取引量が増えるほどNEARトークンに価値が還元される設計
- **創業者の背景**：「Attention Is All You Need」の共著者がAI×ブロックチェーンで作ったチェーンという文脈は他にない

**過剰に語られていた部分：**
- **Confidential mode**：MEV・フロントランニング防止は本物だが、ASTER DEXも同じ機能を持つ。NEAR独自とは言えない
- **ZEC連携**：ZODLがNEAR Intentsを選んでいるだけで、NEARがその関係を管理しているわけではない。ZEC自体にも重大なバグが出た

:::comment
最初は「NEARはプライバシー基盤として面白い」という仮説で書き始めた。掘り下げるほど、プライバシーは補助機能で、核心はNEAR Intentsというクロスチェーンの配管だとわかってきた。

完全な秘匿という意味では、ZECのシールドプール連携もOrchardバグが示したようにまだ途上だし、Confidential modeはASTER DEXと同等の機能だ。オンチェーン上の情報を全部隠せる仕組みはまだない。

それでも期待しているのは、AIエージェントが複数チェーンをまたいで自律的に動く未来が来たとき、「やりたいことを指示するだけで動く」NEAR Intentsのような仕組みが必要になるからだ。今はZECユーザーとBraveの統合に支えられている部分が大きいが、そこへの賭けとしてNEAR Mobileでステーキングしながら様子を見ている。
:::

---

## NEARを試してみる

NEARのエコシステムを触ってみたい方はこちらからアカウントを作れます。

> **リファラル開示:** 以下は紹介リンクです。リンク経由の利用により、運営者に紹介特典が付与される場合があります。
>
> [NEAR アカウントを作成する](https://near.com/login?ref=dbj2hyym)

---

## 参考リファレンス

- [NEAR Protocol Overview in 2026: AI Infrastructure, Intents](https://changenow.io/blog/near-protocol-overview) — changenow.io
- [NEAR Intents - 公式ドキュメント](https://docs.near.org/chain-abstraction/intents/overview) — docs.near.org
- [Shade Agents - 公式ドキュメント](https://docs.near.org/ai/shade-agents/introduction) — docs.near.org
- [Confidential Intents on NEAR Protocol](https://www.kucoin.com/news/articles/enhancing-cross-chain-privacy-a-deep-dive-into-near-protocol-s-confidential-intents) — KuCoin
- [NEAR token jumps 17% after 'Confidential Intents' launch](https://www.coindesk.com/markets/2026/03/02/near-token-jumps-17-after-confidential-intents-launch-outpaces-privacy-tokens-sector) — CoinDesk
- [NEAR Intents Achieves $10B in Swap Volume](https://finance.yahoo.com/news/near-intents-achieves-10b-swap-183636390.html) — Yahoo Finance
- [Zcash plummets 38% as Shielded Labs reveals a major bug that went undetected for four years](https://www.coindesk.com/markets/2026/06/05/zcash-plummets-30-as-developer-reveals-a-major-bug-that-went-undetected-for-four-years) — CoinDesk
- [Security researcher finds Zcash vulnerability allowing 'unlimited' counterfeit minting](https://www.theblock.co/post/403698/zcash-vulnerability-zec-drops) — The Block
- [Zcash's Breakout and the Revival of On-Chain Privacy](https://coinmetrics.substack.com/p/state-of-the-network-issue-338) — Coin Metrics
- [NEAR Mobile公式サイト](https://nearmobile.app/) — nearmobile.app
- [Aster rolls out Shield Mode for private high-leverage trades](https://crypto.news/aster-launches-shield-mode-private-trading-2025/) — crypto.news
- [NEAR Protocol 2026: Investment Case, Tokenomics](https://svrn.net/news/near-protocol-report) — svrn.net
