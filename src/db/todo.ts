import { OkPacket } from 'mysql2'
import { connection } from '../database'
import { Todo } from '../types/todo'

export const saveTodo = async (todo: Todo) => {
  const [rows] = await (
    await connection()
  ).execute<OkPacket>(
    `INSERT INTO todos (userId, task, created_at)
    VALUES (?, ?, ?);`,
    // @ts-ignore
    [todo.userID, todo.task, new Date()],
  )

  if (rows.affectedRows === 0) {
    throw new Error('No user with that id')
  }
  return rows.insertId
}

export const fetchTodos = async () => {
  const [rows]: any = await (
    await connection()
  ).query(`SELECT * FROM todos`, [])
  if (rows.affectedRows === 0) {
    throw new Error('No todo found with that id')
  }
  return rows as Todo[]
}

export const findTodoById = async (id: number) => {
  const [rows]: any = await (
    await connection()
  ).query(
    `SELECT id, userId, task, status, created_at
         FROM todos
         WHERE id = ?`,
    // @ts-ignore
    [id],
  )
  if (rows.affectedRows === 0) {
    throw new Error('No todo found with that id')
  }
  const todo = rows[0] as Todo
  return todo
}

export const updateTodo = async (todo: Todo) => {
  const [rows] = await (
    await connection()
  ).execute<OkPacket>(
    `UPDATE todos
         SET task = ?, status = ?
         WHERE id = ?`,
    // @ts-ignore
    [todo.task, todo.status, todo.id],
  )

  if (rows.affectedRows === 0) {
    throw new Error('No todo found with that id')
  }
  return todo.id
}
