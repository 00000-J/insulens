export interface MealTypeOption {
  label: string;
  value: "all" | "breakfast" | "lunch" | "dinner" | "snack";
}

export const mealTypeOptions: MealTypeOption[] = [
  { label: "All Meals", value: "all" },
  { label: "Breakfast", value: "breakfast" },
  { label: "Lunch", value: "lunch" },
  { label: "Dinner", value: "dinner" },
  { label: "Snack", value: "snack" },
];
