<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       https://codoplex.com
 * @since      1.0.0
 *
 * @package    Codosupport
 * @subpackage Codosupport/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Codosupport
 * @subpackage Codosupport/admin
 * @author     Junaid Hassan <itbuzz14@gmail.com>
 */
class Codosupport_Admin {

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
	 * @param      string    $plugin_name       The name of this plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {
		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/codosupport-admin.css', array(), $this->version, 'all' );
	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {
		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/codosupport-admin.js', array( 'jquery' ), $this->version, false );
	}

	public function codosupport_menu_page(){
		add_menu_page( $this->plugin_name, $this->plugin_name, 'manage_options', $this->plugin_name, array($this, 'codosupport_dashboard_page'), 'dashicons-analytics', null );
		add_submenu_page( $this->plugin_name, 'Products', 'Products', 'manage_options', 'edit.php?post_type=codosupport_products', '', null );
		add_submenu_page( $this->plugin_name, 'Tickets', 'Tickets', 'manage_options', 'edit.php?post_type=codosupport_tickets', '', null );
	}

	public function codosupport_parent_file(){
		/* Get current screen */
		global $current_screen, $self;
		if ( in_array( $current_screen->base, array( 'post', 'edit' ) ) && 
			(
				'codosupport_tickets' == $current_screen->post_type ||
				'codosupport_products' == $current_screen->post_type
			) 
		) {
			$parent_file = $this->plugin_name;
			return $parent_file;
		}
	}

	public function codosupport_dashboard_page(){
		require_once(CODOSUPPORT_BASE_DIR.'/admin/partials/codosupport-admin-display.php');
	}

	//helper functions for tickets post type
	public function codosupport_register_tickets_post_type(){
		require_once(plugin_dir_path( __FILE__ ).'post_types/tickets/register-post-type.php');
	}

	public function codosupport_register_tickets_meta_boxes(){
		add_meta_box(
            'codosupport-tickets-metaboxes',
            __('Ticket Options', $this->plugin_name),
            [$this, 'codosupport_display_tickets_meta_boxes'],
            'codosupport_tickets'
        );
	}

	public function codosupport_display_tickets_meta_boxes($codosupport_tickets){
		if ( function_exists('wp_nonce_field') ){
			wp_nonce_field( basename( __FILE__ ), 'codosupport_tickets_metaboxes');
		}		
		require_once(plugin_dir_path( __FILE__ ).'post_types/tickets/display-meta-boxes.php');
	}

	public function codosupport_save_tickets_meta_boxes($codosupport_tickets_id, $codosupport_tickets){
		// Checks save status
		$is_autosave = wp_is_post_autosave( $codosupport_tickets_id );
		$is_revision = wp_is_post_revision( $codosupport_tickets_id );
		$is_valid_nonce = ( isset( $_POST[ 'codosupport_tickets_metaboxes' ] ) && wp_verify_nonce( $_POST[ 'codosupport_tickets_metaboxes' ], basename( __FILE__ ) ) ) ? 'true' : 'false';
		// Exits script depending on save status
		if ( $is_autosave || $is_revision || !$is_valid_nonce ) {
			return;
		}
		require_once(plugin_dir_path( __FILE__ ).'post_types/tickets/save-meta-boxes.php');
	}

	public function codosupport_tickets_columns($columns){
		unset($columns['date']);
		$columns['codosupport_ticket_respondent'] = __('Respondent', $this->plugin_name);
		$columns['date'] = __('Date', $this->plugin_name);
		return $columns;
	}

	public function codosupport_tickets_populate_columns($column){
		$codosupport_tickets_options = get_post_meta( get_the_ID(), 'codosupport_tickets_options', true );
		if ( 'codosupport_ticket_respondent' == $column ) {
			if(is_array($codosupport_tickets_options)){
				$codosupport_ticket_respondent = ($codosupport_tickets_options['codosupport_ticket_respondent']) ? $codosupport_tickets_options['codosupport_ticket_respondent'] : '';
			}
			echo $codosupport_ticket_respondent;
		}
	}

	//helper functions for products post type
	public function codosupport_register_products_post_type(){
		require_once(plugin_dir_path( __FILE__ ).'post_types/products/register-post-type.php');
	}

	public function codosupport_register_products_meta_boxes(){
		add_meta_box(
            'codosupport-products-metaboxes',
            __('Product Options', $this->plugin_name),
            [$this, 'codosupport_display_products_meta_boxes'],
            'codosupport_products'
        );
	}

	public function codosupport_display_products_meta_boxes($codosupport_products){
		if ( function_exists('wp_nonce_field') ){
			wp_nonce_field( basename( __FILE__ ), 'codosupport_products_metaboxes');
		}		
		require_once(plugin_dir_path( __FILE__ ).'post_types/products/display-meta-boxes.php');
	}

	public function codosupport_save_products_meta_boxes($codosupport_products_id, $codosupport_products){
		// Checks save status
		$is_autosave = wp_is_post_autosave( $codosupport_products_id );
		$is_revision = wp_is_post_revision( $codosupport_products_id );
		$is_valid_nonce = ( isset( $_POST[ 'codosupport_products_metaboxes' ] ) && wp_verify_nonce( $_POST[ 'codosupport_products_metaboxes' ], basename( __FILE__ ) ) ) ? 'true' : 'false';
		// Exits script depending on save status
		if ( $is_autosave || $is_revision || !$is_valid_nonce ) {
			return;
		}
		require_once(plugin_dir_path( __FILE__ ).'post_types/products/save-meta-boxes.php');
	}

	public function codosupport_products_columns($columns){
		unset($columns['date']);
		$columns['codosupport_product_price'] = __('Price', $this->plugin_name);
		$columns['date'] = __('Date', $this->plugin_name);
		return $columns;
	}

	public function codosupport_products_populate_columns($column){
		$codosupport_products_options = get_post_meta( get_the_ID(), 'codosupport_products_options', true );
		if ( 'codosupport_product_price' == $column ) {
			if(is_array($codosupport_products_options)){
				$codosupport_product_price = ($codosupport_products_options['codosupport_product_price']) ? $codosupport_products_options['codosupport_product_price'] : '';
			}
			echo $codosupport_product_price;
		}
	}

}
