import os
import time
import requests
from slack_bolt import App
from slack_bolt.adapter.aws_lambda import SlackRequestHandler
import pandas as pd
import boto3

# Initializes your app with your bot token and socket mode handler
app = App(token=os.environ.get("SLACK_TOKEN"))


@app.command("/python")
def message_hello(ack, respond):
    ack()
    start = time.perf_counter()
    breweries = requests.get("https://api.openbrewerydb.org/breweries")
    file_name = "python-output.xlsx"
    data = pd.DataFrame(breweries.json())
    data.to_excel(file_name)
    s3 = boto3.client("s3")
    try:
        s3.upload_file(file_name, "aws-ug-berlin-demo", file_name)
        respond(f"Completed in {start / 1000}s")
    except ClientError as e:
        logging.error(e)
        respond(f"Error when uploading {file_name}")


# Start your app
def handler(event, context):
    slack_handler = SlackRequestHandler(app=app)
    return slack_handler.handle(event, context)
