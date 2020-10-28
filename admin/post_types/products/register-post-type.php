<?php
register_post_type( 'codosupport_products', array(
    'labels' => array(
        'name' => __('Products', $this->plugin_name),
        'singular_name' => __('Product', $this->plugin_name),
        'add_new' => __('Add New', $this->plugin_name),
        'add_new_item' => __('Add New Product', $this->plugin_name),
        'edit' => __('Edit', $this->plugin_name),
        'edit_item' => __('Edit Product', $this->plugin_name),
        'new_item' => __('New Product', $this->plugin_name),
        'view' => __('View', $this->plugin_name),
        'view_item' => __('View Product', $this->plugin_name),
        'search_items' => __('Search products', $this->plugin_name),
        'not_found' => __('No Product found', $this->plugin_name),
        'not_found_in_trash' => __('No products found in Trash', $this->plugin_name),
        'parent' => __('Parent Product', $this->plugin_name)
    ),

    'public' => true,
    'publicaly_queryable' => false,
    'query_var' => false,
    'exclude_from_search' => true,
    'supports' => array( 'title', 'editor', 'excerpt' ),
    'taxonomies' => array( '' ),
    'has_archive' => false,
    'show_in_menu' => false
));
