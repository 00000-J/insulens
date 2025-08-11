# Package by Feature Architecture (LLM-Decisive)

**Architecture Type**: Feature-Based Architecture (Vertical Organization)  
**Source**: Robert Martin's "Package by Feature" principle from "Clean Architecture" book  
**Organization**: Code organized by business features (features/insulin-tracking/, features/analytics/)  
**Decision Rule**: "What business feature does this code support?"

## Simple Example: Insulin Logging Feature

Here's how a basic "log blood sugar and calculate insulin dose" feature would be organized:

```
src/
  features/
    insulin-tracking/
      domain/
        entities/
          BloodSugarReading.ts     # Core business entity
          InsulinDose.ts           # Core business entity
        services/
          DosageCalculator.ts      # Business rule: calculate dose
      app/
        usecases/
          LogBloodSugar.ts         # Orchestrate: validate → save → calculate
        contracts/
          IReadingRepository.ts    # Interface for data storage
          INotificationService.ts  # Interface for alerts
      infra/
        repositories/
          SqliteReadingRepo.ts     # Database implementation
      ui/
        components/
          ReadingForm.vue          # Input form component
          DashboardChart.vue       # Display component
        
  shared/
    app/
      config/
        vue.config.ts              # Vue.js setup
        sqlite.config.ts           # Database connection
```

**Key insight**: Code is organized by *what business value it provides* (insulin tracking, analytics, reminders).

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
    insulin-tracking/
      components/       # UI components for this feature
      services/         # Business logic for this feature
      types/           # TypeScript types for this feature
      utils/           # Utilities specific to this feature
      pages/           # Full page views for this feature
    
    analytics/
      components/
      services/
      types/
      utils/
      pages/
    
    reminders/
      components/
      services/
      types/
      utils/
      pages/
  
  shared/
    components/         # Reusable UI components
    services/          # Cross-feature business logic
    types/             # Shared TypeScript types
    utils/             # Shared utilities
  
  app/
    App.vue
    main.ts
    router.ts
```

## 3. LLM Decision Rules (100% Decisive)

### Rule 1: Feature Assignment
**Question**: "What business capability does this code enable?"

- **Insulin tracking** (logging, dosing) → `modules/insulin-tracking/`
- **Data analytics** (trends, reports) → `modules/analytics/`
- **Reminder system** (notifications, scheduling) → `modules/reminders/`
- **Used by 2+ features** → `shared/`

### Rule 2: Layer Assignment
**Question**: "What is the primary responsibility of this code?"

| If the code... | Then place in... | Example |
|----------------|------------------|---------|
| Represents business concepts | `domain/entities/` | `BloodSugarReading.ts` |
| Enforces business rules | `domain/services/` | `InsulinDosageCalculator.ts` |
| Orchestrates a user action | `app/usecases/` | `LogBloodSugarReading.ts` |
| Defines external contracts | `app/contracts/` | `IReadingRepository.ts` |
| Talks to databases/APIs | `infra/` | `SqliteReadingRepository.ts` |
| Renders user interface | `ui/` | `ReadingChart.vue` |

### Rule 3: Dependency Direction (Immutable)
```
ui/ → app/ → domain/
     ↘    ↗
      infra/
```

**Never violate**: `domain/` imports nothing. `ui/` and `infra/` import everything they need.

## 4. Real-World Examples

### Example 1: Adding Blood Sugar Logging
```
New requirement: "Log blood sugar reading with timestamp"

1. What feature? → Insulin tracking
2. What responsibilities?
   - BloodSugarReading (entity) → domain/entities/
   - LogReading (use case) → app/usecases/
   - IReadingRepository (contract) → app/contracts/
   - SqliteRepository (implementation) → infra/db/
   - ReadingForm (UI) → ui/components/

Final structure:
modules/insulin-tracking/
  domain/entities/BloodSugarReading.ts
  app/usecases/LogReading.ts
  app/contracts/IReadingRepository.ts
  infra/db/SqliteReadingRepository.ts
  ui/components/ReadingForm.vue
```

### Example 2: Adding Shared Date Utilities
```
New requirement: "Format dates consistently across all features"

1. What feature? → Multiple features (analytics, tracking, reminders)
2. What responsibility? → Utility function

Final location:
shared/app/DateFormatter.ts
```

## 5. Anti-Patterns (Never Do This)

❌ **Cross-Module Imports**: `modules/analytics/` importing from `modules/insulin-tracking/`
- ✅ **Solution**: Move shared code to `shared/` or duplicate if minimal

❌ **Layer Violations**: `domain/` importing from `infra/`
- ✅ **Solution**: Use dependency inversion with contracts in `app/`

❌ **Uncertain Placement**: "This could go in multiple places"
- ✅ **Solution**: Follow the decision tree exactly, no exceptions

❌ **God Modules**: 50+ files in one module
- ✅ **Solution**: Split into sub-features (e.g., `insulin-tracking` → `dosing` + `monitoring`)

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
modules/insulin-tracking/
  domain/entities/
    BloodSugarReading.ts
    BloodSugarReading.test.ts
  app/usecases/
    LogReading.ts
    LogReading.test.ts
```

Integration tests for cross-module scenarios go in a dedicated `tests/integration/` directory.

---

**Remember**: This architecture succeeds because it removes all ambiguity. When in doubt, follow the decision tree. Every LLM response should result in code placed in exactly one correct location.
