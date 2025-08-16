<script setup lang="ts">
import { ref } from "vue";
import { NButton, NInput } from "naive-ui";

const selectedMeal = ref("");
const additionalInfo = ref("");

const mealTypes = [
  { value: "breakfast", label: "Breakfast", emoji: "🌅" },
  { value: "lunch", label: "Lunch", emoji: "🌞" },
  { value: "dinner", label: "Dinner", emoji: "🌙" },
  { value: "snack", label: "Snack", emoji: "🍿" },
];

function selectMeal(meal: string) {
  selectedMeal.value = meal;
}

function startChat() {
  const mealType = selectedMeal.value;
  const preferences = additionalInfo.value
    ? ` with preferences: ${additionalInfo.value}`
    : "";
  const prompt = `Recommend a ${mealType} for someone with type 1 diabetes. FYI,  ${preferences}.`;

  // Try to open ChatGPT app on iOS first
  const chatGPTAppUrl = `chatgpt://chat?message=${encodeURIComponent(prompt)}`;
  const chatGPTWebUrl = `https://chat.openai.com/?q=${encodeURIComponent(prompt)}`;

  // Check if we're on iOS
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  if (isIOS) {
    // Try to open the ChatGPT app
    window.location.href = chatGPTAppUrl;

    // Fallback to web version if app doesn't open within 2 seconds
    setTimeout(() => {
      window.open(chatGPTWebUrl, "_blank");
    }, 2000);
  } else {
    // For non-iOS devices, open web version directly
    window.open(chatGPTWebUrl, "_blank");
  }
}

function isSelected(meal: string) {
  return selectedMeal.value === meal;
}
</script>

<template>
  <div class="page-container">
    <n-card title="What type of meal?">
      <n-button
        v-for="meal in mealTypes"
        :key="meal.value"
        block
        size="large"
        :type="isSelected(meal.value) ? 'primary' : 'default'"
        @click="selectMeal(meal.value)"
        class="meal-button"
      >
        {{ meal.label }}
      </n-button>
    </n-card>
    <n-card title="Optional" class="n-card-with-description">
      <div class="n-card-description">Additional Information</div>
      <n-input
        v-model:value="additionalInfo"
        placeholder="Low carb, vegetarian..."
        type="textarea"
        :rows="3"
      />
    </n-card>
    <n-button
      type="primary"
      size="large"
      block
      :disabled="!selectedMeal"
      @click="startChat"
      class="start-chat-button"
    >
      Start Chat
    </n-button>
  </div>
</template>

<style scoped></style>
