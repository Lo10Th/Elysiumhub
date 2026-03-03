'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { createEmblem } from '@/lib/api'
import { createClient } from '@/lib/supabase/client'
import { Loader2, Package, AlertCircle } from 'lucide-react'

const EXAMPLE_YAML = `apiVersion: v1
name: my-api
version: 1.0.0
description: A sample API emblem for demonstration
baseUrl: https://api.example.com
auth:
  type: bearer
  header: Authorization
  prefix: Bearer
actions:
  list-items:
    description: List all items
    method: GET
    path: /items
  get-item:
    description: Get a single item by ID
    method: GET
    path: /items/{id}
    parameters:
      - name: id
        type: string
        in: path
        required: true`

export default function NewEmblemPage() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [yamlContent, setYamlContent] = useState(EXAMPLE_YAML)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        setError('You must be logged in to publish an emblem')
        setLoading(false)
        return
      }

      await createEmblem({
        name,
        description,
        yaml_content: yamlContent,
      }, session.access_token)

      router.push(`/emblems/${name}`)
    } catch (err: any) {
      setError(err.message || 'Failed to create emblem')
      setLoading(false)
    }
  }

  return (
    <div className="container py-8 px-4 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Package className="h-8 w-8" />
          Publish Emblem
        </h1>
        <p className="text-muted-foreground mt-1">
          Share your API with the community
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6">
          {error && (
            <div className="flex items-center gap-2 p-4 bg-destructive/10 text-destructive rounded-lg">
              <AlertCircle className="h-5 w-5" />
              <p>{error}</p>
            </div>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Provide basic details about your emblem
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="my-api"
                  value={name}
                  onChange={(e) => setName(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                  required
                  pattern="[a-z0-9][a-z0-9-]*[a-z0-9]"
                  title="Must be lowercase letters, numbers, and hyphens only"
                />
                <p className="text-xs text-muted-foreground">
                  Must be lowercase letters, numbers, and hyphens. Start and end with alphanumeric.
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your API..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  minLength={10}
                  maxLength={500}
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">
                  {description.length}/500 characters
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Emblem Definition</CardTitle>
              <CardDescription>
                YAML definition of your API
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={yamlContent}
                onChange={(e) => setYamlContent(e.target.value)}
                className="font-mono text-sm min-h-[400px]"
                placeholder={EXAMPLE_YAML}
              />
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading || !name || !description || !yamlContent}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Publish Emblem
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}