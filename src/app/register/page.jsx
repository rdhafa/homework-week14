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

  const regexLettersOnly = /[^a-zA-Z '-]+/g
  const nameInputValidation = (e) => {
    e.preventDefault()
    setNameValue(e.target.value.replace(regexLettersOnly, ""))
  }

  const emailRegex = /[^a-zA-Z0-9.@]+/g
  const emailInputValidation = (e) => {
    e.preventDefault()
    setEmailValue(e.target.value.replace(emailRegex, ""))
  }

  const passwordInputValue = (e) => {
    e.preventDefault()
    setPasswordValue(e.target.value)
  }

  const confirmPasswordInputValue = (e) => {
    e.preventDefault()
    const confirmPassword = e.target.value
    setConfirmPasswordValue(confirmPassword)
    if (passwordValue !== confirmPassword) {
      setPasswordMatch(false)
    } else if (passwordValue === confirmPassword) {
      setPasswordMatch(true)
    }
  }

  const handleRegister = async (event) => {
    event.preventDefault()
    const user = {
      name: nameValue,
      email: emailValue,
      password: passwordValue
    }
    try {
      if (!passwordMatch) {
        const errMessage = 'Password does not Match!'
        setError(errMessage)
        throw new Error(errMessage)
      }
      const register = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      })
      if (register.status === 200) {
        event.target.reset()
        Toast.fire({
          icon: 'success',
          title: 'Register Success!',
          text: 'Thank you for Registering!',
          position: 'top-end'
        })
        setError(false)
        router.push('/')
      } else {
        throw await register.json()
      }
    } catch (err) {
      setError(err.message)
      Toast.fire({
        icon: 'error',
        title: 'Register Error!',
        text: err.message,
        position: 'top'
      })
    }
  }

  return (
    <>
      <div className="w-screen">
        <div className="w-5/12 mx-auto mt-6 pb-8">
          <h1 className="text-4xl text-center font-medium mb-4">Register an Account</h1>
          <div className="bg-teal-100 px-4 py-8 rounded-md border-2 border-teal-200">
            <form onSubmit={handleRegister}>
              {error && (
                <div>
                  <p className="text-center text-red-500 text-md">{error}</p>
                </div>
              )}
              <div className="w-9/12 flex flex-col mx-auto">
                <label htmlFor="name" className='block font-medium mb-0.5'>Name</label>
                <input 
                  id='name'
                  type="text" 
                  name='name' 
                  placeholder='Komeng' 
                  autoComplete="off"
                  required 
                  autoFocus 
                  onChange={(e) => {nameInputValidation(e)}}
                  value={nameValue}
                  className='border border-slate-300 bg-white rounded w-full px-3 py-1 mb-4 focus:outline-none focus:ring-1 focus:ring-sky-400'
                />

                <label htmlFor="email" className='block font-medium mb-0.5'>Email</label>
                <input 
                  id='email'
                  type="email" 
                  name='email' 
                  placeholder='komeng@mail.com' 
                  autoComplete="off"
                  required 
                  onChange={(e) => {emailInputValidation(e)}}
                  value={emailValue}
                  className='border border-slate-300 bg-white rounded w-full px-3 py-1 mb-4 focus:outline-none focus:ring-1 focus:ring-sky-400'
                />

                <label htmlFor="password" className='block font-medium mb-0.5'>Password</label>
                <input 
                  id='password'
                  type="password" 
                  name='password' 
                  required 
                  onChange={(e) => {passwordInputValue(e)}}
                  value={passwordValue}
                  className='border border-slate-300 bg-white rounded w-full px-3 py-1 mb-4 focus:outline-none focus:ring-1 focus:ring-sky-400'
                />

                <label htmlFor="password2" className='block font-medium mb-0.5'>Confirm Password</label>
                <input 
                  id='password2'
                  type="password" 
                  name='password2' 
                  required 
                  onChange={(e) => {confirmPasswordInputValue(e)}}
                  value={confirmPasswordValue}
                  className='border border-slate-300 bg-white rounded w-full px-3 py-1 mb-4 focus:outline-none focus:ring-1 focus:ring-sky-400'
                />
                
                {!passwordMatch && (
                  <p className="text-sm text-red-500 -mt-4">Password doesn't match</p>
                )}

                <button 
                  type="submit" 
                  className='transition font-medium bg-teal-500 w-full mt-4 rounded-md text-white py-1 hover:text-teal-500 hover:bg-teal-200 hover:ease-in-out'
                >Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}