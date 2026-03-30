import { NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const slidesCol = collection(db, 'slides')
    const q = query(slidesCol, orderBy('createdAt', 'asc'))
    const snapshot = await getDocs(q)
    const slides = snapshot.docs.map(doc => ({
      ...doc.data(),
      firebaseId: doc.id
    }))
    return NextResponse.json(slides)
  } catch (error) {
    console.error('Error in slides API:', error)
    return NextResponse.json([], { status: 500 })
  }
}

