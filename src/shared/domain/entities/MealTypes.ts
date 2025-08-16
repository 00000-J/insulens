// Strategy type definitions with their fixed percentages
export const STRATEGY_CONSTANTS = {
  standard: { upfrontPercentage: 100, extendedPercentage: 0, duration: 0 },
  combo: { upfrontPercentage: 60, extendedPercentage: 40, duration: 2 },
  extended: { upfrontPercentage: 30, extendedPercentage: 70, duration: 3 },
} as const;

export type StrategyType = keyof typeof STRATEGY_CONSTANTS;

export type MealCategory =
  | "Starchy Foods"
  | "Fruits"
  | "Vegetables"
  | "Nuts and Healthy Fats"
  | "Prepared Dishes"
  | "Regional Dishes"
  | "Sweets and Desserts"
  | "Alcoholic Beverages"
  | "Dairy"
  | "Vegetarian Products"
  | "Pediatric Dishes";

export interface MealAnalysisResult {
  dishName: string;
  category: MealCategory;
  weight: number;
  carbohydrates: number;
  strategy: {
    type: StrategyType;
    howTo?: string;
    reasoning: string;
  };
}

export interface ProcessedAnalysisResult {
  dishName: string;
  category: MealCategory;
  weight: number;
  carbohydrates: number;
  insulin: number;
  strategy: MealAnalysisResult["strategy"];
}
