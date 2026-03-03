import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Package, Download, User, Settings, Plus } from 'lucide-react'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const { data: emblems } = await supabase
    .from('emblems')
    .select('id, name, downloads_count')
    .eq('author_id', user.id)
    .limit(5)

  const totalDownloads = emblems?.reduce((acc, e) => acc + (e.downloads_count || 0), 0) || 0

  return (
    <div className="container py-8 px-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, {profile?.username || 'User'}
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your emblems and settings
          </p>
        </div>
        <Link href="/emblems/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Publish Emblem
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Emblems</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{emblems?.length || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDownloads.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Account</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm">
              <p className="font-medium">{user.email}</p>
              <p className="text-muted-foreground">@{profile?.username}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 mb-8">
        <Link href="/my-emblems">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                My Emblems
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                View and manage your published emblems
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/settings">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Manage your profile and API tokens
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Recent Emblems */}
      {emblems && emblems.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Emblems</h2>
          <div className="space-y-2">
            {emblems.map((emblem) => (
              <Link 
                key={emblem.id} 
                href={`/emblems/${emblem.name}`}
                className="block"
              >
                <Card className="hover:border-primary/50 transition-colors">
                  <CardContent className="flex items-center justify-between py-4">
                    <div className="flex items-center gap-3">
                      <Package className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">{emblem.name}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {emblem.downloads_count?.toLocaleString() || 0} downloads
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}