import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Package, Download, ExternalLink, Plus } from 'lucide-react'

export default async function MyEmblemsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: emblems } = await supabase
    .from('emblems')
    .select('*')
    .eq('author_id', user.id)
    .order('updated_at', { ascending: false })

  return (
    <div className="container py-8 px-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Emblems</h1>
          <p className="text-muted-foreground mt-1">
            Manage your published emblems
          </p>
        </div>
        <Link href="/emblems/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Publish New
          </Button>
        </Link>
      </div>

      {emblems && emblems.length > 0 ? (
        <div className="space-y-4">
          {emblems.map((emblem) => (
            <Link key={emblem.id} href={`/emblems/${emblem.name}`}>
              <Card className="hover:border-primary/50 transition-colors">
                <CardContent className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-4">
                    <Package className="h-6 w-6 text-muted-foreground" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{emblem.name}</h3>
                        {emblem.latest_version && (
                          <Badge variant="secondary">v{emblem.latest_version}</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {emblem.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      {emblem.downloads_count?.toLocaleString() || 0}
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <Card className="p-12">
          <div className="flex flex-col items-center text-center">
            <Package className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No emblems yet</h3>
            <p className="text-muted-foreground mb-4">
              You haven&apos;t published any emblems yet.
            </p>
            <Link href="/emblems/new">
              <Button>Publish Your First Emblem</Button>
            </Link>
          </div>
        </Card>
      )}
    </div>
  )
}