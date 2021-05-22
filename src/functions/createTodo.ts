import { v4 as uuidV4 } from 'uuid'
import { document } from '../utils/dynamodbClient'

interface ICreateTodo {
  user_id: string
  title: string
  deadline: string
}

export const handle = async (event) => {
  const {
    user_id,
    title,
    deadline
  } = JSON.parse(event.body) as ICreateTodo

  await document.put({
    TableName: 'todos',
    Item: {
      id: uuidV4(),
      user_id,
      title,
      done: false,
      deadline: new Date(deadline)
    }
  }).promise()

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: 'Todo Created'
    }),
    headers: {
      "Content-Type": "application/json"
    }
  }
}