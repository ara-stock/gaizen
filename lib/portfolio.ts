import fs from 'fs'
import path from 'path'
import type { PortfolioData } from '@/types/portfolio'

export function getPortfolioData(): PortfolioData {
  const filePath = path.join(process.cwd(), 'content/portfolio/portfolio.json')
  const raw = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(raw) as PortfolioData
}
