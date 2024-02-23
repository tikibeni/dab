import { defineConfig } from "astro/config";

import svelte from "@astrojs/svelte";

export default defineConfig({
  integrations: [svelte()],
  server: { port: 3000, host: true },
});
