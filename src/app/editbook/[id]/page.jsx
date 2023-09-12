import BookForm from "@/app/components/BookForm"
import { prisma } from "@/lib/prisma.mjs"

export default async function EditBook ({ params }) {
  const book = await prisma.book.findUnique({ where: { id: +params.id } })
  return (
    <>
      <BookForm bookData={book}/>
    </>
  )
}