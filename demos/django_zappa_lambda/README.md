# Django Zappa Lambda

Enjoy your cookies! Follow below the instructions to develop and deploy!
This is deployed according to this [guide](https://romandc.com/zappa-django-guide/).

## Requirements

- Python 3.9 (use [pyenv](https://github.com/pyenv/pyenv) if needed)
- Virtualenv

## Deplo

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
zappa deploy dev
```

## Caution When Using Django

In the `project_slug/settings.py`, the `ALLOWED_HOSTS` is set to "*". This should be used with caution.
You might replace it with the API endpoint you get from AWS.
For Production, you should definitely change that.
You are now able to reach the [`admin`- section](https://docs.djangoproject.com/en/3.1/ref/contrib/admin/) by appending `/admin` to the given URL.
