export interface Todo {
    id: number;
    userID: string;
    task: 'pending' | 'completed';
    createdAt: Date;
}
