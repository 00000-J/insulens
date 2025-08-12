# Clean Architecture (LLM-Decisive)

**Architecture Type**: Layered Clean Architecture (Horizontal Organization)  
**Source**: Robert Martin's "Clean Architecture" book  
**Organization**: Code organized by technical layers (0-domain, 1-application, 2-adapters, 3-external)  
**Decision Rule**: "What layer does this code belong to?" based on dependencies and concerns

## Simple Example: Insulin Logging Feature

Here's how a basic "log blood sugar and calculate insulin dose" feature would be organized:

```
src/
  0-domain/
    entities/
      BloodSugarReading.ts     # Core business entity
      InsulinDose.ts           # Core business entity
    services/
      DosageCalculator.ts      # Business rule: calculate dose
      
  1-application/
    usecases/
      LogBloodSugar.ts         # Orchestrate: validate → save → calculate
    ports/
      IReadingRepository.ts    # Interface for data storage
      INotificationService.ts  # Interface for alerts
      
  2-adapters/
    controllers/
      ReadingController.ts     # HTTP endpoint handler
    repositories/
      SqliteReadingRepo.ts     # Database implementation
    presenters/
      DashboardPresenter.ts    # Format data for display
      
  3-external/
    frameworks/
      vue.config.ts            # Vue.js setup
    database/
      sqlite.config.ts         # Database connection
```

**Key insight**: Code is organized by *what it does technically* (entities, use cases, adapters, external tools).

Based on Robert Martin's "Clean Architecture" with explicit layer numbering and zero-ambiguity placement rules optimized for LLM collaboration.

## 1. Core Principle: Dependency Rule + Layer Numbers

**"Source code dependencies can only point inwards"** - Robert Martin

**The One Decision**: What layer does this code belong to?
- **Business entities and rules** → `0-domain/`
- **Application orchestration** → `1-application/`
- **External interface adapters** → `2-adapters/`
- **Framework and external tools** → `3-external/`

Layer numbers eliminate ambiguity - lower numbers cannot depend on higher numbers.

## 2. Directory Structure

```
src/
  0-domain/
    entities/           # Core business objects (User, Reading, Dose)
    value-objects/      # Immutable values (BloodSugar, Units)
    services/          # Business rules (DosageCalculator)
    
  1-application/
    usecases/          # Application business rules (LogReading, CalculateDose)
    ports/             # Interfaces for external dependencies
    
  2-adapters/
    controllers/       # Input adapters (HTTP, CLI, UI)
    presenters/        # Output adapters (View models, formatters)
    repositories/      # Data access implementations
    gateways/         # External service implementations
    
  3-external/
    frameworks/        # Vue, React, Express setup
    devices/          # Hardware integrations
    database/         # Database configurations
    web/              # Static assets, routing
    
  shared/
    types/            # Shared TypeScript interfaces
    constants/        # Application constants
    utils/           # Pure utility functions
```

## 3. LLM Decision Rules (100% Decisive)

### Rule 1: Layer Assignment
**Question**: "What is the primary concern of this code?"

| If the code... | Then place in... | Example |
|----------------|------------------|---------|
| Represents core business concepts | `0-domain/entities/` | `BloodSugarReading.ts` |
| Enforces business rules | `0-domain/services/` | `InsulinDosageCalculator.ts` |
| Orchestrates business operations | `1-application/usecases/` | `LogBloodSugarReading.ts` |
| Defines external contracts | `1-application/ports/` | `IReadingRepository.ts` |
| Handles HTTP requests | `2-adapters/controllers/` | `ReadingController.ts` |
| Formats data for display | `2-adapters/presenters/` | `ReadingPresenter.ts` |
| Implements data storage | `2-adapters/repositories/` | `SqliteReadingRepository.ts` |
| Configures frameworks | `3-external/frameworks/` | `vue.config.ts` |
| Manages database connections | `3-external/database/` | `sqlite.config.ts` |

### Rule 2: Dependency Direction (Immutable)
```
0-domain ← 1-application ← 2-adapters ← 3-external
```

**Never violate**: Layer 0 imports nothing. Layer 3 imports everything it needs.

### Rule 3: Cross-Layer Communication
- **Inward calls**: Direct imports allowed
- **Outward calls**: Use interfaces defined in inner layers

## 4. Real-World Examples

### Example 1: Adding Blood Sugar Logging
```
New requirement: "Log blood sugar reading with timestamp and validation"

Layer decisions:
1. BloodSugarReading (entity) → 0-domain/entities/
2. ReadingValidationService (business rule) → 0-domain/services/
3. LogBloodSugarReading (use case) → 1-application/usecases/
4. IReadingRepository (port) → 1-application/ports/
5. ReadingController (HTTP handler) → 2-adapters/controllers/
6. SqliteReadingRepository (implementation) → 2-adapters/repositories/
7. Database schema → 3-external/database/

Final structure:
src/
  0-domain/
    entities/BloodSugarReading.ts
    services/ReadingValidationService.ts
  1-application/
    usecases/LogBloodSugarReading.ts
    ports/IReadingRepository.ts
  2-adapters/
    controllers/ReadingController.ts
    repositories/SqliteReadingRepository.ts
  3-external/
    database/reading-schema.sql
```

### Example 2: Adding Device Integration
```
New requirement: "Import readings from glucose meter"

Layer decisions:
1. DeviceReading (value object) → 0-domain/value-objects/
2. ImportDeviceReadings (use case) → 1-application/usecases/
3. IDeviceGateway (port) → 1-application/ports/
4. BluetoothMeterGateway (implementation) → 2-adapters/gateways/
5. Bluetooth configuration → 3-external/devices/

Final structure:
src/
  0-domain/
    value-objects/DeviceReading.ts
  1-application/
    usecases/ImportDeviceReadings.ts
    ports/IDeviceGateway.ts
  2-adapters/
    gateways/BluetoothMeterGateway.ts
  3-external/
    devices/bluetooth.config.ts
```

## 5. Anti-Patterns (Never Do This)

❌ **Dependency Rule Violations**: `0-domain/` importing from `2-adapters/`
- ✅ **Solution**: Use dependency inversion with ports in `1-application/`

❌ **Layer Confusion**: "This could be domain or application logic"
- ✅ **Solution**: Ask "Does this depend on external concerns?" If yes → Application layer

❌ **Framework Leakage**: Vue components in `0-domain/`
- ✅ **Solution**: All framework code goes in `3-external/`

❌ **God Classes**: Single file handling multiple layers
- ✅ **Solution**: Split responsibilities across appropriate layers

## 6. Natural SOLID Alignment

**Clean Architecture was designed around SOLID principles:**

### Single Responsibility Principle (SRP)
- Each layer has **one reason to change**
- Entities change for business reasons
- Adapters change for external interface reasons

### Open/Closed Principle (OCP)
- **Open for extension**: Add new use cases without modifying entities
- **Closed for modification**: Core business rules remain stable

### Liskov Substitution Principle (LSP)
- All implementations of ports are **substitutable**
- Interface contracts ensure **proper behavior**

### Interface Segregation Principle (ISP)
- Ports are **specific to use cases**
- No client depends on **unused interface methods**

### Dependency Inversion Principle (DIP)
- High-level layers depend on **abstractions** (ports)
- Low-level layers implement **concrete details**

## 7. LLM Collaboration Workflow

### For Every Code Change:
1. **Ask**: "What is the primary concern?" → Choose layer (0-3)
2. **Ask**: "What type of responsibility?" → Choose subdirectory
3. **Check**: "Does this violate dependency direction?" → Ensure inward-only dependencies
4. **Validate**: "Is this the right abstraction level?" → Ensure layer consistency

### For Uncertain Cases:
- **Business concept without external dependencies** → `0-domain/`
- **Coordinates multiple domain objects** → `1-application/usecases/`
- **Talks to external systems** → `2-adapters/`
- **Framework/library configuration** → `3-external/`

## 8. Testing Strategy

Tests follow the same layer structure:
```
src/
  0-domain/
    entities/
      BloodSugarReading.ts
      BloodSugarReading.test.ts
  1-application/
    usecases/
      LogReading.ts
      LogReading.test.ts
```

Integration tests that span layers go in `tests/integration/`.

## 9. Migration from Feature-Based

When refactoring feature-based code:
1. **Identify core business concepts** → Move to `0-domain/`
2. **Find orchestration logic** → Move to `1-application/usecases/`
3. **Locate external interfaces** → Move to `2-adapters/`
4. **Find framework setup** → Move to `3-external/`

## 10. Key Improvements Over Standard Clean Architecture

1. **Numbered Layers**: Eliminates "entity vs use case" confusion
2. **Explicit Subdirectories**: Clear placement within each layer
3. **Decision Table**: Algorithmic code placement
4. **LLM-Optimized Rules**: Designed for automated decision making
5. **Anti-Pattern Prevention**: Common mistakes explicitly called out

---

**Remember**: The layer number is the primary decision. When in doubt, ask "What would this code need to import?" and place it in the lowest-numbered layer that satisfies its dependencies.
