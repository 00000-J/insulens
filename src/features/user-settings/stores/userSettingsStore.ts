import { defineStore } from "pinia";
import type {
  ProfileSettings,
  InsulinSettings,
  AppPreferences,
} from "../app/contracts/SettingsTypes";
import { SettingsService } from "../infra/services/SettingsService";
import { LoadSettingsUseCase } from "../app/usecases/LoadSettingsUseCase";
import { SaveProfileUseCase } from "../app/usecases/SaveProfileUseCase";
import { SaveInsulinSettingsUseCase } from "../app/usecases/SaveInsulinSettingsUseCase";
import { SaveAppPreferencesUseCase } from "../app/usecases/SaveAppPreferencesUseCase";
import { useThemeStore } from "../../../app/stores/theme";

interface UserSettingsState {
  profile: ProfileSettings;
  insulin: InsulinSettings;
  preferences: AppPreferences;
  isLoading: boolean;
  error: string | null;
}

const settingsService = new SettingsService();
const loadSettingsUseCase = new LoadSettingsUseCase(settingsService);
const saveProfileUseCase = new SaveProfileUseCase(settingsService);
const saveInsulinSettingsUseCase = new SaveInsulinSettingsUseCase(
  settingsService,
);
const saveAppPreferencesUseCase = new SaveAppPreferencesUseCase(
  settingsService,
);

export const useUserSettingsStore = defineStore("userSettings", {
  state: (): UserSettingsState => ({
    profile: {
      name: "",
      age: "",
      weight: "",
      gender: "",
      medicalNotes: "",
    },
    insulin: { carbRatio: "1:10" },
    preferences: {
      units: "metric",
      language: "en",
      darkMode: true,
      sound: false,
    },
    isLoading: false,
    error: null,
  }),
  actions: {
    async loadSettings() {
      this.isLoading = true;
      this.error = null;
      try {
        const { profile, insulin, preferences } =
          await loadSettingsUseCase.execute();
        if (profile) this.profile = profile;
        if (insulin) this.insulin = insulin;
        if (preferences) this.preferences = preferences;

        // Initialize theme based on loaded preferences
        const themeStore = useThemeStore();
        themeStore.set(this.preferences.darkMode);
      } catch (e) {
        this.error = e instanceof Error ? e.message : "Failed to load settings";
      } finally {
        this.isLoading = false;
      }
    },
    async saveProfile(profile: ProfileSettings) {
      this.profile = profile;
      await saveProfileUseCase.execute(this.profile);
    },
    async saveInsulinSettings(settings: InsulinSettings) {
      this.insulin = settings;
      await saveInsulinSettingsUseCase.execute(this.insulin);
    },
    async saveAppPreferences(prefs: AppPreferences) {
      this.preferences = prefs;
      await saveAppPreferencesUseCase.execute(this.preferences);

      // Also update the theme store when dark mode changes
      const themeStore = useThemeStore();
      themeStore.set(this.preferences.darkMode);
    },
  },
});
