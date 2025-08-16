// Simulated API service for meal history
import mealHistoryData from "../data/meal-history.json";
import type { ProcessedAnalysisResult } from "../../../../shared/domain/entities/MealTypes";

export type GlycemicOutcome =
  | "severe-hypoglycemia"
  | "mild-hypoglycemia"
  | "euglycemic"
  | "mild-hyperglycemia"
  | "severe-hyperglycemia";

export interface UserFeedback {
  submittedAt: string;
  glycemicOutcome: GlycemicOutcome;
  symptomNotes: string;
}

export interface MealHistoryEntry {
  id: string;
  acceptedAt: string;
  inputParameters: {
    mealType: string;
    container: string;
    containerSize: number;
    containerUnit: string;
    carbs: number;
    weight: number;
    comments: string;
    icr: string;
  };
  analysisResult: ProcessedAnalysisResult;
  userFeedback?: UserFeedback;
}

export async function fetchMealHistory(): Promise<{
  history: MealHistoryEntry[];
}> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 400));
  return mealHistoryData;
}

export async function submitUserFeedback(
  mealId: string,
  feedback: Omit<UserFeedback, "submittedAt">,
): Promise<{ success: boolean }> {
  await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 300));
  console.log("Submitting feedback for meal:", mealId, feedback);
  return { success: true };
}

export function getFeedbackDisplayText(outcome: GlycemicOutcome): string {
  const displayTexts: Record<GlycemicOutcome, string> = {
    "severe-hypoglycemia": "Severe Low",
    "mild-hypoglycemia": "Mild Low",
    euglycemic: "Target Range",
    "mild-hyperglycemia": "Mild High",
    "severe-hyperglycemia": "Severe High",
  };
  return displayTexts[outcome];
}
