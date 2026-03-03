import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { EmblemCard } from '@/components/emblem-card'
import { Search, ArrowRight, Package, Zap, Shield, Github } from 'lucide-react'
import { getEmblems } from '@/lib/api'

export default async function HomePage() {
  let featuredEmblems = []
  try {
    featuredEmblems = await getEmblems({ limit: 6 })
  } catch (e) {
    // API not available, show empty state
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20 py-20 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                The API App Store
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground text-lg md:text-xl">
                Discover, publish, and use APIs programmatically. Browse emblems, manage your APIs, and integrate with ease.
              </p>
            </div>
            
            <div className="w-full max-w-md flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  type="search" 
                  placeholder="Search emblems..." 
                  className="pl-10"
                />
              </div>
              <Link href="/search">
                <Button className="w-full sm:w-auto">
                  Search
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/register">
                <Button size="lg">Get Started</Button>
              </Link>
              <Link href="/emblems">
                <Button size="lg" variant="outline">Browse Emblems</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-3">
            <Card>
              <CardHeader>
                <Package className="h-10 w-10 mb-2 text-primary" />
                <CardTitle>Discover APIs</CardTitle>
                <CardDescription>
                  Browse a curated collection of API emblems. Find the right API for your project with powerful search and filters.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Zap className="h-10 w-10 mb-2 text-primary" />
                <CardTitle>Easy Integration</CardTitle>
                <CardDescription>
                  Use our CLI tool to pull emblems and execute API calls directly from your terminal. No boilerplate needed.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Shield className="h-10 w-10 mb-2 text-primary" />
                <CardTitle>Secure by Default</CardTitle>
                <CardDescription>
                  All emblems are validated against a strict schema. Security advisories keep you informed of potential risks.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Emblems Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Featured Emblems</h2>
              <p className="text-muted-foreground mt-1">Popular APIs from the community</p>
            </div>
            <Link href="/emblems">
              <Button variant="outline">
                View all
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          {featuredEmblems.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredEmblems.map((emblem: any) => (
                <EmblemCard key={emblem.id} emblem={emblem} />
              ))}
            </div>
          ) : (
            <Card className="p-12">
              <div className="flex flex-col items-center text-center">
                <Package className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No emblems yet</h3>
                <p className="text-muted-foreground mb-4">
                  Be the first to publish an emblem to the registry.
                </p>
                <Link href="/emblems/new">
                  <Button>Publish Your First Emblem</Button>
                </Link>
              </div>
            </Card>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-6 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight">Ready to get started?</h2>
            <p className="text-muted-foreground text-lg">
              Join the community and start discovering APIs today.
            </p>
            <div className="flex items-center gap-4">
              <Link href="/register">
                <Button size="lg">Create an Account</Button>
              </Link>
              <Link href="https://github.com/Lo10Th/Elysium" target="_blank">
                <Button size="lg" variant="outline">
                  <Github className="mr-2 h-4 w-4" />
                  View on GitHub
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CLI Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">Powerful CLI Tool</h2>
              <p className="text-muted-foreground text-lg">
                Use our CLI to interact with emblems directly from your terminal. Pull, execute, and manage APIs with simple commands.
              </p>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                <div className="text-muted-foreground"># Install the CLI</div>
                <div className="text-foreground">$ go install github.com/elysium/elysium/cli/cmd@latest</div>
                <div className="mt-2 text-muted-foreground"># Pull an emblem</div>
                <div className="text-foreground">$ ely pull clothing-shop</div>
                <div className="mt-2 text-muted-foreground"># Execute an action</div>
                <div className="text-foreground">$ ely execute clothing-shop list-products</div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-bold text-primary mb-2">ely</div>
                <div className="text-muted-foreground">The Elysium CLI</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}