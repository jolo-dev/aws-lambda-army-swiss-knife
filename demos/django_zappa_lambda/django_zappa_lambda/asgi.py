import os

from django.core.asgi import get_asgi_application

os.environ.setdefault(
    "DJANGO_SETTINGS_MODULE", "django_zappa_lambda.settings"
)

application = get_asgi_application()
