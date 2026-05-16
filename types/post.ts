export interface PostFrontmatter {
  title: string
  date: string
  updatedAt?: string
  description: string
  tags: string[]
  category: string
  published: boolean
  featured?: boolean
  coverImage?: string
}

export interface Post {
  slug: string
  frontmatter: PostFrontmatter
  content: string
  readingTime: number
  excerpt: string
}

export interface PostMeta {
  slug: string
  frontmatter: PostFrontmatter
  readingTime: number
  excerpt: string
}
