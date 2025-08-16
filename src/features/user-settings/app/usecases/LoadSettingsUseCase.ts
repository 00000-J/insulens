import type {
  ISettingsService,
  ProfileSettings,
  InsulinSettings,
  AppPreferences,
} from "../contracts/SettingsTypes";

export class LoadSettingsUseCase {
  constructor(private settingsService: ISettingsService) {}

  async execute(): Promise<{
    profile: ProfileSettings | null;
    insulin: InsulinSettings | null;
    preferences: AppPreferences | null;
  }> {
    const [profile, insulin, preferences] = await Promise.all([
      this.settingsService.loadProfile(),
      this.settingsService.loadInsulinSettings(),
      this.settingsService.loadAppPreferences(),
    ]);
    return { profile, insulin, preferences };
  }
}
