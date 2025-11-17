import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'
import { pluginSass } from '@rsbuild/plugin-sass'

export default defineConfig({
  plugins: [pluginReact(), pluginSass()],
  html: {
    title: 'SKXC后台管理系统',
  },
  server: {
    port: 5173,
    proxy: {
      // 所有以 /api 开头的请求，代理到后端 3000
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true, // 改变 origin 为 target 的 host（推荐开启）
        // secure: false, // 如果 target 是 https 但证书无效可加
        // pathRewrite: { '^/api': '' }, // 如果后端不需要 /api 前缀可去掉
      },
    },
  },
})
