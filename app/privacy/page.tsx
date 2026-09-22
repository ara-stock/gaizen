import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'GAIZEN FINANCEのプライバシーポリシー。ローカルストレージの利用、アクセス解析、個人情報の取り扱いについて説明します。',
  alternates: { canonical: 'https://gaizen.xyz/privacy/' },
}

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-12">
        <p className="text-xs tracking-widest mb-2 font-semibold" style={{ color: 'var(--accent)' }}>LEGAL</p>
        <h1 className="text-xl sm:text-2xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>プライバシーポリシー</h1>
        <p className="text-xs" style={{ color: 'var(--muted)' }}>最終更新: 2026年7月</p>
      </div>

      <div className="prose max-w-none space-y-8">

        <section>
          <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--foreground)' }}>サイト概要</h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
            GAIZEN FINANCE（以下「本サイト」、URL: https://gaizen.xyz）は、仮想通貨プロジェクトと資産形成に関する情報を発信する個人運営のウェブサイトです。
            本サイトでは、ユーザーの皆様の情報を適切に管理・保護することを最優先に考えています。
            このプライバシーポリシーは、本サイトにおける個人情報の取り扱いについて説明するものです。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--foreground)' }}>Cookie・ローカルストレージについて</h2>
          <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--muted)' }}>
            Cookieやローカルストレージは、ウェブサイトがブラウザに情報を保存する仕組みです。
            本サイトでは、以下の目的で利用される場合があります。
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm" style={{ color: 'var(--muted)' }}>
            <li>ローカルストレージによるテーマ設定（ダークモード/ライトモード）の保存</li>
            <li>Airdrop のページで自分用に変更したステータスと、試算用に入力した保有ポイントの保存（外部には送信されません）</li>
          </ul>
          <p className="text-sm leading-relaxed mt-3" style={{ color: 'var(--muted)' }}>
            ブラウザの設定で無効にすることも可能ですが、その場合、テーマ設定やステータスの保存など一部機能が正常に動作しない場合があります。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--foreground)' }}>アクセス解析について</h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
            本サイトでは、<strong style={{ color: 'var(--foreground)' }}>Cloudflare Web Analytics</strong> を使用してアクセス解析を行っています。
            Cloudflareの説明では、このツールはCookieを使用せず、訪問者の個人データを収集・利用したり、サイトをまたいで個人を追跡したりしません。
            ページビューや参照元、ページ表示性能などの集計情報を確認するために利用しています。
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
            <a href="/contact/" style={{ color: 'var(--accent)' }}>Contactページ</a>
            よりX（旧Twitter）のDMにてご連絡ください。
          </p>
        </section>

      </div>
    </div>
  )
}
