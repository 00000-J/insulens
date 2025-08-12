import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// Lazy-load screens for better performance
const SettingsScreen = () => import('../features/user-settings/ui/pages/SettingsScreen.vue')
const MealRecommendationsScreen = () => import('../features/meal-recommendations/ui/pages/MealRecommendationsScreen.vue')
const PlaceholderScreen = () => import('../shared/ui/components/PlaceholderScreen.vue')

const routes: RouteRecordRaw[] = [
  
  {
    path: '/',
    component: PlaceholderScreen,
    props: { title: 'Home', description: 'Home screen' }
  },
  {
    path: '/settings',
    component: SettingsScreen
  },
  {
    path: '/recommend',
    component: MealRecommendationsScreen
  },
  {
    path: '/history',
    component: PlaceholderScreen,
    props: { title: 'History', description: 'History screen' }
  },
  {
    path: '/stats',
    component: PlaceholderScreen,
    props: { title: 'Statistics', description: 'View your blood sugar trends and insulin usage statistics.' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
