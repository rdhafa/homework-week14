import { prisma } from "@/lib/prisma.mjs";
import { join } from "path";
import { NextResponse as res } from "next/server";
import { writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";

export async function GET (req) {
  try {
    const books = await prisma.book.findMany()
    return res.json(books, {status: 200})
  } catch (err) {
    console.log(err)
  }
}

export async function POST (req) {
  const reqBody = await req.formData()
  const file = reqBody.get('image')
  if (!file) return res.json({ success: false })

  const imageUrl = `uploads/${Date.now() + '-' + file.name}`
  try {
    const addABook = await prisma.book.create({
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
    const path = join('./public/', imageUrl)
    await writeFile(path, buffer)
    revalidatePath('/')
    return res.json(addABook, { status: 200 })
  } catch (err) {
    console.log(err)
  }
}