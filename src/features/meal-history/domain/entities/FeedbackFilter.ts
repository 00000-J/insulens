export interface FeedbackOption {
  label: string;
  value:
    | "all"
    | "not-rated"
    | "severe-hypoglycemia"
    | "mild-hypoglycemia"
    | "euglycemic"
    | "mild-hyperglycemia"
    | "severe-hyperglycemia";
}

export const feedbackOptions: FeedbackOption[] = [
  { label: "All Feedback", value: "all" },
  { label: "Not Rated", value: "not-rated" },
  { label: "🔴 Severe Low", value: "severe-hypoglycemia" },
  { label: "🟡 Mild Low", value: "mild-hypoglycemia" },
  { label: "🟢 Target Range", value: "euglycemic" },
  { label: "🟡 Mild High", value: "mild-hyperglycemia" },
  { label: "🔴 Severe High", value: "severe-hyperglycemia" },
];
