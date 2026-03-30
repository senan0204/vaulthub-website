import { NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const settingsRef = doc(db, 'config', 'settings')
    const settingsSnap = await getDoc(settingsRef)
    
    if (settingsSnap.exists()) {
      return NextResponse.json(settingsSnap.data())
    } else {
      return NextResponse.json({ logo: '', whatsapp: '919752691095' })
    }
  } catch (error) {
    console.error('Error in settings API:', error)
    return NextResponse.json({ logo: '', whatsapp: '919752691095' }, { status: 500 })
  }
}

