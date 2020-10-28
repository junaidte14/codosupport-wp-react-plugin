<?php

/**
 * Provide a admin area view for the plugin
 *
 * This file is used to markup the admin-facing aspects of the plugin.
 *
 * @link       https://codoplex.com
 * @since      1.0.0
 *
 * @package    Codosupport
 * @subpackage Codosupport/admin/partials
 */
?>

<p>Welcome!</p>

<?php
	$active_tab = isset( $_GET[ 'tab' ] ) ? esc_html($_GET[ 'tab' ]) : 'about';
	$page_action = isset( $_GET[ 'page_action' ] ) ? esc_html($_GET[ 'page_action' ]) : '';
?>

<h2 class="nav-tab-wrapper">
    <a href="<?php echo esc_url('?page=codosupport&tab=about');?>" class="nav-tab <?php echo $active_tab == 'about' ? 'nav-tab-active' : ''; ?>">About</a>
    <a href="<?php echo esc_url('?page=codosupport&tab=quickguide');?>" class="nav-tab <?php echo $active_tab == 'quickguide' ? 'nav-tab-active' : ''; ?>">Quick Guide</a>
</h2>

<?php         
    if($active_tab == 'about') {
        ?>
        <p>About Section</p>
	    <?php
        //include( UNI_LMS_BASE_DIR . '/plugin_pages/includes/admin/about.php');
    }
    elseif($active_tab == 'quickguide'){
        ?>
        <p>Quick Guide Section</p>
	    <?php
        //include( UNI_LMS_BASE_DIR . '/plugin_pages/includes/admin/quickguide.php');
    }
     
?>
