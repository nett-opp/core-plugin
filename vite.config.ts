import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import { viteStaticCopy } from "vite-plugin-static-copy";
import { getConfig } from "./_build_helpers/getConfig";
import { generatePHP } from "./_build_helpers/generatePHP";

export default defineConfig((config) => {
  const env = getConfig(config);
  return {
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/_variables.scss" as *;`,
        },
      },
    },
    ...(env.isDev
      ? { base: "/", server: { port: env.port } }
      : {
          base: "./",
          define: {
            "process.env": {},
          },
          build: {
            outDir: `.plugins/${env.pluginSlug}`,
            emptyOutDir: false,
            lib: {
              entry: "src/main.ts",
              name: "P_APP_Global",
              formats: ["iife"],
            },
            rollupOptions: {
              output: {
                entryFileNames: `assets/${env.pluginSlug}.js`,
                assetFileNames: `assets/${env.pluginSlug}.[ext]`,
              },
            },
          },
        }),
    plugins: [
      vue(),
      ...(env.isDev
        ? []
        : [
            viteStaticCopy({
              targets: [
                {
                  src: "php/plugin.php",
                  dest: "",
                  rename: `${env.pluginSlug}.php`,
                  transform: generatePHP(env),
                },
                {
                  src: "php/includes",
                  dest: "",
                },
              ],
            }),
          ]),
    ],
  };
});
