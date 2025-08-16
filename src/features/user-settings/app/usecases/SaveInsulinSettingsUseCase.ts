import type {
  ISettingsService,
  InsulinSettings,
} from "../contracts/SettingsTypes";

export class SaveInsulinSettingsUseCase {
  constructor(private settingsService: ISettingsService) {}

  async execute(settings: InsulinSettings): Promise<void> {
    return this.settingsService.saveInsulinSettings(settings);
  }
}
