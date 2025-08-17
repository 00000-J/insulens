import type { MealHistoryEntry } from "../../infra/services/MealHistoryApi";

export interface ChartDataPoint {
  id: string;
  emoji: string;
  style: {
    gridColumn: number;
    gridRow: number;
  };
}

const outcomeLevels: Record<string, number> = {
  "severe-hyperglycemia": 1,
  "mild-hyperglycemia": 2,
  euglycemic: 3,
  "mild-hypoglycemia": 4,
  "severe-hypoglycemia": 5,
};

const outcomeEmojis: Record<string, string> = {
  "severe-hyperglycemia": "🔴",
  "mild-hyperglycemia": "🟡",
  euglycemic: "🟢",
  "mild-hypoglycemia": "🟡",
  "severe-hypoglycemia": "🔴",
};

export function transformToChartData(
  meals: MealHistoryEntry[],
): ChartDataPoint[] {
  const lastMeals = meals.slice(0, 10);

  return lastMeals.map((meal, index) => {
    const col = index + 1;
    let row: number;
    let emoji: string;

    if (meal.userFeedback) {
      const outcome = meal.userFeedback.glycemicOutcome;
      row = outcomeLevels[outcome];
      emoji = outcomeEmojis[outcome];
    } else {
      row = 3; // 'Not Rated' goes in the middle row
      emoji = "?";
    }

    return {
      id: meal.id,
      emoji: emoji,
      style: {
        gridColumn: col,
        gridRow: row,
      },
    };
  });
}
