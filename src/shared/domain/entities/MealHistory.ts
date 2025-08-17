import type { ProcessedAnalysisResult } from "./MealTypes";
import type { GlycemicOutcome } from "./GlycemicOutcome";

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
