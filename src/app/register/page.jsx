"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Swal from "sweetalert2"

export default function Register () {
  const [nameValue, setNameValue] = useState('')
  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('')
  const [passwordMatch, setPasswordMatch] = useState(true)
  const [error, setError] = useState(false)
  const router = useRouter()

  const Toast = Swal.mixin({
    toast: true,
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  })

  const handleRegister = (event) => {
    event.preventDefault()

  }

  return (
    <>
      <div className="w-screen">
        <div className="w-6/12 mx-auto mt-6 pb-8">
          <h1 className="text-4xl text-center font-medium mb-4">Register an Account</h1>
          <div className="bg-teal-100 p-4 rounded-md">
            <form onSubmit={handleRegister}>
              <div className="w-9/12 flex flex-col mx-auto py-4">
                <label htmlFor="name" className='block font-medium mb-0.5'>Name</label>
                <input 
                  id='name'
                  type="text" 
                  name='name' 
                  placeholder='Komeng' 
                  required 
                  autoFocus 
                  className='border border-slate-300 bg-white rounded w-full px-3 py-1 focus:outline-none focus:ring-1 focus:ring-sky-400'
                />

                <label htmlFor="email" className='block font-medium mb-0.5'>Email</label>
                <input 
                  id='email'
                  type="email" 
                  name='email' 
                  placeholder='komeng@mail.com' 
                  required 
                  className='border border-slate-300 bg-white rounded w-full px-3 py-1 focus:outline-none focus:ring-1 focus:ring-sky-400'
                />

                <label htmlFor="password" className='block font-medium mb-0.5'>Password</label>
                <input 
                  id='password'
                  type="password" 
                  name='password' 
                  required 
                  className='border border-slate-300 bg-white rounded w-full px-3 py-1 focus:outline-none focus:ring-1 focus:ring-sky-400'
                />

                <label htmlFor="password2" className='block font-medium mb-0.5'>Confirm Password</label>
                <input 
                  id='password2'
                  type="password" 
                  name='password2' 
                  required 
                  className='border border-slate-300 bg-white rounded w-full px-3 py-1 focus:outline-none focus:ring-1 focus:ring-sky-400'
                />

                <button 
                  type="submit" 
                  className='font-medium bg-teal-500 w-full mt-4 rounded-md text-white py-1 hover:ring-2 hover:ring-teal-500 hover:ring-offset-2'
                >Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}