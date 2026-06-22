import { headers } from 'next/headers'

/**
 * Absolute base URL for server-side fetches to our own API routes. Reading
 * headers() opts the caller into dynamic (request-time) rendering, so the
 * fetch happens while the server is live — never during `next build` when it
 * isn't (which would fail).
 */
export async function apiBase(): Promise<string> {
  const h = await headers()
  const host = h.get('host') ?? 'localhost:3000'
  const isLocal = host.startsWith('localhost') || host.startsWith('127.')
  const proto = h.get('x-forwarded-proto') ?? (isLocal ? 'http' : 'https')
  return `${proto}://${host}`
}

/** Fetch + parse one of our per-chapter API endpoints. */
export async function fetchApi<T>(path: string): Promise<T> {
  const res = await fetch(`${await apiBase()}${path}`, { cache: 'no-store' })
  if (!res.ok) throw new Error(`API ${path} failed: ${res.status}`)
  return res.json() as Promise<T>
}
