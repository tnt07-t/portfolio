import { NextResponse } from 'next/server'
import { experiencePayload } from '@/lib/data/experience'

export const dynamic = 'force-static'

export function GET() {
  return NextResponse.json(experiencePayload)
}
