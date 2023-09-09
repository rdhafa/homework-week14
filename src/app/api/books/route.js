import { prisma } from "@/lib/prisma.mjs";
import { NextResponse as res } from "next/server";

export async function GET(req) {
  try {
    const books = await prisma.book.findMany()
    return res.json(books, {status: 200})
  } catch (err) {
    console.log(err)
  }
}