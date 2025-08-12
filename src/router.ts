import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// Lazy-load the settings screen for better performance
const SettingsScreen = () => import('./features/user-settings/ui/pages/SettingsScreen.vue')

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/settings'
  },
  {
    path: '/settings',
    component: SettingsScreen
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
