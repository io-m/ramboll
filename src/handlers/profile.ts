import express, { Router, Request, Response } from 'express'
import { authenticateToken, ownersOnly } from './../middlewares'
import { editUser } from '../services/profile'
import { User } from '../types/user'

const router: Router = express.Router()

// All routes below requires user to be authenticated
router.use(authenticateToken)

router.patch('/:id', ownersOnly, async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.user.id as number
    const newProfile = req.body as User
    newProfile.id = userId
    const id = await editUser(newProfile)
    res.json({ id })
  } catch (error) {
    res.json(error)
  }
})

export default router
