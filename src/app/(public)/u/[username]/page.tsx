import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Package, Download, Calendar } from 'lucide-react'
import { getEmblems } from '@/lib/api'

export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params
  const supabase = await createClient()
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .single()

  if (!profile) {
    notFound()
  }

  const { data: emblems } = await supabase
    .from('emblems')
    .select('*')
    .eq('author_id', profile.id)
    .order('downloads_count', { ascending: false })

  const totalDownloads = emblems?.reduce((acc, e) => acc + (e.downloads_count || 0), 0) || 0

  return (
    <div className="container py-8 px-4">
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={profile.avatar_url} alt={profile.username} />
            <AvatarFallback className="text-2xl">
              {profile.username?.[0]?.toUpperCase() || '?'}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">@{profile.username}</h1>
            {profile.bio && (
              <p className="text-muted-foreground mt-1">{profile.bio}</p>
            )}
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Joined {new Date(profile.created_at).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 md:ml-auto">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{emblems?.length || 0}</div>
              <div className="text-sm text-muted-foreground">Emblems</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{totalDownloads.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Downloads</div>
            </CardContent>
          </Card>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Published Emblems</h2>

      {emblems && emblems.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {emblems.map((emblem) => (
            <Link key={emblem.id} href={`/emblems/${emblem.name}`}>
              <Card className="h-full hover:border-primary/50 transition-colors">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Package className="h-5 w-5 text-muted-foreground" />
                      {emblem.name}
                    </CardTitle>
                    {emblem.latest_version && (
                      <Badge variant="secondary" className="text-xs">
                        v{emblem.latest_version}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {emblem.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      {emblem.downloads_count?.toLocaleString() || 0}
                    </div>
                    {emblem.category && (
                      <Badge variant="outline">{emblem.category}</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <Card className="p-8">
          <div className="flex flex-col items-center text-center">
            <Package className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No emblems published yet</p>
          </div>
        </Card>
      )}
    </div>
  )
}