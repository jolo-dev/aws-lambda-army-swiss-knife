import { App } from 'aws-cdk-lib';
import { LambdaStack } from './LambdaStack';

const app = new App();

new LambdaStack(app, 'lambda-aws-ug-dev');

app.synth();