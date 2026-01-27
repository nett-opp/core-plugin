import type { TConfig } from "./getConfig";

export function addHeaderToPHP(config: TConfig) {
	return (_content: string): string => {
		const tag = "<?php";
		const content = _content.slice(tag.length).trimStart();
		const header = `/*
Plugin Name: ${config.pluginName}
Plugin URI: ${config.pluginUri}
Description: ${config.pluginDescription}
Version: ${config.pluginVersion}
Author: ${config.pluginAuthor}
Author URI: ${config.pluginAuthorUri}
Text Domain: ${config.textDomain}
Domain Path: ${config.domainPath}
*/`;
		return `${tag}\n${header}\n\n${content}`;
	};
}
