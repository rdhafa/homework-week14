"use client"
import Swal from "sweetalert2"

export default function DeleteButton ({bookId, bookTitle}) {
  
  const DeletePrompt = Swal.mixin({
    customClass: {
      cancelButton: 'transition text-white font-medium px-3 py-1.5 bg-gray-500 rounded-md mr-6 hover:text-gray-500 hover:bg-gray-200 hover:ease-in-out',
      confirmButton: 'transition text-white font-medium px-3 py-1.5 bg-red-500 rounded-md ml-6 hover:text-red-500 hover:bg-red-200 hover:ease-in-out'
    },
    buttonsStyling: false
  })

  const Toast = Swal.mixin({
    toast: true,
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  })

  const deleteABook = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/books/${bookId}`, {
        method: 'DELETE'
      })
      if (res.status === 200) {
        document.getElementById('overlay').style.display = 'block';
        Toast.fire({
          icon: 'success',
          title: 'Delete Success!',
          text: `"${bookTitle}" has been deleted`,
          position: 'top-end'
        })
        setTimeout(() => {
          window.location.href = '/'
          setTimeout(() => {
            document.getElementById('overlay').style.display = 'none';
          }, 1000)
        }, 2000)
      } else {
        throw res
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleDelete = async () => {
    DeletePrompt.fire({
      icon: 'warning',
      title: `You sure want to delete\n"${bookTitle}"?`,
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonText: 'Delete'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteABook()
      }
      })
    }
  
  return (
    <button 
      onClick={handleDelete}
      className="transition px-3 py-1.5 bg-red-500 rounded-md mr-4 hover:text-red-500 hover:bg-red-200 hover:ease-in-out"
      >Delete
    </button>
  )
}