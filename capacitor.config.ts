import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.kbhits.app',
  appName: 'fitness-app',
  webDir: 'dist',
  ios: {
    scheme: 'App',
    backgroundColor: '#OOOOOO',
    allowsInlineMediaPlayback: true,
    allowsAirPlayForMediaPlayback: true,
    mediaTypesRequiringUserActionForPlayback: []
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0
    }
  },
  server: {
    allowNavigation: ['*']
  }
};

export default config;
