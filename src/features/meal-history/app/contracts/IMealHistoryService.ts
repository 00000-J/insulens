import type {
  MealHistoryEntry,
  UserFeedback,
} from "../../../../shared/domain/entities/MealHistory";

export interface IMealHistoryService {
  fetchHistory(): Promise<MealHistoryEntry[]>;
  addMealToHistory(entry: MealHistoryEntry): Promise<void>;
  submitFeedback(
    mealId: string,
    feedback: Omit<UserFeedback, "submittedAt">,
  ): Promise<void>;
}
