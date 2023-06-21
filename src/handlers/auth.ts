import express, { Router, Request, Response } from 'express'
import { createUser, loginUser } from '../services/auth'

const router: Router = express.Router()

router.post('/signup', async (req: Request, res: Response) => {
  try {
    const username = req.body.username as string
    const email = req.body.email as string
    const id = await createUser(username, email, req.body.password)
    res.status(201).json({ id })
  } catch (error) {
    res.json(error)
  }
})

router.post('/login', async (req: Request, res: Response) => {
  try {
    const token = await loginUser(req.body.email, req.body.password)
    res.json({ token })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

export default router
