import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import sendEnquiry from "./api/send-enquiry.js";

function enquiryApiPlugin() {
  return {
    name: "pawhaven-enquiry-api",
    configureServer(server) {
      server.middlewares.use("/api/send-enquiry", (req, res, next) => {
        sendEnquiry(req, res).catch(next);
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "RESEND_");
  for (const [key, value] of Object.entries(env)) {
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }

  return { plugins: [react(), enquiryApiPlugin()] };
});
