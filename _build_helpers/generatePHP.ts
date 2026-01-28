import type { TConfig } from "./getConfig";

export function generatePHP(config: TConfig) {
	return (_content: string): string => {
		const tag = "<?php";
		const content = _content.slice(tag.length).trimStart();
		const now = new Date();
		const timestamp = now.toUTCString();
		const header = `/*
Auto-Generated: ${timestamp}
Plugin Name: ${config.pluginName}
Plugin URI: ${config.pluginUri}
Description: ${config.pluginDescription}
Version: ${config.pluginVersion}
Author: ${config.pluginAuthor}
Author URI: ${config.pluginAuthorUri}
Text Domain: ${config.textDomain}
Domain Path: ${config.domainPath}
*/

if (!defined("ABSPATH")) exit;
`;
		const variables = [
			`$plugin_config = [`,
			`    'prefix' => '${config.pluginPrefix}',`,
			`    'slug' => '${config.pluginNameSafe}',`,
			`    'menu_name' => '${config.pluginMenuName}',`,
			`    'menu_capability' => '${config.pluginMenuCapability}',`,
			`    'menu_position' => ${config.pluginMenuPosition},`,
			`    'parent_menu_slug' => ${config.parentMenuSlug ? `"${config.parentMenuSlug}"` : "null"},`,
			`    'url' => plugin_dir_url(__FILE__),`,
			`    'path' => plugin_dir_path(__FILE__),`,
			`    'app_path' => plugin_dir_path(__FILE__) . "assets/${config.pluginNameSafe}.js",`,
			config.includeOptionalAssets
				? `    'vue_path' => plugin_dir_path(__FILE__) . "assets/vue.js",`
				: null,
			`];`,
		].filter(Boolean);

		return `${tag}\n${header}\n${variables.join("\n")}\n\n${content}`;
	};
}
