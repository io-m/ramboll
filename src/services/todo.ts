import { findTodoById, saveTodo, updateTodo } from '../db/todo'
import { overwriteWithNewValues } from '../helpers'
import { Todo } from '../types/todo'

export const createTodo = async (todo: Todo) => {
  const formattedTodo: Todo = {
    ...todo,
    userID: Number(todo.userID),
  }
  return await saveTodo(formattedTodo)
}

export const editTodo = async (newTodo: Todo) => {
  const todo = await findTodoById(newTodo.id)
  overwriteWithNewValues<Todo>(todo, newTodo)
  return await updateTodo(todo)
}
