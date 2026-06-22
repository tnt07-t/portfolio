import { NextResponse } from 'next/server'
import { highlights } from '@/lib/data/highlights'

export const dynamic = 'force-static'

export function GET() {
  return NextResponse.json({ highlights })
}
