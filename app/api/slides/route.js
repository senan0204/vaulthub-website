import { getSlides } from '@/lib/actions'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const slides = await getSlides()
    return NextResponse.json(slides)
  } catch (error) {
    console.error('Error in slides API:', error)
    return NextResponse.json([], { status: 500 })
  }
}
