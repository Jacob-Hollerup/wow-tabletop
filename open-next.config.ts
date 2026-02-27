import { defineCloudflareConfig } from "@opennextjs/cloudflare";

const config = defineCloudflareConfig();
config.buildCommand = "node scripts/bundle-content.mjs && next build";
export default config;
