'use server'

import fs from 'fs'
import path from 'path'
import { revalidatePath } from 'next/cache'

const DB_PATH = path.join(process.cwd(), 'lib/db.json')

function readDB() {
  try {
    if (!fs.existsSync(DB_PATH)) {
      const initialDB = { products: [], settings: { logo: '', whatsapp: '' }, slides: [] }
      fs.writeFileSync(DB_PATH, JSON.stringify(initialDB, null, 2))
      return initialDB
    }
    const data = fs.readFileSync(DB_PATH, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading database:', error)
    return { products: [], settings: { logo: '', whatsapp: '' }, slides: [] }
  }
}

function writeDB(data) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2))
  } catch (error) {
    console.error('Error writing database:', error)
    throw new Error('Failed to save data')
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
    // Validation
    if (!product.title || !product.price || !product.category) {
      throw new Error('Missing required fields: title, price, and category are required.')
    }
    if (!Array.isArray(product.images) || product.images.length === 0) {
      throw new Error('At least one image is required.')
    }

    const db = readDB()
    const newProduct = {
      ...product,
      id: Date.now().toString(),
    }
    db.products.push(newProduct)
    writeDB(db)
    revalidatePath('/')
    revalidatePath('/admin')
    return { success: true }
  } catch (error) {
    console.error('Error in addProduct:', error)
    throw error
  }
}

export async function updateProduct(id, updatedProduct) {
  try {
    // Validation
    if (!updatedProduct.title || !updatedProduct.price || !updatedProduct.category) {
      throw new Error('Missing required fields: title, price, and category are required.')
    }
    if (!Array.isArray(updatedProduct.images) || updatedProduct.images.length === 0) {
      throw new Error('At least one image is required.')
    }

    const db = readDB()
    const index = db.products.findIndex(p => p.id === id)
    if (index !== -1) {
      db.products[index] = { ...updatedProduct, id }
      writeDB(db)
      revalidatePath('/')
      revalidatePath(`/product/${id}`)
      revalidatePath('/admin')
      return { success: true }
    }
    throw new Error('Product not found')
  } catch (error) {
    console.error('Error in updateProduct:', error)
    throw error
  }
}

export async function deleteProduct(id) {
  try {
    const db = readDB()
    db.products = db.products.filter(p => p.id !== id)
    writeDB(db)
    revalidatePath('/')
    revalidatePath('/admin')
    return { success: true }
  } catch (error) {
    console.error('Error in deleteProduct:', error)
    throw error
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
    writeDB(db)
    revalidatePath('/')
    revalidatePath('/admin')
    return { success: true }
  } catch (error) {
    console.error('Error in updateSettings:', error)
    throw error
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
    writeDB(db)
    revalidatePath('/')
    revalidatePath('/admin')
    return { success: true }
  } catch (error) {
    console.error('Error in updateSlides:', error)
    throw error
  }
}
