# Feature Modules Architecture (LLM-Decisive)

This architecture is designed for maximum decisiveness when working with LLMs. It eliminates ambiguity about where code belongs by organizing around business features rather than technical layers.

## 1. Core Principle: Feature-First Organization

Every piece of code belongs to either:
1. **A specific feature module** (`modules/feature-name/`)
2. **Shared utilities** (`shared/`)

## 2. Directory Structure

```
src/
  modules/
    feature-name/
      domain/
        entities/
        value-objects/
        services/
      app/
        usecases/
        contracts/
      infra/
        db/
        http/
      ui/
        pages/
        components/
  shared/
    domain/
    app/
    infra/
    ui/
  app/
    App.vue
    main.ts
    router.ts
```

## 3. Decision Rules (Zero Ambiguity)

### Rule 1: Feature Identification
**Question**: "What business feature does this code support?"
- If it's specific to one feature → `modules/feature-name/`
- If it's used by multiple features → `shared/`

### Rule 2: Layer Placement (Within Each Module)
- **Entities, Value Objects, Business Rules** → `domain/`
- **Use Cases, Orchestration** → `app/usecases/`
- **External Dependencies (DB, API, UI)** → `infra/`
- **User Interface Components** → `ui/`

### Rule 3: Dependency Direction
```
ui/ → app/ → domain/
     ↘    ↗
      infra/
```

## 4. Real-World Examples

### Example 1: User Management Feature
```
modules/
  user-management/
    domain/
      entities/
        User.ts
        UserGroup.ts
      value-objects/
        Email.ts
        UserRole.ts
      services/
        UserValidationService.ts
    app/
      usecases/
        CreateUser.ts
        ListUsers.ts
        UpdateUser.ts
      contracts/
        IUserRepository.ts
    infra/
      db/
        UserRepository.ts
      http/
        UserApiClient.ts
    ui/
      pages/
        UserListPage.vue
        UserDetailPage.vue
      components/
        CreateUserForm.vue
        UserEmailSelect.vue
```

### Example 2: Workout Planning Feature
```
modules/
  workout-planning/
    domain/
      entities/
        Workout.ts
        Exercise.ts
      value-objects/
        WorkoutDuration.ts
        ExerciseType.ts
      services/
        WorkoutPlannerService.ts
    app/
      usecases/
        CreateWorkout.ts
        ExecuteWorkout.ts
      contracts/
        IWorkoutRepository.ts
    infra/
      db/
        WorkoutRepository.ts
      data/
        exercises.json
    ui/
      pages/
        WorkoutSelectorPage.vue
        WorkoutActivePage.vue
      components/
        ExerciseCard.vue
```

## 5. LLM Decision Framework

When adding new code, follow this exact sequence:

1. **"What feature is this for?"**
   - User management → `modules/user-management/`
   - Workout planning → `modules/workout-planning/`
   - Used by multiple features → `shared/`

2. **"What type of code is this?"**
   - Business logic → `domain/`
   - Use case orchestration → `app/usecases/`
   - Database/API interaction → `infra/`
   - UI component → `ui/`

3. **"Does it already exist?"**
   - If similar code exists in the same module, extend it
   - If similar code exists in `shared/`, consider moving to `shared/`

## 6. SOLID Principles Evaluation

Each module must independently satisfy SOLID principles:

- **S**ingle Responsibility: Each module handles one business feature
- **O**pen/Closed: Extend modules through new use cases, not modification
- **L**iskov Substitution: Contracts in `app/contracts/` define substitutable interfaces
- **I**nterface Segregation: Contracts are feature-specific, not monolithic
- **D**ependency Inversion: `domain/` depends on nothing, `infra/` implements contracts

## 7. Anti-Patterns to Avoid

❌ **Cross-Module Dependencies**: Never import from other feature modules
❌ **Layer Violations**: Never import "upward" in the dependency chain
❌ **Shared Everything**: Don't put code in `shared/` unless genuinely reused
❌ **God Modules**: If a module gets too large, split it into sub-features

## 8. Testing Strategy

Each module contains its own tests alongside the code:
```
modules/
  feature-name/
    domain/
      entities/
        User.ts
        User.test.ts
    app/
      usecases/
        CreateUser.ts
        CreateUser.test.ts
```
