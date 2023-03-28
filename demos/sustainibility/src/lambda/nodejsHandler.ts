import { App, AwsLambdaReceiver, LogLevel } from '@slack/bolt';
import { APIGatewayProxyEvent } from 'aws-lambda';
import axios from 'axios';
import { throwExpression } from '../utility';
import XLSX from 'xlsx';

/* load 'fs' for readFile and writeFile support */
import * as fs from 'fs';
XLSX.set_fs(fs);

const signingSecret = process.env.SLACK_SIGNING_SECRET ?? throwExpression('Please provide SLACK_SIGNING_SECRET');
const token = process.env.SLACK_TOKEN ?? throwExpression('No SLACK_TOKEN. Please provide one');

const awsLambdaReceiver = new AwsLambdaReceiver({
  signingSecret,
  logLevel: LogLevel.INFO,
});


const app = new App({
  token,
  receiver: awsLambdaReceiver,
});

app.command('/nodejs', async ({ ack, respond }) => {
  await ack();

  // this can be replaced with
  const { data } = await axios.get('https://api.openbrewerydb.org/breweries', {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "nodejs-output");

  await respond(JSON.stringify(data));
});

export const handler = async (event: APIGatewayProxyEvent, context: any, callback: any) => {
  try {
    console.log('Call Nodejs Command');

    const receiver = await awsLambdaReceiver.start();
    return await receiver(event, context, callback);

  } catch (error) {
    console.error(error);
    const e = error as Error;
    throw e;
  }
};
