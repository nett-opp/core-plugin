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
      `    'slug' => '${config.pluginSlug}',`,
      `    'menu_name' => '${config.pluginMenuName}',`,
      `    'menu_capability' => '${config.pluginMenuCapability}',`,
      `    'menu_position' => ${config.pluginMenuPosition},`,
      `    'parent_menu_slug' => ${config.parentMenuSlug ? `"${config.parentMenuSlug}"` : "null"},`,
      `    'js_path' => plugin_dir_url(__FILE__) . "assets/${config.pluginSlug}.js",`,
      `    'css_path' => plugin_dir_url(__FILE__) . "assets/${config.pluginSlug}.css",`,
      `];`,
    ];

    const autoRequireIncludes = `
foreach (glob(plugin_dir_path(__FILE__) . "includes/*.php") as $file) {
    require_once $file;
}
`;
    return `${tag}\n${header}\n${variables.join("\n")}\n${autoRequireIncludes}\n${content}`;
  };
}
