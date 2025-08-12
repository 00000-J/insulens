import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import checker from 'vite-plugin-checker'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load envs if needed
  const env = loadEnv(mode, process.cwd(), '')

  const enableDevTools =
    mode === 'development' && env.VITE_VUE_DEVTOOLS === 'true'

  return {
    plugins: [
      vue(),
      ...(enableDevTools ? [vueDevTools()] : []),
      checker({
        vueTsc: true,
        eslint: {
          useFlatConfig: true,
          lintCommand: 'eslint "src/**/*.{ts,tsx,vue}" --max-warnings 0'
        }
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    test: {
      environment: 'jsdom',
      setupFiles: ['src/test/setup.ts']
    }
  }
})
