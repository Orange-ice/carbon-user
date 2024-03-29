import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import UnoCSS from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ArcoResolver } from 'unplugin-vue-components/resolvers';
import { vitePluginForArco } from '@arco-plugins/vite-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(),
    // arco-design/web-vue 按需加载（模板）【插件会自动解析模板中的使用到的组件，并导入组件和对应的样式文件。】
    AutoImport({
      resolvers: [ArcoResolver()],
    }),
    Components({
      resolvers: [
        ArcoResolver({
          sideEffect: true
        })
      ]
    }),
    // 按需加载与组件库主题（Arco 插件）【插件会自动加载组件样式。】
    vitePluginForArco({
      style: 'css'
    })
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://saas-dev.ecdigit.dev/',
        changeOrigin: true,
      },
      '/ecdigit/api': {
        target: 'https://saas-dev.ecdigit.dev/',
        changeOrigin: true,
      }
    }
  }
});
