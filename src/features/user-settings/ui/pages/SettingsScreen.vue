<script setup lang="ts">
import { onMounted, watch } from "vue";
import { NSpace, NCard, NInput, NSelect, NText, NSwitch, NGrid, NGridItem } from "naive-ui";
import { useUserSettingsStore } from "../../stores/userSettingsStore";
import { carbRatioOptions } from "../../domain/entities/CarbRatioOptions";
import { unitOptions } from "../../domain/entities/UnitOptions";
import { languageOptions } from "../../domain/entities/LanguageOptions";

const userSettingsStore = useUserSettingsStore();

onMounted(() => {
  userSettingsStore.loadSettings();
});

watch(
  () => userSettingsStore.profile,
  (val) => {
    userSettingsStore.saveProfile(val);
  },
  { deep: true }
);

watch(
  () => userSettingsStore.insulin,
  (val) => {
    userSettingsStore.saveInsulinSettings(val);
  },
  { deep: true }
);

watch(
  () => userSettingsStore.preferences,
  (val) => {
    userSettingsStore.saveAppPreferences(val);
  },
  { deep: true }
);
</script>

<template>
  <div class="page-container">
    <n-space vertical size="large">
      <n-card title="ICR">
        <n-space vertical size="medium">
          <n-select
            v-model:value="userSettingsStore.insulin.carbRatio"
            placeholder="Insulin-to-Carb Ratio (ICR)"
            :options="carbRatioOptions"
          />
          <n-text depth="3" style="margin-bottom: 0.5rem">
            Insulin-to-Carbohydrate Ratio (ICR) — the number of grams of
            carbohydrate covered by one unit of bolus insulin.
          </n-text>
        </n-space>
      </n-card>

      <n-card title="Profile">
        <n-grid :cols="2" :x-gap="12" :y-gap="12">
          <n-grid-item :span="2">
            <n-input
              v-model:value="userSettingsStore.profile.name"
              placeholder="Name"
            />
          </n-grid-item>
          <n-grid-item>
            <n-input
              v-model:value="userSettingsStore.profile.age"
              placeholder="Age"
            >
              <template #suffix> years </template>
            </n-input>
          </n-grid-item>
          <n-grid-item>
            <n-input
              v-model:value="userSettingsStore.profile.weight"
              placeholder="Weight"
            >
              <template #suffix> kg </template>
            </n-input>
          </n-grid-item>
          <n-grid-item :span="2">
            <n-text>Medical Notes</n-text>
            <n-input
              v-model:value="userSettingsStore.profile.medicalNotes"
              type="textarea"
              placeholder="e.g., Suffer from anemia, diabetes, etc."
              :rows="3"
              maxlength="400"
              show-count
            />
          </n-grid-item>
        </n-grid>
      </n-card>

      <n-card title="Preferences">
        <n-space vertical size="medium">
          <n-select
            v-model:value="userSettingsStore.preferences.units"
            placeholder="Units"
            :options="unitOptions"
          />
          <n-select
            v-model:value="userSettingsStore.preferences.language"
            placeholder="Language"
            :options="languageOptions"
          />
          <n-space align="center" justify="space-between">
            <n-text>Dark Mode</n-text>
            <n-switch
              v-model:value="userSettingsStore.preferences.darkMode"
            />
          </n-space>
          <n-space align="center" justify="space-between">
            <n-text>Sound</n-text>
            <n-switch v-model:value="userSettingsStore.preferences.sound" />
          </n-space>
        </n-space>
      </n-card>
    </n-space>
  </div>
</template>

<style scoped></style>
