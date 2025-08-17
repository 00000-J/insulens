import { defineStore } from "pinia";
import type {
  AnalysisResult,
  AnalysisParameters,
} from "../app/contracts/IMealAnalysisService";

interface MealAnalysisState {
  analysisParameters: AnalysisParameters | null;
  analysisResult: AnalysisResult | null;
  isLoading: boolean;
  error: string | null;
}

export const useMealAnalysisStore = defineStore("mealAnalysis", {
  state: (): MealAnalysisState => ({
    analysisParameters: null,
    analysisResult: null,
    isLoading: false,
    error: null,
  }),
  actions: {
    setAnalysisParameters(params: AnalysisParameters) {
      this.analysisParameters = params;
    },
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
