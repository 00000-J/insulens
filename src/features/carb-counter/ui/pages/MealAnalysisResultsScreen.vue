<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Preferences } from '@capacitor/preferences'
import { 
  NButton, 
  NSpace,
  NSpin
} from 'naive-ui'
import { fetchAllMealAnalysisResults, submitAnalysisAcceptance, type ProcessedAnalysisResult } from '../../../../services/meal-analysis-api'

const router = useRouter()

// Analysis results from API (changed to array for development testing)
const analysisResults = ref<ProcessedAnalysisResult[]>([])
const isLoading = ref(true)
const loadError = ref<string | null>(null)

// Load user's ICR from storage
async function getUserIcr(): Promise<string> {
  try {
    const result = await Preferences.get({ key: 'insulin_settings' })
    if (result.value) {
      const settings = JSON.parse(result.value)
      return settings.carbRatio || '1:10'
    }
  } catch (error) {
    console.error('Failed to load insulin settings:', error)
  }
  return '1:10' // Default fallback
}

// Load analysis results from API (modified for development - loads all meals)
async function loadAnalysisResults() {
  try {
    isLoading.value = true
    loadError.value = null
    
    // Get user's ICR setting
    const userIcr = await getUserIcr()
    
    // Fetch ALL analysis results for development testing
    const results = await fetchAllMealAnalysisResults(userIcr)
    
    analysisResults.value = results
  } catch (error) {
    console.error('Failed to load analysis results:', error)
    loadError.value = error instanceof Error ? error.message : 'Failed to load analysis results'
  } finally {
    isLoading.value = false
  }
}

// Load analysis when component mounts
onMounted(async () => {
  await loadAnalysisResults()
})



async function acceptAnalysis(result: ProcessedAnalysisResult) {
  try {
    // Submit the analysis acceptance to the API
    const submission = await submitAnalysisAcceptance(result)
    console.log('Analysis accepted:', submission)
    
    // Navigate back to home
    router.push('/')
  } catch (error) {
    console.error('Failed to submit analysis acceptance:', error)
    // Still navigate back even if submission fails
    router.push('/')
  }
}
</script>

<template>
  <div class="meal-analysis-screen">
    <!-- Loading State -->
    <div v-if="isLoading" class="loading-container">
      <n-spin size="large">
        <template #description>
          Analyzing meal...
        </template>
      </n-spin>
    </div>

    <!-- Error State -->
    <div v-else-if="loadError" class="error-container">
      <div class="error-message">{{ loadError }}</div>
      <n-button @click="loadAnalysisResults" type="primary">
        Retry
      </n-button>
    </div>

    <!-- Main Content -->
    <div v-else-if="analysisResults.length > 0" class="content">
      <n-space vertical size="large">
        <!-- Development Note -->
        <div class="dev-note">
          <div class="dev-note-title">Development Mode: All Meal Types</div>
          <div class="dev-note-text">Showing all 3 meal analysis results to test different strategy types (standard, extended, combo)</div>
        </div>

        <!-- Loop through all analysis results -->
        <div v-for="(analysisResult, index) in analysisResults" :key="index" class="meal-result-card">
          <!-- Analysis Result Card -->
          <div class="analysis-result">
            <div class="dish-info">
              <div class="dish-details">
                <div class="dish-name">{{ analysisResult.dishName }}</div>
                <div class="dish-category">Category: {{ analysisResult.category }}</div>
                <div class="dish-weight">Weight: {{ analysisResult.weight }}g (estimated)</div>
                <div class="dish-carbs">Carbohydrates: {{ analysisResult.carbohydrates }}g</div>
                <div class="dish-insulin">Insulin: {{ analysisResult.insulin }} units (ICR {{ analysisResult.icr }})</div>
              </div>
            </div>
          </div>

          <!-- Suggested Insulin Strategy -->
          <div class="strategy-section">
            
            <div class="strategy-recommendation">
              <div class="strategy-name">
                Insulin Bolus Strategy: 
                <span v-if="analysisResult.strategy.type === 'combo'">
                  Combo
                </span>
                <span v-else-if="analysisResult.strategy.type === 'extended'">
                  Extended
                </span>
                <span v-else>
                  Standard
                </span>
              </div>
              <div class="strategy-breakdown">
                <div class="breakdown-item">
                  <span class="strategy-upfront">Pre-meal: {{ analysisResult.strategy.upfrontUnits }} units</span>
                </div>
                <div v-if="analysisResult.strategy.extendedUnits > 0" class="breakdown-item">
                  <span class="breakdown-label">Post-meal: {{ analysisResult.strategy.extendedUnits }} </span>
                </div>
                <div class="breakdown-item">
                  
                  <span class="breakdown-value">{{ analysisResult.strategy.howTo }}</span>
                </div>
              </div>
              <div class="strategy-reasoning">
                {{ analysisResult.strategy.reasoning }}
              </div>
            </div>
          </div>

          <!-- Accept Button -->
          <n-button
            type="primary"
            size="large"
            block
            @click="acceptAnalysis(analysisResult)"
            class="accept-button"
          >
            ACCEPT {{ analysisResult.dishName.toUpperCase() }}
          </n-button>
        </div>
      </n-space>
    </div>
  </div>
</template>

<style scoped>
.meal-analysis-screen {
  padding: 1rem;
  max-width: 400px;
  margin: 0 auto;
  min-height: calc(100vh - 80px);
}

.content {
  padding: 1rem 0;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
}

.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  text-align: center;
}

.error-message {
  color: var(--error-color);
  font-size: 0.9rem;
}

.dev-note {
  padding: 1rem;
  background: var(--warning-color-suppl);
  border-radius: 8px;
  border-left: 4px solid var(--warning-color);
  margin-bottom: 1rem;
}

.dev-note-title {
  font-weight: 600;
  color: var(--warning-color);
  margin-bottom: 0.5rem;
}

.dev-note-text {
  font-size: 0.9rem;
  color: var(--text-color-2);
}

.meal-result-card {
  padding: 1rem;
  background: var(--body-color);
  border-radius: 12px;
  border: 2px solid var(--border-color);
  margin-bottom: 1.5rem;
}

.analysis-result {
  padding: 1rem;
  background: var(--card-color);
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

.dish-info {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.dish-details {
  flex: 1;
}

.dish-name, .section-title{
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: var(--text-color);
}

.dish-category {
  font-size: 0.9rem;
  color: var(--text-color-2);
  margin-bottom: 0.25rem;
}

.dish-weight {
  font-size: 0.9rem;
  color: var(--text-color-2);
  margin-bottom: 0.25rem;
}

.dish-carbs {
  font-size: 0.9rem;
  color: var(--text-color-2);
  margin-bottom: 0.25rem;
}

.dish-insulin {
  font-size: 0.9rem;
  color: var(--text-color);
  font-weight: 500;
}



.strategy-section {
  padding: 1rem;
  background: var(--card-color);
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

.section-title {
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--text-color);
}

.strategy-recommendation {
  width: 100%;
}

.strategy-name {
  font-weight: 500;
  margin-bottom: 1rem;
}

.strategy-breakdown {
  margin-bottom: 1rem;
}

.breakdown-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.breakdown-label {
  font-weight: 500;
  color: var(--text-color);
}

.breakdown-value {
  font-weight: 600;
  color: var(--text-color);
}

.strategy-reasoning {
  font-size: 0.9rem;
  color: var(--text-color-2);
  line-height: 1.4;
  padding: 0.75rem;
  background: var(--info-color-suppl);
  border-radius: 6px;
  border-left: 4px solid var(--info-color);
}

.accept-button {
  margin-top: 1rem;
  height: 48px;
  font-weight: 600;
  font-size: 1rem;
}

/* Dark mode adjustments */
:root.dark .analysis-result {
  background: #2d2d2d;
  border-color: #404040;
}

:root.dark .strategy-section {
  background: #2d2d2d;
  border-color: #404040;
}

:root.dark .strategy-reasoning {
  background: rgba(70, 162, 252, 0.1);
  border-left-color: #46a2fc;
}

:root.dark .dev-note {
  background: rgba(255, 193, 7, 0.1);
  border-left-color: #ffc107;
}

:root.dark .meal-result-card {
  background: #1a1a1a;
  border-color: #404040;
}
</style>
