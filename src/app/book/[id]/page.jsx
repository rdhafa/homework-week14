'use client'
import DeleteButton from "@/app/components/DeleteButton"
import { verifyToken } from "@/lib/verifyToken"
import Cookies from "js-cookie"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Book ({params}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [aBook, setABook] = useState()

  useEffect(() => {
    const authenticate = async () => {
      const tokenCookie = Cookies.get("jwt_token")
      if (!tokenCookie) {
        setIsAuthenticated(false)
        return
      }
      try {
        await verifyToken(tokenCookie)
        setIsAuthenticated(true)
      } catch (err) {
        setIsAuthenticated(false)
      }
    }
    authenticate()
    const getABook = async () => {
      const res = await fetch(`http://localhost:3000/api/books/${params.id}`)
      const book = await res.json()
      setABook(book)
    }
    getABook()
  }, [params])

  return (
    <>
    {aBook && (
      <div className="w-screen">
        <div className="bg-teal-100 w-3/5 mx-auto my-10 py-8 rounded border-2 border-teal-200">
          <div className="grid grid-cols-2">
            <Image 
              src={aBook.image}
              width={185}
              height={270}
              style={{margin: 'auto', width: '15rem', height: 'auto'}}
              alt={aBook.title}
              priority={true}
            />

            <div className="book-details">
              <span><h2 className="text-lg font-medium inline">{aBook.author}</h2>'s</span>
              <h1 className="text-3xl font-semibold -mt-2">{aBook.title}</h1>

              <h3 className="text-md font-medium mt-4">Publisher</h3>
              <h4>{aBook.publisher}</h4>

              <h3 className="text-md font-medium mt-4">Pages</h3>
              <h4>{aBook.pages}</h4>

              <h3 className="text-md font-medium mt-4">Year Released</h3>
              <h4>{aBook.year}</h4>

              <div id="overlay"/>
              {isAuthenticated && (
                <div className="buttons mt-4 text-white font-medium">
                  <Link href={`/editbook/${aBook.id}`}>
                    <button className="transition px-3 py-1.5 bg-teal-500 rounded-md mr-4 hover:text-teal-500 hover:bg-teal-200 hover:ease-in-out">Edit</button>
                  </Link>
                  <DeleteButton bookId={aBook.id} bookTitle={aBook.title}/>
                </div>
              )}
              
            </div>
          </div>
        </div>

      </div>
    )}
      
    </>
  )
}