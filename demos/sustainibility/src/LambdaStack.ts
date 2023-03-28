import path from 'path';
import { Duration, Stack, StackProps, aws_s3 as s3, RemovalPolicy } from 'aws-cdk-lib';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { setup, throwExpression } from './utility';
import { FunctionUrlAuthType, LayerVersion, Runtime, Architecture } from 'aws-cdk-lib/aws-lambda';
import { PythonFunction } from '@aws-cdk/aws-lambda-python-alpha';
import { GoFunction } from '@aws-cdk/aws-lambda-go-alpha';

setup();

const SLACK_TOKEN: string = process.env.SLACK_TOKEN ?? throwExpression('Please provide a Slack Token');
const SLACK_SIGNING_SECRET: string = process.env.SLACK_SIGNING_SECRET ?? throwExpression('Please provide a Slack Signing Secret');
const SLACK_CLIENT_ID = process.env.SLACK_CLIENT_ID ?? throwExpression('No Client ID');
const SLACK_SECRET_ID = process.env.SLACK_SECRET_ID ?? throwExpression('No Secret ID');
export class LambdaStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, 'AwsUgDemoBucket', {
      bucketName: 'aws-ug-berlin-demo',
      removalPolicy: RemovalPolicy.DESTROY
    })

    const lambdaFolder: string = path.join(path.dirname(__filename), './lambda');

    const nodejsHandler = new NodejsFunction(this, 'NodeJsSlack', {
      bundling: {
        minify: true,
      },
      entry: `${lambdaFolder}/nodejsHandler.ts`,
      timeout: Duration.minutes(1),
      functionName: 'aws-ug-nodejs-demo',
      environment: {
        SLACK_TOKEN,
        SLACK_SIGNING_SECRET,
      },
    });

    nodejsHandler.addFunctionUrl({authType: FunctionUrlAuthType.NONE});
    bucket.grantReadWrite(nodejsHandler);

    const pythonHandler = new PythonFunction(this, 'PythonSlack', {
      runtime: Runtime.PYTHON_3_9,
      entry: lambdaFolder,
      // handler: 'pythonHandler.handler',
      index: 'pythonHandler.py',
      timeout: Duration.minutes(1),
      environment: {
        SLACK_TOKEN,
        SLACK_SIGNING_SECRET,
      },
      architecture: Architecture.X86_64,
      functionName: 'aws-ug-python-demo',
      layers: [LayerVersion.fromLayerVersionArn(this, 'PandasPythonLayer', 'arn:aws:lambda:eu-central-1:770693421928:layer:Klayers-p39-pandas:9')]
    });

    pythonHandler.addFunctionUrl({authType: FunctionUrlAuthType.NONE})
    bucket.grantReadWrite(pythonHandler);

    const goHandler = new GoFunction(this, 'GoSlack', {
      entry: `${lambdaFolder}/goHandler.go`,
      functionName: 'aws-ug-go-demo',
      timeout: Duration.minutes(1),
      environment: {
        SLACK_TOKEN,
        SLACK_SIGNING_SECRET,
      },
    });

    goHandler.addFunctionUrl({authType: FunctionUrlAuthType.NONE});
    bucket.grantReadWrite(goHandler);

    const loginHandler = new NodejsFunction(this, 'LoginSlackBot', {
      bundling: {
        minify: true,
      },
      entry: `${lambdaFolder}/login.ts`,
      timeout: Duration.minutes(1),
      functionName: 'aws-ug-login-demo',
      environment: {
        SLACK_CLIENT_ID,
        SLACK_SECRET_ID,
      },
    });

    loginHandler.addFunctionUrl({authType: FunctionUrlAuthType.NONE})

  }
}