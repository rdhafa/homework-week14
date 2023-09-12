import { NextResponse as res } from 'next/server'
import * as jose from 'jose'

export async function middleware (req) {
  const { pathname } = req.nextUrl
  const tokenCookie = req.cookies.get("jwt_token") && req.cookies.get("jwt_token").value
  
  const authedOnly = ['/addbook', '/editbook']
  if (!authedOnly.some((prefix) => pathname.startsWith(prefix))) {

    if (pathname.startsWith('/register')) {
      if (tokenCookie) return res.redirect(new URL('/', req.url))
      return res.next()
    }

    if (req.method === 'GET') return res.next()

    if ((
      pathname.startsWith('/api/login') || pathname.startsWith('/api/register')
      ) && req.method === 'POST') {
      if (tokenCookie) return res.json({ message: "Forbidden" }, { status: 403 })
      return res.next()
    }

    if (!tokenCookie) return res.json({ message: "Unauthorized" }, { status: 401 })
    const jwtSecretKey = new TextEncoder().encode(process.env.JWT_SECRET)
    try {
      await jose.jwtVerify(tokenCookie, jwtSecretKey)
      return res.next()
    } catch (err) {
      return res.json({ message: "Unauthorized" }, { status: 401 })
    }
  } else {
    if (!tokenCookie) return res.redirect(new URL('/', req.url))
    const jwtSecretKey = new TextEncoder().encode(process.env.JWT_SECRET)
    try {
      await jose.jwtVerify(tokenCookie, jwtSecretKey)
      return res.next()
    } catch (err) {
      return res.redirect(new URL('/', req.url))
    }
  }
}

export const config = {
  matcher: [
    '/api/books', 
    '/api/books/:id*', 
    '/api/login', 
    '/api/register', 
    '/addbook', 
    '/editbook/:id*', 
    '/register'
  ]
}