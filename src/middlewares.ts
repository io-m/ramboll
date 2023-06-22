import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

// Authentication middleware that verifies access token and proceeds if valid
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const secret = process.env.SECRET_KEY
  if (!secret) {
    throw new Error('Could not find SECRET_KEY in environment variables')
  }
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) {
    return res
      .status(401)
      .json({ error: 'Authentication header is of wrong format' })
  }
  jwt.verify(token, secret, (err: any, user: any) => {
    if (err) {
      return res.sendStatus(403)
    }
    // TS ignoring next part, since TS apparently does not work very well with custom adding fields into Request object
    // @ts-ignore
    req.user = user
    next()
  })
}
