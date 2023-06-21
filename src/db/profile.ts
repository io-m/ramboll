import { connection } from '../database'
import { User } from '../types/user'

export const findProfileByID = async (id: number): Promise<User> => {
  const [rows]: any = await (
    await connection()
  ).execute(
    `SELECT id, username, email FROM users WHERE id = ?`,
    // @ts-ignore
    [id],
  )

  if (rows.length === 0) {
    throw new Error('No user with that id')
  }
  const user: User = rows[0]
  return user
}
