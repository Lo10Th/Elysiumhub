import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Package, Download, User } from 'lucide-react'
import type { Emblem } from '@/types'
import { VerifiedBadge } from '@/components/ui/verified-badge'

interface EmblemCardProps {
  emblem: Emblem
}

export function EmblemCard({ emblem }: EmblemCardProps) {
  return (
    <Link href={`/emblems/${emblem.name}`}>
      <Card className="h-full hover:border-primary/50 transition-colors">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Package className="h-5 w-5 text-muted-foreground" />
              {emblem.name}
            </CardTitle>
            {emblem.latest_version && (
              <Badge variant="secondary" className="text-xs">
                v{emblem.latest_version}
              </Badge>
            )}
          </div>
          <CardDescription className="line-clamp-2">
            {emblem.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{emblem.author_name || 'Anonymous'}</span>
              {emblem.author_verified && <VerifiedBadge size="sm" />}
            </div>
            <div className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              <span>{emblem.downloads_count.toLocaleString()}</span>
            </div>
          </div>
          {emblem.tags && emblem.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {emblem.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {emblem.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{emblem.tags.length - 3}
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}