import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { authenticateToken } from '../middlewares'

describe('authenticateToken', () => {
  let req: Request
  let res: Response
  let next: NextFunction

  beforeEach(() => {
    req = {} as Request
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      sendStatus: jest.fn(),
    } as unknown as Response
    next = jest.fn()
  })

  it('should call next() if the access token is valid', () => {
    const secret = 'mysupersecretkey.woohooo:)'
    const token = jwt.sign({ id: 1 }, secret)

    req.headers = {
      authorization: `Bearer ${token}`,
    }

    process.env.SECRET_KEY = secret

    authenticateToken(req, res, next)

    expect(next).toHaveBeenCalled()
    // @ts-ignore
    expect(req.user.id).toEqual(1)
  })

  it('should return 401 if the authentication header is missing or in the wrong format', () => {
    req.headers = {} // No authorization header

    authenticateToken(req, res, next)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({
      error: 'Authentication header is of wrong format',
    })
    expect(next).not.toHaveBeenCalled()
  })

  it('should return 403 if the access token is invalid', () => {
    const secret = 'mysupersecretkey.woohooo:)'
    const user = { id: 1, username: 'john.doe' }
    const token = jwt.sign(user, 'differentsecretkey')

    req.headers = {
      authorization: `Bearer ${token}`,
    }

    process.env.SECRET_KEY = secret

    authenticateToken(req, res, next)

    expect(res.sendStatus).toHaveBeenCalledWith(403)
    expect(next).not.toHaveBeenCalled()
  })
})
