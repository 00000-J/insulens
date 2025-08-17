import type { MealHistoryEntry } from '../../../../shared/domain/entities/MealHistory';
import type { FeedbackFilter } from '../entities/FeedbackFilter';
import type { MealTypeFilter } from '../entities/MealTypeFilter';
import type { StrategyTypeFilter } from '../entities/StrategyTypeFilter';

export function applyFilters(
  meals: MealHistoryEntry[],
  selectedMealType: MealTypeFilter["value"],
  selectedStrategyType: StrategyTypeFilter["value"],
  selectedFeedback: FeedbackFilter["value"],
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
