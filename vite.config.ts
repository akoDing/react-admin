import { defineConfig, loadEnv, type ConfigEnv, type UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { warppEnv } from './src/utile/getEnv'
import viteCompression from 'vite-plugin-compression'

// https://vite.dev/config/
export default defineConfig((mode: ConfigEnv): UserConfig => {
  const env = loadEnv(mode.mode, process.cwd())
  const viteEnv = warppEnv(env)

  console.log('-------------- 打印环境变量 --------------')
  console.log(env)
  console.log(viteEnv)

  return {
    plugins: [
      react(),
      viteEnv.VITE_USE_COMPRESS && viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz',
        deleteOriginFile: false,
        filter: /\.(js|mjs|json|css|html)$/i
      })
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src')
      }
    },
    server: {
      host: '0.0.0.0',
      port: viteEnv.VITE_PORT,
      open: viteEnv.VITE_OPEN,
      proxy: {
        '/api': {
          target: viteEnv.VITE_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    build: {
      outDir: 'dist',
      // minify: 'terser',
      // terserOptions: {
      //   compress: {
      //     drop_console: viteEnv.VITE_DROP_CONSOLE,
      //     drop_debugger: true
      //   }
      // }
      minify: 'esbuild',
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
        }
      }
    }
  }
})
