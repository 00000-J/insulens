<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import {
  NCard,
  NButton,
  NSlider,
  NInput,
  NButtonGroup,
  NGrid,
  NGridItem,
} from "naive-ui";
import { containers } from "../../domain/entities/Container";
import { mealTypes } from "../../domain/entities/MealType";
import { getMealTypeByTime } from "../../domain/services/MealTimeService";
import { AddMealDetailsUseCase } from "../../app/usecases/AddMealDetailsUseCase";
import { MockMealAnalysisService } from "../../infra/services/MockMealAnalysisService";
import type { AnalysisParameters } from "../../app/contracts/IMealAnalysisService";
import { useMealAnalysisStore } from "../../stores/mealAnalysisStore";

const router = useRouter();
const mealAnalysisStore = useMealAnalysisStore();

// Instantiate the use case with the mock service
const mealAnalysisService = new MockMealAnalysisService();
const addMealDetailsUseCase = new AddMealDetailsUseCase(mealAnalysisService);

// Reactive state
const selectedContainer = ref("plate");
const plateSize = ref(27);
const bowlSize = ref(13);
const glassVolume = ref(300);
const selectedMealType = ref(getMealTypeByTime());
const weight = ref(0);
const carbs = ref(0);
const comments = ref("");

// Container options
const containers = [
  { value: "plate", label: "Plate" },
  { value: "bowl", label: "Bowl" },
  { value: "glass", label: "Glass" },
];

// Meal type options
const mealTypes = [
  { value: "breakfast", label: "Breakfast" },
  { value: "lunch", label: "Lunch" },
  { value: "dinner", label: "Dinner" },
  { value: "snack", label: "Snack" },
];

async function addMealDetails() {
  const params: AnalysisParameters = {
    container: selectedContainer.value,
    size: currentSize.value,
    mealType: selectedMealType.value,
    weight: weight.value,
    comments: comments.value,
    carbs: carbs.value,
  };

  mealAnalysisStore.setLoading(true);
  mealAnalysisStore.setError(null);
  mealAnalysisStore.setAnalysisParameters(params);

  try {
    const result = await addMealDetailsUseCase.execute(params);
    mealAnalysisStore.setAnalysisResult(result);
    router.push("/meal-analysis-results");
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    mealAnalysisStore.setError(errorMessage);
  } finally {
    mealAnalysisStore.setLoading(false);
  }
}

// Get current size parameter
const currentSize = computed(() => {
  switch (selectedContainer.value) {
    case "plate":
      return plateSize.value;
    case "bowl":
      return bowlSize.value;
    case "glass":
      return glassVolume.value;
    default:
      return 25; // Should not be reached
  }
});

function updateSize(value: number) {
  switch (selectedContainer.value) {
    case "plate":
      plateSize.value = value;
      break;
    case "bowl":
      bowlSize.value = value;
      break;
    case "glass":
      glassVolume.value = value;
      break;
  }
}

const sizeConfig = computed(() => {
  switch (selectedContainer.value) {
    case "plate":
      return {
        label: "Plate Diameter",
        unit: "cm",
        range: { min: 13, max: 32, step: 1 },
      };
    case "bowl":
      return {
        label: "Bowl Diameter",
        unit: "cm",
        range: { min: 10, max: 20, step: 1 },
      };
    case "glass":
      return {
        label: "Glass Volume",
        unit: "ml",
        range: { min: 150, max: 650, step: 50 },
      };
    default:
      return {
        label: "Size",
        unit: "cm",
        range: { min: 15, max: 35, step: 1 },
      };
  }
});

// Computed property to check if all required fields from the first card are filled
const isAnalyzeDisabled = computed(() => {
  // Check if carbs value is specified (greater than 0)
  return carbs.value === 0;
});
</script>

<template>
  <div class="page-container add-meal-details-screen">
    <!-- Main Content -->
    <n-card>
      <n-grid :cols="1" :y-gap="24">
        <n-grid-item>
          <!-- Meal Type Selection -->

          <n-button-group class="meal-type-buttons">
            <n-button
              v-for="mealType in mealTypes"
              :key="mealType.value"
              :type="
                selectedMealType === mealType.value ? 'primary' : 'default'
              "
              @click="selectedMealType = mealType.value"
              class="meal-type-button"
            >
              {{ mealType.label }}
            </n-button>
          </n-button-group>
        </n-grid-item>
        <n-grid-item>
          <!-- Container Selection -->

          <n-button-group class="container-buttons">
            <n-button
              v-for="container in containers"
              :key="container.value"
              :type="
                selectedContainer === container.value ? 'primary' : 'default'
              "
              @click="selectedContainer = container.value"
              class="container-button"
            >
              {{ container.label }}
            </n-button>
          </n-button-group>
        </n-grid-item>
        <n-grid-item>
          <!-- Size Parameter directly under container -->
          <div class="size-parameter">
            <div class="parameter-label">
              {{ sizeConfig.label }}: {{ currentSize }}{{ sizeConfig.unit }}
            </div>
            <n-slider
              :value="currentSize"
              @update:value="updateSize"
              :min="sizeConfig.range.min"
              :max="sizeConfig.range.max"
              :step="sizeConfig.range.step"
              :tooltip="false"
              class="size-slider"
            />
          </div>
        </n-grid-item>
        <n-grid-item>
          <div class="parameter-item">
            <div class="parameter-label">
              Guess the Carbs: {{ carbs === 0 ? "Not specified" : `${carbs}g` }}
            </div>
            <n-slider
              v-model:value="carbs"
              :min="0"
              :max="150"
              :step="1"
              :tooltip="false"
              class="weight-slider"
            />
          </div>
        </n-grid-item>
      </n-grid>
    </n-card>
    <!-- Optional Parameters -->
    <n-card title="Optional" style="margin-top: var(--space-4)">
      <n-grid :cols="1" :y-gap="24">
        <n-grid-item>
          <div class="parameter-item">
            <div class="parameter-label">
              Weight: {{ weight === 0 ? "Not specified" : `${weight}g` }}
            </div>
            <n-slider
              v-model:value="weight"
              :min="0"
              :max="1000"
              :step="50"
              :tooltip="false"
              class="weight-slider"
            />
          </div>
        </n-grid-item>
        <n-grid-item>
          <!-- General Comments -->
          <div class="parameter-item">
            <div class="parameter-label">General Comments:</div>
            <n-input
              v-model:value="comments"
              placeholder='e.g. "Post-workout meal"'
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4 }"
              class="comments-input"
            />
          </div>
        </n-grid-item>
      </n-grid>
    </n-card>

    <!-- Analyze Button -->
    <n-button
      type="primary"
      size="large"
      block
      @click="addMealDetails"
      class="analyze-button"
      :disabled="isAnalyzeDisabled"
    >
      ANALYZE
    </n-button>
  </div>
</template>

<style scoped></style>
