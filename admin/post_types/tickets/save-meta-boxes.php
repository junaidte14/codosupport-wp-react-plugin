<?php
// Check post type
if ( $codosupport_tickets->post_type == 'codosupport_tickets' ) {
    $data_array = array();

    // Store data in post meta table if present in post data
    if ( isset( $_POST['codosupport_ticket_respondent'] ) && $_POST['codosupport_ticket_respondent'] != '' ) {
        $data_array['codosupport_ticket_respondent'] = $_POST['codosupport_ticket_respondent'];
    }
    update_post_meta( $codosupport_tickets_id, 'codosupport_tickets_options', $data_array );
}