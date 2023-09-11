import { prisma } from "@/lib/prisma.mjs";
import { revalidatePath } from "next/cache";
import { NextResponse as res } from "next/server";

export async function GET (req, {params}) {
  try {
    const {id} = params
    const book = await prisma.book.findUnique({ where: { id: +id } })
    return res.json(book)
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