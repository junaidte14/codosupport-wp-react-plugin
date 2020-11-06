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
		add_submenu_page( $this->plugin_name, 'Tickets', 'Tickets', 'manage_options', 'edit.php?post_type=codosupport_tickets', '', null );
		add_submenu_page( $this->plugin_name, 'Ticket Categories', 'Categories', 'manage_options', 'edit-tags.php?taxonomy=ticket_categories&post_type=codosupport_tickets', '', null );
	}

	public function codosupport_parent_file(){
		/* Get current screen */
		global $current_screen, $self;
		if ( in_array( $current_screen->base, array( 'post', 'edit', 'edit-tags' ) ) && 
			(
				'codosupport_tickets' == $current_screen->post_type
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
		//$columns['codosupport_ticket_respondent'] = __('Respondent', $this->plugin_name);
		$columns['date'] = __('Date', $this->plugin_name);
		return $columns;
	}

	public function codosupport_tickets_populate_columns($column){
		$codosupport_ticket_product = intval(get_post_meta( get_the_ID(), 'codosupport_ticket_product', true ));
		$codosupport_product_respondent = intval(get_post_meta( $codosupport_ticket_product, 'codosupport_product_respondent', true ));
		if ( 'codosupport_ticket_respondent' == $column ) {
			$respondent = '';
			$user = get_user_by('ID', $codosupport_product_respondent);
			if($user){
				$respondent = $user->display_name;
			}
			echo $respondent;
		}
	}

	public function codosupport_ticket_categories() {
		$labels = array(
			'name'              => _x( 'Categories', 'Categories', CODOSUPPORT_NAME ),
			'singular_name'     => _x( 'Category', 'Category', CODOSUPPORT_NAME ),
			'search_items'      => __( 'Search Categories', CODOSUPPORT_NAME ),
			'all_items'         => __( 'All Categories', CODOSUPPORT_NAME ),
			'parent_item'       => __( 'Parent Category', CODOSUPPORT_NAME ),
			'parent_item_colon' => __( 'Parent Category:', CODOSUPPORT_NAME ),
			'edit_item'         => __( 'Edit Category', CODOSUPPORT_NAME ),
			'update_item'       => __( 'Update Category', CODOSUPPORT_NAME ),
			'add_new_item'      => __( 'Add New Category', CODOSUPPORT_NAME ),
			'new_item_name'     => __( 'New Category Name', CODOSUPPORT_NAME ),
			'menu_name'         => __( 'Category', CODOSUPPORT_NAME ),
		);
	 
		$args = array(
			'hierarchical'      => true,
			'labels'            => $labels,
			'show_ui'           => true,
			'show_admin_column' => true,
			'query_var'         => true,
			'rewrite'           => array( 'slug' => 'ticket_categories' ),
		);
	 
		register_taxonomy( 'ticket_categories', array( 'codosupport_tickets' ), $args );
	}

	public function codosupport_add_new_ticket() {
		// check the nonce
		if ( !wp_verify_nonce( $_REQUEST['nonce'], "codosupport_tickets_nonce")) {
			exit("No naughty business please");
		} 
		
		$ticket_type = isset($_REQUEST['type']) ? $_REQUEST['type']: "ticket";
		$ticket_title = isset($_REQUEST['title']) ? $_REQUEST['title']: "";
		$ticket_category = isset($_REQUEST['category']) ? $_REQUEST['category']: "";
		$ticket_description = isset($_REQUEST['description']) ? $_REQUEST['description']: "";
		$ticket_attachments = isset($_REQUEST['attachments']) ? $_REQUEST['attachments']: [];
		$ticket_parent = isset($_REQUEST['parent']) ? $_REQUEST['parent']: 0;
		$ticket_user_id = isset($_REQUEST['user_id']) ? $_REQUEST['user_id']: null;
		$ticket_date = date();
		// insert the submitted ticket
		if($ticket_type == 'ticket'){
			$post_id = wp_insert_post(array (
				'post_type' => 'codosupport_tickets',
				'post_title' => $ticket_title,
				'post_content' => $ticket_description,
				'post_status' => 'publish',
				'post_date'   => $ticket_date,
				'ping_status' => 'closed',      // if you prefer
			));
		}else{
			$post_id = wp_insert_post(array (
				'post_type' => 'codosupport_tickets',
				'post_title' => $ticket_title,
				'post_content' => $ticket_description,
				'post_status' => 'publish',
				'post_date'   => $ticket_date,
				'post_parent' => $ticket_parent,
				'ping_status' => 'closed',      // if you prefer
			));
		}

		if ($post_id) {
			// insert post meta
			$headers = array('Content-Type: text/html; charset=UTF-8');
			$headers[] = 'From: CODOPLEX Support Center <codoplex@gmail.com>';
			$headers[] = 'Cc: <'.get_option('admin_email').'>';
			$multiple_recipients = [];
			if($ticket_type == 'ticket'){
				wp_set_post_terms($post_id, $ticket_category , 'ticket_categories');
				update_post_meta($post_id, 'codosupport_ticket_user', $ticket_user_id);
				update_post_meta($post_id, 'codosupport_ticket_attachments', $ticket_attachments);

				$ticket_submitter = intval(get_post_meta( $post_id, 'codosupport_ticket_user', true ));
				$sender_user = get_user_by('ID', $ticket_submitter);
				if($sender_user){
					$multiple_recipients[] = $sender_user->user_email;
				}

				$subject = 'New Support Ticket - '.$ticket_title;
				$message = '
					<p>'.$ticket_title.'</p>
					<p>'.$ticket_description . '</p>'. '
					<a href="'.home_url('support-center').'?ticket_id='.$post_id.'">View Ticket Details in Support Center</a>
					<p>The ticket has been successfully created and we will get back as soon as possible. Thanks</p>';
			}else{
				update_post_meta($post_id, 'codosupport_ticket_user', $ticket_user_id);
				update_post_meta($post_id, 'codosupport_ticket_attachments', $ticket_attachments);

				$ticket_submitter = intval(get_post_meta( $ticket_parent, 'codosupport_ticket_user', true ));
				$sender_user = get_user_by('ID', $ticket_submitter);
				if($sender_user){
					$multiple_recipients[] = $sender_user->user_email;
				}

				$subject = 'Ticket History is Added - '.get_the_title($ticket_parent);
				$message = '
					<p>'.$ticket_description . '</p>'. '
					<a href="'.home_url('support-center').'?ticket_id='.$ticket_parent.'">View Ticket Details in Support Center</a>
					<p>The ticket history is successfully added. Thanks</p>';
			}

			$total_tickets = count(get_posts(
				array(
					'numberposts' => -1,
					'post_type' => 'codosupport_tickets',
					'post_parent' => 0,
					'post_status' => array('publish', 'trash')
				)
			));
			update_post_meta($post_id, 'codosupport_ticket_number', $total_tickets);
			
			foreach ($ticket_attachments as $attachment) {
				if( 'attachment' === get_post_type( $attachment['attach_id'] ) ) {
					$media_post = wp_update_post( array(
						'ID'            => $attachment['attach_id'],
						'post_parent'   => $post_id,
					), true );
				}				
			}
			$result['type'] = "success";
		}else{
			$result['type'] = "failure";
		}

		$newItem = array(
			'ID' => $post_id,
			'post_title' => $ticket_title,
			'post_content' => $ticket_description,
			'post_date' => $ticket_date
		);

		$result['data'] = $newItem;
		$result['post_id'] = $post_id;

		wp_mail( $multiple_recipients, $subject, $message, $headers );

		if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
			$result = json_encode($result);
			echo $result;
		}
		else {
			header("Location: ".$_SERVER["HTTP_REFERER"]);
		}
		die();
	}

	public function codosupport_upload_files() {
		// check the nonce
		if ( !wp_verify_nonce( $_REQUEST['nonce'], "codosupport_tickets_nonce")) {
			exit("No naughty business please");
		} 
		
		$result = [];
		if(isset($_FILES['files'])){
			$valid_formats = array("jpg", "png", "gif", "bmp", "jpeg"); // Supported file types
			$max_file_size = 1024 * 500; // in kb
			$max_image_upload = 5; // Define how many images can be uploaded to the current post
			$wp_upload_dir = wp_upload_dir();
			$path = $wp_upload_dir['path'] . '/';
			$count = 0;

			// Image upload handler
			if( $_SERVER['REQUEST_METHOD'] == "POST" ){
				$uploaded_file_urls = [];
				// Check if user is trying to upload more than the allowed number of images for the current post
				if( ( count( $_FILES['files']['name'] ) ) > $max_image_upload ) {
					$upload_message[] = "Sorry you can only upload " . $max_image_upload . " images for each ticket";
				} else {
					foreach ( $_FILES['files']['name'] as $f => $name ) {
						$extension = pathinfo( $name, PATHINFO_EXTENSION );

						if ( $_FILES['files']['error'][$f] == 4 ) {
							continue;
						}
					
						if ( $_FILES['files']['error'][$f] == 0 ) {
							// Check if image size is larger than the allowed file size
							if ( $_FILES['files']['size'][$f] > $max_file_size ) {
								$upload_message[] = "$name is too large!.";
								continue;
						
							// Check if the file being uploaded is in the allowed file types
							} elseif( ! in_array( strtolower( $extension ), $valid_formats ) ){
								$upload_message[] = "$name is not a valid format";
								continue;
						
							} else{
								$unique_name = wp_unique_filename($path, $name);
								// If no errors, upload the file...
								if( move_uploaded_file( $_FILES["files"]["tmp_name"][$f], $path.$unique_name ) ) {
									$count++;
									$filename = $path.$unique_name;
									$filetype = wp_check_filetype( basename( $filename ), null );
									$wp_upload_dir = wp_upload_dir();
									$attachment = array(
										'guid'           => $wp_upload_dir['url'] . '/' . basename( $filename ),
										'post_mime_type' => $filetype['type'],
										'post_title'     => preg_replace( '/\.[^.]+$/', '', basename( $filename ) ),
										'post_content'   => '',
										'post_status'    => 'inherit'
									);
									// Insert attachment to the database
									$attach_id = wp_insert_attachment( $attachment, $filename );

									$file_obj = array(
										'name' => $name, 
										'url' => $wp_upload_dir['url'] . '/' . basename( $filename ),
										'attach_id' => $attach_id
									);
									$uploaded_file_urls[] = $file_obj;

									require_once( ABSPATH . 'wp-admin/includes/image.php' );
								
									// Generate meta data
									$attach_data = wp_generate_attachment_metadata( $attach_id, $filename );
									wp_update_attachment_metadata( $attach_id, $attach_data );
								
								}
							}
						}
					}
				}
			}
			// Loop through each error then output it to the screen
			if ( isset( $upload_message ) ) :
				foreach ( $upload_message as $msg ){     
					$result['errors'][] = $msg;  
				}
			endif;

			$result['data'] = $uploaded_file_urls;
		
		}

		if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
			$result = json_encode($result);
			echo $result;
		}
		else {
			header("Location: ".$_SERVER["HTTP_REFERER"]);
		}
		die();
	}

	public function codosupport_remove_ticket_file() {
		// check the nonce
		if ( !wp_verify_nonce( $_REQUEST['nonce'], "codosupport_tickets_nonce")) {
			exit("No naughty business please");
		} 
		
		$result = [];
		$attach_id = isset($_REQUEST['attach_id']) ? $_REQUEST['attach_id']: null;

		if ($attach_id) {
			wp_delete_attachment( $attach_id, true );
			$result['type'] = "success";
		}else{
			$result['type'] = "failure";
		}

		$result['data'] = $attach_id;

		if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
			$result = json_encode($result);
			echo $result;
		}
		else {
			header("Location: ".$_SERVER["HTTP_REFERER"]);
		}
		die();
	}

	public function codosupport_get_ticket_by_id() {
		// check the nonce
		if ( !wp_verify_nonce( $_REQUEST['nonce'], "codosupport_tickets_nonce")) {
			exit("No naughty business please");
		} 
		
		$result = [];
		$ticket_id = isset($_REQUEST['ticket_id']) ? intval($_REQUEST['ticket_id']): null;

		if ($ticket_id) {
			$ticket = get_post($ticket_id, 'ARRAY_A');
			if($ticket['post_type'] == 'codosupport_tickets'){
				$ticket_attachments = get_post_meta( $ticket_id, 'codosupport_ticket_attachments', true );
				$ticket_attachments = isset($ticket_attachments)? $ticket_attachments: [];
				$ticket_user = get_post_meta( $ticket_id, 'codosupport_ticket_user', true );
				$ticket_user = isset($ticket_user)? intval($ticket_user): 0;
				$ticket_number = get_post_meta( $ticket_id, 'codosupport_ticket_number', true );

				$user = get_user_by('ID', $ticket_user);
				$ticket['display_name'] = $user->display_name;
				$ticket['attachments'] = $ticket_attachments;
				$ticket['number'] = $ticket_number;
			}else{
				$ticket = null;
			}

			$result['data'] = $ticket;
			$result['type'] = "success";
		}else{
			$result['type'] = "failure";
		}

		if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
			$result = json_encode($result);
			echo $result;
		}
		else {
			header("Location: ".$_SERVER["HTTP_REFERER"]);
		}
		die();
	}

	public function codosupport_get_tickets() {
		// check the nonce
		if ( !wp_verify_nonce( $_REQUEST['nonce'], "codosupport_tickets_nonce")) {
			exit("No naughty business please");
		} 
		
		$result = [];
		$user_id = isset($_REQUEST['user_id']) ? intval($_REQUEST['user_id']): null;
		$post_parent = isset($_REQUEST['post_parent']) ? intval($_REQUEST['post_parent']): 0;

		if($post_parent == 0){
			//get tickets
			if ($user_id) {
				$paged = isset($_REQUEST['paged']) ? intval($_REQUEST['paged']): 0;
				$postsPerPage = isset($_REQUEST['posts_per_page']) ? intval($_REQUEST['posts_per_page']): 5;
				$postOffset = $paged * $postsPerPage;
				$meta_query = [];
				if(!current_user_can( 'manage_options' )){
					$meta_query[] = array(
						'key' => 'codosupport_ticket_user',
						'value' => $user_id,
						'compare' => '='
					);
				}
				$tickets = get_posts(
					array(
						'numberposts' => $postsPerPage,
						'offset'          => $postOffset,
						'post_type' => 'codosupport_tickets',
						'post_parent' => 0,
						'meta_query' => $meta_query
					)
				);

				$user = get_user_by('ID', $user_id);
				$result['user_display_name'] = $user->display_name;
	
				$result['data'] = $tickets;
				$result['type'] = "success";
			}else{
				$result['type'] = "failure";
			}
		}else{
			//get ticket history
			$paged = isset($_REQUEST['paged']) ? intval($_REQUEST['paged']): 0;
			$postsPerPage = isset($_REQUEST['posts_per_page']) ? intval($_REQUEST['posts_per_page']): 5;
			$postOffset = $paged * $postsPerPage;
			$tickets = get_posts(
				array(
					'numberposts' => $postsPerPage,
					'offset'          => $postOffset,
					'post_type' => 'codosupport_tickets',
					'post_parent' => $post_parent,
				)
			);

			$newTickets = [];
			foreach ($tickets as $ticket) {
				$ticket_attachments = get_post_meta( $ticket->ID, 'codosupport_ticket_attachments', true );
				$ticket_user = intval(get_post_meta( $ticket->ID, 'codosupport_ticket_user', true ));
				$user = get_user_by('ID', $ticket_user);
				$ticket->display_name = $user->display_name;
				$ticket->attachments = $ticket_attachments;
				$newTickets[] = $ticket;
			}
			$result['data'] = $newTickets;
			$result['type'] = "success";
		}

		if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
			$result = json_encode($result);
			echo $result;
		}
		else {
			header("Location: ".$_SERVER["HTTP_REFERER"]);
		}
		die();
	}

}
