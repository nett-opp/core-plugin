import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import path from "node:path";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig(({ command, mode }) => {
  const isDev = command === "serve";
  const env = loadEnv(mode, process.cwd(), "VITE_");
  const pluginName = env.VITE_PLUGIN_NAME || "my-plugin";
  return {
    plugins: [
      vue(),
      viteStaticCopy({
        targets: [
          {
            src: "php/plugin.php",
            dest: "",
            rename: `${pluginName}.php`,
          },
          {
            src: "php/includes",
            dest: "",
          },
          ...(env.VITE_PLUGIN_INCLUDE_OPTIONAL_ASSETS === "true"
            ? [
                {
                  src: "node_modules/vue/dist/vue.global.prod.js",
                  dest: "assets",
                },
              ]
            : []),
        ],
      }),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    build: {
      outDir: "plugin",
      emptyOutDir: true,
      rollupOptions: {
        external: ["vue"],
        input: path.resolve(__dirname, "src/main.ts"),
        output: {
          globals: { vue: "Vue" },
          format: "iife",
          entryFileNames: `assets/${pluginName}.js`,
        },
      },
    },
    server: isDev
      ? {
          port: env.VITE_PLUGIN_PORT
            ? parseInt(env.VITE_PLUGIN_PORT, 10)
            : 3000,
        }
      : undefined,
  };
});
