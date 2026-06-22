import { NextResponse } from 'next/server'
import { skillsPayload } from '@/lib/data/skills'

export const dynamic = 'force-static'

export function GET() {
  return NextResponse.json(skillsPayload)
}
