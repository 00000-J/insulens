<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { darkTheme, NConfigProvider } from 'naive-ui'
import { useThemeStore } from './stores/theme'
import BottomNavigation from '../shared/ui/components/BottomNavigation.vue'

const themeStore = useThemeStore()

onMounted(() => {
  themeStore.load()
})

const currentTheme = computed(() => (themeStore.isDark ? darkTheme : null))
</script>

<template>
  <n-config-provider :theme="currentTheme">
    <div class="app-container">
      <router-view />
      <bottom-navigation />
    </div>
  </n-config-provider>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  padding-bottom: 80px; /* Space for bottom navigation */
}
</style>
