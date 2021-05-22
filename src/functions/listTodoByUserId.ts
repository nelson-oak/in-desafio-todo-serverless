import { document } from '../utils/dynamodbClient'

export const handle = async (event) => {
  const { user_id } = event.pathParameters

  const response = await document.query({
    TableName: 'todos',
    KeyConditionExpression: 'user_id = :user_id',
    ExpressionAttributeValues: {
      ':user_id': user_id,
    }
  }).promise()

  const todos = [] // response.Items

  if (todos.length <= 0) {
    return {
      statusCode: 204,
      body: JSON.stringify({
        message: 'Todos not found'
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }  
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      todos
    }),
    headers: {
      "Content-Type": "application/json"
    }
  }
}