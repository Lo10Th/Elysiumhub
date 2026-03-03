'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { searchEmblems } from '@/lib/api'
import { EmblemCard } from '@/components/emblem-card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, Package, Loader2 } from 'lucide-react'
import type { Emblem } from '@/types'

export default function SearchPageClient() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<Emblem[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const q = searchParams.get('q')
    if (q) {
      setQuery(q)
      performSearch(q)
    }
  }, [searchParams])

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    setLoading(true)
    setError(null)

    try {
      const data = await searchEmblems({ q: searchQuery, limit: 50 })
      setResults(data)
    } catch (e) {
      setError('Failed to search emblems')
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
      performSearch(query)
    }
  }

  const sort = searchParams.get('sort') || 'downloads'

  return (
    <div className="container py-8 px-4">
      <div className="max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Search Emblems</h1>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by name, description, or tags..."
              className="pl-10"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Search'}
          </Button>
        </form>
        
        {/* Sort options */}
        <div className="flex items-center gap-2 mt-4">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <div className="flex gap-2">
            {['downloads', 'recent', 'name'].map((s) => (
              <Badge
                key={s}
                variant={sort === s ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => router.push(`/search?q=${query}&sort=${s}`)}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {error && (
        <div className="max-w-2xl mx-auto mb-4 p-4 bg-destructive/10 text-destructive rounded-lg">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : results.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((emblem) => (
            <EmblemCard key={emblem.id} emblem={emblem} />
          ))}
        </div>
      ) : query && !loading ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Package className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No results found</h3>
          <p className="text-muted-foreground">
            No emblems match your search for &quot;{query}&quot;
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Search className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Start searching</h3>
          <p className="text-muted-foreground">
            Enter a search term to find emblems
          </p>
        </div>
      )}
    </div>
  )
}