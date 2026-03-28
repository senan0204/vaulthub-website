import fs from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const dbPath = path.join(process.cwd(), 'lib/db.json')
    if (!fs.existsSync(dbPath)) {
      return NextResponse.json({ logo: '', whatsapp: '' })
    }
    const raw = fs.readFileSync(dbPath, 'utf-8')
    if (!raw.trim()) return NextResponse.json({ logo: '', whatsapp: '' })
    const db = JSON.parse(raw)
    return NextResponse.json(db.settings || { logo: '', whatsapp: '' })
  } catch (error) {
    console.error('Error in settings API:', error)
    return NextResponse.json({ logo: '', whatsapp: '' }, { status: 500 })
  }
}

