import type { IMealHistoryService } from "../contracts/IMealHistoryService";
import type { MealHistoryEntry } from "../../infra/services/MealHistoryApi";

export class GetMealHistoryUseCase {
  constructor(private mealHistoryService: IMealHistoryService) {}

  public async execute(): Promise<MealHistoryEntry[]> {
    return this.mealHistoryService.fetchHistory();
  }
}
