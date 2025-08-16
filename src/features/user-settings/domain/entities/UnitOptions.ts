export interface UnitOption {
  value: "metric" | "imperial";
  label: string;
}

export const unitOptions: UnitOption[] = [
  { value: "metric", label: "Metric (kg, cm, ml)" },
  { value: "imperial", label: "Imperial (lbs, in, fl oz)" },
];
