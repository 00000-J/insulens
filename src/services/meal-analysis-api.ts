// Simulated API service for meal analysis results
import mealAnalysisData from '../data/meal-analysis-results.json'

export interface MealAnalysisResult {
  dishName: string
  category: string
  weight: number
  carbohydrates: number
  baseInsulin: number
  icr: string
  strategy: {
    type: 'standard' | 'combo' | 'extended'
    howTo?: string
    upfrontPercentage: number
    extendedPercentage: number
    duration: number
    upfrontUnits: number
    extendedUnits: number
    reasoning: string
  }
}

export interface ProcessedAnalysisResult {
  dishName: string
  category: string
  weight: number
  carbohydrates: number
  rations: number
  insulin: number
  icr: string
  strategy: MealAnalysisResult['strategy']
}

/**
 * Simulates an XHR request to fetch meal analysis results
 * @param mealId - The identifier for the meal (e.g., 'pepperoni_pizza')
 * @param userIcr - User's insulin-to-carb ratio (e.g., '1:12')
 * @returns Promise that resolves to processed analysis result
 */
export async function fetchMealAnalysisResult(
  mealId: string = 'pepperoni_pizza',
  userIcr?: string
): Promise<ProcessedAnalysisResult> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 700))
  
  // Get base data
  const mealData = mealAnalysisData[mealId as keyof typeof mealAnalysisData]
  
  if (!mealData) {
    throw new Error(`Meal analysis not found for ID: ${mealId}`)
  }
  
  // Use user's ICR if provided, otherwise use the default from the data
  const icr = userIcr || mealData.icr
  const icrRatio = parseInt(icr.split(':')[1])
  
  // Calculate insulin based on user's ICR
  const insulin = Math.round((mealData.carbohydrates / icrRatio) * 10) / 10
  const rations = Math.round((mealData.carbohydrates / 10) * 10) / 10
  
  // Recalculate strategy units based on actual insulin amount
  const upfrontUnits = Math.round((insulin * mealData.strategy.upfrontPercentage / 100) * 10) / 10
  const extendedUnits = Math.round((insulin * mealData.strategy.extendedPercentage / 100) * 10) / 10
  
  return {
    dishName: mealData.dishName,
    category: mealData.category,
    weight: mealData.weight,
    carbohydrates: mealData.carbohydrates,
    rations,
    insulin,
    icr,
    strategy: {
      type: mealData.strategy.type as 'standard' | 'combo' | 'extended',
      howTo: mealData.strategy.howTo,
      upfrontPercentage: mealData.strategy.upfrontPercentage,
      extendedPercentage: mealData.strategy.extendedPercentage,
      duration: mealData.strategy.duration,
      upfrontUnits,
      extendedUnits,
      reasoning: mealData.strategy.reasoning
    }
  }
}

/**
 * Get available meal analysis IDs
 */
export function getAvailableMealIds(): string[] {
  return Object.keys(mealAnalysisData)
}

/**
 * Fetch all meal analysis results for development/testing purposes
 * @param userIcr - User's insulin-to-carb ratio (e.g., '1:12')
 * @returns Promise that resolves to array of all processed analysis results
 */
export async function fetchAllMealAnalysisResults(
  userIcr?: string
): Promise<ProcessedAnalysisResult[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000))
  
  const mealIds = getAvailableMealIds()
  const results: ProcessedAnalysisResult[] = []
  
  for (const mealId of mealIds) {
    const mealData = mealAnalysisData[mealId as keyof typeof mealAnalysisData]
    
    // Use user's ICR if provided, otherwise use the default from the data
    const icr = userIcr || mealData.icr
    const icrRatio = parseInt(icr.split(':')[1])
    
    // Calculate insulin based on user's ICR
    const insulin = Math.round((mealData.carbohydrates / icrRatio) * 10) / 10
    const rations = Math.round((mealData.carbohydrates / 10) * 10) / 10
    
    // Recalculate strategy units based on actual insulin amount
    const upfrontUnits = Math.round((insulin * mealData.strategy.upfrontPercentage / 100) * 10) / 10
    const extendedUnits = Math.round((insulin * mealData.strategy.extendedPercentage / 100) * 10) / 10
    
    results.push({
      dishName: mealData.dishName,
      category: mealData.category,
      weight: mealData.weight,
      carbohydrates: mealData.carbohydrates,
      rations,
      insulin,
      icr,
      strategy: {
        type: mealData.strategy.type as 'standard' | 'combo' | 'extended',
        howTo: mealData.strategy.howTo,
        upfrontPercentage: mealData.strategy.upfrontPercentage,
        extendedPercentage: mealData.strategy.extendedPercentage,
        duration: mealData.strategy.duration,
        upfrontUnits,
        extendedUnits,
        reasoning: mealData.strategy.reasoning
      }
    })
  }
  
  return results
}

/**
 * Simulates submitting analysis results (for future use)
 */
export async function submitAnalysisAcceptance(
  result: ProcessedAnalysisResult,
  timestamp: Date = new Date()
): Promise<{ success: boolean; id: string }> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 300))
  
  // Simulate successful submission
  const submissionId = `analysis_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  
  console.log('Analysis accepted and submitted:', {
    id: submissionId,
    result,
    timestamp
  })
  
  return {
    success: true,
    id: submissionId
  }
}
