import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      components: path.resolve(__dirname, "./src/components"),
      examples: path.resolve(__dirname, "./src/examples"),
      layouts: path.resolve(__dirname, "./src/layouts"),
      assets: path.resolve(__dirname, "./src/assets"),
      app: path.resolve(__dirname, "./src/app"),
      context: path.resolve(__dirname, "./src/context"),
      utils: path.resolve(__dirname, "./src/utils"),
      routes: path.resolve(__dirname, "./src/routes"),

      // specific CreativeTim alias fixes
      "components/MDBox": path.resolve(__dirname, "./src/components/MDBox/index.js"),
      "components/MDTypography": path.resolve(__dirname, "./src/components/MDTypography/index.js"),
      "components/MDButton": path.resolve(__dirname, "./src/components/MDButton/index.js"),
      "examples/Sidenav": path.resolve(__dirname, "./src/examples/Sidenav/index.jsx"),
      "examples/Configurator": path.resolve(__dirname, "./src/examples/Configurator/index.jsx"),
    },
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"],
  },

  // ✅ Tell Vite + esbuild to treat .js files as JSX
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.(js|jsx)$/, // any JS or JSX in /src
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx", // force JSX support for all JS imports
      },
    },
  },

  server: {
    port: 3000,
    open: true,
  },

  define: {
    "process.env": {},
  },

  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
      },
    },
  },
});
