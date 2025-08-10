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

// Customize settings and controls for theme and blocks.
add_filter( 'wp_theme_json_data_theme', 'wpshout_theme_json_data' );

function wpshout_theme_json_data( $theme_json ) {
	$theme_json_overrides = [
		'version' => 2,
		'settings' => [
			'color' => [
				// Enforce theme color token usage instead of custom picker.
				'custom' => false,
				'customDuotone' => false,
				'customGradient' => false,
			]
		]
	];

	return $theme_json->update_with( $theme_json_overrides );
}