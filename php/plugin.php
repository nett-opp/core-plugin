<?php
/**
 * Plugin Name: My Plugin
 * Description: Core plugin loading a Vue app in the WordPress admin.
 * Version: 1.0.0
 * Author: You
 */

if (!defined("ABSPATH")) {
    exit();
}

define("MY_PLUGIN_URL", plugin_dir_url(__FILE__));
define("MY_PLUGIN_PATH", plugin_dir_path(__FILE__));

function my_plugin_enqueue_admin_assets($hook)
{
    if ($hook !== "toplevel_page_my-plugin") {
        return;
    }

    // Optional Vue global build
    $vue_path = MY_PLUGIN_PATH . "assets/vue.js";
    if (file_exists($vue_path)) {
        wp_enqueue_script(
            "vue",
            MY_PLUGIN_URL . "assets/vue.js",
            [],
            null,
            true,
        );
    }

    // Main plugin JS (CSS is injected automatically)
    wp_enqueue_script(
        "my-plugin-app",
        MY_PLUGIN_URL . "assets/my-plugin.js",
        file_exists($vue_path) ? ["vue"] : [],
        null,
        true,
    );
}
add_action("admin_enqueue_scripts", "my_plugin_enqueue_admin_assets");

function my_plugin_add_admin_page()
{
    add_menu_page(
        "My Plugin",
        "My Plugin",
        "manage_options",
        "my-plugin",
        "my_plugin_render_admin_page",
        "dashicons-admin-generic",
    );
}
add_action("admin_menu", "my_plugin_add_admin_page");

function my_plugin_render_admin_page()
{
    ?>
    <div class="wrap">
        <h1>My Plugin</h1>
        <div id="app"></div>
    </div>
    <?php
}
