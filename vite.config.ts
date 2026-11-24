import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// 本地开发时把浏览器同源请求转发到管理员 API。
export default defineConfig({
  plugins: [react()],
  server: { proxy: { '/api': { target: 'http://127.0.0.1:8001', changeOrigin: false, secure: false } } },
})
