<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import {
  NCard,
  NSelect,
  NSpace,
  NText,
  NEmpty,
  NSpin,
  NGrid,
  NGridItem,
} from "naive-ui";
import { useMealHistoryStore } from "../../stores/mealHistoryStore";
import { mealTypeOptions } from "../../domain/entities/MealTypeFilter";
import { strategyTypeOptions } from "../../domain/entities/StrategyTypeFilter";
import { feedbackOptions } from "../../domain/entities/FeedbackFilter";
import { getTimeAgo } from "../../domain/services/DateFormatter";
import { transformToChartData } from "../../domain/services/ChartDataTransformer";
import { getFeedbackDisplayText } from "../../domain/services/FeedbackFormatter";
import type { MealHistoryEntry } from "../../../../shared/domain/entities/MealHistory";

const router = useRouter();
const mealHistoryStore = useMealHistoryStore();

const filteredMeals = computed(() => mealHistoryStore.filteredMeals);
const isLoading = computed(() => mealHistoryStore.isLoading);
const chartData = computed(() =>
  transformToChartData(mealHistoryStore.filteredMeals),
);

function openFeedback(meal: MealHistoryEntry) {
  sessionStorage.setItem("selected-meal", JSON.stringify(meal));
  router.push("/meal-feedback");
}

onMounted(() => {
  mealHistoryStore.fetchMealHistory();
});
</script>

<template>
  <div class="page-container meal-history-screen">
    <n-card class="trend-chart-section">
      <div class="filters-section">
        <n-space size="small" :wrap="false">
          <n-select
            :value="mealHistoryStore.selectedMealType"
            @update:value="mealHistoryStore.setMealTypeFilter"
            :options="mealTypeOptions"
            style="min-width: 100px"
          />
          <n-select
            :value="mealHistoryStore.selectedStrategyType"
            @update:value="mealHistoryStore.setStrategyTypeFilter"
            :options="strategyTypeOptions"
            style="min-width: 110px"
          />
          <n-select
            :value="mealHistoryStore.selectedFeedback"
            @update:value="mealHistoryStore.setFeedbackFilter"
            :options="feedbackOptions"
            style="min-width: 120px"
          />
        </n-space>
      </div>
      <div>
        <div class="chart-container">
          <div
            v-for="point in chartData"
            :key="point.id"
            class="chart-point"
            :style="point.style"
          >
            {{ point.emoji }}
          </div>
        </div>
      </div>
    </n-card>

    <n-spin :show="isLoading">
      <n-card
        v-if="filteredMeals.length === 0 && !isLoading"
        class="empty-state"
      >
        <n-empty description="No meals found" />
      </n-card>

      <div v-else class="meals-list">
        <n-card
          v-for="meal in filteredMeals"
          :key="meal.id"
          class="meal-item n-card-with-description"
          hoverable
          @click="openFeedback(meal)"
          :title="meal.analysisResult.dishName"
        >
          <div class="n-card-description">
            {{ getTimeAgo(meal.acceptedAt) }}
            {{ meal.inputParameters.mealType }}
            {{ meal.analysisResult.carbohydrates }}g of carbs
          </div>

          <n-grid :cols="1">
            <n-grid-item style="text-transform: capitalize">
              Strategy: {{ meal.analysisResult.strategy.type }}
            </n-grid-item>
            <n-grid-item>
              Feedback:
              <n-text
                v-if="meal.userFeedback"
                :type="
                  meal.userFeedback.glycemicOutcome === 'euglycemic'
                    ? 'success'
                    : 'warning'
                "
              >
                {{ getFeedbackDisplayText(meal.userFeedback.glycemicOutcome) }}
              </n-text>
              <n-text v-else depth="3"> Not Rated </n-text>
            </n-grid-item>
          </n-grid>

          <div
            class="n-card-footer"
            v-if="meal.userFeedback && meal.userFeedback.symptomNotes"
          >
            {{ meal.userFeedback.symptomNotes }}
          </div>
        </n-card>
      </div>
    </n-spin>
  </div>
</template>
