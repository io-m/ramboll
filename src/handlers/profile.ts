import express, { Router, Request, Response } from 'express'
import { authenticateToken } from './../middlewares'
import { editUser } from '../services/profile'
import { User } from '../types/user'

const router: Router = express.Router()

// All routes below requires user to be authenticated
router.use(authenticateToken)

router.patch('/:id', async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.user.id as number
    const paramsUserId = Number(req.params.id)
    // Authorization that allows only profile owners to fetch data
    if (paramsUserId !== userId) {
      return res.status(401).json({ error: 'This is not your profile' })
    }
    const newProfile = req.body as User
    newProfile.id = userId
    const id = await editUser(newProfile)
    res.json({ id })
  } catch (error) {
    res.json(error)
  }
})

export default router
