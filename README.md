# Modern WordPress Fast Track

Working repository for the [Modern WordPress Fast Track course](https://wpshout.com/wordpress-development-course/).

View branches for specific course modules:

- [Module 2](https://github.com/wpshout/modern-wp-fast-track/tree/module-3-start)
- [Module 3](https://github.com/wpshout/modern-wp-fast-track/tree/module-3-end)
- [Module 4](https://github.com/wpshout/modern-wp-fast-track/tree/module-4)
- [Module 5](https://github.com/wpshout/modern-wp-fast-track/tree/module-5)

## Requirements

- [Docker](https://docs.docker.com/desktop/)
- [NodeJS](https://nodejs.org) version 20

And the following optional dependencies which are also bundled with the Docker containers for your convenience:

- [PHP](https://www.php.net) version 7.4 or later
- [Composer](https://getcomposer.org) version 2

Use a package manager like [Homebrew](https://brew.sh) on macOS or [Chocolatey](https://docs.chocolatey.org) on Windows to install the dependencies.

This project includes automatic configuration and recommended extensions for the [VS Code](https://code.visualstudio.com) editor.

## Setup

Using your terminal:

1. Clone this repository:

        git clone https://github.com/wpshout/modern-wp-fast-track.git

2. Navigate to the `modern-wp-fast-track` directory:

        cd modern-wp-fast-track

3. Install project dependencies:

        npm run cli -- composer install

4. Start the development environment:

        npm run start

5. Setup WordPress:

        npm run wp -- core install

    which also creates a user with `admin/password` credentials.

6. Visit any of the available services:

   - Homepage: [wpshout.wp-env.net:8080](http://wpshout.wp-env.net:8080)
   - WP admin: [wpshout.wp-env.net:8080/wordpress/wp-login.php](http://wpshout.wp-env.net:8080/wordpress/wp-login.php) (username: `admin`, password: `password`)
   - PHPMyAdmin: [wpshout.wp-env.net:8081](http://wpshout.wp-env.net:8081)
   - MailHog: [wpshout.wp-env.net:8085](http://wpshout.wp-env.net:8085)

## Scripts

We use scripts defined in [`package.json`](package.json) as the canonical task runners for the project.

- `npm run start` and `npm run stop` to start/stop the local development environment.
- `npm run destroy` to completely delete the database data.
- `npm run logs` to view the active logs from the local development environment.
- `npm run cli -- ...` to run any command inside the WordPress environment such as `npm run cli -- composer install` to install Composer dependencies.
- `npm run wp -- ...` to run any [WP-CLI](https://developer.wordpress.org/cli/commands/) command such as `npm run wp -- core install` to install WP database tables.

The CLI commands for the docker environment are run in directory `/var/www/html` (which maps to the root directory of this project) and use the `www-data` user (same as the PHP process).