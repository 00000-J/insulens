import { ISettingsService } from '../contracts/ISettingsService';
import { AppPreferences, InsulinSettings, Profile } from '../contracts/SettingsTypes';

export class LoadSettingsUseCase {
  constructor(private settingsService: ISettingsService) {}

  async execute(): Promise<{
    profile: Profile;
    insulinSettings: InsulinSettings;
    appPreferences: AppPreferences;
  }> {
    return this.settingsService.loadSettings();
  }
}
