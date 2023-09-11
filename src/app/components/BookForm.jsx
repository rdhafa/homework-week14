'use client'
import Image from "next/image"
import { useState } from "react"
import Swal from "sweetalert2"

export default function BookForm (bookData) {
  const [titleValue, setTitleValue] = useState(bookData?.title || null)
  const [authorValue, setAuthorValue] = useState(bookData?.author || null)
  const [publisherValue, setPublisherValue] = useState(bookData?.publisher || null)
  const [yearValue, setYearValue] = useState(bookData?.year || null)
  const [pagesValue, setPagesValue] = useState(bookData?.pages || null)
  const [selectedImage, setSelectedImage] = useState(bookData?.image || null)
  const [selectedImageName, setSelectedImageName] = useState()
  const [error, setError] = useState(false)

  const Toast = Swal.mixin({
    toast: true,
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  })

  const titleInputValue = (e) => {
    e.preventDefault()
    setTitleValue(e.target.value)
  }

  const publisherInputValue = (e) => {
    e.preventDefault()
    setPublisherValue(e.target.value)
  }

  const selectedImageValue = (e) => {
    e.preventDefault()
    const file = e.target.files[0]
    setSelectedImage(URL.createObjectURL(file))
    setSelectedImageName(file.name)
  }

  const regexLettersOnly = /[^a-zA-Z '-]+/g
  const authorInputValidation = (e) => {
    e.preventDefault()
    setAuthorValue(e.target.value.replace(regexLettersOnly, ''))
  }

  const regexNumbersOnly = /[^0-9]+/g
  const yearInputValidation = (e) => {
    e.preventDefault()
    setYearValue(e.target.value.replace(regexNumbersOnly, ''))
  }

  const pagesInputValidation = (e) => {
    e.preventDefault()
    setPagesValue(e.target.value.replace(regexNumbersOnly, ''))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!selectedImage) {
      const errMessage = 'Please Select an Image'
      setError(errMessage)
      Toast.fire({
        icon: 'error',
        title: 'Form Error!',
        text: errMessage,
        position: top
      })
    }
    const formData = new FormData(event.target)
    try {
      const addABook = await fetch('http://localhost:3000/api/books', {
        method: 'POST',
        body: formData
      })
      if (addABook.status === 200) {
        setSelectedImage(null)
        Toast.fire({
          icon: 'success',
          title: 'Add Book Success!',
          text: 'Book added successfully!',
          position: 'top-end'
        })
        setTimeout(() => {
          window.location.href = '/'
        }, 2000)
      } else {
        throw await addABook.json()
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      <div className="w-screen">
        <div className="w-5/12 mx-auto mt-6">
          <h1 className="text-4xl text-center font-medium mb-4">Add a Book</h1>
          <div className="bg-teal-100 px-4 py-8 rounded-md border-2 border-teal-200">
            <form onSubmit={handleSubmit}>
              {error && (
                <div>
                  <p className="text-center text-red-500 text-md">{error}</p>
                </div>
              )}
              <div className="w-9/12 flex flex-col mx-auto">
                <label htmlFor="title" className='block font-medium mb-0.5'>Book Title</label>
                <input 
                  id='title'
                  type="text" 
                  name='title' 
                  placeholder='Malioboro at Midnight' 
                  autoComplete="off"
                  required 
                  autoFocus 
                  onChange={(e) => {titleInputValue(e)}}
                  value={titleValue}
                  className='border border-slate-300 bg-white rounded w-full px-3 py-1 mb-4 focus:outline-none focus:ring-1 focus:ring-sky-400'
                />

                <label htmlFor="author" className='block font-medium mb-0.5'>Author</label>
                <input 
                  id='author'
                  type="text" 
                  name='author' 
                  placeholder='skysphire' 
                  autoComplete="off"
                  required 
                  onChange={(e) => {authorInputValidation(e)}}
                  value={authorValue}
                  className='border border-slate-300 bg-white rounded w-full px-3 py-1 mb-4 focus:outline-none focus:ring-1 focus:ring-sky-400'
                />

                <label htmlFor="publisher" className='block font-medium mb-0.5'>Publisher</label>
                <input 
                  id='publisher'
                  type="text" 
                  name='publisher' 
                  placeholder="Bukune"
                  autoComplete="off"
                  required 
                  onChange={(e) => {publisherInputValue(e)}}
                  value={publisherValue}
                  className='border border-slate-300 bg-white rounded w-full px-3 py-1 mb-4 focus:outline-none focus:ring-1 focus:ring-sky-400'
                />

                <label htmlFor="year" className='block font-medium mb-0.5'>Year</label>
                <input 
                  id='year'
                  type="text" 
                  name='year'
                  placeholder="2023"
                  autoComplete="off" 
                  required 
                  onChange={(e) => {yearInputValidation(e)}}
                  value={yearValue}
                  className='border border-slate-300 bg-white rounded w-full px-3 py-1 mb-4 focus:outline-none focus:ring-1 focus:ring-sky-400'
                />
                
                <label htmlFor="pages" className='block font-medium mb-0.5'>Pages</label>
                <input 
                  id='pages'
                  type="text" 
                  name='pages'
                  placeholder="436"
                  autoComplete="off" 
                  required 
                  onChange={(e) => {pagesInputValidation(e)}}
                  value={pagesValue}
                  className='border border-slate-300 bg-white rounded w-full px-3 py-1 mb-4 focus:outline-none focus:ring-1 focus:ring-sky-400'
                />

                <label htmlFor="image" className='block font-medium mb-0.5'>Book's Cover</label>
                {selectedImage && (
                  <div className="drop-shadow-xl my-4">
                    <Image
                      src={selectedImage}
                      width={160}
                      height={140}
                      style={{margin: 'auto', width: '10rem', height: 'auto'}}
                      alt={selectedImageName}
                    />
                  </div>
                )}
                <input 
                  id='image'
                  type="file" 
                  name='image' 
                  required 
                  onChange={(e) => {selectedImageValue(e)}}
                  className='border border-slate-300 bg-white rounded w-full px-3 py-1 mb-4 focus:outline-none focus:ring-1 focus:ring-sky-400'
                />

                <button 
                  type="submit" 
                  className='transition font-medium bg-teal-500 w-full mt-4 rounded-md text-white py-1 hover:text-teal-500 hover:bg-teal-200 hover:ease-in-out'
                >Add Book</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}