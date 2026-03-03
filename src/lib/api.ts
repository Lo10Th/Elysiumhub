const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ely.karlharrenga.com'

export async function getEmblems(params?: {
  category?: string
  limit?: number
  offset?: number
}) {
  const searchParams = new URLSearchParams()
  if (params?.category) searchParams.set('category', params.category)
  if (params?.limit) searchParams.set('limit', params.limit.toString())
  if (params?.offset) searchParams.set('offset', params.offset.toString())

  const res = await fetch(`${API_URL}/api/emblems?${searchParams}`)
  if (!res.ok) throw new Error('Failed to fetch emblems')
  return res.json()
}

export async function getEmblem(name: string) {
  const res = await fetch(`${API_URL}/api/emblems/${name}`)
  if (!res.ok) return null
  return res.json()
}

export async function getEmblemVersion(name: string, version: string) {
  const res = await fetch(`${API_URL}/api/emblems/${name}/${version}`)
  if (!res.ok) return null
  return res.json()
}

export async function searchEmblems(params: {
  q: string
  category?: string
  sort?: string
  limit?: number
  offset?: number
}) {
  const searchParams = new URLSearchParams()
  searchParams.set('q', params.q)
  if (params.category) searchParams.set('category', params.category)
  if (params.sort) searchParams.set('sort', params.sort)
  if (params.limit) searchParams.set('limit', params.limit.toString())
  if (params.offset) searchParams.set('offset', params.offset.toString())

  const res = await fetch(`${API_URL}/api/emblems/search?${searchParams}`)
  if (!res.ok) throw new Error('Failed to search emblems')
  return res.json()
}

export async function createEmblem(data: {
  name: string
  description: string
  yaml_content: string
  category?: string
  tags?: string[]
  license?: string
  repository_url?: string
  homepage_url?: string
  version?: string
}, token: string) {
  const res = await fetch(`${API_URL}/api/emblems`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.detail || 'Failed to create emblem')
  }
  return res.json()
}

export async function updateEmblem(name: string, data: {
  description?: string
  yaml_content: string
  version: string
}, token: string) {
  const res = await fetch(`${API_URL}/api/emblems/${name}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.detail || 'Failed to update emblem')
  }
  return res.json()
}

export async function deleteEmblem(name: string, token: string) {
  const res = await fetch(`${API_URL}/api/emblems/${name}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.detail || 'Failed to delete emblem')
  }
  return res.json()
}