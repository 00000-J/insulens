import { IMealHistoryService } from '../contracts/IMealHistoryService';
import type { UserFeedback } from '../../../../shared/domain/entities/UserFeedback';

export class SubmitFeedbackUseCase {
  constructor(private mealHistoryService: IMealHistoryService) {}

  async execute(mealId: string, feedback: UserFeedback): Promise<void> {
    return this.mealHistoryService.submitFeedback(mealId, feedback);
  }
}
