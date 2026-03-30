import { getSettings } from '@/lib/actions'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const settings = await getSettings()
    return NextResponse.json(settings)
  } catch (error) {
    console.error('Error in settings API:', error)
    return NextResponse.json({ logo: '', whatsapp: '' }, { status: 500 })
  }
}
