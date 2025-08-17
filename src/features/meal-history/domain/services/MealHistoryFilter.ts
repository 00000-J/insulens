import type { MealHistoryEntry } from "../../infra/services/MealHistoryApi";
import type { MealTypeOption } from "../entities/MealTypeFilter";
import type { StrategyTypeOption } from "../entities/StrategyTypeFilter";
import type { FeedbackOption } from "../entities/FeedbackFilter";

export function applyFilters(
  meals: MealHistoryEntry[],
  selectedMealType: MealTypeOption["value"],
  selectedStrategyType: StrategyTypeOption["value"],
  selectedFeedback: FeedbackOption["value"],
): MealHistoryEntry[] {
  let filtered = [...meals];

  // Filter by meal type
  if (selectedMealType !== "all") {
    filtered = filtered.filter(
      (meal) => meal.inputParameters.mealType === selectedMealType,
    );
  }

  // Filter by strategy type
  if (selectedStrategyType !== "all") {
    filtered = filtered.filter(
      (meal) => meal.analysisResult.strategy.type === selectedStrategyType,
    );
  }

  // Filter by feedback
  if (selectedFeedback !== "all") {
    if (selectedFeedback === "not-rated") {
      filtered = filtered.filter((meal) => !meal.userFeedback);
    } else {
      filtered = filtered.filter(
        (meal) => meal.userFeedback?.glycemicOutcome === selectedFeedback,
      );
    }
  }

  return filtered;
}
