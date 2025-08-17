import type {
  IMealAnalysisService,
  AnalysisParameters,
  AnalysisResult,
} from "../../app/contracts/IMealAnalysisService";
import { fetchMealAnalysisResult } from "./MealAnalysisApi";
import { SettingsService } from "../../../user-settings/infra/services/SettingsService";

export class MockMealAnalysisService implements IMealAnalysisService {
  public async analyze(_params: AnalysisParameters): Promise<AnalysisResult> {
    const settingsService = new SettingsService();
    const appPreferences = await settingsService.loadAppPreferences();
    const userProfile = await settingsService.loadProfile();

    console.log("Mock analysis service called with:", {
      analysis_data: {
        meal_details: _params,
        "CapacitorStorage.app_preferences": appPreferences,
        "CapacitorStorage.user_profile": userProfile,
      },
    });

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In this mock, we use the actual fetch logic but with a hardcoded ICR.
    // This is to simulate a realistic analysis result.
    // A user's ICR would typically come from user settings.
    const userIcr = "1:10";
    const result = await fetchMealAnalysisResult(userIcr);

    return result;
  }
}
