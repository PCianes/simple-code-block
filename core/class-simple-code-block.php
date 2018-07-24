<?php
/**
 * The file that defines the core plugin class
 *
 * A class definition that core attributes and functions used across both the
 * public-facing side of the site and the admin area.
 *
 * @link       https://pablocianes.com/
 * @since      1.0.0
 *
 * @package    Simple_Code_Block
 * @subpackage Simple_Code_Block/core
 */

/**
 * The core plugin class.
 *
 * This is used to define internationalization, admin-specific hooks, and
 * public-facing site hooks.
 *
 * Also maintains the unique identifier of this plugin as well as the current
 * version of the plugin.
 *
 * @since      1.0.0
 * @package    Simple_Code_Block
 * @subpackage Simple_Code_Block/core
 * @author     Pablo Cianes <pablo@pablocianes.com>
 */
class Simple_Code_Block {

	/**
	 * The loader that's responsible for maintaining and registering all hooks that power
	 * the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      Simple_Code_Block_Loader    $loader    Maintains and registers all hooks for the plugin.
	 */
	protected $loader;

	/**
	 * The unique identifier of this plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $plugin_name    The string used to uniquely identify this plugin.
	 */
	protected $plugin_name;

	/**
	 * The current version of the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $version    The current version of the plugin.
	 */
	protected $version;

	/**
	 * Define the core functionality of the plugin.
	 *
	 * Set the plugin name and the plugin version that can be used throughout the plugin.
	 * Load the dependencies, define the locale, and set the hooks for the admin area and
	 * the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function __construct() {
		if ( defined( 'PLUGIN_NAME_VERSION' ) ) {
			$this->version = PLUGIN_NAME_VERSION;
		} else {
			$this->version = '1.0.0';
		}
		$this->plugin_name = 'simple-code-block';

		$this->load_dependencies();
		$this->set_locale();
		$this->define_admin_hooks();
		$this->define_public_hooks();
		$this->define_gutenberg_hooks();

	}

	/**
	 * Load the required dependencies for this plugin.
	 *
	 * Include the following files that make up the plugin:
	 *
	 * - Simple_Code_Block_Loader. Orchestrates the hooks of the plugin.
	 * - Simple_Code_Block_i18n. Defines internationalization functionality.
	 * - Simple_Code_Block_Admin. Defines all hooks for the admin area.
	 * - Simple_Code_Block_Public. Defines all hooks for the public side of the site.
	 *
	 * Create an instance of the loader which will be used to register the hooks
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function load_dependencies() {

		/**
		 * The class responsible for orchestrating the actions and filters of the
		 * core plugin.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'core/class-simple-code-block-loader.php';

		/**
		 * The class responsible for defining internationalization functionality
		 * of the plugin.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'core/class-simple-code-block-i18n.php';

		/**
		 * The class responsible for defining all actions that occur in the admin area.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/class-simple-code-block-admin.php';

		/**
		 * The class responsible for defining all actions that occur in the public-facing
		 * side of the site.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'public/class-simple-code-block-public.php';

		/**
		 * The class responsible for defining all actions that occur about new WordPress editor: GUTENBERG
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'gutenberg/class-simple-code-block-gutenberg.php';

		/**
		 * The class responsible for defining all actions that occur in the public-facing
		 * side of the site and also into admin area, like libraries and helpers
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-simple-code-block-includes.php';

		$includes = new Simple_Code_Block_Includes( $this->get_plugin_name(), $this->get_version() );

		/**
		 * Get loader using its singleton
		 */
		$this->loader = Simple_Code_Block_Loader::get_instance();

	}

	/**
	 * Define the locale for this plugin for internationalization.
	 *
	 * Uses the Simple_Code_Block_i18n class in order to set the domain and to register the hook
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function set_locale() {

		$plugin_i18n = new Simple_Code_Block_I18n( $this->plugin_name );

		$this->loader->add_action( 'plugins_loaded', $plugin_i18n, 'load_plugin_textdomain' );

	}

	/**
	 * Register all of the hooks related to the admin area functionality
	 * of the plugin.
	 *
	 * Instance all class you have into ADMIN folder and add the objet to the loader,
	 * and remember to 'require_once' into admin class on the function: load_dependencies()
	 * similar this core class.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_admin_hooks() {

		$plugin_admin = new Simple_Code_Block_Admin( $this->get_plugin_name(), $this->get_version() );

		$this->loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'enqueue_styles' );
		$this->loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'enqueue_scripts' );
	}

	/**
	 * Register all of the hooks related to the public-facing functionality
	 * of the plugin.
	 *
	 * Instance all class you have into PUBLIC folder and add the objet to the loader,
	 * and remember to 'require_once' into admin class on the function: load_dependencies()
	 * similar this core class.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_public_hooks() {

		$plugin_public = new Simple_Code_Block_Public( $this->get_plugin_name(), $this->get_version() );

		$this->loader->add_action( 'wp_enqueue_scripts', $plugin_public, 'enqueue_styles' );
		$this->loader->add_action( 'wp_enqueue_scripts', $plugin_public, 'enqueue_scripts' );
	}

	/**
	 * Register all of the hooks related to Gutenberg
	 *
	 * Instance all class you have into GUTENBERG folder and add the objet to the loader,
	 * and remember to 'require_once' into gutenberg class on the function: load_dependencies()
	 * similar this core class.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_gutenberg_hooks() {

		$plugin_gutenberg = new Simple_Code_Block_Gutenberg( $this->get_plugin_name(), $this->get_version() );

		$this->loader->add_action( 'enqueue_block_editor_assets', $plugin_gutenberg, 'enqueue_all_blocks_assets_editor' );
		$this->loader->add_action( 'enqueue_block_assets', $plugin_gutenberg, 'enqueue_all_blocks_assets' );
		$this->loader->add_action( 'enqueue_block_assets', $plugin_gutenberg, 'enqueue_all_blocks_assets_frontend' );

		$this->loader->add_filter( 'block_categories', $plugin_gutenberg, 'add_custom_blocks_categories', 10, 2 );
		$this->loader->add_action( 'init', $plugin_gutenberg, 'register_dynamic_blocks' );
		$this->loader->add_action( 'init', $plugin_gutenberg, 'register_meta_fields' );
		//$this->loader->add_filter( 'register_post_type_args', $plugin_gutenberg, 'add_templates_to_post_types', 20, 2 );

	}

	/**
	 * Run the loader to execute all of the hooks with WordPress.
	 *
	 * @since    1.0.0
	 */
	public function run() {
		$this->loader->run();
	}

	/**
	 * The name of the plugin used to uniquely identify it within the context of
	 * WordPress and to define internationalization functionality.
	 *
	 * @since     1.0.0
	 * @return    string    The name of the plugin.
	 */
	public function get_plugin_name() {
		return $this->plugin_name;
	}

	/**
	 * The reference to the class that orchestrates the hooks with the plugin.
	 *
	 * @since     1.0.0
	 * @return    Simple_Code_Block_Loader    Orchestrates the hooks of the plugin.
	 */
	public function get_loader() {
		return $this->loader;
	}

	/**
	 * Retrieve the version number of the plugin.
	 *
	 * @since     1.0.0
	 * @return    string    The version number of the plugin.
	 */
	public function get_version() {
		return $this->version;
	}

}
