<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://codoplex.com
 * @since             1.0.0
 * @package           Codosupport
 *
 * @wordpress-plugin
 * Plugin Name:       codosupport
 * Plugin URI:        https://codoplex.com
 * Description:       A WordPress plugin to manage customer support tickets.
 * Version:           1.0.0
 * Author:            Junaid Hassan
 * Author URI:        https://codoplex.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       codosupport
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}


/*
|--------------------------------------------------------------------------
| CONSTANTS
|--------------------------------------------------------------------------
*/

define( 'CODOSUPPORT_VERSION', '1.0.0' );
define( 'CODOSUPPORT_NAME', 'codosupport' );

if ( ! defined( 'CODOSUPPORT_BASE_FILE' ) )
    define( 'CODOSUPPORT_BASE_FILE', __FILE__ );
if ( ! defined( 'CODOSUPPORT_BASE_DIR' ) )
    define( 'CODOSUPPORT_BASE_DIR', dirname( CODOSUPPORT_BASE_FILE ) );
if ( ! defined( 'CODOSUPPORT_PLUGIN_URL' ) )
	define( 'CODOSUPPORT_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
	
/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-codosupport-activator.php
 */
function activate_codosupport() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-codosupport-activator.php';
	Codosupport_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-codosupport-deactivator.php
 */
function deactivate_codosupport() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-codosupport-deactivator.php';
	Codosupport_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_codosupport' );
register_deactivation_hook( __FILE__, 'deactivate_codosupport' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-codosupport.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_codosupport() {

	$plugin = new Codosupport();
	$plugin->run();

}
run_codosupport();
