import { OkPacket } from 'mysql2'
import { connection } from '../database'
import { User } from '../types/user'

export const createProfile = async (
  username: string,
  email: string,
  hash: string,
): Promise<number> => {
  const [rows] = await (
    await connection()
  ).execute<OkPacket>(
    `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
    [username, email, hash],
  )
  if (!rows) {
    throw new Error(
      `Error occurred while creating new profile for email: ${email}`,
    )
  }
  return rows.insertId
}

export const fetchProfileByEmail = async (email: string): Promise<User> => {
  const [rows]: any = await (
    await connection()
  ).execute(`SELECT * FROM users WHERE email = ?`, [email])

  if (rows.length === 0) {
    throw new Error('No profile with that email')
  }
  const user: User = rows[0]
  return user
}
