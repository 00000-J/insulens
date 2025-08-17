import { Preferences } from "@capacitor/preferences";
import type { MealHistoryEntry } from "../../../../shared/domain/entities/MealHistory";
import type { IMealHistoryService } from "../../app/contracts/IMealHistoryService";
import type { UserFeedback } from "../../../../shared/domain/entities/UserFeedback";

const MEAL_HISTORY_KEY = "mealHistory";

export class MealHistoryService implements IMealHistoryService {
  public async fetchHistory(): Promise<MealHistoryEntry[]> {
    try {
      const { value } = await Preferences.get({ key: MEAL_HISTORY_KEY });
      if (value) {
        const history = JSON.parse(value) as MealHistoryEntry[];
        // Sort by most recent first
        return history.sort(
          (a, b) =>
            new Date(b.acceptedAt).getTime() - new Date(a.acceptedAt).getTime(),
        );
      }
      return [];
    } catch (error) {
      console.error("Failed to fetch meal history from storage:", error);
      throw new Error("Could not fetch meal history.");
    }
  }

  public async addMealToHistory(entry: MealHistoryEntry): Promise<void> {
    try {
      const history = await this.fetchHistory();
      history.unshift(entry); // Add to the beginning to keep it sorted
      await Preferences.set({
        key: MEAL_HISTORY_KEY,
        value: JSON.stringify(history),
      });
    } catch (error) {
      console.error("Failed to add meal to history:", error);
      throw new Error("Could not save meal to history.");
    }
  }

  public async submitFeedback(
    mealId: string,
    feedback: Omit<UserFeedback, "submittedAt">,
  ): Promise<void> {
    try {
      const history = await this.fetchHistory();
      const mealIndex = history.findIndex((meal) => meal.id === mealId);

      if (mealIndex === -1) {
        throw new Error("Meal not found.");
      }

      history[mealIndex].userFeedback = {
        ...feedback,
        submittedAt: new Date().toISOString(),
      };

      await Preferences.set({
        key: MEAL_HISTORY_KEY,
        value: JSON.stringify(history),
      });
    } catch (error) {
      console.error("Failed to submit feedback:", error);
      throw new Error("Could not submit feedback.");
    }
  }
}
