import Image from "next/image"
import Link from "next/link"

export default async function Home() {
  const res = await fetch('http://localhost:3000/api/books')
  const books = await res.json()
  return (
    <>
      <div className="w-4/5 mx-auto">
        <div className="grid grid-cols-3 gap-x-6 gap-y-8 py-8 mx-auto justify-items-center">
          {books.map((book) => {
          const titleEllipsis = `${book.title} (${book.year})`
            return (
              <Link href={`/book/${book.id}`} key={book.id} >
                <div className="card w-64 text-center rounded overflow-hidden drop-shadow-xl">
                  <div className="card-header p-4 bg-teal-100 h-68">
                    <Image 
                      src={`/${book.image}`}
                      width={150}
                      height={130}
                      style={{margin: 'auto', width: 'auto', height: '13rem'}}
                      alt={book.title}
                      priority={true}
                    />
                  </div>
                  <div className="card-body bg-white p-2">
                    <h1 className="font-semibold text-2xl line-clamp-1 py-2" key={book.id} title={titleEllipsis}>
                      {book.title}
                    </h1>
                    <div className="text-sm pb-4">
                      <p className="line-clamp-1" title={`by: ${book.author}`}>by: {book.author}</p>
                      <p className="line-clamp-1" title={`publisher: ${book.publisher}`}>publisher: {book.publisher}</p>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}

