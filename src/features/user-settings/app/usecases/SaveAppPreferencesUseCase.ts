import { ISettingsService } from '../contracts/ISettingsService';
import { AppPreferences } from '../contracts/SettingsTypes';

export class SaveAppPreferencesUseCase {
  constructor(private settingsService: ISettingsService) {}

  async execute(appPreferences: AppPreferences): Promise<void> {
    await this.settingsService.saveAppPreferences(appPreferences);
  }
}
