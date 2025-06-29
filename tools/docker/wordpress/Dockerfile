FROM wordpress:php8.3-apache

RUN apt update --yes \
    && apt install --yes default-mysql-client

# Install PHP Composer.
RUN curl --silent https://getcomposer.org/installer \
	| php -- --version=2.6.6 --filename=composer --install-dir=/usr/local/bin

# Install NodeJS.
RUN curl -fsSL https://deb.nodesource.com/setup_20.x \
    | bash - \
	&& apt-get install nodejs --yes --no-install-recommends