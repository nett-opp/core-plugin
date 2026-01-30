<?php

foreach (glob(plugin_dir_path(__FILE__) . "includes/*.php") as $file) {
    require_once $file;
}

if ($plugin_config["parent_menu_slug"]) {
    add_action(
        "admin_menu",
        function () use ($plugin_config) {
            $render = fn() => print '<div class="wrap"><div id="app"></div></div>';
            add_submenu_page(
                $plugin_config["parent_menu_slug"],
                $plugin_config["menu_name"],
                $plugin_config["menu_name"],
                $plugin_config["menu_capability"],
                $plugin_config["slug"],
                $render,
            );
        },
        20,
    );
}

if (!$plugin_config["parent_menu_slug"]) {
    add_action(
        "admin_menu",
        function () use ($plugin_config) {
            $render = fn() => print '<div class="wrap"><div id="app"></div></div>';
            add_menu_page(
                $plugin_config["menu_name"],
                $plugin_config["menu_name"],
                $plugin_config["menu_capability"],
                $plugin_config["slug"],
                $render,
                "dashicons-admin-generic",
                $plugin_config["menu_position"],
            );
        },
        10,
    );
}

add_action("admin_enqueue_scripts", function ($hook) use ($plugin_config) {
    $current_page = isset($_GET["page"]) ? $_GET["page"] : "";
    if ($current_page !== $plugin_config["slug"]) {
        return;
    }
    wp_enqueue_script(
        $plugin_config["slug"] . "-app",
        $plugin_config["js_path"],
        [],
        time(),
        true,
    );
    wp_enqueue_style(
        $plugin_config["slug"] . "-style",
        $plugin_config["css_path"],
        [],
        time(),
    );
    wp_localize_script($plugin_config["slug"] . "-app", "WP_DATA", [
        "restUrl" => rest_url(),
        "nonce" => wp_create_nonce("wp_rest"),
    ]);
});
