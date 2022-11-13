from flask import Flask, render_template, request, json
from flask_basicauth import BasicAuth
# from keras import backend as K
# from model import predict
import requests
import os

os.environ["TF_CPP_MIN_LOG_LEVEL"] = "2"

app = Flask(__name__)

app.config["BASIC_AUTH_USERNAME"] = "test"
app.config["BASIC_AUTH_PASSWORD"] = "test"
app.config["BASIC_AUTH_FORCE"] = True

basic_auth = BasicAuth(app)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/predict", methods=["POST"])
def rest_predict():
    image = str(
        request.form.get("image")
        if request.form.get("image") != ""
        else request.args.get("image")
    )
    print(image)
    url = 'https://27bmvdh2wrwttmm2grlai76vbq0pfgnr.lambda-url.eu-central-1.on.aws/'
    myobj = {'image_path': image}

    result = requests.post(url, json = myobj)
    print(result.json())
    response = app.response_class(
        response=json.dumps(result.json()), status=200, mimetype="application/json"
    )
    # # K.clear_session()
    return response


app.run(host="0.0.0.0", port=8888, debug=True)
