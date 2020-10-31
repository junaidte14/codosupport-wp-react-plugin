<?php
register_post_type( 'codosupport_tickets', array(
    'labels' => array(
        'name' => __('Tickets', $this->plugin_name),
        'singular_name' => __('Ticket', $this->plugin_name),
        'add_new' => __('Add New', $this->plugin_name),
        'add_new_item' => __('Add New Ticket', $this->plugin_name),
        'edit' => __('Edit', $this->plugin_name),
        'edit_item' => __('Edit Ticket', $this->plugin_name),
        'new_item' => __('New Ticket', $this->plugin_name),
        'view' => __('View', $this->plugin_name),
        'view_item' => __('View Ticket', $this->plugin_name),
        'search_items' => __('Search Tickets', $this->plugin_name),
        'not_found' => __('No Ticket found', $this->plugin_name),
        'not_found_in_trash' => __('No Tickets found in Trash', $this->plugin_name),
        'parent' => __('Parent Ticket', $this->plugin_name)
    ),

    'public' => true,
    'publicaly_queryable' => false,
    'query_var' => false,
    'exclude_from_search' => true,
    'supports' => array( 'title', 'editor' ),
    'taxonomies' => array( 'ticket_categories' ),
    'has_archive' => false,
    'show_in_menu' => false
));
