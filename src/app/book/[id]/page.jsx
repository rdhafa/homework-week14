// import DeleteButton from "@/app/components/DeleteButton"
"use client"
import Image from "next/image"
import Link from "next/link"

export default async function Book ({params}) {
  const res = await fetch(`http://localhost:3000/api/books/${params.id}`)
  const book = await res.json()

  const handleDelete = async () => {
    await console.log('delesiong')
  }

  return (
    <>
      <div className="w-screen">
        <div className="bg-teal-100 w-3/5 mx-auto my-10 py-8 rounded border-2 border-teal-200">
          <div className="grid grid-cols-2">
            <Image 
              src={`/${book.image}`}
              width={160}
              height={140}
              style={{margin: 'auto', width: '15rem', height: 'auto'}}
              alt={book.title}
              priority={true}
            />

            <div className="book-details">
              <span><h2 className="text-lg font-medium inline">{book.author}</h2>'s</span>
              <h1 className="text-3xl font-semibold -mt-2">{book.title}</h1>

              <h3 className="text-md font-medium mt-4">Publisher</h3>
              <h4>{book.publisher}</h4>

              <h3 className="text-md font-medium mt-4">Pages</h3>
              <h4>{book.pages}</h4>

              <h3 className="text-md font-medium mt-4">Year Released</h3>
              <h4>{book.year}</h4>

              <div className="buttons mt-4 text-white font-medium">
                <Link href={`/editbook/${book.id}`}>
                  <button className="transition px-3 py-1.5 bg-teal-500 rounded-md mr-4 hover:text-teal-500 hover:bg-teal-200 hover:ease-in-out">Edit</button>
                </Link>
                {/* <DeleteButton/> */}
                <button 
                  onClick={handleDelete}
                  className="transition px-3 py-1.5 bg-red-500 rounded-md mr-4 hover:text-red-500 hover:bg-red-200 hover:ease-in-out"
                  >Delete
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}