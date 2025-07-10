FROM wordpress:php8.3-apache

RUN apt update \
	&& apt install --yes --no-install-recommends \
		# For this Dockerfile to download files.
		curl \
		# For wait-for utility.
		netcat-openbsd \
		# For WP-CLI to work with DB directly.
		default-mysql-client \
		# SMTP client to forward PHP emails.
		msmtp \
		# For Composer and WP-CLI.
		unzip

# Install PHP Composer.
RUN curl --silent https://getcomposer.org/installer \
	| php -- --version=2.6.6 --filename=composer --install-dir=/usr/local/bin

# Install NodeJS.
RUN curl -fsSL https://deb.nodesource.com/setup_20.x \
	| bash - \
	&& apt-get install nodejs --yes --no-install-recommends

# Install helper utility to wait for DB or anything else to be available over TCP.
RUN curl https://raw.githubusercontent.com/eficode/wait-for/v2.2.4/wait-for --output /usr/local/bin/wait-for \
	&& chmod +x /usr/local/bin/wait-for

# Install Xdebug for PHP.
RUN pecl install xdebug-3.4.4 && docker-php-ext-enable xdebug

# Forward all mail from PHP to MailHog using SMTPSERVER environment variable.
RUN echo 'sendmail_path="/usr/bin/msmtp --port=1025 --read-recipients --read-envelope-from"' >> /usr/local/etc/php/conf.d/sendmail.ini