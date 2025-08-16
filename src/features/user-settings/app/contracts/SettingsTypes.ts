export interface ProfileSettings {
  name: string;
  age: string;
  weight: string;
  medicalNotes: string;
}

export interface InsulinSettings {
  carbRatio: string;
}

export interface AppPreferences {
  units: "metric" | "imperial";
  language: "en" | "es" | "fr";
  darkMode: boolean;
  sound: boolean;
}

export interface ISettingsService {
  loadProfile(): Promise<ProfileSettings | null>;
  saveProfile(profile: ProfileSettings): Promise<void>;
  loadInsulinSettings(): Promise<InsulinSettings | null>;
  saveInsulinSettings(settings: InsulinSettings): Promise<void>;
  loadAppPreferences(): Promise<AppPreferences | null>;
  saveAppPreferences(prefs: AppPreferences): Promise<void>;
}
