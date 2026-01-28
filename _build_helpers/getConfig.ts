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
	pluginNameSafe: string;
	pluginMenuName: string;
	parentMenuSlug: string | null;
	pluginMenuCapability: string;
	pluginMenuPosition: number;
	pluginPrefix: string;
};

export function getConfig(config: ConfigEnv): TConfig {
	const env = loadEnv(config.mode, process.cwd(), "VITE_");
	return {
		isDev: config.command === "serve",
		pluginName: env.VITE_PLUGIN_NAME || "My Plugin",
		pluginVersion: env.VITE_PLUGIN_VERSION || "1.0.0",
		pluginDescription: env.VITE_PLUGIN_DESCRIPTION || "No description provided.",
		pluginUri: env.VITE_PLUGIN_URI || "",
		pluginAuthor: env.VITE_PLUGIN_AUTHOR || "",
		pluginAuthorUri: env.VITE_PLUGIN_AUTHOR_URI || "",
		textDomain: env.VITE_PLUGIN_TEXT_DOMAIN || "my-plugin",
		domainPath: env.VITE_PLUGIN_DOMAIN_PATH || "/languages",
		includeOptionalAssets: env.VITE_PLUGIN_INCLUDE_OPTIONAL_ASSETS === "true",
		port: env.VITE_PLUGIN_PORT ? parseInt(env.VITE_PLUGIN_PORT, 10) : 3000,
		pluginNameSafe: (env.VITE_PLUGIN_NAME || "my-plugin").replace(/\s+/g, "-").toLowerCase(),
		pluginMenuName: env.VITE_PLUGIN_MENU_NAME || "My Plugin",
		parentMenuSlug: env.VITE_PLUGIN_PARENT_MENU_SLUG || null,
		pluginMenuCapability: env.VITE_PLUGIN_MENU_CAPABILITY || "manage_options",
		pluginMenuPosition: env.VITE_PLUGIN_MENU_POSITION ? parseInt(env.VITE_PLUGIN_MENU_POSITION, 10) : 25,
		pluginPrefix: env.VITE_PLUGIN_PREFIX || "g53a1b",
	};
}
