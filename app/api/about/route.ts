import { NextResponse } from 'next/server'
import { aboutPayload } from '@/lib/data/about'

export const dynamic = 'force-static'

export function GET() {
  return NextResponse.json(aboutPayload)
}
