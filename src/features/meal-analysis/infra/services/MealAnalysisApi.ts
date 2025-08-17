// Simulated API service for meal analysis results
import mealAnalysisData from "../data/meal-analysis-results.json";
import type {
  ProcessedAnalysisResult,
  StrategyType,
} from "../../../../shared/domain/entities/MealTypes";
import { STRATEGY_CONSTANTS } from "../../../../shared/domain/entities/MealTypes";

// Utility functions to get strategy properties
export function getStrategyConstants(type: StrategyType) {
  return STRATEGY_CONSTANTS[type];
}

/**
 * Simulates an XHR request to fetch meal analysis results.
 * In a real app, this would take an image or user input and return one result.
 * @param userIcr - User's insulin-to-carb ratio (e.g., '1:12')
 * @returns Promise that resolves to a single processed analysis result.
 */
export async function fetchMealAnalysisResult(
  userIcr: string,
): Promise<ProcessedAnalysisResult> {
  // Simulate network delay
  await new Promise((resolve) =>
    setTimeout(resolve, 300 + Math.random() * 700),
  );

  // In this mock, we randomly select a meal analysis result.
  const mealIds = Object.keys(mealAnalysisData);
  const randomMealId = mealIds[Math.floor(Math.random() * mealIds.length)];
  const mealData =
    mealAnalysisData[randomMealId as keyof typeof mealAnalysisData];

  if (!mealData) {
    throw new Error(`Meal analysis not found for ID: ${randomMealId}`);
  }

  // Use user's ICR
  const icr = userIcr;
  const icrRatio = parseInt(icr.split(":")[1]);

  // Calculate insulin based on user's ICR
  const insulin = Math.round((mealData.carbohydrates / icrRatio) * 10) / 10;

  return {
    dishName: mealData.dishName,
    category: mealData.category,
    weight: mealData.weight,
    carbohydrates: mealData.carbohydrates,
    insulin,
    strategy: {
      type: mealData.strategy.type as StrategyType,
      howTo: mealData.strategy.howTo,
      reasoning: mealData.strategy.reasoning,
    },
  };
}

/**
 * Simulates submitting analysis results (for future use)
 */
export async function submitAnalysisAcceptance(
  result: ProcessedAnalysisResult,
  timestamp: Date = new Date(),
): Promise<{ success: boolean; id: string }> {
  // Simulate network delay
  await new Promise((resolve) =>
    setTimeout(resolve, 200 + Math.random() * 300),
  );

  // Simulate successful submission
  const submissionId = `analysis_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  console.log("Analysis accepted and submitted:", {
    id: submissionId,
    result,
    timestamp,
  });

  return {
    success: true,
    id: submissionId,
  };
}
