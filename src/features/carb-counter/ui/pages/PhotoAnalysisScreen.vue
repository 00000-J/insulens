<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
    NCard,
    NButton,
    NSpace,
    NSlider,
    NInput,
    NButtonGroup
} from 'naive-ui'

const router = useRouter()

// Reactive state
const selectedContainer = ref('plate')
const plateSize = ref(27)
const bowlSize = ref(13)
const glassVolume = ref(300)
// Function to determine meal type based on current time
function getMealTypeByTime(): string {
    const hour = new Date().getHours()

    if (hour >= 5 && hour < 11) {
        return 'breakfast'
    } else if (hour >= 11 && hour < 16) {
        return 'lunch'
    } else if (hour >= 16 && hour < 22) {
        return 'dinner'
    } else {
        return 'snack'
    }
}

const selectedMealType = ref(getMealTypeByTime())
const weight = ref(0)
const comments = ref('')

// Container options
const containers = [
    { value: 'plate', label: 'Plate' },
    { value: 'bowl', label: 'Bowl' },
    { value: 'glass', label: 'Glass' }
]

// Meal type options
const mealTypes = [
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'lunch', label: 'Lunch' },
    { value: 'dinner', label: 'Dinner' },
    { value: 'snack', label: 'Snack' }
]



function analyzePhoto() {
     // TODO: In real app, send data to analysis endpoint
     console.log('Analyzing photo with parameters:', {
         container: selectedContainer.value,
         size: selectedContainer.value === 'plate' ? plateSize.value :
             selectedContainer.value === 'bowl' ? bowlSize.value : glassVolume.value,
         mealType: selectedMealType.value,
         weight: weight.value,
         comments: comments.value
     })
     
     // Navigate to analysis results screen
     router.push('/meal-analysis-results')
}

// Get current size parameter
function getCurrentSize() {
    switch (selectedContainer.value) {
        case 'plate':
            return plateSize.value
        case 'bowl':
            return bowlSize.value
        case 'glass':
            return glassVolume.value
        default:
            return 25
    }
}

function getSizeLabel() {
    switch (selectedContainer.value) {
        case 'plate':
            return 'Plate Diameter'
        case 'bowl':
            return 'Bowl Diameter'
        case 'glass':
            return 'Glass Volume'
        default:
            return 'Size'
    }
}

function getSizeUnit() {
    return selectedContainer.value === 'glass' ? 'ml' : 'cm'
}

function updateSize(value: number) {
    switch (selectedContainer.value) {
        case 'plate':
            plateSize.value = value
            break
        case 'bowl':
            bowlSize.value = value
            break
        case 'glass':
            glassVolume.value = value
            break
    }
}

function getSizeRange() {
    switch (selectedContainer.value) {
        case 'plate':
            return { min: 13, max: 32, step: 1 }
        case 'bowl':
            return { min: 10, max: 20, step: 1 }
        case 'glass':
            return { min: 150, max: 650, step: 50 }
        default:
            return { min: 15, max: 35, step: 1 }
    }
}
</script>

<template>
         <div class="photo-analysis-screen">
         <!-- Main Content -->
        <div class="content">
            <n-space vertical size="large">
                <!-- Photo Card -->

                <img src="/images/temp/pizza-plate.jpg" alt="Captured meal photo" class="meal-photo" />


                <!-- Meal Type Selection -->
                <div class="meal-type-section">
                    <n-button-group class="meal-type-buttons">
                        <n-button v-for="mealType in mealTypes" :key="mealType.value"
                            :type="selectedMealType === mealType.value ? 'primary' : 'default'"
                            @click="selectedMealType = mealType.value" class="meal-type-button">
                            {{ mealType.label }}
                        </n-button>
                    </n-button-group>
                </div>

                <!-- Container Selection -->
                <div class="container-section">
                    <n-button-group class="container-buttons">
                        <n-button v-for="container in containers" :key="container.value"
                            :type="selectedContainer === container.value ? 'primary' : 'default'"
                            @click="selectedContainer = container.value" class="container-button">
                            {{ container.label }}
                        </n-button>
                    </n-button-group>

                    <!-- Size Parameter directly under container -->
                    <div class="size-parameter">
                        <div class="parameter-label">
                            {{ getSizeLabel() }}: {{ getCurrentSize() }}{{ getSizeUnit() }}
                        </div>
                        <n-slider :value="getCurrentSize()" @update:value="updateSize" :min="getSizeRange().min"
                            :max="getSizeRange().max" :step="getSizeRange().step" :tooltip="false"
                            class="size-slider" />
                    </div>
                </div>

                <!-- Optional Parameters -->
                <n-card title="Optional">
                    <n-space vertical size="medium">
                        <!-- Optional Weight -->
                        <div class="parameter-item">
                            <div class="parameter-label">
                                Weight: {{ weight === 0 ? 'Not specified' : `${weight}g` }}
                            </div>
                            <n-slider v-model:value="weight" :min="0" :max="1000" :step="50" :tooltip="false"
                                class="weight-slider" />
                        </div>

                        <!-- General Comments -->
                        <div class="parameter-item">
                            <div class="parameter-label">General Comments:</div>
                            <n-input v-model:value="comments" placeholder='e.g. "Post-workout meal"' type="textarea"
                                :autosize="{ minRows: 2, maxRows: 4 }" class="comments-input" />
                        </div>
                    </n-space>
                </n-card>

                <!-- Analyze Button -->
                <n-button type="primary" size="large" block @click="analyzePhoto" class="analyze-button">

                    ANALYZE
                </n-button>
            </n-space>
        </div>
    </div>
</template>

<style scoped>
.photo-analysis-screen {
    padding: 1rem;
    max-width: 400px;
    margin: 0 auto;
    min-height: calc(100vh - 80px);
}

.content {
    padding: 1rem 0;
}

.meal-photo {
    width: 100%;
    max-height: 120px;
    height: 100%;
    object-fit: cover;
    object-position: center;
}



.container-section,
.meal-type-section {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.section-label {
    font-weight: 600;
    color: var(--text-color);
}

.container-buttons,
.meal-type-buttons {
    display: flex;
    width: 100%;
}

.container-button,
.meal-type-button {
    flex: 1;
    border-radius: 6px !important;
}

.meal-type-button {
    font-size: 0.85rem;
}



:root.dark .size-parameter {
    border-top-color: #404040;
}

.parameter-item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.parameter-label {
    font-weight: 500;
    color: var(--text-color);
    font-size: 0.9rem;
}

.size-slider {
    margin: 0.5rem 0;
}

.weight-slider,
.comments-input {
    width: 100%;
}

.weight-slider {
    margin: 0.5rem 0;
}

.analyze-button {
    margin-top: 1rem;
    height: 48px;
    font-weight: 600;
    font-size: 1rem;
}

/* Dark mode adjustments */
</style>
