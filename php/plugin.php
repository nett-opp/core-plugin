<?php
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

// 2. Enqueue scripts (Kun én fil siden Vue er bundled)
add_action("admin_enqueue_scripts", function ($hook) use ($plugin_config) {
    // Sjekk om vi er på siden til denne utvidelsen
    if (!str_contains($hook, $plugin_config["slug"])) {
        return;
    }

    // Last den bundlede app-filen
    wp_enqueue_script(
        $plugin_config["slug"] . "-app",
        $plugin_config["js_path"],
        [], // Ingen eksterne dependencies lenger
        time(), // Cache-busting
        true,
    );
    wp_enqueue_style(
        $plugin_config["slug"] . "-style",
        $plugin_config["css_path"], // CSS path from your config
        [], // Ingen dependencies
        time(), // Cache-busting
    );
    wp_localize_script($plugin_config["slug"] . "-app", "WP_DATA", [
        "restUrl" => rest_url(),
        "nonce" => wp_create_nonce("wp_rest"),
    ]);
});
