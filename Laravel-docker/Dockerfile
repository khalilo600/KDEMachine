FROM php:8.3-fpm-alpine

# Install system dependencies
RUN apk add --no-cache \
    nginx \
    build-base \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    icu-dev \
    zip \
    unzip \
    git

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql gd exif opcache intl pcntl bcmath

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy application code
COPY . .

# Install application dependencies
RUN composer install --no-interaction --prefer-dist --optimize-autoloader

# Generate application key and optimize
RUN php artisan key:generate --force
RUN php artisan config:cache
RUN php artisan route:cache
RUN php artisan view:cache

# Expose port (if using php artisan serve directly, though Nginx is preferred)
# EXPOSE 8000

# Start PHP-FPM
CMD ["php-fpm"]
