import { OkPacket } from 'mysql2'
import { connection } from '../database'
import { User } from '../types/user'

export const editProfile = async (profile: User): Promise<string> => {
  const [rows] = await (
    await connection()
  ).execute<OkPacket>(
    `UPDATE users
     SET username = ?, email = ?
     WHERE id = ?`,
    // @ts-ignore
    [profile.username, profile.email, profile.id],
  )

  if (rows.affectedRows === 0) {
    throw new Error('No user with that id')
  }
  const message = rows.message
  return message
}

export const findProfileById = async (id: number): Promise<User> => {
  const [rows]: any = await (
    await connection()
  ).query(
    `SELECT id, username, email
     FROM users
     WHERE id = ?`,
    // @ts-ignore
    [id],
  )
  if (rows.affectedRows === 0) {
    throw new Error('No user with that id')
  }
  const user = rows[0] as User
  return user
}
