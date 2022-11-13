from aws_cdk import (
    aws_lambda as _lambda,
    aws_ecr_assets as assets,
    Stack,
    Duration,
    CfnOutput
)
# from aws_cdk import aws_apigatewayv2_alpha as api_gw
# from aws_cdk import aws_apigatewayv2_integrations_alpha as integrations
from constructs import Construct
import os


class ThePredictiveLambdaStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        # defines an AWS  Lambda resource
        model_folder = os.path.dirname(os.path.realpath(__file__)) + "/../model"
        predictive_lambda = _lambda.DockerImageFunction(self, 'PredictiveLambda',
                                                        code=_lambda.DockerImageCode.from_image_asset(model_folder, platform=assets.Platform.LINUX_AMD64),
                                                        architecture=_lambda.Architecture.X86_64,
                                                        memory_size=4096,
                                                        timeout=Duration.seconds(240))
        # defines an API Gateway Http API resource backed by our "PredictiveLambda" function.
        # api = api_gw.HttpApi(self, 'PredictiveLambdaEndpoint',
        #                      default_integration=integrations.HttpLambdaIntegration('PredictiveHttpLambdaApi',handler=predictive_lambda)
        #                      );

        url = predictive_lambda.add_function_url(auth_type=_lambda.FunctionUrlAuthType.NONE)

        CfnOutput(self, 'HTTP API Url', value=url.url);
