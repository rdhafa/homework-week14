import { prisma } from '@/lib/prisma.mjs'
import { NextResponse as res } from 'next/server'
import bcrypt from 'bcrypt'

export async function POST(req) {
  try {
    const { name, email, password } = await req.json()
    const hashedPassword = await bcrypt.hash(password, 10)
    const { password: passwordDB, ...user } = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    })
    return res.json({ user }, { status: 200 })

  } catch (err) {
    return res.json({message: "Email is not Available!"}, {status: 400})
  }
}