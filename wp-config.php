<?php

// DB credentials.
define( 'DB_NAME', 'wp' );
define( 'DB_USER', 'wp' );
define( 'DB_PASSWORD', 'wp' );
define( 'DB_HOST', 'mysql' );
define( 'DB_CHARSET', 'utf8mb4' );
define( 'DB_COLLATE', '' );

$table_prefix = 'wp_';

// Wait up to 10 seconds for DB to be ready.
if ( $db_connection = fsockopen( DB_HOST, 3306, $errno, $errstr, 10 ) ) {
	fclose( $db_connection );
}

// Keep the wp-contents outside of WP core directory.
define( 'WP_CONTENT_DIR', __DIR__ . '/wp-content' );
define( 'WP_CONTENT_URL', sprintf( 'http://%s/wp-content', $_SERVER['HTTP_HOST'] ) );

// Keep wordpress outside of the web root.
define( 'WP_SITEURL', sprintf( 'http://%s/wordpress', $_SERVER['HTTP_HOST'] ) );
define( 'WP_HOME', sprintf( 'http://%s', $_SERVER['HTTP_HOST'] ) );

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/wordpress/' );
}

require_once ABSPATH . 'wp-settings.php';