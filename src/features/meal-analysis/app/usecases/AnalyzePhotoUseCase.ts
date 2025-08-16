import type {
  IMealAnalysisService,
  AnalysisParameters,
  AnalysisResult,
} from "../contracts/IMealAnalysisService";

export class AnalyzePhotoUseCase {
  constructor(private mealAnalysisService: IMealAnalysisService) {}

  public async execute(params: AnalysisParameters): Promise<AnalysisResult> {
    // Here you could add more business logic, validation, etc.
    // For example, ensuring that carbs are not negative.

    const result = await this.mealAnalysisService.analyze(params);

    // More logic could be applied to the result before returning it
    return result;
  }
}
