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