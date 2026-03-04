import Link from 'next/link'
import { Package, Github } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t py-8 md:py-12">
      <div className="container">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <Package className="h-6 w-6" />
              <span className="font-bold text-xl">Elysium</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              The API App Store. Discover, publish, and use APIs programmatically.
            </p>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-semibold">Resources</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/emblems" className="text-sm text-muted-foreground hover:text-foreground">
                Browse Emblems
              </Link>
              <Link href="/search" className="text-sm text-muted-foreground hover:text-foreground">
                Search
              </Link>
              <Link href="https://github.com/Lo10Th/Elysium" className="text-sm text-muted-foreground hover:text-foreground">
                Documentation
              </Link>
            </nav>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-semibold">Community</h3>
            <nav className="flex flex-col gap-2">
              <Link href="https://github.com/Lo10Th/Elysium" className="text-sm text-muted-foreground hover:text-foreground">
                GitHub
              </Link>
              <Link href="https://github.com/Lo10Th/Elysium/issues" className="text-sm text-muted-foreground hover:text-foreground">
                Issues
              </Link>
            </nav>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-semibold">Legal</h3>
            <nav className="flex flex-col gap-2">
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Terms of Service
              </Link>
            </nav>
          </div>
        </div>
        
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t pt-8">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Elysium. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="https://github.com/Lo10Th/Elysium" className="text-muted-foreground hover:text-foreground">
              <Github className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}