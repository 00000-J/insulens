
---
## 4. Component & Screen Specification

### Reusable Components

- **`PrimaryButton`**:
  - **Props**: `text: string`, `icon: string (optional)`, `disabled: boolean`
  - **Action**: Emits a `click` event.

### Screen: `Home`
- **Route**: `/`
- **Layout**: Vertical stack, content centered.
- **Component Tree**:
  - `Image`
    - `src`: "../03-mockups.out/public/assets/logo.svg"
    - `alt`: "Carb Counter Logo"
  - `PrimaryButton`
    - `props`:
      - `text`: "Scan Your Meal"
      - `icon`: "../03-mockups.out/public/assets/camera-icon.svg"
    - `onClick`: Navigate to `/camera`

### Screen: `Results`
- **Route**: `/results`
- **Layout**: Vertical stack.
- **Component Tree**:
  - `ImagePreview`
    - `src`: (Dynamically set from the photo taken)
  - `ResultCard`
    - `props`:
      - `title`: "Estimated Carbs"
      - `value`: (from API response)
      - `unit`: "g"
  - `PrimaryButton`
    - `props`:
      - `text`: "Scan Another Item"
    - `onClick`: Navigate to `/camera`
