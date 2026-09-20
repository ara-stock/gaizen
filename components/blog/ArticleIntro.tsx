import Link from 'next/link'

interface ArticleIntroProps {
  description: string
  locale?: 'ja' | 'en'
}

export default function ArticleIntro({ description, locale = 'ja' }: ArticleIntroProps) {
  const isEnglish = locale === 'en'
  return (
    <div className="mb-8 border-l-2 border-accent pl-5">
      <p className="text-base leading-[1.9] text-muted">{description}</p>
      <Link href={`${isEnglish ? '/en' : ''}/editorial-policy/`} className="inline-flex items-center min-h-11 mt-1 text-xs text-accent underline underline-offset-4">
        {isEnglish ? 'How sources and author views are distinguished' : '一次情報と筆者の見解の区別について'}
      </Link>
    </div>
  )
}
