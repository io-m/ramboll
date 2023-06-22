export interface Todo {
  id: number
  userID: number
  task: string
  status: 'pending' | 'completed'
  createdAt: Date
}
