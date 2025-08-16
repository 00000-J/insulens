import type { MealType } from "../entities/MealType";

export function getMealTypeByTime(): MealType["value"] {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 11) {
    return "breakfast";
  } else if (hour >= 11 && hour < 16) {
    return "lunch";
  } else if (hour >= 16 && hour < 22) {
    return "dinner";
  } else {
    return "snack";
  }
}
