# Setup Requirements for Carb Counter App

## Project Overview

**App Name**: Carb Counter (Insulens)  
**Target Platform**: iOS/Android Mobile App  
**Primary Use Case**: Diabetic meal analysis with AI-powered carbohydrate counting and insulin recommendations  
**Architecture**: Package by Feature (Vue 3 + TypeScript + Capacitor)

## 1. Core Dependencies

### Framework & Build Tools
```json
{
  "vue": "^3.5.17",
  "typescript": "~5.8.3",
  "vite": "^7.0.4",
  "@vitejs/plugin-vue": "^6.0.0",
  "vue-tsc": "^2.2.12"
}
```

### Mobile Development
```json
{
  "@capacitor/cli": "^7.4.2",
  "@capacitor/core": "^7.4.2",
  "@capacitor/ios": "^7.4.2",
  "@capacitor/android": "^7.4.2",
  "@capacitor/camera": "^6.0.0",
  "@capacitor/filesystem": "^6.0.0",
  "@capacitor/preferences": "^7.0.1"
}
```

### UI Framework
```json
{
  "naive-ui": "^2.42.0",
  "@vicons/ionicons5": "^0.13.0"
}
```

### State Management & Routing
```json
{
  "pinia": "^3.0.3",
  "vue-router": "^4.5.1"
}
```

### Data Visualization (for Statistics)
```json
{
  "chart.js": "^4.4.0",
  "vue-chartjs": "^5.3.0"
}
```

### HTTP Client (for AI Integration)
```json
{
  "axios": "^1.6.0"
}
```

### Development Tools
```json
{
  "eslint": "^9.31.0",
  "eslint-plugin-vue": "^10.3.0",
  "@vue/eslint-config-typescript": "^14.6.0",
  "@vue/eslint-config-prettier": "^10.2.0",
  "prettier": "^3.6.2",
  "vitest": "^3.2.4",
  "@vitest/ui": "^3.2.4",
  "jsdom": "^26.1.0"
}
```

## 2. Configuration Files

### package.json Updates
```json
{
  "name": "carb-counter",
  "version": "1.0.0",
  "description": "AI-powered carb counting and insulin management for diabetics",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc -b && vite build",
    "preview": "vite preview",
    "type-check": "vue-tsc -b",
    "lint": "eslint . --fix",
    "format": "prettier --write src/",
    "test": "vitest --config vitest.config.ts",
    "test:ui": "vitest --ui --config vitest.config.ts",
    "build:mobile": "npm run build && npx cap sync",
    "ios": "npx cap run ios",
    "android": "npx cap run android"
  }
}
```

### capacitor.config.ts
```typescript
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.insulens.carbcounter',
  appName: 'Carb Counter',
  webDir: 'dist',
  ios: {
    scheme: 'App',
    backgroundColor: '#000000',
    allowsInlineMediaPlayback: true,
    allowsAirPlayForMediaPlayback: true,
    mediaTypesRequiringUserActionForPlayback: []
  },
  android: {
    backgroundColor: '#000000'
  },
  plugins: {
    Camera: {
      permissions: ['camera', 'photos']
    },
    SplashScreen: {
      launchShowDuration: 0
    }
  },
  server: {
    allowNavigation: ['*']
  }
};

export default config;
```

### Environment Variables (.env)
```env
# AI Service Endpoints
VITE_AI_ANALYSIS_ENDPOINT=https://your-ai-service.com/api/analyze-meal
VITE_AI_CHAT_ENDPOINT=https://your-ai-service.com/api/chat

# App Configuration
VITE_APP_NAME=Carb Counter
VITE_APP_VERSION=1.0.0

# Development
VITE_VUE_DEVTOOLS=true
```

## 3. Project Structure (Package by Feature)

```
src/
├── features/
│   ├── meal-analysis/
│   │   ├── domain/
│   │   │   ├── entities/
│   │   │   │   ├── MealPhoto.ts
│   │   │   │   ├── FoodAnalysis.ts
│   │   │   │   └── InsulinRecommendation.ts
│   │   │   └── services/
│   │   │       ├── CarbohydrateEstimator.ts
│   │   │       └── InsulinCalculator.ts
│   │   ├── app/
│   │   │   ├── usecases/
│   │   │   │   ├── AnalyzeMealPhoto.ts
│   │   │   │   └── TweakInsulinDose.ts
│   │   │   └── contracts/
│   │   │       ├── IAIAnalysisService.ts
│   │   │       └── IMealRepository.ts
│   │   ├── infra/
│   │   │   ├── services/
│   │   │   │   └── OpenAIAnalysisService.ts
│   │   │   └── repositories/
│   │   │       └── LocalMealRepository.ts
│   │   └── ui/
│   │       ├── components/
│   │       │   ├── CameraCapture.vue
│   │       │   ├── ParameterForm.vue
│   │       │   └── ResultsCard.vue
│   │       └── pages/
│   │           ├── CameraScreen.vue
│   │           ├── ResultsScreen.vue
│   │           └── TweakScreen.vue
│   │
│   ├── meal-history/
│   │   └── [similar structure]
│   │
│   ├── meal-recommendations/
│   │   └── [similar structure]
│   │
│   ├── health-statistics/
│   │   └── [similar structure]
│   │
│   └── user-settings/
│       └── [similar structure]
│
├── shared/
│   ├── ui/
│   │   ├── components/
│   │   └── theme/
│   ├── domain/
│   ├── app/
│   └── infra/
│
└── app/
    ├── App.vue
    ├── main.ts
    ├── router.ts
    └── stores/
```

## 4. Mobile Permissions Required

### iOS (Info.plist)
```xml
<key>NSCameraUsageDescription</key>
<string>This app needs camera access to photograph meals for carbohydrate analysis</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>This app needs photo library access to select meal photos for analysis</string>
```

### Android (android/app/src/main/AndroidManifest.xml)
```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

## 5. AI Integration Requirements

### Meal Analysis Endpoint
- **URL**: `POST /api/analyze-meal`
- **Input**: Multipart form with image file and parameters
- **Output**: JSON matching food database structure
- **Authentication**: API key or token-based

### Chat Recommendations Endpoint
- **URL**: `POST /api/chat`
- **Input**: JSON with meal type, preferences, and history
- **Output**: Streaming chat responses
- **Authentication**: API key or token-based

## 6. Development Setup Steps

### 1. Initialize Project
```bash
npm create vue@latest carb-counter
cd carb-counter
npm install
```

### 2. Add Mobile Support
```bash
npm install @capacitor/core @capacitor/cli @capacitor/camera @capacitor/filesystem
npx cap init
npx cap add ios
npx cap add android
```

### 3. Add Dependencies
```bash
npm install naive-ui @vicons/ionicons5 pinia vue-router chart.js vue-chartjs axios
npm install -D @vue/eslint-config-prettier @vitest/ui jsdom
```

### 4. Configure Theme
- Copy glassmorphism theme from design specifications
- Configure Naive UI GlobalThemeOverrides
- Set up CSS custom properties for light/dark themes

### 5. Set Up Environment
```bash
cp .env.example .env
# Edit .env with your AI service endpoints
```

## 7. Build & Deployment

### Development
```bash
npm run dev                    # Web development server
npm run ios                    # iOS simulator
npm run android                # Android emulator
```

### Production
```bash
npm run build                  # Build for production
npm run build:mobile           # Build and sync to mobile
npx cap open ios               # Open in Xcode
npx cap open android           # Open in Android Studio
```

## 8. Testing Strategy

### Unit Tests
- Domain entities and services
- Use cases and business logic
- Component testing with Vue Test Utils

### Integration Tests
- AI service integration
- Camera functionality
- Data persistence

### E2E Tests
- Complete meal analysis flow
- Cross-feature navigation
- Mobile device testing

## 9. Performance Considerations

### Image Optimization
- Compress photos before upload
- Implement progressive loading
- Cache analysis results locally

### Mobile Optimization
- Use Capacitor's native plugins
- Implement offline functionality
- Optimize for touch interactions

### AI Integration
- Implement request caching
- Add retry logic for network failures
- Show loading states and progress

## 10. Security Requirements

### Data Protection
- Encrypt sensitive health data locally
- Secure API communication (HTTPS only)
- Implement proper user authentication

### Privacy
- Clear data usage policies
- User consent for photo processing
- Option to delete stored data

---

## Next Steps

1. **Initialize Project**: Set up the base Vue + Capacitor project
2. **Configure Dependencies**: Install and configure all required packages
3. **Set Up Architecture**: Create the package-by-feature folder structure
4. **Implement Core Flow**: Start with meal analysis feature
5. **Add Mobile Features**: Integrate camera and native functionality
6. **Connect AI Services**: Implement AI endpoint integration
7. **Testing & Deployment**: Set up testing pipeline and deployment process

This setup provides a solid foundation for building a professional-grade diabetic meal management app with modern mobile capabilities and AI integration.
