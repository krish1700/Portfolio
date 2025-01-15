from pathlib import Path
import os
from decouple import config
import dj_database_url
from pathlib import Path
from decouple import Config, RepositoryEnv

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = config('SECRET_KEY', default='unsafe-secret-key')
DEBUG = config('DEBUG', default=False, cast=bool)
CORS_ALLOWED_ORIGINS = [
    "https://portfolio-p2k3.onrender.com",
    "https://portfolio-onu1wc3e3-krish-patils-projects.vercel.app",
    "http://localhost:3000",  # Add this for local development
    "http://localhost:5173",  # Add this if using Vite
]
print("CLOUDINARY_API_SECRET:", config('CLOUDINARY_API_SECRET', default='Not Found'))


# Installed apps
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'portfolio',
    'corsheaders',
    'cloudinary_storage',  # Move this before django.contrib.staticfiles
    'cloudinary',
]


# Middleware
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# CORS
CORS_ALLOWED_ORIGINS = [
    "https://portfolio-p2k3.onrender.com",
    "https://portfolio-onu1wc3e3-krish-patils-projects.vercel.app",
]

CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_METHODS = [
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
]

CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]

# URL configuration
ROOT_URLCONF = 'api.urls'

# Static and media files
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

CLOUDINARY_STORAGE = {
    'CLOUD_NAME': config('CLOUDINARY_CLOUD_NAME'),
    'API_KEY': config('CLOUDINARY_API_KEY'),
    'API_SECRET': config('CLOUDINARY_API_SECRET')
}

# Add these Cloudinary settings
CLOUDINARY_URL = config('CLOUDINARY_URL', default='cloudinary://null')
DEFAULT_FILE_STORAGE = 'cloudinary_storage.storage.MediaCloudinaryStorage'
MEDIA_URL = '/media/'
print("CLOUDINARY_API_SECRET:", config('CLOUDINARY_API_SECRET', default='Not Found'))

# MEDIA_URL = '/media/'
# MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
# MEDIA_ROOT = '/var/lib/media'


# Templates
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# WSGI
WSGI_APPLICATION = 'api.wsgi.application'

# Database
DATABASES = {
    'default': dj_database_url.config(
        default=config('DATABASE_URL')
    )
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# Localization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Default primary key field
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Security settings
SECURE_SSL_REDIRECT = config('SECURE_SSL_REDIRECT', default=True, cast=bool)
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_BROWSER_XSS_FILTER = True

# File Upload settings
FILE_UPLOAD_MAX_MEMORY_SIZE = 52428800  # 50MB
DATA_UPLOAD_MAX_MEMORY_SIZE = 52428800  # 50MB

# Cloudinary specific settings
CLOUDINARY_STORAGE = {
    'CLOUD_NAME': config('CLOUDINARY_CLOUD_NAME'),
    'API_KEY': config('CLOUDINARY_API_KEY'),
    'API_SECRET': config('CLOUDINARY_API_SECRET'),
    'SECURE': True,
    'STATIC_TRANSFORMATIONS': {
        'image': {  # default transformation for images
            'quality': 'auto:good',
            'fetch_format': 'auto',
        }
    }
}