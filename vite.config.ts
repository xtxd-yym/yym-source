import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';


// https://vitejs.dev/config/
export default defineConfig({
  // 静态资源引用路径，默认为"/"
  base: './',
  build: {
    // build目录名称，默认为"dist"
    outDir: 'build',
    // 静态资源存放目录名称，默认为"assets"
    assetsDir: 'static',
    // 生成map文件，默认为false（不建议设置）
    sourcemap: true,
  },
  server: {
    // 支持IP访问
    host: true,
    // 指定dev sever的端口号，默认为5173
    port: 3000,
    // 自动打开浏览器运行以下页面
    open: '/',
    // 设置反向代理
    proxy: {
      // 以下示例表示：请求URL中含有"/api"，则反向代理到http://localhost
      // 例如: http://localhost:3000/api/login -> http://localhost/api/login
      '/api': {
        target: 'http://localhost:3001/',
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        // modifyVars: {
        //   hack: `true; @import (reference) "${path.resolve('src/constant/styles/prefix.less')}";` //你的样式路径
        // },
        javascriptEnabled: true,
        // additionalData: '@import "./src/constant/styles/prefix.less";'
      },
    },
  }
})


