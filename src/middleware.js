import { NextResponse as res } from 'next/server'
import * as jose from 'jose'

export async function middleware (req) {
  let isAuthenticated //undefined

  const tokenCookie = req.cookies.get("jwt_token") && req.cookies.get("jwt_token").value
  const jwtSecretKey = new TextEncoder().encode(process.env.JWT_SECRET)
  try {
    await jose.jwtVerify(tokenCookie, jwtSecretKey)
    isAuthenticated = true
  } catch (err) {
    isAuthenticated = false
  }

  const notForAuthed = ['/register']

  if (notForAuthed.some((value) => value === req.nextUrl.pathname) && isAuthenticated) {
    console.log('eits, gabolee')
    return res.redirect(new URL('/', req.url))
  } else {
    return res.next()
  }
  // return res.next()
  // if (!tokenCookie) {
  //   return res.redirect(new URL('/', req.url))
  // }
}

// export const config = {
//   matcher: ['/about/:path*', '/dashboard/:path*'],
// }