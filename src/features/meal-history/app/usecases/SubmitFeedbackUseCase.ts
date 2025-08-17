import type { IMealHistoryService } from "../contracts/IMealHistoryService";
import type { UserFeedback } from "../../../../shared/domain/entities/MealHistory";

export class SubmitFeedbackUseCase {
  constructor(private mealHistoryService: IMealHistoryService) {}

  public async execute(
    mealId: string,
    feedback: Omit<UserFeedback, "submittedAt">,
  ): Promise<void> {
    return this.mealHistoryService.submitFeedback(mealId, feedback);
  }
}
