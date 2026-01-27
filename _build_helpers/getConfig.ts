// _build_helpers/getConfig.ts
import { type ConfigEnv, loadEnv } from "vite";

export type TConfig = {
	isDev: boolean;
	pluginName: string;
	pluginVersion: string;
	pluginDescription: string;
	pluginUri: string;
	pluginAuthor: string;
	pluginAuthorUri: string;
	textDomain: string;
	domainPath: string;
	includeOptionalAssets: boolean;
	port: number;
};

export function getConfig(config: ConfigEnv): TConfig {
	const env = loadEnv(config.mode, process.cwd(), "VITE_");
	return {
		isDev: config.command === "serve",
		pluginName: env.VITE_PLUGIN_NAME || "my-plugin",
		pluginVersion: env.VITE_PLUGIN_VERSION || "1.0.0",
		pluginDescription: env.VITE_PLUGIN_DESCRIPTION || "",
		pluginUri: env.VITE_PLUGIN_URI || "",
		pluginAuthor: env.VITE_PLUGIN_AUTHOR || "",
		pluginAuthorUri: env.VITE_PLUGIN_AUTHOR_URI || "",
		textDomain: env.VITE_PLUGIN_TEXT_DOMAIN || env.VITE_PLUGIN_NAME || "my-plugin",
		domainPath: env.VITE_PLUGIN_DOMAIN_PATH || "/languages",
		includeOptionalAssets: env.VITE_PLUGIN_INCLUDE_OPTIONAL_ASSETS === "true",
		port: env.VITE_PLUGIN_PORT ? parseInt(env.VITE_PLUGIN_PORT, 10) : 3000,
	};
}
