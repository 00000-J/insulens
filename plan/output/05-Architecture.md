# Package by Feature Architecture (LLM-Decisive)

**Architecture Type**: Feature-Based Architecture (Vertical Organization)  
**Source**: Robert Martin's "Package by Feature" principle from "Clean Architecture" book  
**Organization**: Code organized by business features (features/insulin-tracking/, features/analytics/)  
**Decision Rule**: "What business feature does this code support?"

## Simple Example: Meal Analysis Feature

Here's how the core "photograph meal and get insulin recommendation" feature would be organized:

```
src/
  features/
    meal-analysis/
      domain/
        entities/
          MealPhoto.ts             # Core business entity
          FoodAnalysis.ts          # AI analysis result
          InsulinRecommendation.ts # Dosage calculation
        services/
          CarbohydrateEstimator.ts # Business rule: estimate carbs from photo + params
          InsulinCalculator.ts     # Business rule: calculate insulin from carbs
      app/
        usecases/
          AnalyzeMealPhoto.ts      # Orchestrate: photo → AI → calculate → save
          TweakInsulinDose.ts      # Adjust recommendation based on user input
        contracts/
          IAIAnalysisService.ts    # Interface for AI endpoint
          IMealRepository.ts       # Interface for meal storage
      infra/
        services/
          OpenAIAnalysisService.ts # AI endpoint implementation
        repositories/
          LocalMealRepository.ts   # Local storage implementation
      ui/
        components/
          CameraCapture.vue        # Photo capture component
          ParameterForm.vue        # Container size, meal type inputs
          ResultsCard.vue          # Display analysis results
        pages/
          CameraScreen.vue         # Full camera + params screen
          ResultsScreen.vue        # Analysis results screen
          TweakScreen.vue          # Insulin adjustment screen
        
  shared/
    app/
      config/
        naive-ui.config.ts         # UI library theme setup
        storage.config.ts          # Local storage configuration
```

**Key insight**: Code is organized by *what business value it provides* (meal analysis, meal history, recommendations, statistics).

Based on Robert Martin's "Package by Feature" principle from "Clean Architecture". This architecture eliminates ambiguity by organizing code around business features rather than technical layers, with crystal-clear placement rules optimized for LLM collaboration.

## 1. Core Principle: Package by Feature (Robert Martin)

**"Your architecture should scream about the use cases of the application, not about the frameworks you used"** - Robert Martin

**The One Decision**: What business feature does this code support?
- **Specific feature** → `features/feature-name/`
- **Multiple features** → `shared/`

That's it. No complex layer decisions, no ambiguity.

## 2. Directory Structure

```
src/
  features/
    meal-analysis/
      domain/           # Core business entities and rules
      app/             # Use cases and contracts
      infra/           # External integrations (AI, storage)
      ui/              # Components and pages for this feature
    
    meal-history/
      domain/          # Meal records, feedback entities
      app/             # CRUD operations, filtering
      infra/           # Local storage, export functionality
      ui/              # History list, feedback forms
    
    meal-recommendations/
      domain/          # Recommendation entities, preferences
      app/             # AI chat orchestration
      infra/           # AI service integration
      ui/              # Recommendation interface, chat UI
    
    health-statistics/
      domain/          # Statistics calculations, trends
      app/             # Data aggregation, report generation
      infra/           # Data export, analytics storage
      ui/              # Charts, progress bars, insights
    
    user-settings/
      domain/          # User profile, insulin settings
      app/             # Settings management
      infra/           # Settings persistence
      ui/              # Settings forms, preferences
  
  shared/
    ui/
      components/      # Reusable Naive UI components
      theme/           # Glassmorphism theme configuration
    domain/            # Shared entities (User, ContainerType)
    app/              # Shared utilities, validation
    infra/            # Common storage, network utilities
  
  app/
    App.vue
    main.ts
    router.ts
    stores/            # Pinia stores for global state
```

## 3. LLM Decision Rules (100% Decisive)

### Rule 1: Feature Assignment
**Question**: "What business capability does this code enable?"

- **Meal analysis** (photo capture, AI analysis, insulin calculation) → `features/meal-analysis/`
- **Meal history** (saving meals, feedback rating, filtering) → `features/meal-history/`
- **Meal recommendations** (AI chat, meal suggestions) → `features/meal-recommendations/`
- **Health statistics** (trends, charts, progress tracking) → `features/health-statistics/`
- **User settings** (profile, insulin settings, preferences) → `features/user-settings/`
- **Used by 2+ features** → `shared/`

### Rule 2: Layer Assignment
**Question**: "What is the primary responsibility of this code?"

| If the code... | Then place in... | Example |
|----------------|------------------|---------|
| Represents business concepts | `domain/entities/` | `MealPhoto.ts`, `FoodAnalysis.ts` |
| Enforces business rules | `domain/services/` | `InsulinCalculator.ts`, `CarbohydrateEstimator.ts` |
| Orchestrates a user action | `app/usecases/` | `AnalyzeMealPhoto.ts`, `SaveMealFeedback.ts` |
| Defines external contracts | `app/contracts/` | `IAIAnalysisService.ts`, `IMealRepository.ts` |
| Talks to databases/APIs | `infra/` | `OpenAIAnalysisService.ts`, `LocalMealStorage.ts` |
| Renders user interface | `ui/` | `CameraScreen.vue`, `ResultsCard.vue` |

### Rule 3: Dependency Direction (Immutable)
```
ui/ → app/ → domain/
     ↘    ↗
      infra/
```

**Never violate**: `domain/` imports nothing. `ui/` and `infra/` import everything they need.

## 4. Real-World Examples

### Example 1: Adding Meal Photo Analysis
```
New requirement: "Analyze meal photo with AI to get carb estimate and insulin recommendation"

1. What feature? → Meal analysis
2. What responsibilities?
   - MealPhoto (entity) → domain/entities/
   - FoodAnalysis (entity) → domain/entities/
   - InsulinCalculator (business rule) → domain/services/
   - AnalyzeMealPhoto (use case) → app/usecases/
   - IAIAnalysisService (contract) → app/contracts/
   - OpenAIAnalysisService (implementation) → infra/services/
   - CameraScreen (UI) → ui/pages/
   - ResultsCard (UI component) → ui/components/

Final structure:
features/meal-analysis/
  domain/entities/MealPhoto.ts
  domain/entities/FoodAnalysis.ts
  domain/services/InsulinCalculator.ts
  app/usecases/AnalyzeMealPhoto.ts
  app/contracts/IAIAnalysisService.ts
  infra/services/OpenAIAnalysisService.ts
  ui/pages/CameraScreen.vue
  ui/components/ResultsCard.vue
```

### Example 2: Adding Shared Container Types
```
New requirement: "Define container types (plate, bowl, glass) used across analysis and history"

1. What feature? → Multiple features (meal-analysis, meal-history)
2. What responsibility? → Shared domain entity

Final location:
shared/domain/entities/ContainerType.ts
```

## 5. Anti-Patterns (Never Do This)

❌ **Cross-Feature Imports**: `features/meal-history/` importing from `features/meal-analysis/`
- ✅ **Solution**: Move shared code to `shared/` or duplicate if minimal

❌ **Layer Violations**: `domain/` importing from `infra/`
- ✅ **Solution**: Use dependency inversion with contracts in `app/`

❌ **Uncertain Placement**: "This could go in multiple places"
- ✅ **Solution**: Follow the decision tree exactly, no exceptions

❌ **God Features**: 50+ files in one feature
- ✅ **Solution**: Split into sub-features (e.g., `meal-analysis` → `photo-capture` + `ai-analysis`)

## 6. Natural SOLID Alignment

**Package by Feature inherently supports SOLID principles:**

### Single Responsibility Principle (SRP)
- Each feature handles **one business capability**
- Each file within a feature has **one clear purpose**
- Changes are **localized** to specific features

### Open/Closed Principle (OCP)  
- **Open for extension**: Add new features by creating new feature folders
- **Closed for modification**: Existing features remain untouched when adding new ones

### Liskov Substitution Principle (LSP)
- Service interfaces within features can be **substituted** without breaking functionality
- Feature boundaries prevent **inappropriate substitutions**

### Interface Segregation Principle (ISP)
- Features expose only the **interfaces they need**
- No dependency on **unused interfaces** from other features

### Dependency Inversion Principle (DIP)
- Features depend on **shared abstractions**, not concrete implementations
- Business logic doesn't depend on **framework details**

## 7. LLM Collaboration Workflow

### For Every Code Change:
1. **Ask**: "What feature is this for?" → Choose module
2. **Ask**: "What responsibility is this?" → Choose layer
3. **Check**: "Does similar code exist?" → Extend or create new
4. **Validate**: "Does this follow dependency direction?" → Ensure clean imports
5. **Test**: "Does this satisfy SOLID?" → Review before commit

### For Uncertain Cases:
- **Default to `shared/`** if genuinely used by multiple features
- **Default to `app/usecases/`** if orchestrating multiple operations
- **Default to `domain/services/`** if enforcing business rules
- **Never guess** - follow the decision tree

## 8. Migration Strategy

When refactoring existing code:
1. Identify the business feature
2. Move all related files to the appropriate module
3. Establish contracts for cross-module communication
4. Ensure dependency direction is correct
5. Test that SOLID principles are maintained

## 9. Testing Strategy

Tests live alongside the code they test:
```
features/meal-analysis/
  domain/entities/
    MealPhoto.ts
    MealPhoto.test.ts
  app/usecases/
    AnalyzeMealPhoto.ts
    AnalyzeMealPhoto.test.ts
  ui/components/
    ResultsCard.vue
    ResultsCard.test.ts
```

Integration tests for cross-feature scenarios go in a dedicated `tests/integration/` directory.

---

**Remember**: This architecture succeeds because it removes all ambiguity. When in doubt, follow the decision tree. Every LLM response should result in code placed in exactly one correct location.
