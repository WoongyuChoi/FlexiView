import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === "production" ? "/FlexiView/" : "/", // 배포 시에만 base 경로 적용
});
