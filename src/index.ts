import express, { Application } from 'express'
import authRouter from './handlers/auth'
import profileRouter from './handlers/profile'
import todoRouter from './handlers/todo'
import { authenticateToken } from './middlewares'
import { config } from 'dotenv'

config()

const app: Application = express()

app.use(express.json())

app.use('/auth', authRouter)
app.use('/profile', profileRouter)
app.use('/todo', todoRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
