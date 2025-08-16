export interface MealType {
  value: "breakfast" | "lunch" | "dinner" | "snack";
  label: "Breakfast" | "Lunch" | "Dinner" | "Snack";
}

export const mealTypes: MealType[] = [
  { value: "breakfast", label: "Breakfast" },
  { value: "lunch", label: "Lunch" },
  { value: "dinner", label: "Dinner" },
  { value: "snack", label: "Snack" },
];
