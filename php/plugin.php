<?php

if ($plugin_config["parent_menu_slug"]) {
    add_action("admin_menu", function () use ($plugin_config) {
        $render = fn() => print '<div class="wrap"><div id="app"></div></div>';
        if ($plugin_config["parent_menu_slug"]) {
            add_submenu_page(
                $plugin_config["parent_menu_slug"],
                $plugin_config["menu_name"],
                $plugin_config["menu_name"],
                $plugin_config["menu_capability"],
                $plugin_config["slug"],
                $render,
            );
        }
    });
}

if (!$plugin_config["parent_menu_slug"]) {
    add_action("admin_menu", function () use ($plugin_config) {
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
    });
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
        $plugin_config["app_path"],
        [], // Ingen eksterne dependencies lenger
        time(), // Cache-busting
        true,
    );
});
