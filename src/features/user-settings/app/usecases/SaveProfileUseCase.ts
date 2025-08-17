import { ISettingsService } from '../contracts/ISettingsService';
import { Profile } from '../contracts/SettingsTypes';

export class SaveProfileUseCase {
  constructor(private settingsService: ISettingsService) {}

  async execute(profile: Profile): Promise<void> {
    await this.settingsService.saveProfile(profile);
  }
}
