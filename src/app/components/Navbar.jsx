"use client"
import Link from 'next/link'
import '../globals.css'
import Swal from 'sweetalert2'
import { verifyToken } from '@/lib/verifyToken'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { usePathname, useRouter } from 'next/navigation'

export default function Navbar () {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  const [inAddbook, setInAddbook] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  const authenticate = async () => {
    const tokenCookie = Cookies.get("jwt_token")
    if (!tokenCookie) {
      setIsAuthenticated(false)
      setIsLoading(false)
      return
    }
    try {
      await verifyToken(tokenCookie)
      setIsAuthenticated(true)
    } catch (err) {
      setIsAuthenticated(false)
    }
  }
  useEffect(() => {
    authenticate()
    setIsLoading(false)
  }, [Cookies.get("jwt_token")])

  useEffect(() => {
    if (pathname === '/addbook') {
      setInAddbook(true)
    } else {
      setInAddbook(false)
    }
  }, [pathname])

  const Toast = Swal.mixin({
    toast: true,
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  })

  const LogoutPrompt = Swal.mixin({
    customClass: {
      cancelButton: 'transition text-white font-medium px-3 py-1.5 bg-gray-500 rounded-md mr-6 hover:text-gray-500 hover:bg-gray-200 hover:ease-in-out',
      confirmButton: 'transition text-white font-medium px-3 py-1.5 bg-red-500 rounded-md ml-6 hover:text-red-500 hover:bg-red-200 hover:ease-in-out'
    },
    buttonsStyling: false
  })

  const toggleModal = (state) => {
    const modal = document.getElementById('modal')
    if (state) {
      modal.showModal()
      document.body.classList.add('no-scroll')
    } else {
      modal.close()
      document.body.classList.remove('no-scroll')
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    const user = {
      email: event.target.email.value,
      password: event.target.password.value
    }
    try {
      const login = await fetch('http://localhost:3000/api/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      })
      if (login.status === 200) {
        document.getElementById('modal').close()
        event.target.reset()
        Toast.fire({
          icon: 'success',
          title: 'Login Success!',
          position: 'top-end'
        })
        document.body.classList.remove('no-scroll')
        authenticate()
        setError(false)
        router.push('/')
      } else {
        throw await login.json()
      }
    } catch (err) {
      setError(err.message)
    }
    
  }

  const handleLogout = () => {
    LogoutPrompt.fire({
      title: 'You sure want to logout?',
      icon: 'warning',
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonText: 'Logout'
    }).then((result) => {
      if (result.isConfirmed) {
        Cookies.set("jwt_token", "")
        setIsAuthenticated(false)
        router.push('/')
        Toast.fire({
          icon: 'success',
          title: 'Logout Successful!',
          position: 'top-end'
        })
      }
    })
  }

  return (
    <>
      {isLoading ? (
        <div className='bg-gradient-to-r from-green-400 to-teal-400 h-11 w-full'/>
      ) : (
        <div className='bg-gradient-to-r from-green-400 to-teal-400'>
          <ul className='flex justify-between mx-10 items-center p-1'>
            <li className='text-white font-semibold px-3 py-1'>
              <Link href={'/'}>
                <span className='hover:text-sky-500'>
                  <svg 
                    className='inline-block mb-1 mr-1' 
                    width="1rem" 
                    height="1rem" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg">
                  <path 
                    fillRule="evenodd" 
                    clipRule="evenodd" 
                    d="M6.27103 2.11151C5.46135 2.21816 5.03258 2.41324 4.72718 2.71244C4.42179 3.01165 4.22268 3.43172 4.11382 4.225C4.00176 5.04159 4 6.12387 4 7.67568V16.2442C4.38867 15.9781 4.82674 15.7756 5.29899 15.6517C5.82716 15.513 6.44305 15.5132 7.34563 15.5135L20 15.5135V7.67568C20 6.12387 19.9982 5.04159 19.8862 4.22499C19.7773 3.43172 19.5782 3.01165 19.2728 2.71244C18.9674 2.41324 18.5387 2.21816 17.729 2.11151C16.8955 2.00172 15.7908 2 14.2069 2H9.7931C8.2092 2 7.10452 2.00172 6.27103 2.11151ZM6.75862 6.59459C6.75862 6.1468 7.12914 5.78378 7.58621 5.78378H16.4138C16.8709 5.78378 17.2414 6.1468 17.2414 6.59459C17.2414 7.04239 16.8709 7.40541 16.4138 7.40541H7.58621C7.12914 7.40541 6.75862 7.04239 6.75862 6.59459ZM7.58621 9.56757C7.12914 9.56757 6.75862 9.93058 6.75862 10.3784C6.75862 10.8262 7.12914 11.1892 7.58621 11.1892H13.1034C13.5605 11.1892 13.931 10.8262 13.931 10.3784C13.931 9.93058 13.5605 9.56757 13.1034 9.56757H7.58621Z" 
                    fill="#1C274D"/>
                    <path 
                    d="M8.68965 17.1351H7.47341C6.39395 17.1351 6.01657 17.1421 5.72738 17.218C4.93365 17.4264 4.30088 18.0044 4.02952 18.7558C4.0463 19.1382 4.07259 19.4746 4.11382 19.775C4.22268 20.5683 4.42179 20.9884 4.72718 21.2876C5.03258 21.5868 5.46135 21.7818 6.27103 21.8885C7.10452 21.9983 8.2092 22 9.7931 22H14.2069C15.7908 22 16.8955 21.9983 17.729 21.8885C18.5387 21.7818 18.9674 21.5868 19.2728 21.2876C19.5782 20.9884 19.7773 20.5683 19.8862 19.775C19.9776 19.1088 19.9956 18.2657 19.9991 17.1351H13.1034V20.1417C13.1034 20.4397 13.1034 20.5886 12.9988 20.6488C12.8941 20.709 12.751 20.6424 12.4647 20.5092L11.0939 19.8713C10.9971 19.8262 10.9486 19.8037 10.8966 19.8037C10.8445 19.8037 10.796 19.8262 10.6992 19.8713L9.32842 20.5092C9.04213 20.6424 8.89899 20.709 8.79432 20.6488C8.68965 20.5886 8.68965 20.4397 8.68965 20.1417V17.1351Z" 
                    fill="#1C274D"/>
                  </svg>
                  My Bookstore
                </span>
              </Link>
            </li>
              <li className='text-white'>
                {!isAuthenticated ? (
                  <button 
                    className='transition font-medium px-3 py-1.5 bg-sky-500 rounded-md hover:text-sky-500 hover:bg-sky-200 hover:ease-in-out' 
                    onClick={() => {toggleModal(true)}}>
                    Login
                  </button>
                ) : (
                  <div>
                    {!inAddbook && (
                      <Link href={'/addbook'}>
                        <button 
                        className='transition font-medium px-3 py-1.5 bg-teal-500 rounded-md mr-4 hover:text-teal-500 hover:bg-teal-200 hover:ease-in-out' 
                        >
                        Add Book
                        </button>
                      </Link>
                    )}
                  <button 
                    className='transition font-medium px-3 py-1.5 bg-red-500 rounded-md hover:text-red-500 hover:bg-red-200 hover:ease-in-out' 
                    onClick={handleLogout}>
                    Logout
                  </button>
                  </div>
                )}
              </li>
          </ul>
        </div>
      )}
    
      
      <dialog id='modal' className='w-96 rounded-md'>
        <button 
          className='btn-exit-modal text-white absolute end-0 px-2 m-2 rounded font-semibold text-md hover:text-red-500 hover:ring-1 hover:ring-red-500' 
          onClick={() => {toggleModal(false)}}>𐌢
        </button>
        <div className='modal-header bg-gradient-to-r from-green-400 to-teal-400 text-white w-full p-4 text-center'>
          <h1 className='font-semibold text-lg'>Login to My Bookstore</h1>
        </div>
        <div className='modal-body'>
          <div className='py-4 px-4 flex flex-col items-center'>
          {error && (
              <p className='text-sm text-red-500'>{error}</p>
          )}
            <form className='w-72' formMethod='dialog' onSubmit={handleLogin}>
              <label htmlFor="email" className='block font-medium mb-0.5'>Email</label>
              <input 
                id='email'
                type="email" 
                name='email' 
                placeholder='example@example.com' 
                autoComplete="off"
                required 
                autoFocus 
                className='border border-slate-300 bg-white rounded w-full px-3 py-1 focus:outline-none focus:ring-1 focus:ring-sky-400'/>
              <label htmlFor="password" className='block font-medium mt-4 mb-0.5'>Password</label>
              <input 
                id='password'
                type="password" 
                name='password' 
                required 
                className='border border-slate-300 bg-white rounded w-full px-3 py-1 focus:outline-none focus:ring-1 focus:ring-sky-400'/>
              <button 
                type='submit' 
                className='transition font-medium bg-sky-500 w-full mt-4 rounded-md text-white py-1 hover:text-sky-500 hover:bg-sky-200 hover:ease-in-out'
                >Login
              </button>
              <div className='text-center text-sm mt-2'>
                <Link href={'/register'} className='hover:text-teal-400' onClick={() => {toggleModal(false)}}>Don't have an account? Click here!</Link>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}