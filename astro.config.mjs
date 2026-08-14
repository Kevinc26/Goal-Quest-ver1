import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

export default defineConfig({
  site: "https://kevinc26.github.io",
  base: isGitHubPages ? "/Goal-Quest-ver1" : "/",
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()]
  }
});
