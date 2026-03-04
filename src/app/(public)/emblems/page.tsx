import { getEmblems } from '@/lib/api'
import { EmblemCard } from '@/components/emblem-card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Package, Search } from 'lucide-react'
import Link from 'next/link'

const CATEGORIES = [
  'AI & ML',
  'Payments',
  'Communication',
  'Data',
  'Dev Tools',
  'E-commerce',
  'Finance',
  'Media',
  'Social',
  'Utilities',
]

export default async function EmblemsPage({
  searchParams,
}: {
  searchParams: { category?: string }
}) {
  const activeCategory = searchParams.category 
    ? decodeURIComponent(searchParams.category) 
    : null

  let emblems = []
  try {
    emblems = await getEmblems({ 
      category: searchParams.category,
      limit: 50 
    })
  } catch (e) {
    // API not available
  }

  return (
    <div className="container py-8 px-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Browse Emblems</h1>
          <p className="text-muted-foreground mt-1">
            Discover APIs from the community
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search emblems..." 
              className="pl-10"
            />
          </div>
          <Link href="/search">
            <Button variant="secondary">Search</Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="md:w-64 shrink-0">
          <div className="sticky top-20">
            <h2 className="font-semibold mb-3">Categories</h2>
            <div className="flex flex-wrap gap-2 md:flex-col">
              <Link href="/emblems">
                <Badge 
                  variant={!activeCategory ? 'default' : 'outline'}
                  className="cursor-pointer"
                >
                  All
                </Badge>
              </Link>
              {CATEGORIES.map((category) => (
                <Link 
                  key={category} 
                  href={`/emblems?category=${encodeURIComponent(category)}`}
                >
                  <Badge 
                    variant={activeCategory === category ? 'default' : 'outline'}
                    className="cursor-pointer"
                  >
                    {category}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1">
          {emblems.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {emblems.map((emblem: any) => (
                <EmblemCard key={emblem.id} emblem={emblem} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Package className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No emblems found</h3>
              <p className="text-muted-foreground mb-4">
                {activeCategory 
                  ? `No emblems in the "${activeCategory}" category yet.`
                  : 'Be the first to publish an emblem to the registry.'}
              </p>
              <Link href="/emblems/new">
                <Button>Publish Your First Emblem</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}