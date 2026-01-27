import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import path from "node:path";
import { viteStaticCopy } from "vite-plugin-static-copy";
import { getConfig } from "./_build_helpers/getConfig";
import { addHeaderToPHP } from "./_build_helpers/addHeaderToPHP";

export default defineConfig((_config) => {
	const config = getConfig(_config);
	return {
		base: config.isDev ? "/" : "./",
		plugins: [
			vue(),
			!config.isDev &&
				viteStaticCopy({
					targets: [
						{
							src: "php/plugin.php",
							dest: "",
							rename: `${config.pluginName}.php`,
							transform: addHeaderToPHP(config),
						},
						{
							src: "php/includes",
							dest: "",
						},
						...(config.includeOptionalAssets
							? [
									{
										src: "node_modules/vue/dist/vue.global.prod.js",
										dest: "assets",
										rename: "vue.js",
									},
								]
							: []),
					],
				}),
		].filter(Boolean),
		resolve: {
			alias: {
				"@": fileURLToPath(new URL("./src", import.meta.url)),
			},
		},
		build: {
			outDir: ".plugin",
			emptyOutDir: true,
			rollupOptions: {
				external: config.isDev ? [] : ["vue"],
				input: path.resolve(__dirname, "src/main.ts"),
				output: {
					...(config.isDev ? {} : { globals: { vue: "Vue" } }),
					format: config.isDev ? "es" : "iife",
					entryFileNames: `assets/${config.pluginName}.js`,
				},
			},
		},
		server: config.isDev
			? {
					port: config.port,
				}
			: undefined,
	};
});
