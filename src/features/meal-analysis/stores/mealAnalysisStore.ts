import { defineStore } from "pinia";
import type { AnalysisResult } from "../app/contracts/IMealAnalysisService";

interface MealAnalysisState {
  analysisResult: AnalysisResult | null;
  isLoading: boolean;
  error: string | null;
}

export const useMealAnalysisStore = defineStore("mealAnalysis", {
  state: (): MealAnalysisState => ({
    analysisResult: null,
    isLoading: false,
    error: null,
  }),
  actions: {
    setAnalysisResult(result: AnalysisResult) {
      this.analysisResult = result;
    },
    setLoading(isLoading: boolean) {
      this.isLoading = isLoading;
    },
    setError(error: string | null) {
      this.error = error;
    },
  },
});
