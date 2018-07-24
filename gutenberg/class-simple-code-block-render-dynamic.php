<?php
/**
 * The static callbacks from php to render by Gutenberg
 *
 * @link       https://pablocianes.com/
 * @since      1.0.0
 *
 * @package    Simple_Code_Block
 * @subpackage Simple_Code_Block/gutenberg
 */

/**
 * The static callbacks from php to render by Gutenberg
 *
 * Defines the plugin name and version
 *
 * @package    Simple_Code_Block
 * @subpackage Simple_Code_Block/gutenberg
 * @author     Pablo Cianes <pablo@pablocianes.com>
 */
class Simple_Code_Block_Render_Dynamic {

	/**
	 * Callback 'block-name-dynamic' to render dynamic block
	 *
	 * @since    1.0.0
	 */
	public static function block_name_dynamic( $attributes ) {

		// $attributes is not allow for the moment in Gutenberg? --> solution: get_post_meta()
		//$attributes = get_post_meta( get_the_ID(), 'simple-code-block-meta-key-name' ); //array

		$recent_posts = wp_get_recent_posts( [
			'numberposts' => 5, //(int) $attributes[0],
			'post_status' => 'publish',
		] );

		if ( empty( $recent_posts ) ) {
			return '<p>No posts</p>';
		}

		$markup = '<ul>';

		foreach ( $recent_posts as $post ) {
			$post_id  = $post['ID'];
			$markup  .= sprintf(
				'<li><a href="%1$s">%2$s</a></li>',
				esc_url( get_permalink( $post_id ) ),
				esc_html( get_the_title( $post_id ) )
			);
		}

		return "{$markup}<ul>";

	}

}
