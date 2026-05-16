import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'プライバシーポリシー。アクセス解析・広告・Cookieの利用について。',
}

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-12">
        <p className="text-xs tracking-widest mb-2 font-semibold" style={{ color: 'var(--accent)' }}>LEGAL</p>
        <h1 className="text-3xl font-bold" style={{ color: 'var(--foreground)' }}>プライバシーポリシー</h1>
      </div>
      <div className="prose max-w-none">
        <h2>アクセス解析について</h2>
        <p>
          本サイトでは、Cloudflare Web Analyticsを使用してアクセス解析を行っています。
          このツールはCookieを使用せず、個人を特定する情報を収集しません。
        </p>

        <h2>広告について</h2>
        <p>
          本サイトでは、Google AdSenseを使用した広告を掲載する場合があります。
          Google AdSenseはCookieを使用して、ユーザーの興味に基づいた広告を表示します。
          広告のカスタマイズはGoogleの広告設定から無効にできます。
        </p>

        <h2>Cookieについて</h2>
        <p>
          本サイトでは、一部のサービスでCookieを使用しています。
          ブラウザの設定でCookieを無効にすることができますが、一部の機能が正常に動作しない場合があります。
        </p>

        <h2>第三者へのリンク</h2>
        <p>
          本サイトには外部サイトへのリンクが含まれており、リファラルプログラムに参加している場合があります。
          リンク先のプライバシーポリシーについては、各サイトをご確認ください。
        </p>

        <h2>お問い合わせ</h2>
        <p>
          プライバシーに関するお問い合わせは、Contactページよりご連絡ください。
        </p>

        <p className="text-sm" style={{ color: 'var(--muted)' }}>最終更新: 2026年5月</p>
      </div>
    </div>
  )
}
