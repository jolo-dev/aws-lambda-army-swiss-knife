FROM public.ecr.aws/lambda/python:3.9

COPY . ${LAMBDA_TASK_ROOT}

# WORKDIR /app

RUN pip install -r requirements.txt

CMD [ "handler.cat_or_dog" ]