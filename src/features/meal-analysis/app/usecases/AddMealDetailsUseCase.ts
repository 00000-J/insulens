import type {
  IMealAnalysisService,
  AnalysisParameters,
  AnalysisResult,
} from "../contracts/IMealAnalysisService";

export class AddMealDetailsUseCase {
  constructor(private mealAnalysisService: IMealAnalysisService) {}

  public async execute(params: AnalysisParameters): Promise<AnalysisResult> {
    if (!params.container || !params.size || !params.mealType) {
      throw new Error("Missing required analysis parameters.");
    }
    return this.mealAnalysisService.analyze(params);
  }
}
