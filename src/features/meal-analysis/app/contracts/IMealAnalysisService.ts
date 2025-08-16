export interface AnalysisParameters {
  container: string;
  size: number;
  mealType: string;
  weight?: number;
  comments?: string;
  carbs?: number;
}

export type AnalysisResult = import("../../../shared/domain/entities/MealTypes").ProcessedAnalysisResult;

export interface IMealAnalysisService {
  analyze(params: AnalysisParameters): Promise<AnalysisResult>;
}
