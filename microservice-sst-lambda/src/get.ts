import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import * as AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export async function main(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  if(event.pathParameters){
    const tableName = process.env.tableName ?? ''
    const params = {
      // Get the table name from the environment variable
      TableName: tableName,
      // Get the row where the noteId is the one in the path
      Key: {
        userId: "123",
        noteId: event.pathParameters.id,
      },
    };
    const results = await dynamoDb.get(params).promise();
  
    return {
      statusCode: 200,
      body: JSON.stringify(results.Item),
    };
  }
  return {
    statusCode: 400,
    body: "Error retrieving Data"
  }
}