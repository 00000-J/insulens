export interface LanguageOption {
  value: "en" | "es" | "fr";
  label: string;
}

export const languageOptions: LanguageOption[] = [
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
];
