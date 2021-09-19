---
theme: ./
title: AWS Lambda - The Army Swiss Knife
subtitle: Capabilities and maybe Best Practices
lineNumbers: true
preload: false
layout: intro
introImage: public/img/swiss-knife.png
drawings: 
  enabled: dev
---

<h2>AWS Lambda <br/>The Army Swiss Knife (??)</h2>

---
src: ./slides/youtube.md

---

---
src: ./slides/menti.md

---

---
src: ./slides/lambda.md

---

---

# Microservice

---
src: ./slides/microservice.md

---

---
src: ./slides/example-crud.md

---

---

# ETL/ELT

---
src: ./slides/etl-elt.md

---

---
src: ./slides/example-etl.md

---

---
src: ./slides/example-ddb-streams.md

---

---

# Monolith aka Fullstack

---
src: ./slides/fullstack.md

---

---
layout: right-image-animation
preload: false
leftColSpan: 2
image: https://miro.medium.com/max/5600/1*aYnM9HQHnwLVvRbuhdGoCA.png

---

## Demo: Serving Static Files

---
layout: right-image-animation
preload: false
image: https://static.codingforentrepreneurs.com/media/cfe-blog/serverless-django-with-zappa-on-aws-lambda/Serverless-Django-Zappa-AWS-Lambda.jpg

---

## Demo: Django

---

# Machine Learning

---
layout: quote
quoteFrom: Microsoft Azure

---

Machine learning (ML) is the process of using mathematical models of data to help a computer learn without direct instruction. It’s considered a subset of artificial intelligence (AI).

---
preload: false
layout: right-image-animation
rightColSpan: 2
image: public/img/keras-tensorflow.png

---

# Demo:

## Is it a Dog or a Cat?

---
preload: true

---

<iframe src="https://www.mentimeter.com/s/960e2d4f7fb64f87479381e4e8c7d0b1/ca36b011c53f" title="Menti for voting about Serverless Question" width="100%" height="100%" frameborder="0"></iframe>

---

# Best Practices

---
layout: left-right-image-animation
preload: false
leftImage: https://logos-download.com/wp-content/uploads/2016/09/Node_logo_NodeJS.png
rightImage: https://www.freepngimg.com/download/android/72537-icons-python-programming-computer-social-tutorial.png

---

---
layout: left-image-animation
preload: false
image: https://logos-download.com/wp-content/uploads/2016/09/Node_logo_NodeJS.png

---

## `$which nodejs`

<v-clicks>

* First Citizen for Lambda
* More Ressources
* Best Buddy API Gateway
* Bundle your Javascript
  * Bundled minified code
  * Avoiding Cold Start

</v-clicks>

---
layout: left-image-animation
preload: false
image: https://user-images.githubusercontent.com/2752551/30405068-a7733b34-989e-11e7-8f66-7badaf1373ed.png

---

## `$which sls`

<v-clicks>

* use `sls` only for NodeJS- Lambda
* `sls` is written in NodeJS
* With Python you would have a messed setup
* for Python
  * use [AWS SAM](https://github.com/aws/aws-sam-cli)
  * use [Zappa](https://github.com/zappa/Zappa)
  * use [AWS Chalice](https://aws.github.io/chalice/index)

</v-clicks>

---
layout: left-image-animation
preload: false
image: https://user-images.githubusercontent.com/2752551/30405068-a7733b34-989e-11e7-8f66-7badaf1373ed.png

---

## `$which sls`

<v-clicks>

* when using `sls`, specify the version in the `package.json`
* `(p)npm install serverless` or `yarn add serverless`
  * Because your local setup can be mixed up with the global installation
  * Plugins like [`serverless offline`](https://github.com/dherault/serverless-offline) are not usable
  
```bash
Serverless: Offline requires Serverless v1.x.x but found 2.56.0. Exiting.
```

</v-clicks>

---
layout: left-image-animation
preload: false
image: https://user-images.githubusercontent.com/2752551/30405068-a7733b34-989e-11e7-8f66-7badaf1373ed.png

---

## `$which sls`

<v-clicks>

* Don't include (the whole) `node_modules`, `.venv`

```yaml {all|1,4-5,7,10}
# in v2
package:
  patterns:
    - '!node_modules/**'
    - '!.venv/**'

# in v1
package:
	include: handler.py
	exclude: '**'
```

</v-clicks>

---
layout: left-image-animation
preload: false
image: https://miro.medium.com/max/1400/1*UOAUnEhQAm0raxoIjJ_cYQ.png

---

## `$which sam`

<v-clicks>

* [Built-In Best Practices](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-policy-templates.html)

```yaml{all|4,5,6,7}
# Example Policies
MyFunction:
  Type: 'AWS::Serverless::Function'
  Policies:
    - S3CrudPolicy:
        BucketName: my-awsome-bucket
# Instead of Listing all actions

```

</v-clicks>

---

# Conclusion

---
layout: left-image-animation
preload: false
image: public/img/swiss-knife.png

---

<v-clicks>

* Yes, Many Capabilities like an Army Swiss Knife
* For Some Use Cases Better
* Serverless
* Only Great with other services

</v-clicks>

---
layout: image

image: 'https://media.giphy.com/media/KJ1f5iTl4Oo7u/giphy.gif'

---
