import { prisma } from "@/lib/prisma.mjs";
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