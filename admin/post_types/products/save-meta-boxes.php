<?php
// Check post type
if ( $codosupport_products->post_type == 'codosupport_products' ) {
    $data_array = array();

    // Store data in post meta table if present in post data
    if ( isset( $_POST['codosupport_product_price'] ) && $_POST['codosupport_product_price'] != '' ) {
        $data_array['codosupport_product_price'] = $_POST['codosupport_product_price'];
    }
    update_post_meta( $codosupport_products_id, 'codosupport_products_options', $data_array );
}