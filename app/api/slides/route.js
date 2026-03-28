import fs from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const dbPath = path.join(process.cwd(), 'lib/db.json')
  const raw = fs.readFileSync(dbPath, 'utf-8')
  const db = JSON.parse(raw)
  return NextResponse.json(db.slides || [])
}

