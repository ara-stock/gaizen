---
title: "NEAR Protocol 入門 — Intents・NEAR Mobileとプライバシー機能の現実"
date: "2026-06-07"
updatedAt: "2026-06-07"
description: "NEARの成り立ちからNEAR Intents・NEAR Mobileまでを解説。プライバシー機能の期待と現実的な限界も包み隠さずまとめました。クリプト投資家向け。"
tags: ["NEAR", "NEAR Protocol", "NEAR Intents", "NEAR Mobile", "仮想通貨", "チェーン抽象化", "ZEC", "Zcash"]
category: "crypto"
published: true
featured: false
coverImage: ""
---

> **注意**: 本記事はNEAR Protocolの仕組みを教育・情報目的で解説するものです。特定のプロトコルへの参加・投資を推奨・勧誘するものではありません。仮想通貨・DeFiへの参加には価格変動リスク・スマートコントラクトリスクなどの重大なリスクが伴います。

---

## NEARとは何か

2026年現在、NEARの本質は**「チェーン抽象化インフラ」**だ。ユーザーがどのチェーンで何を使っているかを意識せずに取引できる仕組みを作ろうとしている。

プライバシー機能も持つが、それは主軸ではなく補助線だ——この記事ではその区別を正直に書く。

---

## NEARの成り立ち

NEARは2017年、**Illia Polosukhin**と**Alexander Skidanov**が立ち上げた「NEAR AI」というスタートアップにルーツを持つ。当初の目的はAIにコードを書かせる研究だった。

Polosukhinは元Googleの機械学習研究者で、現代のLLMの根幹となるTransformerアーキテクチャを提案した論文**「Attention Is All You Need」（2017年）**の共著者でもある——ChatGPTを動かす技術の生みの親の一人がこのブロックチェーンを作ったという事実は、NEARがAIとブロックチェーンの融合を最初から視野に入れていたことを示唆している。

**なぜブロックチェーンを作ることになったのか？**

コントリビューターへのクロスボーダー送金に直面したとき、PayPalやWiseが中国・ウクライナなどで機能しないという現実にぶつかった。既存の仮想通貨は手数料が高すぎる。この「壊れたグローバル決済」への不満が、NEAR Protocolの開発（2018年）へとつながった。

**タイムライン：**

| 年 | 出来事 |
|---|---|
| 2017 | NEAR AI設立。「Attention Is All You Need」論文発表 |
| 2018 | NEAR Protocol開発開始 |
| 2020年4月 | メインネットローンチ |
| 2020年9月 | コミュニティ完全運営へ移行 |
| 2025年10月 | インフレ率を5%→2.5%に半減（House of Stakeによるオンチェーンガバナンス開始） |
| 2026年2月 | Confidential modeローンチ、NEARトークン17%急騰 |
| 2026年4月 | NEAR Intents累計取引量60億ドル超 |

---

## NEARの技術基盤：Nightshadeシャーディング

NEARの根幹技術は**Nightshadeシャーディング**だ。ブロックチェーンの処理を複数の「シャード（断片）」に並列分散させることで、単一チェーンの限界を突破する設計。

2025年5月のアップグレードでは**9シャード・ブロック生成600ms・ファイナリティ1.2秒**を達成。テストネットでは100万TPSのベンチマークが示されているが、メインネットの実測値は平均63TPS・バースト時4,000TPS超という水準だ。

また、NEARは当初から**アカウント抽象化**と**人間が読めるアカウント名**（例：`ara.near`）を実装しており、ユーザー体験の改善を技術的に解決しようとしていた点も特徴的だ。

---

## NEAR Intents：NEARの本丸

### 仕組みをシンプルに理解する

NEAR Intentsは**チェーン抽象化（Chain Abstraction）**レイヤーだ。

従来のクロスチェーン取引：
- どのブリッジを使うか選ぶ
- ガス代を各チェーンで用意する
- 複数のウォレットを操作する
- 手動で各ステップを実行する

**NEAR Intentsの場合：**
- ユーザーは「USDCをSOLに換えたい」とだけ宣言する（=Intent）
- **Solverと呼ばれる第三者**が競合し、最良のレートと手数料で実行する
- ユーザーは結果だけ受け取る

Solverたちは自分の資産をリスクにさらして最良の実行を競うため、理論上はユーザーに最適な条件が提示される。ブリッジの選択や各チェーンのガス代調達はSolverが担う。

:::comment
実際にNEAR IntentsでUSDCをブリッジしてみた。手数料は通常のブリッジと同程度で、「手触り感」はほぼ変わらない。正直、裏でIntentsが動いていることを意識することはなかった。ユーザー体験として見ると、今のところ既存ブリッジとの差別化は感じにくいが、Solverが競合するという構造は長期的に手数料を下げる圧力になるはずで、そこに期待している。
:::

### 成長速度と統合状況

- 2026年4月：累計スワップ量**60億ドル超**（2026年1月時点で$1Bだったことを踏まえると急成長）
- Brave Browserに統合→7,000万人以上のユーザーがブラウザからアクセス可能に
- 2026年2月：Intentsの手数料収入100%がNEAR買い付けに充当される仕組みが稼働開始
- 「デフレ閾値」：日次Intents取引量が**1億7,700万ドル**を超えると、NEARは純デフレになる計算

---

## Confidential mode：NEAR IntentsのプライバシーON/OFF

### 3つの概念を混同しない

NEARのプライバシー関連の話題では、3つの異なる概念が混在しがちだ。

| | 何をするか | 対象 | 継続期間 |
|---|---|---|---|
| **NEAR Intents（通常）** | クロスチェーンスワップ | 何でも | — |
| **Confidential mode** | スワップ処理中の詳細を隠す | 何でも | 処理中のみ |
| **ZECシールドプール** | 残高・取引履歴ごと隠す | ZECのみ | ずっと |

Confidential modeはNEAR Intentsの機能のひとつで、**プライバシーのON/OFFスイッチ**だと思えばよい。near.comのUIで「Main Account」と「Confidential Account」を切り替えるだけで有効になる。別プロダクトではない。

### 仕組み

Confidential modeはNEARの**Private Shard（プライベートシャード）**上で動作する。

```
通常のNEAR Intents：
[ユーザー] → [公開ネットワーク] → [実行結果が誰でも見える]

Confidential mode：
[ユーザー] → [ローカルで暗号化] → [TEEブリッジ] → [プライベートシャード] → [結果のみ公開]
```

プライベートシャードは**7つのパーミッションドバリデーター**がTEE（信頼実行環境）内で運用。バリデーターは取引の数学的有効性を検証できるが、資産額・ルート・相手先は見えない。

### 「処理中だけ」でも隠す意味

Confidential modeは取引の最終結果は公開される。それでも「処理中に見えない」ことには実益がある。

公開チェーンでは取引を送信した瞬間、ブロックに取り込まれるまでの間**mempool（待機列）に誰でも見えるかたちで晒される**。この隙を悪用するのが：

- **フロントランニング**：大量スワップの予告が見えたボットが先回りして価格を吊り上げる
- **サンドイッチ攻撃**：取引の前後にボットが挟み込み、差額を搾取する
- **MEV**：バリデーターが取引内容を見て自分に有利な順序に並び替える

Confidential modeで暗号化されると、mempoolの段階から中身が見えないためこれらが成立しない。

### 競合との正直な比較

Confidential modeが提供するMEV・フロントランニング防止は**NEAR固有の機能ではない**。

BNBチェーンの**ASTER DEX**はConfidential modeより先行してShield Modeをローンチしており、オーダーブックから取引を隠す同様の機能を提供している。1inch FusionやUniswapXも同じ課題をIntentsに近い設計で解決しようとしている。

プライバシーDEXの流れの中でNEARも同様の機能を実装した、というのが正確な位置づけだ。

### MPCによる分散鍵管理

上記の仕組みを支える基盤がMPC（マルチパーティコンピューテーション）による分散鍵管理だ。

通常のウォレット：秘密鍵は1箇所に保管 → 漏洩したら終わり

NEARのMPC方式：秘密鍵を複数のノードに**断片として分散保持**し、単独のノードでは鍵を復元できない。取引署名には複数ノードの協調が必要になる。

:::comment
最初にこの仕組みを知ったとき、「そこまでやるか」と思った。分散して保存するのはストレージの冗長化という印象だったからだ。でも本質は逆で、分散させることで**「誰一人として秘密鍵を知り得ない」**状態を作り出している。ウォレットがデジタルである以上、鍵が盗まれれば資産は消える。MPC方式はその根本的な脆弱性に対する答えだと理解してから、見方が変わった。
:::

---

## NEAR Mobile：スマホ完結のNEARエコシステム

**NEAR Mobile**はiOS・Android対応の公式ウォレットアプリ。非カストディアル（ユーザーが鍵を保持）設計。

### 主な機能

| 機能 | 内容 |
|------|------|
| **NEAR Staking** | アプリ内で直接ステーキング、年利最大10% |
| **クロスチェーンスワップ** | NEAR Intents統合、BTC・ETH・SOL・XRPなど主要チェーンへ対応 |
| **マルチアカウント** | 1つのシードフレーズで複数アカウント管理 |
| **カスタムNEAR ID** | `名前.near`形式の人間が読めるアドレス |
| **NPRO トークン** | ネイティブユーティリティトークン、ステーキングでプレミアム機能解放 |
| **友人サポート** | Discord チケット制の有人サポート |

:::comment
NEAR Mobileは、NEARをステーキングしようとしたときに候補に挙がったアプリだ。実際の使い方はこうなっている。NEAR Intentsでスワップして手に入れたNEARをNEAR MobileのウォレットへSend→NPROノード（NEAR Mobile公式バリデーター）にステーク。今後はNEAR Intentsのページ上でもステーキングができるようになる予定らしく、そうなればスワップとステーキングが一画面で完結する。
:::

NEARのインフレ率は2025年10月の半減イベントで5%→2.5%に圧縮された。ステーキング報酬の原資がインフレによるトークン発行である以上、報酬率はインフレ率に依存する。10%という数値はバリデーターによって異なり、手数料控除後の実効APYは確認が必要だ。

### NPROのティア制度：ステーク手数料を下げる仕組み

NEAR Mobile独自の仕組みとして、NPROトークンを一定量ロックすることでステーキング・スワップ手数料が下がるティア制度がある。

| ティア | 必要NPRO | ステーク手数料 | スワップ手数料 |
|---|---|---|---|
| Basic | 0（デフォルト） | 5% | 0.875% |
| Ambassador | **75 NPRO（1ヶ月ロック）** | 2.5% | 0.656% |
| Premium | **250 NPRO（1ヶ月ロック）** | **0%** | 0.218% |

NPROは「使う」のではなく「ロックする」だけなので元本は戻ってくる。Premiumまで到達するとステーキング手数料が完全無料になり、NEAR報酬とNPRO報酬の両取りになる。

### 実際に使って気づいたガス代の問題

:::comment
NPROノードにステーキングして気づいた落とし穴がある。NEAR Mobileのステーキング報酬はどのバリデーターでも**自動複利**で積み上がる仕組みで、「報酬だけ引き出す」ことができない。アンステーク（2〜3日のアンボンディング期間あり）しないとNEARが手元に来ない。

クレームできるのはNPROだけなので、スワップのたびに必要なNEARのガス代（数円〜数十円）が払えない状況が起きうる。実用上は**1〜2NEARをステークせずウォレットに常備**しておくのが現実的な対処法だ。

「NEARで報酬が欲しい」という場合、リキッドステーキング（stNEAR）という選択肢もある。Meta Pool（metapool.app）でNEARをステークするとstNEARという液体トークンが即座に手に入り、アンボンディング待ちなしにNEAR Intentsで随時NEARに換えられる。ただしNPROは貯まらないため、NEAR Mobileのティア特典を重視するかどうかで判断が分かれる。
:::

---

## ZECとNEARの接点と、現実的なリスク

### ZECのシールドプールとは

ZEC（Zcash）は同じトークンでも「どこに置くか」で性質が変わる。

| | 透明アドレス（t-address） | シールドアドレス（z-address） |
|---|---|---|
| 残高・取引 | 誰でも見える | 暗号化されて見えない |
| 技術 | Bitcoinと同じ公開台帳 | zk-SNARKs（ゼロ知識証明） |

「シールドプール」はシールドアドレスに入っているZECの合計量のこと。2024年初頭には全供給の8%だったが、2026年5月には**30%超（490万ZEC以上）**に到達した。

### NEARとZECの関係

ZECのシールドプールへ資金を移すには、従来は専用ウォレット（Zashiなど）でZECを別途用意する必要があった。**ZODL**（Zcash Open Development Lab）というプロジェクトが開発したZcash特化ウォレットがNEAR Intentsを統合したことで、USDCなど他チェーンのトークンからワンステップでシールドZECに変換できるようになった。

2026年3月末時点でNEAR Intents経由のZEC累計取引量は**15億ドル超**に達した。

ただしここで重要な構造上の注意点がある。**NEARがZODLを支配しているわけではない**。ZODLはNEAR Intentsを使っているだけで、1inchなど別のクロスチェーンインフラに乗り換えることも技術的には可能だ。

### 2026年6月に発覚したZECの重大脆弱性

ZECをプライバシー目的で保有・活用することを検討する上で、見逃せない出来事が起きた。

**2026年6月5日、ZcashのOrchardシールドプールに4年間気づかれなかったバグが発覚した。**

- 研究者がZcashのOrchardプール（シールドプールの最新版）に「無制限にZECを偽造発行できる」バグを発見
- バグは2022年のOrchardプール開始時から潜在していた
- ZEC価格は**31〜38%下落**
- Arthur Hayesら著名投資家が即座に保有分を売却
- 緊急ソフトフォーク→ハードフォーク（NU6.2）で修正済み

さらに深刻な問題がある。シールドプールの「中身が見えない」という特性そのものが、**バグが実際に悪用されたかどうかの検証を不可能にしている**。偽造ZECが発行されていたとしても、オンチェーンから確認する手段がない。「修正したが、本当に悪用されなかったのか」は証明できない。

### ZEC経由でのプライバシー確保：正直なリスク整理

| リスク | 内容 |
|--------|------|
| 価格変動リスク | ZECを保有している間ずっと負う。今回のバグで31〜38%下落した |
| プロトコルリスク | シールドプール自体にバグが潜む可能性（今回は4年間発覚せず） |
| 検証不能リスク | 「秘匿」ゆえに悪用の有無がオンチェーンで確認できない |
| 依存関係リスク | ZODLがNEAR Intentsを使い続ける保証はない |
| オンチェーン痕跡 | スワップが起きた事実・ZECが出入りした事実は記録に残る |

### それでもプライバシー需要が消えない理由

脆弱性の発覚とZEC急落にもかかわらず、プライバシー需要の背景にある構造的な力は変わっていない。

- **AI時代の金融監視への懸念**：AIによる行動分析・金融監視への抵抗感は高まっており、「プライバシー＝犯罪者のツール」というナラティブは崩れている
- **大口・機関トレーダーの戦略秘匿**：100億円規模のポジション移動を事前に読まれたくないという需要は本物だ
- **量子コンピュータへの警戒**：楕円曲線暗号（ECC）への脅威意識が高まり、ゼロ知識証明ベースの暗号スキームへの関心が続いている

「完全な匿名性」ではなく「実用的な秘匿性」——この区別を持った上で使うプロトコルだ。

---

## NEARを冷静に評価する

議論してきた内容を整理すると、こういう景色になる。

**NEARの本物の強み：**
- **NEAR Intents**：チェーン抽象化インフラとして累計60億ドル超の実績。Solverが競合する構造は本物
- **トークノミクス**：インフレ半減＋手数料買い付け機構。Intents取引量が増えるほどNEARトークンへの還元が増す設計
- **創業者の信頼性**：「Attention Is All You Need」共著者がAI×ブロックチェーンを志向して作ったチェーンという文脈は他にない

**過剰に語られていた部分：**
- **Confidential mode**：MEV・フロントランニング防止は本物だが、ASTER DEXやUniswapXと同様の機能。NEAR固有とは言えない
- **ZEC連携**：ZODLがNEAR Intentsを使っていることは事実だが、NEARがZODLを制御しているわけではない。ZEC自体にも重大脆弱性が発覚した

:::comment
書き始めたときは「NEARはプライバシー基盤として面白い」という仮説を持っていた。ただ掘り下げるほど、「プライバシー」はNEARの補助線であって主軸ではないとわかってきた。本質はNEAR Intentsというチェーン抽象化インフラであり、プライバシーはその上に乗ったひとつの機能に過ぎない。

完全な秘匿性という意味では、ZECのシールドプール連携もOrchardバグが示したようにまだ発展途上だ。「処理中だけ隠れる」Confidential modeはASTER DEXと同様の機能で差別化は薄い。本当の意味でオンチェーン上の全情報を隠せる仕組みはまだ実現していない。

それでも期待しているのは、**AIエージェントがチェーンをまたいで自律的に動く**というユースケースが現実になったとき、NEAR Intentsのような「宣言型の実行インフラ」が必要になるからだ。今はZECとBraveに支えられている部分が大きいが、そこへの賭けとしてNEAR Mobileでステーキングしながら様子を見ている。
:::

---

## NEARを試してみる

NEARのエコシステムを試してみたい方は、以下のリンクからアカウントを作成できます。

[NEAR アカウントを作成する](https://near.com/login?ref=dbj2hyym)

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
