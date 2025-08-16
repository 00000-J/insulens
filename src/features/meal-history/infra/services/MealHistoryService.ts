import {
  fetchMealHistory as fetchFromApi,
  type MealHistoryEntry,
} from "./MealHistoryApi";
import type { IMealHistoryService } from "../../app/contracts/IMealHistoryService";

export class MealHistoryService implements IMealHistoryService {
  public async fetchHistory(): Promise<MealHistoryEntry[]> {
    try {
      const result = await fetchFromApi();
      // Sort by most recent first
      return result.history.sort(
        (a, b) =>
          new Date(b.acceptedAt).getTime() - new Date(a.acceptedAt).getTime()
      );
    } catch (error) {
      console.error("Failed to fetch meal history:", error);
      // In a real app, you'd want to handle this error more gracefully
      throw new Error("Could not fetch meal history.");
    }
  }
}
