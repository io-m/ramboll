import express, { Router, Request, Response } from 'express'
import { authenticateToken, ownersOnly } from './../middlewares'
import { findProfileByID } from '../db/profile'

const router: Router = express.Router()

// All routes below requires user to be authenticated
router.use(authenticateToken)

router.get('/:id', ownersOnly, async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.user.id as number
    const verifiedProfile = await findProfileByID(userId)
    res.json({ profile: verifiedProfile })
  } catch (error) {
    res.json(error)
  }
})

export default router
