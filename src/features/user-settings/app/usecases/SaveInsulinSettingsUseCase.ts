import { ISettingsService } from '../contracts/ISettingsService';
import { InsulinSettings } from '../contracts/SettingsTypes';

export class SaveInsulinSettingsUseCase {
  constructor(private settingsService: ISettingsService) {}

  async execute(insulinSettings: InsulinSettings): Promise<void> {
    await this.settingsService.saveInsulinSettings(insulinSettings);
  }
}
