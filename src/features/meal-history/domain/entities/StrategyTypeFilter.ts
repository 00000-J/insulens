export interface StrategyTypeOption {
  label: string;
  value: "all" | "standard" | "combo" | "extended";
}

export const strategyTypeOptions: StrategyTypeOption[] = [
  { label: "All Strategies", value: "all" },
  { label: "Standard", value: "standard" },
  { label: "Combo", value: "combo" },
  { label: "Extended", value: "extended" },
];
