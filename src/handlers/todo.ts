import express, { Router, Request, Response } from 'express'
import { authenticateToken } from './../middlewares'
import { Todo } from '../types/todo'
import { createTodo, editTodo } from '../services/todo'

const router: Router = express.Router()

// All routes below requires user to be authenticated
router.use(authenticateToken)

router.post('/', async (req: Request, res: Response) => {
  try {
    const todoPayload = req.body.todo as Todo
    // @ts-ignore
    const userId = req.user.id as number
    const bodyUserId = Number(req.body.todo.userID)
    // Authorization that allows only profile owners to fetch data
    if (bodyUserId !== userId) {
      return res.status(401).json({ error: 'This is not your profile' })
    }
    const id = await createTodo(todoPayload)
    res.json({ id })
  } catch (error) {
    res.json(error)
  }
})

router.put('/:id', async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.user.id as number
    const bodyUserId = Number(req.body.todo.userID)

    // Authorization that allows only profile owners to fetch data
    if (bodyUserId !== userId) {
      return res.status(401).json({ error: 'This is not your profile' })
    }
    const todoId = req.params.id
    const todoPayload: Todo = req.body.todo
    todoPayload.id = Number(todoId)
    const id = await editTodo(todoPayload)
    return res.status(200).json({ id })
  } catch (error) {
    res.json(error)
  }
})

export default router
