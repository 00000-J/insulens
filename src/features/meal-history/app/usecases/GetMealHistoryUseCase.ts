import { IMealHistoryService } from '../contracts/IMealHistoryService';
import type { MealHistoryEntry } from '../../../../shared/domain/entities/MealHistory';

export class GetMealHistoryUseCase {
  constructor(private mealHistoryService: IMealHistoryService) {}

  async execute(): Promise<MealHistoryEntry[]> {
    return this.mealHistoryService.getMealHistory();
  }
}
