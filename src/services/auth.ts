import { createProfile, fetchProfileByEmail } from '../db/auth'
import bcrypt from 'bcryptjs'
import { signToken } from '../jwt'

const isValidPassword = async (password: string, hash: string) => {
  const authenticated = await bcrypt.compare(password, hash)
  if (!authenticated) {
    throw new Error('Password incorrect')
  }
}

const hashPassword = async (password: string) => {
  const salt = process.env.SALT
  return await bcrypt.hash(password, Number(salt) ?? 10)
}

export const createUser = async (
  username: string,
  email: string,
  password: string,
) => {
  const hash = await hashPassword(password)
  return await createProfile(username, email, hash)
}

export const loginUser = async (email: string, password: string) => {
  const profile = await fetchProfileByEmail(email)
  await isValidPassword(password, profile.password)
  return signToken(profile.id)
}
