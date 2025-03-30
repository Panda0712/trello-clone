import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
// SVGR is used to transform SVG elements into React components
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  // accept the process.env of vercel when deploying, access to the domain of vercel
  define: {
    "process.env": process.env,
  },
  optimizeDeps: {
    include: [
      "@emotion/react",
      "@emotion/styled",
      "@mui/material/Tooltip",
      "@mui/material/Unstable_Grid2",
    ],
  },
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
    svgr(),
  ],
  // base: './'
  // config alias for the codebase
  resolve: {
    alias: [{ find: "~", replacement: "/src" }],
  },
});
