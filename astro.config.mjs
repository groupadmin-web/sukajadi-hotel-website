import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://www.sukajadihotel.com", // 🌟 THE FIX: Your real hotel URL goes here!
  integrations: [mdx(), sitemap(), icon()],
  vite: {
    plugins: [tailwindcss()],
  },
  // 🔽 ADD THIS SECTION TO FIX THE ERRORs 🔽
  experimental: {
    session: true,
  },
});
