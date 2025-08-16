<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useMealAnalysisStore } from "../../stores/mealAnalysisStore";
import MealAnalysisResult from "../components/MealAnalysisResult.vue";
import {
  NCard,
  NSpin,
  NAlert,
  NButton,
} from "naive-ui";
import type { ProcessedAnalysisResult } from "../../infra/services/MealAnalysisApi";


const router = useRouter();
const mealAnalysisStore = useMealAnalysisStore();

const analysisResult = computed(() => mealAnalysisStore.analysisResult);
const isLoading = computed(() => mealAnalysisStore.isLoading);
const loadError = computed(() => mealAnalysisStore.error);

async function acceptAnalysis(_result: ProcessedAnalysisResult) {
  try {
    // TODO: This should be moved to a use case and infra service
    // const submission = await submitAnalysisAcceptance(result);
    // console.log("Analysis accepted:", submission);

    // For now, just navigate back to home
    router.push("/");
  } catch (error) {
    console.error("Failed to submit analysis acceptance:", error);
    router.push("/");
  }
}
</script>

<template>
  <div class="page-container meal-analysis-screen">
    <!-- Loading State -->
    <n-card v-if="isLoading">
      <n-spin size="large">
        <template #description> Analyzing meal... </template>
      </n-spin>
    </n-card>

    <!-- Error State -->
    <n-card v-else-if="loadError" class="error-container">
      <n-alert title="Error Loading Analysis" type="error">
        {{ loadError }}
      </n-alert>
      <n-button @click="router.back()" type="primary"> Go Back </n-button>
    </n-card>

    <!-- Main Content -->
    <div v-else-if="analysisResult" class="content">
      <MealAnalysisResult :analysis-result="analysisResult" />
      <!-- Accept Button -->
      <n-button
        type="primary"
        size="large"
        block
        @click="acceptAnalysis(analysisResult)"
      >
        ACCEPT
      </n-button>
    </div>

    <!-- No result state -->
    <n-card v-else>
      <n-alert title="No Analysis Data" type="info">
        There is no analysis data to display. Please go back and analyze a meal.
      </n-alert>
      <n-button @click="router.back()" type="primary"> Go Back </n-button>
    </n-card>
  </div>
</template>
