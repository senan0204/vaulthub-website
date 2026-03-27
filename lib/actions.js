'use server'

import fs from 'fs'
import path from 'path'
import { revalidatePath } from 'next/cache'

const DB_PATH = path.join(process.cwd(), 'lib/db.json')

function readDB() {
  const data = fs.readFileSync(DB_PATH, 'utf-8')
  return JSON.parse(data)
}

function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2))
}

export async function getProducts() {
  const db = readDB()
  return db.products
}

export async function getProductById(id) {
  const products = await getProducts()
  return products.find(p => p.id === id)
}

export async function addProduct(product) {
  const db = readDB()
  const newProduct = {
    ...product,
    id: Date.now().toString(),
  }
  db.products.push(newProduct)
  writeDB(db)
  revalidatePath('/')
  revalidatePath('/admin')
}

export async function updateProduct(id, updatedProduct) {
  const db = readDB()
  const index = db.products.findIndex(p => p.id === id)
  if (index !== -1) {
    db.products[index] = { ...updatedProduct, id }
    writeDB(db)
    revalidatePath('/')
    revalidatePath(`/product/${id}`)
    revalidatePath('/admin')
  }
}

export async function deleteProduct(id) {
  const db = readDB()
  db.products = db.products.filter(p => p.id !== id)
  writeDB(db)
  revalidatePath('/')
  revalidatePath('/admin')
}

export async function getSettings() {
  const db = readDB()
  return db.settings || { logo: '' }
}

export async function updateSettings(settings) {
  const db = readDB()
  db.settings = { ...db.settings, ...settings }
  writeDB(db)
  revalidatePath('/')
  revalidatePath('/admin')
}

export async function getSlides() {
  const db = readDB()
  return db.slides || []
}

export async function updateSlides(slides) {
  const db = readDB()
  db.slides = slides
  writeDB(db)
  revalidatePath('/')
  revalidatePath('/admin')
}
