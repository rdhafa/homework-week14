import * as jose from 'jose'

export const verifyToken = async (token) => {
  try {
    const jwtSecretKey = new TextEncoder().encode(process.env.JWT_SECRET)
    const verifyTheToken = await jose.jwtVerify(token, jwtSecretKey)
    return verifyTheToken
  } catch (err) {
    throw err
  }
}