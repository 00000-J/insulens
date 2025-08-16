<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { NButton, NSlider, NInput, useMessage } from "naive-ui";
import {
  submitUserFeedback,
  type MealHistoryEntry,
  type UserFeedback,
} from "../../infra/services/MealHistoryApi";
import MealAnalysisResult from "../../../meal-analysis/ui/components/MealAnalysisResult.vue";

const router = useRouter();
const message = useMessage();

// State
const selectedMeal = ref<MealHistoryEntry | null>(null);
const selectedOutcome = ref<UserFeedback["glycemicOutcome"]>("euglycemic");
const symptomNotes = ref("");
const isSubmitting = ref(false);

// Glycemic outcome options with slider values
const glycemicOptions = [
  {
    value: "severe-hypoglycemia",
    label: "Severe\nLow",
    emoji: "🔴",
    sliderValue: 1,
  },
  {
    value: "mild-hypoglycemia",
    label: "Mild\nLow",
    emoji: "🟡",
    sliderValue: 2,
  },
  { value: "euglycemic", label: "Target\nRange", emoji: "🟢", sliderValue: 3 },
  {
    value: "mild-hyperglycemia",
    label: "Mild\nHigh",
    emoji: "🟡",
    sliderValue: 4,
  },
  {
    value: "severe-hyperglycemia",
    label: "Severe\nHigh",
    emoji: "🔴",
    sliderValue: 5,
  },
] as const;

// Current slider value (1-5)
const sliderValue = ref(3); // Default to euglycemic

// Update selected outcome when slider changes
function onSliderChange(value: number) {
  const option = glycemicOptions.find((opt) => opt.sliderValue === value);
  if (option) {
    selectedOutcome.value = option.value;
  }
}

// Update slider when outcome changes programmatically
function onOutcomeChange(outcome: UserFeedback["glycemicOutcome"]) {
  const option = glycemicOptions.find((opt) => opt.value === outcome);
  if (option) {
    sliderValue.value = option.sliderValue;
  }
}

// Load meal data from session storage
onMounted(() => {
  const storedMeal = sessionStorage.getItem("selected-meal");
  if (storedMeal) {
    selectedMeal.value = JSON.parse(storedMeal);

    // If meal already has feedback, pre-populate the form
    if (selectedMeal.value?.userFeedback) {
      selectedOutcome.value = selectedMeal.value.userFeedback.glycemicOutcome;
      symptomNotes.value = selectedMeal.value.userFeedback.symptomNotes;
      onOutcomeChange(selectedOutcome.value);
    }
  } else {
    // No meal data, go back to history
    router.replace("/meal-history");
  }
});

// Submit feedback
async function submitFeedback() {
  if (!selectedMeal.value) return;

  try {
    isSubmitting.value = true;

    await submitUserFeedback(selectedMeal.value.id, {
      glycemicOutcome: selectedOutcome.value,
      symptomNotes: symptomNotes.value.trim(),
    });

    message.success("Feedback saved successfully!");

    // Clear stored meal data
    sessionStorage.removeItem("selected-meal");

    // Navigate back to history
    setTimeout(() => {
      router.push("/meal-history");
    }, 500);
  } catch (error) {
    console.error("Failed to submit feedback:", error);
    message.error("Failed to save feedback. Please try again.");
  } finally {
    isSubmitting.value = false;
  }
}


</script>

<template>
  <div class="page-container meal-feedback-screen">
    <!-- Content -->
    <div v-if="selectedMeal">
      <MealAnalysisResult :analysis-result="selectedMeal.analysisResult" />
    </div>

    <n-card class="feedback-form" title="Feedback">
      <!-- Feedback Form -->
      <div class="feedback-form">
        <div class="question-section">


          <!-- Glycemic Outcome Slider -->
          <div class="slider-section">
            <div class="slider-labels">
              <div v-for="option in glycemicOptions" :key="option.value" class="slider-label"
                :class="{ active: option.value === selectedOutcome }">
                <div class="slider-emoji">{{ option.emoji }}</div>
                <div class="slider-text">{{ option.label }}</div>
              </div>
            </div>

            <n-slider v-model:value="sliderValue" :min="1" :max="5" :step="1" :tooltip="false" class="glycemic-slider"
              @update:value="onSliderChange" />
          </div>

        </div>

        <!-- Symptoms & Notes -->
        <div class="notes-section">
          <div class="parameter-label">Symptoms & Notes (Optional):</div>
          <n-input v-model:value="symptomNotes" type="textarea" placeholder="Felt calm and energized." :rows="3"
            maxlength="200" show-count class="notes-input" />
        </div>

      </div>
    </n-card>
    <n-button type="primary" size="large" block @click="submitFeedback">
      ACCEPT
    </n-button>
  </div>
</template>

<style scoped></style>
