'use server'

import fs from 'fs'
import path from 'path'
import { revalidatePath } from 'next/cache'

const DB_PATH = path.join(process.cwd(), 'lib/db.json')

function readDB() {
  try {
    const dir = path.dirname(DB_PATH)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    
    if (!fs.existsSync(DB_PATH)) {
      const initialDB = { products: [], settings: { logo: '', whatsapp: '' }, slides: [] }
      fs.writeFileSync(DB_PATH, JSON.stringify(initialDB, null, 2))
      return initialDB
    }
    
    const data = fs.readFileSync(DB_PATH, 'utf-8')
    if (!data.trim()) {
      return { products: [], settings: { logo: '', whatsapp: '' }, slides: [] }
    }
    
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading database:', error)
    return { products: [], settings: { logo: '', whatsapp: '' }, slides: [] }
  }
}

function writeDB(data) {
  try {
    const dir = path.dirname(DB_PATH)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2))
    return true
  } catch (error) {
    console.error('Error writing database:', error)
    return false
  }
}

export async function getProducts() {
  try {
    const db = readDB()
    return db.products || []
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
    // Safe data handling
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
      isPremium: !!product?.isPremium
    }

    // Validation
    if (!product?.title || !product?.price || !product?.category) {
      return { success: false, error: 'Missing required fields: title, price, and category are required.' }
    }
    if (!Array.isArray(product?.images) || product.images.length === 0) {
      return { success: false, error: 'At least one image is required.' }
    }

    const db = readDB()
    const newProduct = {
      ...safeProduct,
      id: Date.now().toString(),
    }
    db.products.push(newProduct)
    
    if (writeDB(db)) {
      revalidatePath('/')
      revalidatePath('/admin')
      return { success: true }
    } else {
      return { success: false, error: 'Failed to write to database' }
    }
  } catch (error) {
    console.error('Error in addProduct:', error)
    return { success: false, error: error.message || 'Internal Server Error' }
  }
}

export async function updateProduct(id, updatedProduct) {
  try {
    if (!id) return { success: false, error: 'Product ID is required for update' }

    // Safe data handling
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
      isPremium: !!updatedProduct?.isPremium
    }

    // Validation
    if (!updatedProduct?.title || !updatedProduct?.price || !updatedProduct?.category) {
      return { success: false, error: 'Missing required fields: title, price, and category are required.' }
    }
    if (!Array.isArray(updatedProduct?.images) || updatedProduct.images.length === 0) {
      return { success: false, error: 'At least one image is required.' }
    }

    const db = readDB()
    const index = db.products.findIndex(p => p.id === id)
    if (index !== -1) {
      db.products[index] = { ...safeProduct, id }
      if (writeDB(db)) {
        revalidatePath('/')
        revalidatePath(`/product/${id}`)
        revalidatePath('/admin')
        return { success: true }
      } else {
        return { success: false, error: 'Failed to write to database' }
      }
    }
    return { success: false, error: 'Product not found' }
  } catch (error) {
    console.error('Error in updateProduct:', error)
    return { success: false, error: error.message || 'Internal Server Error' }
  }
}

export async function deleteProduct(id) {
  try {
    if (!id) return { success: false, error: 'Product ID is required for deletion' }
    
    const db = readDB()
    const initialLength = db.products.length
    db.products = db.products.filter(p => p.id !== id)
    
    if (db.products.length === initialLength) {
      return { success: false, error: 'Product not found' }
    }
    
    if (writeDB(db)) {
      revalidatePath('/')
      revalidatePath('/admin')
      return { success: true }
    } else {
      return { success: false, error: 'Failed to write to database' }
    }
  } catch (error) {
    console.error('Error in deleteProduct:', error)
    return { success: false, error: error.message || 'Internal Server Error' }
  }
}

export async function getSettings() {
  try {
    const db = readDB()
    return db.settings || { logo: '', whatsapp: '' }
  } catch (error) {
    console.error('Error in getSettings:', error)
    return { logo: '', whatsapp: '' }
  }
}

export async function updateSettings(settings) {
  try {
    const db = readDB()
    db.settings = { ...db.settings, ...settings }
    if (writeDB(db)) {
      revalidatePath('/')
      revalidatePath('/admin')
      return { success: true }
    } else {
      return { success: false, error: 'Failed to write to database' }
    }
  } catch (error) {
    console.error('Error in updateSettings:', error)
    return { success: false, error: error.message || 'Internal Server Error' }
  }
}

export async function getSlides() {
  try {
    const db = readDB()
    return db.slides || []
  } catch (error) {
    console.error('Error in getSlides:', error)
    return []
  }
}

export async function updateSlides(slides) {
  try {
    const db = readDB()
    db.slides = slides
    if (writeDB(db)) {
      revalidatePath('/')
      revalidatePath('/admin')
      return { success: true }
    } else {
      return { success: false, error: 'Failed to write to database' }
    }
  } catch (error) {
    console.error('Error in updateSlides:', error)
    return { success: false, error: error.message || 'Internal Server Error' }
  }
}
