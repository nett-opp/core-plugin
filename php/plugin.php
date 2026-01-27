<?php

add_action("admin_menu", function () use ($plugin_config) {
	if ($plugin_config["parent_menu_slug"]) {
		add_submenu_page(
			$plugin_config["parent_menu_slug"],
			$plugin_config["menu_name"],
			$plugin_config["menu_name"],
			$plugin_config["menu_capability"],
			$plugin_config["prefix"] . "-sub",
			function () {
				echo "<h1>" . esc_html(get_admin_page_title()) . "</h1>";
			},
		);
	} else {
		add_menu_page(
			$plugin_config["menu_name"],
			$plugin_config["menu_name"],
			$plugin_config["menu_capability"],
			$plugin_config["prefix"],
			function () {
				echo "<h1>" . esc_html(get_admin_page_title()) . "</h1>";
			},
			"",
			$plugin_config["menu_position"],
		);
	}
});
