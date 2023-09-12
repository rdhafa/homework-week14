export async function generateMetadata({ params }) {
  const {id} = params
  const res = await fetch(`http://localhost:3000/api/books/${id}`)
  const book = await res.json()
  return {
    title: `My Bookstore - Edit ${book.title} (${book.year})`
  }
}

export default function EditBookLayout({ children }) {
  return (
    {...children}
  )
}
