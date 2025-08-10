<?php
/**
 * Plugin Name: WPShout Plugin
 */

add_action( 'init', 'wpshout_register_block_styles' );

function wpshout_register_block_styles() {
	register_block_style(
		'core/paragraph',
		[
			'name' => 'notice',
			'label' => __( 'Notice', 'wpshout-plugin' ),
			// 'style_handle' => '...',
			// 'inline_style' => 'p.is-style-notice { background:yellow; color:red; }',
			'style_data' => [
				'color' => [
					'text' => 'var:preset|color|accent-3',
					'background' => 'var:preset|color|accent-2',
				],
				'spacing' => [
					'padding' => [
						'top' => 'var:preset|spacing|30',
						'bottom' => 'var:preset|spacing|30',
						'left' => 'var:preset|spacing|30',
						'right' => 'var:preset|spacing|30',
					],
				],
			],
		]
	);
}