import fs from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const dbPath = path.join(process.cwd(), 'lib/db.json')
    if (!fs.existsSync(dbPath)) {
      return NextResponse.json([])
    }
    const raw = fs.readFileSync(dbPath, 'utf-8')
    if (!raw.trim()) return NextResponse.json([])
    const db = JSON.parse(raw)
    return NextResponse.json(db.slides || [])
  } catch (error) {
    console.error('Error in slides API:', error)
    return NextResponse.json([], { status: 500 })
  }
}

