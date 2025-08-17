import { defineStore } from "pinia";

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
    set(val: boolean) {
      this.isDark = val;
      this.updateDOM(val);
    },
  },
});
