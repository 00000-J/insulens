<script setup lang="ts">
import { computed, onMounted } from "vue";
import { darkTheme, NConfigProvider, NMessageProvider } from "naive-ui";
import { useUserSettingsStore } from "../features/user-settings/stores/userSettingsStore";
import BottomNavigation from "../shared/ui/components/BottomNavigation.vue";

const userSettingsStore = useUserSettingsStore();

onMounted(() => {
  userSettingsStore.loadSettings();
});

const currentTheme = computed(() =>
  userSettingsStore.preferences.darkMode ? darkTheme : null,
);
</script>

<template>
  <n-config-provider :theme="currentTheme">
    <n-message-provider>
      <div class="app-container">
        <router-view />
        <bottom-navigation />
      </div>
    </n-message-provider>
  </n-config-provider>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  padding-bottom: 80px; /* Space for bottom navigation */
}
</style>
