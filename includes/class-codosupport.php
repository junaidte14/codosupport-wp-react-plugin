<?php

/**
 * The file that defines the core plugin class
 *
 * A class definition that includes attributes and functions used across both the
 * public-facing side of the site and the admin area.
 *
 * @link       https://codoplex.com
 * @since      1.0.0
 *
 * @package    Codosupport
 * @subpackage Codosupport/includes
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
 * @package    Codosupport
 * @subpackage Codosupport/includes
 * @author     Junaid Hassan <itbuzz14@gmail.com>
 */
class Codosupport {

	/**
	 * The loader that's responsible for maintaining and registering all hooks that power
	 * the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      Codosupport_Loader    $loader    Maintains and registers all hooks for the plugin.
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
		if ( defined( 'CODOSUPPORT_VERSION' ) ) {
			$this->version = CODOSUPPORT_VERSION;
		} else {
			$this->version = '1.0.0';
		}
		$this->plugin_name = 'codosupport';

		$this->load_dependencies();
		$this->set_locale();
		$this->define_admin_hooks();
		$this->define_public_hooks();

	}

	/**
	 * Load the required dependencies for this plugin.
	 *
	 * Include the following files that make up the plugin:
	 *
	 * - Codosupport_Loader. Orchestrates the hooks of the plugin.
	 * - Codosupport_i18n. Defines internationalization functionality.
	 * - Codosupport_Admin. Defines all hooks for the admin area.
	 * - Codosupport_Public. Defines all hooks for the public side of the site.
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
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-codosupport-loader.php';

		/**
		 * The class responsible for defining internationalization functionality
		 * of the plugin.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-codosupport-i18n.php';

		/**
		 * The class responsible for defining all actions that occur in the admin area.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/class-codosupport-admin.php';

		/**
		 * The class responsible for defining all actions that occur in the public-facing
		 * side of the site.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'public/class-codosupport-public.php';

		/**
		 * register shortcode to display codosupport
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/shortcodes/codosupport-shortcode.php';

		$this->loader = new Codosupport_Loader();

	}

	/**
	 * Define the locale for this plugin for internationalization.
	 *
	 * Uses the Codosupport_i18n class in order to set the domain and to register the hook
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function set_locale() {

		$plugin_i18n = new Codosupport_i18n();

		$this->loader->add_action( 'plugins_loaded', $plugin_i18n, 'load_plugin_textdomain' );

	}

	/**
	 * Register all of the hooks related to the admin area functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_admin_hooks() {

		$plugin_admin = new Codosupport_Admin( $this->get_plugin_name(), $this->get_version() );

		$this->loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'enqueue_styles' );
		$this->loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'enqueue_scripts' );

		//plugin menu
		$this->loader->add_action( 'admin_menu', $plugin_admin, 'codosupport_menu_page' );
		/* Parent Menu Fix */
		$this->loader->add_filter( 'parent_file', $plugin_admin, 'codosupport_parent_file' );

		//Register tickets post type 
		$this->loader->add_action( 'init', $plugin_admin, 'codosupport_register_tickets_post_type' );
		//Register tickets post type meta box 
		$this->loader->add_action( 'add_meta_boxes', $plugin_admin, 'codosupport_register_tickets_meta_boxes' );
		//save tickets post type meta box
		$this->loader->add_action( 'save_post', $plugin_admin, 'codosupport_save_tickets_meta_boxes', 10, 2 );
		//custom columns for tickets post type
		$this->loader->add_filter( 'manage_edit-codosupport_tickets_columns', $plugin_admin, 'codosupport_tickets_columns' );
		//populate custom columns for tickets post type
		$this->loader->add_action( 'manage_posts_custom_column', $plugin_admin, 'codosupport_tickets_populate_columns' );
		//$this->loader->add_action( 'init', $plugin_admin, 'codosupport_ticket_categories', 0 );
		//ticket ajax hooks to add new ticket
		$this->loader->add_action("wp_ajax_codosupport_add_new_ticket", $plugin_admin, "codosupport_add_new_ticket");
		$this->loader->add_action("wp_ajax_nopriv_codosupport_add_new_ticket", $plugin_admin, "codosupport_add_new_ticket");


		//Register products post type 
		$this->loader->add_action( 'init', $plugin_admin, 'codosupport_register_products_post_type' );
		//Register products post type meta box 
		$this->loader->add_action( 'add_meta_boxes', $plugin_admin, 'codosupport_register_products_meta_boxes' );
		//save products post type meta box
		$this->loader->add_action( 'save_post', $plugin_admin, 'codosupport_save_products_meta_boxes', 10, 2 );
		//custom columns for products post type
		$this->loader->add_filter( 'manage_edit-codosupport_products_columns', $plugin_admin, 'codosupport_products_columns' );
		//populate custom columns for products post type
		$this->loader->add_action( 'manage_posts_custom_column', $plugin_admin, 'codosupport_products_populate_columns' );
		

	}

	/**
	 * Register all of the hooks related to the public-facing functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_public_hooks() {

		$plugin_public = new Codosupport_Public( $this->get_plugin_name(), $this->get_version() );

		$this->loader->add_action( 'wp_enqueue_scripts', $plugin_public, 'enqueue_styles' );
		$this->loader->add_action( 'wp_enqueue_scripts', $plugin_public, 'enqueue_scripts' );

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
	 * @return    Codosupport_Loader    Orchestrates the hooks of the plugin.
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
