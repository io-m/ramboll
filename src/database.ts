import mysql from 'mysql2/promise'

export const connection = async () => {
  const host = process.env.DB_HOST
  const user = process.env.DB_USER
  const password = process.env.DB_PASSWORD
  const database = process.env.DB_DATABASE
  return await mysql.createConnection({
    host,
    user,
    password,
    database,
  })
}
