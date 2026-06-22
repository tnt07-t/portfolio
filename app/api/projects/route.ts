import { NextResponse } from 'next/server'
import { projectsPayload } from '@/lib/data/projects'

export const dynamic = 'force-static'

export function GET() {
  return NextResponse.json(projectsPayload)
}
