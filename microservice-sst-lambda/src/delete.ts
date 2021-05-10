import * as AWS from "aws-sdk";
import { APIGatewayProxyEvent } from "aws-lambda";


const dynamoDb = new AWS.DynamoDB.DocumentClient();

export async function main(event: APIGatewayProxyEvent) {
    if (event.body && event.pathParameters) {
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
        };
        await dynamoDb.delete(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({ status: true }),
        };
    }
    return {
        statusCode: 400,
        body: "Error in Deleting"
    }
}