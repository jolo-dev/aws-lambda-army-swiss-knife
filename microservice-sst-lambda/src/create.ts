import * as AWS from "aws-sdk";
import * as uuid from "uuid";
import { APIGatewayProxyEvent } from "aws-lambda";


const dynamoDb = new AWS.DynamoDB.DocumentClient();

export async function main(event: APIGatewayProxyEvent) {
    if (event.body) {
        const data = JSON.parse(event.body);
        const tableName = process.env.tableName ?? ''
        const params = {
            // Get the table name from the environment variable
            TableName: tableName,
            Item: {
                userId: "123",
                noteId: uuid.v1(), // A unique uuid
                content: data.content, // Parsed from request body
                createdAt: Date.now(),
            },
        };
        await dynamoDb.put(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify(params.Item),
        };
    }
    return {
        statusCode: 400,
        body: "Error"
    }
}