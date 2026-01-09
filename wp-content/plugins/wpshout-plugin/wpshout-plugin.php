<?php
/**
 * Plugin Name: WPShout Plugin
 */

add_action( 'init', 'wpshout_register_blocks' );

function wpshout_register_blocks() {
	register_block_type( __DIR__ . '/build/blocks/faq' );

	register_block_type( 
		__DIR__ . '/build/blocks/faq-item',
		[
			// Pass keywords in PHP instead of block.json.
			'keywords' => [
				__( 'faq', 'wpshout' ),
				__( 'question', 'wpshout' ),
				__( 'answer', 'wpshout' ),
			],
		]
	);
}

add_action( 'enqueue_block_assets', 'wpshout_enqueue_block_styles' );

function wpshout_enqueue_block_styles() {
	wp_register_style(
		'wpshout-faq-block',
		plugins_url( 'src/blocks/faq/style.css', __FILE__ ),
		[],
		filemtime( __DIR__ . '/src/blocks/faq/style.css' )
	);
}

add_filter( 'block_categories_all', 'wpshout_register_block_categories' );

function wpshout_register_block_categories( $categories ) {
	$categories[] = [
		'slug'  => 'marketing',
		'title' => __( 'Marketing', 'wpshout' ),
	];

	return $categories;
}

// Uncomment this to disable contextual loading of block assets.
// add_filter( 'should_load_separate_core_block_assets', '__return_false' );

// Uncomment to disable the inlining of small CSS files.
// add_filter( 'styles_inline_size_limit', '__return_zero' );