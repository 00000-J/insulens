import { defineStore } from "pinia";
import { Preferences } from "@capacitor/preferences";

const DARK_KEY = "app_theme_dark";

export const useThemeStore = defineStore("theme", {
  state: () => ({
    isDark: false,
  }),
  actions: {
    updateDOM(isDark: boolean) {
      if (typeof document !== "undefined") {
        document.documentElement.classList.toggle("dark", isDark);
      }
    },
    async load() {
      const { value } = await Preferences.get({ key: DARK_KEY });
      if (value !== null) {
        this.isDark = value === "true";
      }
      this.updateDOM(this.isDark);
    },
    async set(val: boolean) {
      this.isDark = val;
      await Preferences.set({ key: DARK_KEY, value: String(val) });
      this.updateDOM(val);
    },
    async toggle() {
      await this.set(!this.isDark);
    },
  },
});
