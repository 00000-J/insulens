export interface Container {
  value: "plate" | "bowl" | "glass";
  label: "Plate" | "Bowl" | "Glass";
}

export const containers: Container[] = [
  { value: "plate", label: "Plate" },
  { value: "bowl", label: "Bowl" },
  { value: "glass", label: "Glass" },
];
