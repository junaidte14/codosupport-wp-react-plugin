<?php
// Check post type
if ( $codosupport_products->post_type == 'codosupport_products' ) {
    // Store data in post meta table if present in post data
    if ( isset( $_POST['codosupport_product_price'] ) ) {
        update_post_meta( $codosupport_products_id, 'codosupport_product_price', $_POST['codosupport_product_price'] );
    }
    if ( isset( $_POST['codosupport_product_respondent'] ) ) {
        update_post_meta( $codosupport_products_id, 'codosupport_product_respondent', $_POST['codosupport_product_respondent'] );
    }
}