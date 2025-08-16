import type { MealHistoryEntry } from "../../infra/services/MealHistoryApi";

export interface IMealHistoryService {
  fetchHistory(): Promise<MealHistoryEntry[]>;
}
