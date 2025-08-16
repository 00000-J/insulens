<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import { NSpace, NButton, NIcon } from "naive-ui";
import {
  HomeSharp,
  TimeSharp,
  SettingsSharp,
  PizzaSharp,
  HomeOutline,
  TimeOutline,
  SettingsOutline,
  PizzaOutline,
} from "@vicons/ionicons5";

const router = useRouter();
const route = useRoute();

const navItems = [
  {
    path: "/",
    iconActive: HomeSharp,
    iconInactive: HomeOutline,
    label: "Home",
  },
  {
    path: "/history",
    iconActive: TimeSharp,
    iconInactive: TimeOutline,
    label: "History",
  },
  {
    path: "/recommend",
    iconActive: PizzaSharp,
    iconInactive: PizzaOutline,
    label: "Recommend",
  },
  {
    path: "/settings",
    iconActive: SettingsSharp,
    iconInactive: SettingsOutline,
    label: "Settings",
  },
];

function navigateTo(path: string) {
  router.push(path);
}

function isActive(path: string) {
  // Handle special case for home route
  if (path === "/" && route.path === "/settings") {
    return false;
  }
  if (path === "/" && route.path === "/") {
    return true;
  }
  return route.path === path;
}
</script>

<template>
  <div class="bottom-nav">
    <n-space justify="space-around" align="center" size="small">
      <n-button
        v-for="item in navItems"
        :key="item.path"
        text
        :class="{ 'nav-active': isActive(item.path) }"
        @click="navigateTo(item.path)"
        class="nav-button"
      >
        <div class="nav-item">
          <n-icon class="nav-icon" size="20">
            <component
              :is="isActive(item.path) ? item.iconActive : item.iconInactive"
            />
          </n-icon>
          <span class="nav-label">{{ item.label }}</span>
        </div>
      </n-button>
    </n-space>
  </div>
</template>

<style scoped>
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: color-mix(
    in srgb,
    var(--card-bg-color) 90%,
    transparent
  ) !important;
  backdrop-filter: blur(30px);

  border-top: 1px solid var(--border-color, #e0e0e0);
  padding: 0.5rem 1rem;
  z-index: 1000;
}

:root.dark .bottom-nav {
  border-top-color: #404040;
}

.nav-button {
  padding: 0.5rem;
  min-width: 60px;
  border-radius: 8px;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.nav-icon {
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-label {
  font-size: 0.75rem;
  opacity: 0.8;
}

.nav-active {
  background-color: var(
    --primary-color-hover,
    rgba(24, 160, 88, 0.1)
  ) !important;
}

.nav-active .nav-label {
  opacity: 1;
  font-weight: 600;
}

/* Add bottom padding to content to avoid navigation overlap */
body {
  padding-bottom: 80px;
}
</style>
