# Django Zappa Lambda

Enjoy your cookies! Follow below the instructions to develop and deploy!

## Deploy

```bash
source .env/bin/activate
pip install -r requirements.txt
zappa deploy dev
```

## Caution When Using Django

In the `project_slug/settings.py`, the `ALLOWED_HOSTS` is set to "*". This should be used with caution.
You might replace it with the API endpoint you get from AWS.
For Production, you should definitely change that.
You are now able to reach the [`admin`- section](https://docs.djangoproject.com/en/3.1/ref/contrib/admin/) by appending `/admin` to the given URL.


