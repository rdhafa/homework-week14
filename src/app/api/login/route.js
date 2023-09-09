import { prisma } from '@/lib/prisma.mjs'
import { NextResponse as res } from 'next/server'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

export async function POST(req) {
  try {
    const {email, password} = await req.json()
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return res.json({message: "Email or Password Invalid!"}, {status: 400})
    }
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return res.json({message: "Email or Password Invalid!"}, {status: 400})
    }
    const token = await jwt.sign({ userId: user.id }, process.env.JWT_SECRET)

    cookies().set('jwt_token', token)

    return res.json(token, {status: 200})

  } catch (err) {
    console.log(err.message)
    return res.json({message: "Invalid credentials"}, {status: 400})
  }
}