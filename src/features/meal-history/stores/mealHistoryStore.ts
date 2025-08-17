import { defineStore } from "pinia";
import type { MealHistoryEntry } from "../../../../shared/domain/entities/MealHistory";
import { applyFilters } from "../domain/services/MealHistoryFilter";
import { GetMealHistoryUseCase } from "../app/usecases/GetMealHistoryUseCase";
import { MealHistoryService } from "../infra/services/MealHistoryService";
import type { MealTypeOption } from "../domain/entities/MealTypeFilter";
import type { StrategyTypeOption } from "../domain/entities/StrategyTypeFilter";
import type { FeedbackOption } from "../domain/entities/FeedbackFilter";

interface MealHistoryState {
  allMeals: MealHistoryEntry[];
  filteredMeals: MealHistoryEntry[];
  isLoading: boolean;
  error: string | null;
  selectedMealType: MealTypeOption["value"];
  selectedStrategyType: StrategyTypeOption["value"];
  selectedFeedback: FeedbackOption["value"];
}

export const useMealHistoryStore = defineStore("mealHistory", {
  state: (): MealHistoryState => ({
    allMeals: [],
    filteredMeals: [],
    isLoading: false,
    error: null,
    selectedMealType: "all",
    selectedStrategyType: "all",
    selectedFeedback: "all",
  }),
  actions: {
    async fetchMealHistory() {
      this.isLoading = true;
      this.error = null;
      try {
        const mealHistoryService = new MealHistoryService();
        const getMealHistoryUseCase = new GetMealHistoryUseCase(
          mealHistoryService,
        );
        this.allMeals = await getMealHistoryUseCase.execute();
        this.applyFilters();
      } catch (e) {
        this.error =
          e instanceof Error ? e.message : "An unknown error occurred";
      } finally {
        this.isLoading = false;
      }
    },
    applyFilters() {
      this.filteredMeals = applyFilters(
        this.allMeals,
        this.selectedMealType,
        this.selectedStrategyType,
        this.selectedFeedback,
      );
    },
    setMealTypeFilter(mealType: MealTypeOption["value"]) {
      this.selectedMealType = mealType;
      this.applyFilters();
    },
    setStrategyTypeFilter(strategyType: StrategyTypeOption["value"]) {
      this.selectedStrategyType = strategyType;
      this.applyFilters();
    },
    setFeedbackFilter(feedback: FeedbackOption["value"]) {
      this.selectedFeedback = feedback;
      this.applyFilters();
    },
  },
});
