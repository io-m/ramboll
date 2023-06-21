import mysql from 'mysql2/promise';

export const connection = async () => {
  return await mysql.createConnection({
    host: 'db',
    user: 'user',
    password: 'password',
    database: 'test',
  });
};
