<script setup lang="ts">
import { computed } from "vue";
import {
  getStrategyConstants,
  type ProcessedAnalysisResult,
} from "../../infra/services/MealAnalysisApi";

const props = defineProps<{
  analysisResult: ProcessedAnalysisResult;
}>();

const upfrontUnits = computed(() => {
  const constants = getStrategyConstants(props.analysisResult.strategy.type);
  const units =
    (props.analysisResult.insulin * constants.upfrontPercentage) / 100;
  return Math.round(units * 10) / 10;
});

const extendedUnits = computed(() => {
  const constants = getStrategyConstants(props.analysisResult.strategy.type);
  const units =
    (props.analysisResult.insulin * constants.extendedPercentage) / 100;
  return Math.round(units * 10) / 10;
});
</script>

<template>
  <div>
    <!-- Analysis Result Card -->
    <n-card
      :title="`${analysisResult.dishName}`"
      class="results-card n-card-with-description"
    >
      <div class="n-card-description">{{ analysisResult.category }}</div>

      <n-grid :cols="3" :y-gap="1">
        <n-grid-item>
          <div class="text-stack-top">{{ analysisResult.weight }}g</div>
          <div class="text-stack-bottom">Weight</div>
        </n-grid-item>
        <n-grid-item>
          <div class="text-stack-top">{{ analysisResult.carbohydrates }}g</div>
          <div class="text-stack-bottom">Carbs</div>
        </n-grid-item>
        <n-grid-item>
          <div class="text-stack-top">{{ analysisResult.insulin }}u</div>
          <div class="text-stack-bottom">Insulin</div>
        </n-grid-item>
      </n-grid>
      <n-grid :cols="1" :y-gap="1">
        <n-grid-item> </n-grid-item>
        <n-grid-item>
          {{ analysisResult.strategy.reasoning }}
        </n-grid-item>
      </n-grid>

      <div class="n-card-footer">
        Estimations are based on an ICR of {{ analysisResult.icr }}
      </div>
    </n-card>

    <!-- Suggested Insulin Strategy -->
    <n-card
      :title="`${
        analysisResult.strategy.type === 'combo'
          ? 'Combo'
          : analysisResult.strategy.type === 'extended'
            ? 'Extended'
            : 'Standard'
      } Bolus Strategy`"
      class="insulin-units-card"
    >
      <n-grid :cols="2" :y-gap="2">
        <n-grid-item>
          <div class="text-stack-top">
            {{ upfrontUnits }}
          </div>
          <div class="text-stack-bottom">pre</div>
        </n-grid-item>
        <n-grid-item>
          <div class="text-stack-top">
            {{ extendedUnits }}
          </div>
          <div class="text-stack-bottom">post</div>
        </n-grid-item>
      </n-grid>
      <n-grid :cols="1" :y-gap="1">
        <n-grid-item>
          <n-text>{{ analysisResult.strategy.howTo }}</n-text>
        </n-grid-item>
      </n-grid>
    </n-card>
  </div>
</template>
