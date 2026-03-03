export interface User {
  id: string
  email: string
  username?: string
  avatar_url?: string
  bio?: string
  created_at: string
  updated_at: string
}

export interface Emblem {
  id: string
  name: string
  description: string
  author_id?: string
  author_name?: string
  category?: string
  tags?: string[]
  license: string
  repository_url?: string
  homepage_url?: string
  latest_version?: string
  downloads_count: number
  created_at: string
  updated_at: string
  security_advisory?: string
  security_severity?: string
}

export interface EmblemWithYaml extends Emblem {
  yaml_content: string
}

export interface EmblemVersion {
  id: string
  emblem_id: string
  version: string
  yaml_content: string
  changelog?: string
  published_by?: string
  published_at: string
}

export interface ApiKey {
  id: string
  name: string
  created_at: string
  expires_at?: string
  key?: string
}

export interface SearchResult {
  emblems: Emblem[]
  total: number
  query: string
}