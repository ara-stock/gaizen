import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'プライバシーポリシー',
  description: 'GAIZEN FINANCEのプライバシーポリシー。Google AdSenseによる広告配信、Cookieの利用、アクセス解析、個人情報の取り扱いについて説明します。',
  alternates: { canonical: 'https://gaizen.xyz/privacy/' },
}

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-12">
        <p className="text-xs tracking-widest mb-2 font-semibold" style={{ color: 'var(--accent)' }}>LEGAL</p>
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>プライバシーポリシー</h1>
        <p className="text-xs" style={{ color: 'var(--muted)' }}>最終更新: 2026年5月</p>
      </div>

      <div className="prose max-w-none space-y-8">

        <section>
          <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--foreground)' }}>サイト概要</h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
            GAIZEN FINANCE（以下「本サイト」、URL: https://gaizen.xyz）は、長期・分散投資に関する情報を発信する個人運営のウェブサイトです。
            本サイトでは、ユーザーの皆様の情報を適切に管理・保護することを最優先に考えています。
            このプライバシーポリシーは、本サイトにおける個人情報の取り扱いについて説明するものです。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--foreground)' }}>広告配信について（Google AdSense）</h2>
          <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--muted)' }}>
            本サイトでは、<strong style={{ color: 'var(--foreground)' }}>Google AdSense</strong>（Google LLC、米国）を利用して広告を配信しています。
            Google AdSenseは、ユーザーがこのサイトや他のサイトを訪問した際の情報（Cookieを含む）を使用して、
            ユーザーの興味・関心に基づいた広告（インタレストベース広告）を表示することがあります。
          </p>
          <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--muted)' }}>
            Google によるCookieの使用については、
            <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>
              Googleの広告に関するポリシー
            </a>
            をご参照ください。
          </p>
          <div className="p-4 rounded-lg border text-sm" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--muted)' }}>
            <p className="font-semibold mb-2" style={{ color: 'var(--foreground)' }}>パーソナライズ広告の無効化</p>
            <p className="leading-relaxed">
              パーソナライズ広告を無効にしたい場合は、以下のリンクからオプトアウトできます。
            </p>
            <ul className="mt-2 space-y-1">
              <li>
                <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>
                  Google 広告設定ページ
                </a>
              </li>
              <li>
                <a href="http://www.networkadvertising.org/managing/opt_out.asp" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>
                  NAI（Network Advertising Initiative）オプトアウトページ
                </a>
              </li>
            </ul>
          </div>
          <p className="text-sm leading-relaxed mt-3" style={{ color: 'var(--muted)' }}>
            広告に関する同意が必要な地域では、Googleが提供する同意管理メッセージが表示される場合があります。
            同意内容は、表示されるプライバシー設定画面から確認・変更できます。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--foreground)' }}>Cookieについて</h2>
          <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--muted)' }}>
            Cookieとは、ウェブサイトがブラウザに保存する小さなデータファイルです。
            本サイトでは、以下の目的でCookieを使用しています。
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm" style={{ color: 'var(--muted)' }}>
            <li>テーマ設定（ダークモード/ライトモード）の保存</li>
            <li>Google AdSenseによる広告のパーソナライズ</li>
            <li>アクセス解析（詳細は下記参照）</li>
          </ul>
          <p className="text-sm leading-relaxed mt-3" style={{ color: 'var(--muted)' }}>
            ブラウザの設定でCookieを無効にすることも可能ですが、その場合、テーマ設定の保存など一部機能が正常に動作しない場合があります。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--foreground)' }}>アクセス解析について</h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
            本サイトでは、<strong style={{ color: 'var(--foreground)' }}>Cloudflare Web Analytics</strong> を使用してアクセス解析を行っています。
            このツールはCookieを使用せず、IPアドレスなど個人を特定する情報を収集しません。
            収集されるのは、ページビュー数・滞在時間・参照元などの統計情報のみです。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--foreground)' }}>第三者へのリンク・アフィリエイト</h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
            本サイトには外部サイトへのリンクが含まれており、一部リファラルプログラム（紹介報酬プログラム）に参加している場合があります。
            リンク先サイトのプライバシーポリシーや情報の正確性については、各サイトの方針をご確認ください。
            本サイトはリンク先サイトの内容・取引について責任を負いません。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--foreground)' }}>個人情報の収集について</h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
            本サイトはお問い合わせフォームを設置していないため、サイト経由で直接個人情報を収集することはありません。
            ただし、X（旧Twitter）のDMなどによりご連絡いただいた場合、その内容は本サイトの運営目的にのみ使用し、第三者へ提供することはありません。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--foreground)' }}>プライバシーポリシーの変更</h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
            本ポリシーは、法令の改正・サービス変更等に伴い、予告なく変更する場合があります。
            変更があった場合は、本ページに最終更新日を記載します。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--foreground)' }}>お問い合わせ</h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
            本ポリシーに関するご質問・ご意見は、
            <a href="/contact" style={{ color: 'var(--accent)' }}>Contactページ</a>
            よりX（旧Twitter）のDMにてご連絡ください。
          </p>
        </section>

      </div>
    </div>
  )
}
