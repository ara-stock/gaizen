import CardsPage, { cardsMetadata } from '@/components/cards/CardsPage'

export const metadata = cardsMetadata('en')

export default function Page() {
  return <CardsPage locale="en" />
}
