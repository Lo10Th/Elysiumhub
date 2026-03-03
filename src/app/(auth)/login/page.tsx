import { Suspense } from 'react'
import LoginContent from './content'

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md h-[400px] bg-muted/50 animate-pulse rounded-lg" />
      </div>
    }>
      <LoginContent />
    </Suspense>
  )
}