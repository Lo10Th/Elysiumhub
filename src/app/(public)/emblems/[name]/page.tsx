import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getEmblem, getEmblemVersion } from '@/lib/api'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Package, Download, User, ExternalLink, Copy, Terminal, AlertTriangle } from 'lucide-react'
import { VerifiedBadge } from '@/components/ui/verified-badge'

export default async function EmblemDetailPage({
  params,
}: {
  params: Promise<{ name: string }>
}) {
  const { name } = await params
  const emblem = await getEmblem(name)
  
  if (!emblem) {
    notFound()
  }

  let yamlContent = ''
  try {
    const versionData = await getEmblemVersion(name, emblem.latest_version || '1.0.0')
    yamlContent = versionData?.yaml_content || ''
  } catch (e) {
    // Version not found
  }

  return (
    <div className="container py-8 px-4">
      {/* Security Advisory Banner */}
      {emblem.security_advisory && (
        <div className="mb-6 p-4 border border-destructive/50 bg-destructive/10 rounded-lg flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-destructive">Security Advisory</h3>
            <p className="text-sm text-muted-foreground mt-1">{emblem.security_advisory}</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Package className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">{emblem.name}</h1>
            {emblem.latest_version && (
              <Badge>v{emblem.latest_version}</Badge>
            )}
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl">
            {emblem.description}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`https://github.com/elysium/${emblem.name}`} target="_blank">
              <ExternalLink className="h-4 w-4 mr-2" />
              Repository
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Downloads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-2">
              <Download className="h-5 w-5" />
              {emblem.downloads_count.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Author</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold flex items-center gap-2">
              <User className="h-5 w-5" />
              <Link 
                href={`/u/${emblem.author_name}`}
                className="hover:text-primary"
              >
                {emblem.author_name || 'Anonymous'}
              </Link>
              {emblem.author_verified && <VerifiedBadge size="sm" />}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">License</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold">{emblem.license}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold">{emblem.category || 'Uncategorized'}</div>
          </CardContent>
        </Card>
      </div>

      {/* Tags */}
      {emblem.tags && emblem.tags.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-medium text-muted-foreground mb-2">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {emblem.tags.map((tag: string) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Tabs */}
      <Tabs defaultValue="install">
        <TabsList>
          <TabsTrigger value="install">Install</TabsTrigger>
          <TabsTrigger value="yaml">YAML</TabsTrigger>
          <TabsTrigger value="versions">Versions</TabsTrigger>
        </TabsList>

        <TabsContent value="install" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Terminal className="h-5 w-5" />
                Install via CLI
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                <div className="flex items-center justify-between">
                  <span>ely pull {emblem.name}</span>
                  <Button variant="ghost" size="sm">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Make sure you have the Elysium CLI installed. See the{' '}
                <Link href="https://github.com/Lo10Th/Elysium" className="text-primary hover:underline">
                  documentation
                </Link>{' '}
                for more information.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="yaml" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Emblem Definition</CardTitle>
            </CardHeader>
            <CardContent>
              {yamlContent ? (
                <pre className="bg-muted rounded-lg p-4 overflow-x-auto text-sm font-mono">
                  {yamlContent}
                </pre>
              ) : (
                <p className="text-muted-foreground">YAML content not available</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="versions" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Available Versions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Badge>v{emblem.latest_version || '1.0.0'}</Badge>
                <span className="text-sm text-muted-foreground">latest</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}