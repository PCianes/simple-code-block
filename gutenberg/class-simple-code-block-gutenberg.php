<?php
/**
 * The gutenberg-specific functionality of the plugin.
 *
 * @link       https://pablocianes.com/
 * @since      1.0.0
 *
 * @package    Simple_Code_Block
 * @subpackage Simple_Code_Block/gutenberg
 */

/**
 * The gutenberg-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the gutenberg-specific stylesheet and JavaScript.
 *
 * @package    Simple_Code_Block
 * @subpackage Simple_Code_Block/gutenberg
 * @author     Pablo Cianes <pablo@pablocianes.com>
 */
class Simple_Code_Block_Gutenberg {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string $plugin_name       The name of this plugin.
	 * @param      string $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version     = $version;
	}

	/**
	 * Enqueue all Gutenberg blocks assets for only backend editor.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_all_blocks_assets_editor() {

		wp_enqueue_script(
			'simple-code-block-gutenberg-editor',
			plugin_dir_url( __FILE__ ) . 'dist/blocks.build.js',
			array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-components', 'wp-editor' ),
			filemtime( plugin_dir_path( __FILE__ ) . 'dist/blocks.build.js' )
		);

		/*
		wp_enqueue_style(
			'simple-code-block-gutenberg-editor',
			plugin_dir_url( __FILE__ ) . 'dist/blocks.editor.build.css',
			array( 'wp-edit-blocks' ),
			filemtime( plugin_dir_path( __FILE__ ) . 'dist/blocks.editor.build.css' )
		);
		*/
	}

	/**
	 * Enqueue all Gutenberg blocks assets for both frontend + backend.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_all_blocks_assets() {

		if ( ! has_block('simple-code-block/ace') ) {
			return;
		}

		wp_enqueue_style(
			'simple-code-block-gutenberg',
			plugin_dir_url( __FILE__ ) . 'dist/blocks.style.build.css',
			array( 'wp-blocks' ),
			filemtime( plugin_dir_path( __FILE__ ) . 'dist/blocks.style.build.css' )
		);
	}

	/**
	 * Enqueue all Gutenberg blocks assets for only frontend
	 *
	 * @since    1.0.0
	 */
	public function enqueue_all_blocks_assets_frontend() {

		/**
		 * If in the backend, bail out.
		 *
		 * @since    1.0.0
		 */
		if ( is_admin() || ! has_block('simple-code-block/ace') ) {
			return;
		}

		wp_enqueue_script(
			'simple-code-block-gutenberg-frontend-ace',
			plugin_dir_url( __FILE__ ) . 'src/ace-editor/ace.js',
			array(),
			filemtime( plugin_dir_path( __FILE__ ) . 'src/ace-editor/ace.js' )
		);

		wp_enqueue_script(
			'simple-code-block-gutenberg-frontend',
			plugin_dir_url( __FILE__ ) . 'src/frontend.blocks.js',
			array( 'jquery', 'simple-code-block-gutenberg-frontend-ace' ),
			filemtime( plugin_dir_path( __FILE__ ) . 'src/frontend.blocks.js' )
		);

	}

	/**
	 * Add new custom categories for blocks
	 *
	 * @since    1.0.1
	 */
	public function add_custom_blocks_categories( $categories, $post ) {

		$custom_category = array(
			'slug'  => 'sumapress',
			'title' => esc_html__( 'SumaPress', 'simple-cookie-control' ),
		);

		if ( false === array_search( $custom_category['slug'], array_column( $categories, 'slug' ) ) ) {
			return array_merge( $categories, array( $custom_category ) );
		}

		return $categories;
	}


}
