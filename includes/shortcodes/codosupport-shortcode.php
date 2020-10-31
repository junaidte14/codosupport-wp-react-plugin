<?php
if(!function_exists('codosupport_get_taxonomy_hierarchy')){
    function codosupport_get_taxonomy_hierarchy( $taxonomy, $parent = 0, $args = array( 'hide_empty' => false ) ) {
        $defaults = array(
            'parent'     => $parent,
            'hide_empty' => false
        );
        $r = wp_parse_args( $args, $defaults );
        // get all direct decendants of the $parent
        $terms = get_terms( $taxonomy, $r );
        // find their own children
        $children = array();
        // go through all the direct decendants of $parent, and gather their children
        foreach ( $terms as $term ) {
            // recurse to get the direct decendants of "this" term
            $post_categories = codosupport_get_taxonomy_hierarchy( $taxonomy, $term->term_id );
            $categories = [];
            foreach ($post_categories as $cat) {
                $categories[] = $cat;
            }
            $term->children = $categories;
            // add the term to our new array
            $children[ $term->term_id ] = $term;
        }
        // send the results back to the caller
        return $children;
    }
}

function codosupport_shortcode($atts) {
    $nonce = wp_create_nonce("codosupport_tickets_nonce");
    wp_enqueue_script( 
        'codosupport-react-app', 
        CODOSUPPORT_PLUGIN_URL . '/dist/bundle.js', 
        array(
		    'jquery',
		    'wp-element'
        ), 
        CODOSUPPORT_VERSION, 
        true 
    );
    $ticket_categories = codosupport_get_taxonomy_hierarchy('ticket_categories');
    $codosupport_products = get_posts(
        array(
            'numberposts' => -1,
            'post_type' => 'codosupport_products'
        )
    );
    wp_localize_script( 'codosupport-react-app', 'codosupport_data', array( 
        'ajaxurl' => admin_url( 'admin-ajax.php' ),
        'nonce' => $nonce,
        'categories' => $ticket_categories,
        'products' => $codosupport_products
    ));
    ob_start();
	?>
	<div id="codosupport"></div>
	<?php
    return ob_get_clean();
}
add_shortcode('codosupport', 'codosupport_shortcode');