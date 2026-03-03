import { Suspense } from 'react'
import SearchPageClient from './client'

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="container py-8 px-4">Loading...</div>}>
      <SearchPageClient />
    </Suspense>
  )
}