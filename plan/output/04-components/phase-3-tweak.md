# Phase 3: Tweak Screen

## Overview
Add the ability to adjust insulin dosage after analysis. This screen allows users to fine-tune the recommended insulin amounts and bolus strategy before saving to history.

## Naive UI Components Used

### **`NPageHeader`** (Header)
- **Props**: 
  - `title: string` - Page title
  - `onBack?: () => void` - Back button handler
- **Features**: Built-in navigation and title styling

### **`NCard`** (Section Containers)
- **Props**: 
  - `title?: string` - Section title
  - `size?: 'small' | 'medium' | 'large'` - Card size
- **Styling**: Glassmorphism background

### **`NInputNumber`** (Insulin Units Input)
- **Props**: 
  - `value: number` - Current insulin units
  - `min?: number` - Minimum value (0)
  - `max?: number` - Maximum value 
  - `step?: number` - Step increment (0.5)
  - `precision?: number` - Decimal precision (1)
  - `onUpdateValue: (value: number) => void` - Value change callback
- **Usage**: Precise insulin unit adjustment

### **`NRadioGroup`** (Bolus Strategy)
- **Props**: 
  - `value: string` - Selected strategy
  - `onUpdateValue: (value: string) => void` - Selection callback
  - `options: Array<{label: string, value: string}>` - Strategy options
- **Options**: Standard, Extended, Combo bolus types

### **`NSlider`** (Strategy Parameters)
- **Props**: 
  - `value: number` - Current value
  - `min: number` - Minimum value
  - `max: number` - Maximum value
  - `step?: number` - Step increment
  - `onUpdateValue: (value: number) => void` - Value change callback
  - `marks?: object` - Value markers
- **Usage**: Timing, duration, percentage adjustments

### **`NInput`** (Comments)
- **Props**: 
  - `value: string` - Comment text
  - `placeholder: string` - Placeholder text
  - `type: 'textarea'` - Multi-line input
  - `onUpdateValue: (value: string) => void` - Value change callback
- **Usage**: Alteration notes and reasoning

### **`NButton`** (Actions)
- **Props**: 
  - `type?: 'primary' | 'default'` - Button variant
  - `disabled?: boolean` - Disabled state
  - `onClick: () => void` - Click handler
- **Usage**: Save to history, cancel actions

### **`NSpace`** (Layout)
- **Props**: 
  - `vertical?: boolean` - Vertical layout
  - `size?: number | 'small' | 'medium' | 'large'` - Gap size
- **Usage**: Consistent spacing between sections

## Screen: `TweakScreen`

### **Route**: `/tweak`
### **Layout**: Form for adjusting insulin dosage

### **Component Tree**:
- `NPageHeader` (title: "Tweak Insulin", onBack: navigate back)
- `NSpace` (vertical, size: "large"):
  - **Original Analysis Summary**:
    - `NCard` (title: "Original Analysis"):
      - `NSpace` (vertical, size: "small"):
        - Meal name and photo thumbnail
        - Original insulin recommendation display
        - Original strategy display
  - **Insulin Adjustment Section**:
    - `NCard` (title: "Adjust Insulin Dosage"):
      - `NSpace` (vertical, size: "medium"):
        - `NInputNumber` (label: "Insulin Units", value: originalInsulin, min: 0, max: 50, step: 0.5, precision: 1)
        - Difference indicator (e.g., "+1.5 units from original")
  - **Bolus Strategy Section**:
    - `NCard` (title: "Bolus Strategy"):
      - `NSpace` (vertical, size: "medium"):
        - `NRadioGroup` (value: strategy, options: [
          {label: "Standard Bolus", value: "standard"},
          {label: "Extended Bolus", value: "extended"}, 
          {label: "Combo Bolus", value: "combo"}
        ])
        - **Conditional Strategy Parameters**:
          - **Standard**: 
            - `NSlider` (label: "Minutes before meal", value: 15, min: 0, max: 60, marks: {0: "Now", 15: "15min", 30: "30min"})
          - **Extended**:
            - `NSlider` (label: "Duration (hours)", value: 2, min: 1, max: 8, marks: {1: "1h", 4: "4h", 8: "8h"})
          - **Combo**:
            - `NSlider` (label: "Upfront %", value: 50, min: 20, max: 80, marks: {20: "20%", 50: "50%", 80: "80%"})
            - `NSlider` (label: "Extended duration (hours)", value: 2, min: 1, max: 6)
  - **Notes Section**:
    - `NCard` (title: "Alteration Notes"):
      - `NInput` (type: "textarea", placeholder: "Why did you adjust the dosage? (e.g., planning to exercise, different meal timing, past experience with this food...)", rows: 3)
  - **Action Buttons**:
    - `NSpace` (vertical, size: "small"):
      - `NButton` (type: "primary", size: "large", text: "💾 SAVE TO HISTORY", onClick: save tweaked analysis)
      - `NButton` (type: "default", text: "Cancel", onClick: navigate back)

## Data Flow

### **Input Data** (from Results screen):
```typescript
interface TweakScreenProps {
  originalAnalysis: {
    foodName: string
    photoUrl: string
    carbs: number
    originalInsulin: number
    originalStrategy: BolusStrategy
  }
}
```

### **Bolus Strategy Types**:
```typescript
type BolusStrategy = {
  type: 'standard' | 'extended' | 'combo'
  standardTiming?: number      // minutes before meal
  extendedDuration?: number    // hours
  comboUpfront?: number        // percentage
  comboDuration?: number       // hours
}
```

### **Output Data** (saved to history):
```typescript
interface TweakedMealEntry {
  id: string
  originalAnalysis: MealAnalysis
  tweakedInsulin: number
  tweakedStrategy: BolusStrategy
  alterationNotes: string
  tweakedAt: Date
  insulinDifference: number    // tweaked - original
}
```

## Validation Rules
- Insulin units: minimum 0, maximum 50, step 0.5
- Standard timing: 0-60 minutes
- Extended duration: 1-8 hours
- Combo upfront: 20-80%
- Combo duration: 1-6 hours
- Alteration notes: optional but recommended

## Development Notes
- Pre-populate form with original analysis values
- Show real-time difference calculation (tweaked vs original)
- Use `NInputNumber` validators for range checking
- Add confirmation dialog if insulin difference is > 3 units
- Store tweaked entries with reference to original analysis
- Use color coding for insulin adjustments (green=decrease, red=increase)
- Consider adding quick adjustment buttons (+0.5, -0.5, +1, -1)
