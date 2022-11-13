import json
from model import predict
import base64


def cat_or_dog(event, context):
    # body = json.loads(event)
    print(event)
    payload = base64.b64decode(event["body"]) if event['isBase64Encoded'] == True else event["body"]
    image_path = json.loads(payload)["image_path"]
    print(image_path)
    result = predict(image_path)
    body = {"result": result}

    response = {"statusCode": 200, "body": json.dumps(body)}

    return response