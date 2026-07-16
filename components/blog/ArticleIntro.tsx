import Image from 'next/image'
import Link from 'next/link'

interface ArticleIntroProps {
  description: string
  locale?: 'ja' | 'en'
}

export default function ArticleIntro({ description, locale = 'ja' }: ArticleIntroProps) {
  const isEnglish = locale === 'en'
  const aboutPath = isEnglish ? '/en/about/' : '/about/'
  const policyPath = isEnglish ? '/en/editorial-policy/' : '/editorial-policy/'

  return (
    <section className="mb-10 rounded-2xl border overflow-hidden" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
      <div className="p-5 sm:p-6 border-b" style={{ borderColor: 'var(--border)' }}>
        <p className="text-xs tracking-widest mb-3 font-semibold" style={{ color: 'var(--accent)' }}>
          {isEnglish ? 'WHAT YOU WILL LEARN' : 'この記事で分かること'}
        </p>
        <p className="text-base leading-relaxed" style={{ color: 'var(--foreground)' }}>{description}</p>
      </div>
      <div className="p-5 sm:px-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
        <Link href={aboutPath} className="flex items-center gap-3 group">
          <Image
            src="/images/profile.jpg"
            alt={isEnglish ? 'ara, author of GAIZEN FINANCE' : 'GAIZEN FINANCE執筆者 ara'}
            width={36}
            height={36}
            className="rounded-full object-cover"
            style={{ border: '1px solid var(--border)' }}
          />
          <div>
            <p className="text-xs font-semibold group-hover:text-green-500 transition-colors" style={{ color: 'var(--foreground)' }}>
              {isEnglish ? 'Written and fact-checked by ara' : '執筆・事実確認: ara'}
            </p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>
              {isEnglish
                ? 'Long-term investor focused on business growth and durability'
                : '事業の成長性と持続性を軸に、長期投資を行う個人投資家'}
            </p>
          </div>
        </Link>
        <Link href={policyPath} className="text-xs transition-colors hover:text-green-500" style={{ color: 'var(--muted)' }}>
          {isEnglish ? 'Sources and editorial process →' : '出典・編集プロセス →'}
        </Link>
      </div>
    </section>
  )
}
