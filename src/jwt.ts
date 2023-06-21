import jwt from 'jsonwebtoken'

export const signToken = (id: number) => {
  const secret = process.env.SECRET_KEY
  if (!secret) {
    throw new Error('Error while reading secret key from environment variables')
  }
  return jwt.sign({ id }, secret)
}
