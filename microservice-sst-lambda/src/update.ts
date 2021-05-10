import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import * as AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export async function main(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  if (event.pathParameters && event.body) {
    const data = JSON.parse(event.body);
    const tableName = process.env.tableName ?? ''
    const params = {
      // Get the table name from the environment variable
      TableName: tableName,
      // Get the row where the noteId is the one in the path
      Key: {
        userId: "123",
        noteId: event.pathParameters.id,
      },
      // Update the "content" column with the one passed in
      UpdateExpression: "SET content = :content",
      ExpressionAttributeValues: {
        ":content": data.content || null,
      },
      ReturnValues: "ALL_NEW",
    };

    const results = await dynamoDb.update(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(results.Attributes),
    };
  }
  return {
    statusCode: 400,
    body: "Error when updating"
  }
}