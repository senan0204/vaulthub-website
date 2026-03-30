'use server'

import { revalidatePath } from 'next/cache'
import { db } from './firebase'
import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  setDoc,
  query,
  orderBy
} from 'firebase/firestore'

// Products Collection
export async function getProducts() {
  try {
    const productsCol = collection(db, 'products')
    const q = query(productsCol, orderBy('id', 'desc'))
    const productSnapshot = await getDocs(q)
    const productList = productSnapshot.docs.map(doc => ({
      ...doc.data(),
      firebaseId: doc.id
    }))
    return productList
  } catch (error) {
    console.error('Error in getProducts:', error)
    return []
  }
}

export async function getProductById(id) {
  try {
    const products = await getProducts()
    return products.find(p => p.id === id)
  } catch (error) {
    console.error('Error in getProductById:', error)
    return null
  }
}

export async function addProduct(product) {
  try {
    if (!product?.title || !product?.price || !product?.category) {
      return { success: false, error: 'Missing required fields: title, price, and category are required.' }
    }
    if (!Array.isArray(product?.images) || product.images.length === 0) {
      return { success: false, error: 'At least one image is required.' }
    }

    const safeProduct = {
      title: product?.title || "Untitled",
      price: product?.price || "0",
      category: product?.category || "general",
      type: product?.type || "account",
      status: product?.status || "available",
      description: product?.description || "",
      images: Array.isArray(product?.images) ? product.images : [],
      video: product?.video || "",
      isHotDeal: !!product?.isHotDeal,
      isPremium: !!product?.isPremium,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }

    const productsCol = collection(db, 'products')
    await addDoc(productsCol, safeProduct)
    
    revalidatePath('/')
    revalidatePath('/admin')
    return { success: true }
  } catch (error) {
    console.error('Error in addProduct:', error)
    return { success: false, error: error.message || 'Internal Server Error' }
  }
}

export async function updateProduct(firebaseId, updatedProduct) {
  try {
    if (!firebaseId) return { success: false, error: 'Firebase ID is required for update' }

    const safeProduct = {
      title: updatedProduct?.title || "Untitled",
      price: updatedProduct?.price || "0",
      category: updatedProduct?.category || "general",
      type: updatedProduct?.type || "account",
      status: updatedProduct?.status || "available",
      description: updatedProduct?.description || "",
      images: Array.isArray(updatedProduct?.images) ? updatedProduct.images : [],
      video: updatedProduct?.video || "",
      isHotDeal: !!updatedProduct?.isHotDeal,
      isPremium: !!updatedProduct?.isPremium,
      updatedAt: new Date().toISOString()
    }

    const productRef = doc(db, 'products', firebaseId)
    await updateDoc(productRef, safeProduct)
    
    revalidatePath('/')
    revalidatePath(`/product/${updatedProduct.id}`)
    revalidatePath('/admin')
    return { success: true }
  } catch (error) {
    console.error('Error in updateProduct:', error)
    return { success: false, error: error.message || 'Internal Server Error' }
  }
}

export async function deleteProduct(firebaseId) {
  try {
    if (!firebaseId) return { success: false, error: 'Firebase ID is required for deletion' }
    
    const productRef = doc(db, 'products', firebaseId)
    await deleteDoc(productRef)
    
    revalidatePath('/')
    revalidatePath('/admin')
    return { success: true }
  } catch (error) {
    console.error('Error in deleteProduct:', error)
    return { success: false, error: error.message || 'Internal Server Error' }
  }
}

// Settings Collection
export async function getSettings() {
  try {
    const settingsRef = doc(db, 'config', 'settings')
    const settingsSnap = await getDoc(settingsRef)
    
    if (settingsSnap.exists()) {
      return settingsSnap.data()
    } else {
      const defaultSettings = { logo: '', whatsapp: '919752691095' }
      await setDoc(settingsRef, defaultSettings)
      return defaultSettings
    }
  } catch (error) {
    console.error('Error in getSettings:', error)
    return { logo: '', whatsapp: '919752691095' }
  }
}

export async function updateSettings(settings) {
  try {
    const settingsRef = doc(db, 'config', 'settings')
    await setDoc(settingsRef, settings, { merge: true })
    
    revalidatePath('/')
    revalidatePath('/admin')
    return { success: true }
  } catch (error) {
    console.error('Error in updateSettings:', error)
    return { success: false, error: error.message || 'Internal Server Error' }
  }
}

// Slides Collection
export async function getSlides() {
  try {
    const slidesCol = collection(db, 'slides')
    const q = query(slidesCol, orderBy('createdAt', 'asc'))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({
      ...doc.data(),
      firebaseId: doc.id
    }))
  } catch (error) {
    console.error('Error in getSlides:', error)
    return []
  }
}

export async function addSlide(slide) {
  try {
    const slidesCol = collection(db, 'slides')
    await addDoc(slidesCol, {
      ...slide,
      createdAt: new Date().toISOString()
    })
    revalidatePath('/')
    revalidatePath('/admin')
    return { success: true }
  } catch (error) {
    console.error('Error in addSlide:', error)
    return { success: false, error: error.message }
  }
}

export async function updateSlide(firebaseId, slide) {
  try {
    const slideRef = doc(db, 'slides', firebaseId)
    await updateDoc(slideRef, slide)
    revalidatePath('/')
    revalidatePath('/admin')
    return { success: true }
  } catch (error) {
    console.error('Error in updateSlide:', error)
    return { success: false, error: error.message }
  }
}

export async function deleteSlide(firebaseId) {
  try {
    const slideRef = doc(db, 'slides', firebaseId)
    await deleteDoc(slideRef)
    revalidatePath('/')
    revalidatePath('/admin')
    return { success: true }
  } catch (error) {
    console.error('Error in deleteSlide:', error)
    return { success: false, error: error.message }
  }
}

export async function updateSlides(slides) {
  // This function is now deprecated in favor of individual updates
  // but we keep it for compatibility during migration if needed
  try {
    const slidesCol = collection(db, 'slides')
    // Batch update logic could go here if needed, but we'll use individual ones
    return { success: true }
  } catch (error) {
    console.error('Error in updateSlides:', error)
    return { success: false, error: error.message }
  }
}
