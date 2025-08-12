<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Preferences } from '@capacitor/preferences'
import {
  NPageHeader,
  NSpace,
  NCard,
  NInput,
  NSelect,
  NText,
  NSwitch
} from 'naive-ui'
import { useThemeStore } from '../../../../app/stores/theme'

const router = useRouter()

const profile = ref({
  name: '',
  age: '',
  weight: ''
})

const insulin = ref({
  carbRatio: '1:10'
})

const preferences = ref({
  units: 'metric',
  language: 'en',
  darkMode: true,
  sound: false
})

const carbRatioOptions = [
  { value: '1:5', label: '1:5' },
  { value: '1:6', label: '1:6' },
  { value: '1:7', label: '1:7' },
  { value: '1:8', label: '1:8' },
  { value: '1:9', label: '1:9' },
  { value: '1:10', label: '1:10' },
  { value: '1:11', label: '1:11' },
  { value: '1:12', label: '1:12' },
  { value: '1:13', label: '1:13' },
  { value: '1:14', label: '1:14' },
  { value: '1:15', label: '1:15' },
  { value: '1:16', label: '1:16' },
  { value: '1:17', label: '1:17' },
  { value: '1:18', label: '1:18' },
  { value: '1:19', label: '1:19' },
  { value: '1:20', label: '1:20' },
  { value: '1:21', label: '1:21' },
  { value: '1:22', label: '1:22' },
  { value: '1:23', label: '1:23' },
  { value: '1:24', label: '1:24' },
  { value: '1:25', label: '1:25' }
]

const unitOptions = [
  { value: 'metric', label: 'Metric (kg, cm, ml)' },
  { value: 'imperial', label: 'Imperial (lbs, in, fl oz)' }
]

const languageOptions = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' }
]

const PROFILE_KEY = 'user_profile'
const INSULIN_KEY = 'insulin_settings'
const PREFS_KEY = 'app_preferences'

onMounted(async () => {
  const storedProfile = await Preferences.get({ key: PROFILE_KEY })
  if (storedProfile.value) {
    profile.value = JSON.parse(storedProfile.value)
  }
  const storedInsulin = await Preferences.get({ key: INSULIN_KEY })
  if (storedInsulin.value) {
    insulin.value = JSON.parse(storedInsulin.value)
  }
  const storedPrefs = await Preferences.get({ key: PREFS_KEY })
  if (storedPrefs.value) {
    preferences.value = JSON.parse(storedPrefs.value)
  }
})

watch(profile, (val) => {
  Preferences.set({ key: PROFILE_KEY, value: JSON.stringify(val) })
}, { deep: true })

watch(insulin, (val) => {
  Preferences.set({ key: INSULIN_KEY, value: JSON.stringify(val) })
}, { deep: true })

watch(preferences, (val) => {
  Preferences.set({ key: PREFS_KEY, value: JSON.stringify(val) })
}, { deep: true })

const themeStore = useThemeStore()

watch(
  () => preferences.value.darkMode,
  (val) => {
    themeStore.set(val)
  },
  { immediate: true }
)

function goBack() {
  router.back()
}
</script>

<template>
  <div class="settings-wrapper">
    <n-page-header title="Settings" :on-back="goBack" />

    <n-space vertical size="large">
      <!-- Insulin Settings first -->
      <n-card title="ICR">
        <n-space vertical size="medium">
          <n-select
            v-model:value="insulin.carbRatio"
            placeholder="Insulin-to-Carb Ratio (ICR)"
            :options="carbRatioOptions"
          />
          <n-text depth="3" style="margin-bottom: 0.5rem;">
            Insulin-to-Carbohydrate Ratio (ICR) — the number of grams of carbohydrate covered by one unit of bolus insulin.
          </n-text>
        </n-space>
      </n-card>

      <!-- Profile next -->
      <n-card title="Profile">
        <n-space vertical size="medium">
          <n-input v-model:value="profile.name" placeholder="Name" />
          <n-input v-model:value="profile.age" placeholder="Age" />
          <n-input v-model:value="profile.weight" placeholder="Weight (kg)" />
        </n-space>
      </n-card>

      <!-- Preferences -->
      <n-card title="Preferences">
        <n-space vertical size="medium">
          <n-select v-model:value="preferences.units" placeholder="Units" :options="unitOptions" />
          <n-select
            v-model:value="preferences.language"
            placeholder="Language"
            :options="languageOptions"
          />
          <n-space align="center" justify="space-between">
            <n-text>Dark Mode</n-text>
            <n-switch v-model:value="preferences.darkMode" />
          </n-space>
          <n-space align="center" justify="space-between">
            <n-text>Sound</n-text>
            <n-switch v-model:value="preferences.sound" />
          </n-space>
        </n-space>
      </n-card>
    </n-space>
  </div>
</template>

<style scoped>

</style>
