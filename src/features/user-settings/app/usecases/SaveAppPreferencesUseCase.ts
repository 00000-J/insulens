import type {
  ISettingsService,
  AppPreferences,
} from "../contracts/SettingsTypes";

export class SaveAppPreferencesUseCase {
  constructor(private settingsService: ISettingsService) {}

  async execute(prefs: AppPreferences): Promise<void> {
    return this.settingsService.saveAppPreferences(prefs);
  }
}
