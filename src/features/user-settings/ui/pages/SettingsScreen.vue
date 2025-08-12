<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  NPageHeader,
  NSpace,
  NCard,
  NInput,
  NSelect
} from 'naive-ui'

const router = useRouter()

const profile = ref({
  name: '',
  age: '',
  weight: ''
})

const insulin = ref({
  sensitivity: '',
  carbRatio: ''
})

const preferences = ref({
  units: 'metric',
  language: 'en'
})

const sensitivityOptions = [
  { value: 'high', label: 'High Sensitivity' },
  { value: 'medium', label: 'Medium Sensitivity' },
  { value: 'low', label: 'Low Sensitivity' }
]

const carbRatioOptions = [
  { value: '1:10', label: '1:10 (1 unit per 10g carbs)' },
  { value: '1:15', label: '1:15 (1 unit per 15g carbs)' },
  { value: '1:20', label: '1:20 (1 unit per 20g carbs)' },
  { value: 'custom', label: 'Custom Ratio' }
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

function goBack() {
  router.back()
}
</script>

<template>
  <div class="settings-wrapper">
    <n-page-header title="Settings" :on-back="goBack" />

    <n-space vertical size="large">
      <n-card title="Personal Information">
        <n-space vertical size="medium">
          <n-input v-model:value="profile.name" placeholder="Name" />
          <n-input v-model:value="profile.age" placeholder="Age" />
          <n-input v-model:value="profile.weight" placeholder="Weight (kg)" />
        </n-space>
      </n-card>

      <n-card title="Insulin Configuration">
        <n-space vertical size="medium">
          <n-select
            v-model:value="insulin.sensitivity"
            placeholder="Insulin Sensitivity"
            :options="sensitivityOptions"
          />
          <n-select
            v-model:value="insulin.carbRatio"
            placeholder="Carb Ratio"
            :options="carbRatioOptions"
          />
        </n-space>
      </n-card>

      <n-card title="App Preferences">
        <n-space vertical size="medium">
          <n-select v-model:value="preferences.units" placeholder="Units" :options="unitOptions" />
          <n-select
            v-model:value="preferences.language"
            placeholder="Language"
            :options="languageOptions"
          />
        </n-space>
      </n-card>
    </n-space>
  </div>
</template>

<style scoped>
.settings-wrapper {
  padding: 1rem;
}
</style>
