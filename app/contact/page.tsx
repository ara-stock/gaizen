import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'GAIZEN FINANCEへのお問い合わせ。SNSリンクと連絡先。',
  alternates: { canonical: 'https://gaizen.xyz/contact/', languages: { ja: 'https://gaizen.xyz/contact/', en: 'https://gaizen.xyz/en/contact/' } },
}

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-12">
        <p className="text-xs tracking-widest mb-2 font-semibold" style={{ color: 'var(--accent)' }}>CONTACT</p>
        <h1 className="text-3xl font-bold mb-3" style={{ color: 'var(--foreground)' }}>お問い合わせ</h1>
        <p className="text-sm" style={{ color: 'var(--muted)' }}>
          記事に関するご意見・ご質問はSNSよりお気軽にどうぞ。
        </p>
      </div>

      <div className="space-y-4">
        {[
          { platform: 'X (Twitter)', handle: '@ara_stock', url: 'https://x.com/ara_stock', description: '投資関連の考察・更新情報を発信しています。' },
          { platform: 'GitHub', handle: 'ara-stock/gaizen', url: 'https://github.com/ara-stock/gaizen', description: 'サイトのソースコードを公開しています。' },
          { platform: '記事の訂正依頼', handle: 'GitHub Issues', url: 'https://github.com/ara-stock/gaizen/issues/new?title=%E8%A8%98%E4%BA%8B%E3%81%AE%E8%A8%82%E6%AD%A3%E4%BE%9D%E9%A0%BC', description: '該当URLと訂正が必要な箇所をお知らせください。確認後、必要に応じて記事を更新します。' },
        ].map(item => (
          <a key={item.platform} href={item.url} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-between p-5 rounded-lg border transition-colors hover:border-gray-600"
            style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
            <div>
              <p className="text-sm font-semibold mb-1" style={{ color: 'var(--foreground)' }}>{item.platform}</p>
              <p className="text-xs" style={{ color: 'var(--accent)' }}>{item.handle}</p>
              <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>{item.description}</p>
            </div>
            <span className="text-lg" style={{ color: 'var(--muted)' }}>→</span>
          </a>
        ))}
      </div>

      <div className="mt-10 p-5 rounded-lg border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
          記事の事実関係に誤りがある場合は、訂正依頼から該当URLと根拠資料をお知らせください。
          業務連絡・コラボレーションはX（旧Twitter）のDMで受け付けています。投資に関する個別相談・アドバイスはお断りしております。
        </p>
      </div>
    </div>
  )
}
