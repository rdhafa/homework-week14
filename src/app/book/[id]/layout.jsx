export async function generateMetadata({ params }) {
  const {id} = params
  const res = await fetch(`http://localhost:3000/api/books/${id}`)
  const book = await res.json()
  return {
    title: `My Bookstore - ${book.title}`
  }
}

export default function BookLayout({ children }) {
  return (
    {...children}
  )
}
