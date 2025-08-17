import type { GlycemicOutcome } from "../../../../shared/domain/entities/GlycemicOutcome";

export function getFeedbackDisplayText(outcome: GlycemicOutcome): string {
  const displayTexts: Record<GlycemicOutcome, string> = {
    "severe-hypoglycemia": "Severe Low",
    "mild-hypoglycemia": "Mild Low",
    euglycemic: "Target Range",
    "mild-hyperglycemia": "Mild High",
    "severe-hyperglycemia": "Severe High",
  };
  return displayTexts[outcome];
}
