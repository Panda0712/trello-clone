import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
// SVGR is used to transform SVG elements into React components
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  // base: './'
  // config alias for the codebase
  resolve: {
    alias: [{ find: "~", replacement: "/src" }],
  },
});
