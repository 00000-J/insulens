import { Preferences } from "@capacitor/preferences";
import type {
  ISettingsService,
  ProfileSettings,
  InsulinSettings,
  AppPreferences,
} from "./SettingsTypes";

const PROFILE_KEY = "user_profile";
const INSULIN_KEY = "insulin_settings";
const PREFS_KEY = "app_preferences";

export class SettingsService implements ISettingsService {
  async loadProfile(): Promise<ProfileSettings | null> {
    const stored = await Preferences.get({ key: PROFILE_KEY });
    return stored.value ? JSON.parse(stored.value) : null;
  }

  async saveProfile(profile: ProfileSettings): Promise<void> {
    await Preferences.set({ key: PROFILE_KEY, value: JSON.stringify(profile) });
  }

  async loadInsulinSettings(): Promise<InsulinSettings | null> {
    const stored = await Preferences.get({ key: INSULIN_KEY });
    return stored.value ? JSON.parse(stored.value) : null;
  }

  async saveInsulinSettings(settings: InsulinSettings): Promise<void> {
    await Preferences.set({
      key: INSULIN_KEY,
      value: JSON.stringify(settings),
    });
  }

  async loadAppPreferences(): Promise<AppPreferences | null> {
    const stored = await Preferences.get({ key: PREFS_KEY });
    return stored.value ? JSON.parse(stored.value) : null;
  }

  async saveAppPreferences(prefs: AppPreferences): Promise<void> {
    await Preferences.set({ key: PREFS_KEY, value: JSON.stringify(prefs) });
  }
}
