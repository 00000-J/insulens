import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

// Lazy-load screens for better performance
const HomeScreen = () =>
  import("../features/meal-analysis/ui/pages/HomeScreen.vue");
const AddMealDetailsScreen = () =>
  import("../features/meal-analysis/ui/pages/AddMealDetailsScreen.vue");
const MealAnalysisResultsScreen = () =>
  import("../features/meal-analysis/ui/pages/MealAnalysisResultsScreen.vue");
const MealHistoryScreen = () =>
  import("../features/meal-history/ui/pages/MealHistoryScreen.vue");
const MealFeedbackScreen = () =>
  import("../features/meal-history/ui/pages/MealFeedbackScreen.vue");
const SettingsScreen = () =>
  import("../features/user-settings/ui/pages/SettingsScreen.vue");
const MealRecommendationsScreen = () =>
  import(
    "../features/meal-recommendations/ui/pages/MealRecommendationsScreen.vue"
  );

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: HomeScreen,
  },
  {
    path: "/add-meal-details",
    name: "AddMealDetails",
    component: AddMealDetailsScreen,
  },
  {
    path: "/meal-analysis-results",
    component: MealAnalysisResultsScreen,
  },
  {
    path: "/settings",
    component: SettingsScreen,
  },
  {
    path: "/recommend",
    component: MealRecommendationsScreen,
  },
  {
    path: "/history",
    component: MealHistoryScreen,
  },
  {
    path: "/meal-history",
    component: MealHistoryScreen,
  },
  {
    path: "/meal-feedback",
    component: MealFeedbackScreen,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
