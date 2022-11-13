#!/usr/bin/env python3

from aws_cdk import App

from the_predictive_lambda.the_predictive_lambda_stack import ThePredictiveLambdaStack


app = App()
ThePredictiveLambdaStack(app, "the-predictive-lambda")

app.synth()
