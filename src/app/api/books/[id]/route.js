import { prisma } from "@/lib/prisma.mjs";
import { revalidatePath } from "next/cache";
import { NextResponse as res } from "next/server";
import { join } from "path";
import { writeFile } from 'fs/promises'

export async function GET (req, {params}) {
  try {
    const {id} = params
    const book = await prisma.book.findUnique({ where: { id: +id } })
    return res.json(book)
  } catch (err) {
    console.log(err)
  }
}

export async function PUT (req, {params}) {
  const reqBody = await req.formData()
  const file = reqBody.get('image')
  try {
    const {id} = params
    if (file.size === 0) {
      const updateBook = await prisma.book.update({ 
        where: { id: +id },
        data: {
          title: reqBody.get('title'),
          author: reqBody.get('author'),
          publisher: reqBody.get('publisher'),
          year: +reqBody.get('year'),
          pages: +reqBody.get('pages')
        }
      })
      revalidatePath('/')
      return res.json(updateBook)
    } else {
      const imageUrl = `/uploads/${Date.now() + '-' + file.name}`
      const updateBook = await prisma.book.update({ 
        where: { id: +id },
        data: {
          title: reqBody.get('title'),
          author: reqBody.get('author'),
          publisher: reqBody.get('publisher'),
          year: +reqBody.get('year'),
          pages: +reqBody.get('pages'),
          image: imageUrl
        }
      })
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const path = join('./public', imageUrl)
      await writeFile(path, buffer)
      revalidatePath('/')
      return res.json(updateBook)
    }
  } catch (err) {
    console.log(err)
  }
}

export async function DELETE (req, {params}) {
  try {
    const {id} = params
    const deleteBook = await prisma.book.delete({ where: { id: +id } })
    revalidatePath('/')
    return res.json(deleteBook)
  } catch (err) {
    console.log(err)
  }
}