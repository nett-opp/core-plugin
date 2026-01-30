<?php

$clean_prefix = strtoupper(str_replace("-", "_", $plugin_config["slug"]));

if (!defined($clean_prefix)) {
    define($clean_prefix, true);
}

register_activation_hook(__FILE__, function () use ($plugin_config) {
    do_action($plugin_config["slug"] . "_activated");
});

register_deactivation_hook(__FILE__, function () use ($plugin_config) {
    do_action($plugin_config["slug"] . "_deactivated");
});

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
    if (isset($_GET["page"]) && $_GET["page"] === $plugin_config["slug"]) {
        wp_enqueue_script(
            $plugin_config["slug"] . "-app",
            $plugin_config["js_path"],
            [],
            $plugin_config["version"],
            true,
        );
        wp_enqueue_style(
            $plugin_config["slug"] . "-style",
            $plugin_config["css_path"],
            [],
            $plugin_config["version"],
        );
        wp_localize_script($plugin_config["slug"] . "-app", "WP_DATA", [
            "restUrl" => rest_url(),
            "nonce" => wp_create_nonce("wp_rest"),
        ]);
    }
});
