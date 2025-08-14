<script setup lang="ts">
import { useRouter } from 'vue-router'
import { NCard, NButton, NIcon } from 'naive-ui'
import { CameraSharp, MenuSharp, SettingsSharp } from '@vicons/ionicons5'

const router = useRouter()

function navigateToSettings() {
  router.push('/settings')
}

function startPhotoAnalysis() {
  router.push('/photo-analysis')
}
</script>

<template>
  <div class="home-screen">
    <!-- Header -->
    <div class="header">
      <n-button text class="menu-button">
        <n-icon size="24">
          <MenuSharp />
        </n-icon>
      </n-button>
      <h1 class="app-title">Carb Counter</h1>
      <n-button text class="settings-button" @click="navigateToSettings">
        <n-icon size="24">
          <SettingsSharp />
        </n-icon>
      </n-button>
    </div>

    <!-- Main Content -->
    <div class="main-content">
      <div class="analyze-section">
        <h2 class="analyze-title">📷 ANALYZE MEAL</h2>
        
        <n-card class="photo-card" hoverable @click="startPhotoAnalysis">
          <div class="photo-content">
            <n-icon size="48" class="camera-icon">
              <CameraSharp />
            </n-icon>
            <div class="photo-text">
              <div>Take Photo of</div>
              <div>Your Meal</div>
            </div>
          </div>
        </n-card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-screen {
  padding: 1rem;
  max-width: 400px;
  margin: 0 auto;
  height: calc(100vh - 80px); /* Account for bottom navigation */
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--border-color, #e0e0e0);
  margin-bottom: 2rem;
}

:root.dark .header {
  border-bottom-color: #404040;
}

.menu-button,
.settings-button {
  padding: 0.5rem;
  border-radius: 8px;
}

.app-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  color: var(--text-color);
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem 0;
}

.analyze-section {
  text-align: center;
}

.analyze-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: var(--text-color);
}

.photo-card {
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 12px;
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.photo-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

:root.dark .photo-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.photo-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
}

.camera-icon {
  color: var(--primary-color, #18a058);
  opacity: 0.8;
}

.photo-text {
  font-size: 1rem;
  line-height: 1.4;
  color: var(--text-color);
  opacity: 0.8;
}

.photo-text div {
  margin: 0.25rem 0;
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .home-screen {
    padding: 0.75rem;
  }
  
  .header {
    margin-bottom: 1.5rem;
  }
  
  .analyze-title {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
  
  .photo-content {
    padding: 1rem;
  }
  
  .camera-icon {
    font-size: 36px;
  }
  
  .photo-text {
    font-size: 0.9rem;
  }
}
</style>
