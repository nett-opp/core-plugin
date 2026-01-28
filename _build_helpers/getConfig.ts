import { type ConfigEnv, loadEnv } from "vite";

export type TConfig = {
  isDev: boolean;
  pluginName: string;
  pluginSlug: string;
  pluginVersion: string;
  pluginDescription: string;
  pluginUri: string;
  pluginAuthor: string;
  pluginAuthorUri: string;
  textDomain: string;
  domainPath: string;
  port: number;
  pluginMenuName: string;
  parentMenuSlug: string | null;
  pluginMenuCapability: string;
  pluginMenuPosition: number;
};

export function getConfig(config: ConfigEnv): TConfig {
  const env = loadEnv(config.mode, process.cwd(), "VITE_");
  return {
    isDev: config.command === "serve",
    pluginName: env.VITE_PLUGIN_NAME || "My Plugin",
    pluginSlug: env.VITE_PLUGIN_SLUG || "my-plugin",
    pluginVersion: env.VITE_PLUGIN_VERSION || "1.0.0",
    pluginDescription:
      env.VITE_PLUGIN_DESCRIPTION || "No description provided.",
    pluginUri: env.VITE_PLUGIN_URI || "",
    pluginAuthor: env.VITE_PLUGIN_AUTHOR || "",
    pluginAuthorUri: env.VITE_PLUGIN_AUTHOR_URI || "",
    textDomain: env.VITE_PLUGIN_TEXT_DOMAIN || "my-plugin",
    domainPath: env.VITE_PLUGIN_DOMAIN_PATH || "/languages",
    port: env.VITE_PLUGIN_PORT ? parseInt(env.VITE_PLUGIN_PORT, 10) : 3000,
    pluginMenuName: env.VITE_PLUGIN_MENU_NAME || "my-plugin-menu",
    parentMenuSlug: env.VITE_PLUGIN_PARENT_MENU_SLUG || null,
    pluginMenuCapability: env.VITE_PLUGIN_MENU_CAPABILITY || "manage_options",
    pluginMenuPosition: env.VITE_PLUGIN_MENU_POSITION
      ? parseInt(env.VITE_PLUGIN_MENU_POSITION, 10)
      : 25,
  };
}
