import type {
  ISettingsService,
  ProfileSettings,
} from "../contracts/SettingsTypes";

export class SaveProfileUseCase {
  constructor(private settingsService: ISettingsService) {}

  async execute(profile: ProfileSettings): Promise<void> {
    // You could add validation logic here before saving
    return this.settingsService.saveProfile(profile);
  }
}
