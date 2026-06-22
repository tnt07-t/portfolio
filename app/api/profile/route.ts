import { NextResponse } from 'next/server'
import { profile } from '@/lib/data/profile'

export const dynamic = 'force-static'

export function GET() {
  return NextResponse.json(profile)
}
