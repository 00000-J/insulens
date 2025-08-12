# Phase 1: Settings Screen

## Overview
Start with the Settings screen to establish basic user profile and app configuration. This creates the foundation for personalization used throughout the app.

## Naive UI Components Used

### **`NInput`** (Text & Number Inputs)
- **Props**: 
  - `value: string | number` - Input value
  - `placeholder: string` - Placeholder text
  - `type?: 'text' | 'number'` - Input type
  - `onUpdateValue: (value: string | number) => void` - Value change callback
- **Styling**: Themed through GlobalThemeOverrides for glassmorphism

### **`NSelect`** (Dropdown)
- **Props**: 
  - `value: string` - Currently selected option
  - `options: Array<{value: string, label: string}>` - Available options
  - `placeholder: string` - Placeholder text
  - `onUpdateValue: (value: string) => void` - Selection callback
- **Styling**: Themed through GlobalThemeOverrides

### **`NButton`** (Primary Button)
- **Props**: 
  - `type?: 'primary' | 'default'` - Button variant
  - `disabled?: boolean` - Disabled state
  - `onClick: () => void` - Click handler
- **Content**: Text with optional icon
- **Styling**: Themed through GlobalThemeOverrides for glassmorphism

### **`NPageHeader`** (Header)
- **Props**: 
  - `title: string` - Page title
  - `onBack?: () => void` - Back button handler
- **Features**: Built-in back arrow and title styling

### **`NCard`** (Section Containers)
- **Props**: 
  - `title?: string` - Section title
  - `size?: 'small' | 'medium' | 'large'` - Card size
- **Styling**: Themed for glassmorphism pattern

### **`NSpace`** (Layout & Spacing)
- **Props**: 
  - `vertical?: boolean` - Vertical layout
  - `size?: number | 'small' | 'medium' | 'large'` - Gap size
  - `justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between'`
- **Usage**: Consistent spacing between elements

## Screen: `SettingsScreen`

### **Route**: `/settings`
### **Layout**: Form sections for user preferences

### **Component Tree**:
- `NPageHeader` (title: "Settings", onBack: navigate back)
- `NSpace` (vertical, size: "large"):
  - **Profile Section**:
    - `NCard` (title: "Personal Information"):
      - `NSpace` (vertical, size: "medium"):
        - `NInput` (placeholder: "Name", type: "text")
        - `NInput` (placeholder: "Age", type: "number") 
        - `NInput` (placeholder: "Weight (kg)", type: "number")
  - **Insulin Settings Section**:
    - `NCard` (title: "Insulin Configuration"):
      - `NSpace` (vertical, size: "medium"):
        - `NSelect` (placeholder: "Insulin Sensitivity", options: [
          {value: "high", label: "High Sensitivity"},
          {value: "medium", label: "Medium Sensitivity"},
          {value: "low", label: "Low Sensitivity"}
        ])
        - `NSelect` (placeholder: "Carb Ratio", options: [
          {value: "1:10", label: "1:10 (1 unit per 10g carbs)"},
          {value: "1:15", label: "1:15 (1 unit per 15g carbs)"},
          {value: "1:20", label: "1:20 (1 unit per 20g carbs)"},
          {value: "custom", label: "Custom Ratio"}
        ])
  - **Preferences Section**:
    - `NCard` (title: "App Preferences"):
      - `NSpace` (vertical, size: "medium"):
        - `NSelect` (placeholder: "Units", options: [
          {value: "metric", label: "Metric (kg, cm, ml)"},
          {value: "imperial", label: "Imperial (lbs, in, fl oz)"}
        ])
        - `NSelect` (placeholder: "Language", options: [
          {value: "en", label: "English"},
          {value: "es", label: "Spanish"},
          {value: "fr", label: "French"}
        ])
  - **Data Management**:
    - `NCard`:
      - `NButton` (type: "primary", text: "📤 Export Data", onClick: export user data)

## Data Storage
Store settings in local storage or app state:
```json
{
  "profile": {
    "name": "",
    "age": "",
    "weight": ""
  },
  "insulin": {
    "sensitivity": "",
    "carbRatio": ""
  },
  "preferences": {
    "units": "metric",
    "language": "en"
  }
}
```

## Naive UI Theme Configuration

### GlobalThemeOverrides Setup
```typescript
const themeOverrides: GlobalThemeOverrides = {
  common: {
    // Use design system colors
    primaryColor: 'var(--color-text)',
    primaryColorHover: 'var(--color-text-muted)',
    primaryColorPressed: 'var(--color-text)',
    borderRadius: 'var(--border-radius-lg)',
    fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
  },
  Card: {
    // Glassmorphism pattern
    color: 'color-mix(in srgb, var(--color-bg) 60%, transparent)',
    borderRadius: 'var(--border-radius-lg)',
    paddingMedium: 'var(--space-lg)',
  },
  Input: {
    // Glassmorphism inputs
    color: 'color-mix(in srgb, var(--color-bg) 60%, transparent)',
    colorFocus: 'color-mix(in srgb, var(--color-bg) 70%, transparent)',
    borderRadius: 'var(--border-radius-md)',
    paddingMedium: 'var(--space-md)',
  },
  Select: {
    // Consistent with inputs
    peers: {
      InternalSelection: {
        color: 'color-mix(in srgb, var(--color-bg) 60%, transparent)',
        borderRadius: 'var(--border-radius-md)',
      }
    }
  },
  Button: {
    // Glassmorphism buttons
    colorOpacityPrimary: '0.6',
    borderRadiusMedium: 'var(--border-radius-md)',
    paddingMedium: 'var(--space-md) var(--space-lg)',
  }
}
```

## Development Notes
- Use Naive UI's built-in form validation
- Apply theme overrides for glassmorphism design system consistency
- Leverage `NSpace` for consistent spacing throughout
- Use `NCard` sections for visual grouping
- Settings should persist between sessions using local storage
- Consider using `NConfigProvider` at app root for theme management
