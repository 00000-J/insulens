# Phase 4: Meal Feedback Screen

## Overview
Allow users to provide feedback on how accurate the insulin recommendation was after they've taken the insulin and observed their blood sugar response. This creates a learning loop for improving future recommendations.

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

### **`NRadioGroup`** (Feedback Rating)
- **Props**: 
  - `value: string` - Selected feedback
  - `onUpdateValue: (value: string) => void` - Selection callback
  - `options: Array<{label: string, value: string}>` - Feedback options
- **Options**: Low sugar, spot-on, high sugar responses

### **`NInput`** (Symptoms & Notes)
- **Props**: 
  - `value: string` - Input text
  - `placeholder: string` - Placeholder text
  - `type: 'textarea'` - Multi-line input
  - `onUpdateValue: (value: string) => void` - Value change callback
- **Usage**: Detailed symptoms and experience notes

### **`NButton`** (Actions)
- **Props**: 
  - `type?: 'primary' | 'default'` - Button variant
  - `disabled?: boolean` - Disabled state
  - `onClick: () => void` - Click handler
- **Usage**: Save feedback, skip feedback

### **`NSpace`** (Layout)
- **Props**: 
  - `vertical?: boolean` - Vertical layout
  - `size?: number | 'small' | 'medium' | 'large'` - Gap size
- **Usage**: Consistent spacing between sections

### **`NStatistic`** (Meal Summary)
- **Props**: 
  - `label: string` - Metric label
  - `value: string | number` - Metric value
  - `suffix?: string` - Unit suffix
- **Usage**: Display original meal analysis data

### **`NTag`** (Visual Indicators)
- **Props**: 
  - `type?: 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error'` - Tag style
  - `size?: 'small' | 'medium' | 'large'` - Tag size
- **Usage**: Strategy type, meal type indicators

## Screen: `FeedbackScreen`

### **Route**: `/feedback/:mealId`
### **Layout**: Form for rating meal accuracy

### **Component Tree**:
- `NPageHeader` (title: "Meal Feedback", onBack: navigate back to history)
- `NSpace` (vertical, size: "large"):
  - **Meal Summary Section**:
    - `NCard` (title: "Meal Summary"):
      - `NSpace` (vertical, size: "small"):
        - Meal photo thumbnail
        - `NSpace` (horizontal, size: "medium"):
          - `NStatistic` (label: "Food", value: mealName)
          - `NStatistic` (label: "Carbs", value: carbAmount, suffix: "g")
          - `NStatistic` (label: "Insulin", value: insulinUsed, suffix: "units")
        - `NSpace` (horizontal, size: "small"):
          - `NTag` (text: strategy type, e.g., "Standard Bolus")
          - `NTag` (text: meal type, e.g., "Dinner")
          - Time since meal (e.g., "3 hours ago")
  - **Feedback Question**:
    - `NCard`:
      - `NSpace` (vertical, size: "medium"):
        - **Question**: "How did your blood sugar respond?"
        - `NRadioGroup` (value: feedback, options: [
          {
            label: "⬇️ Too Low - Blood sugar went lower than expected",
            value: "low",
            description: "Consider reducing insulin for similar meals"
          },
          {
            label: "✅ Spot On - Blood sugar stayed in target range", 
            value: "spot-on",
            description: "Great! This recommendation worked well"
          },
          {
            label: "⬆️ Too High - Blood sugar went higher than expected",
            value: "high", 
            description: "Consider increasing insulin for similar meals"
          }
        ])
  - **Additional Details Section**:
    - `NCard` (title: "Symptoms & Notes (Optional)"):
      - `NInput` (
          type: "textarea", 
          placeholder: "Any symptoms, unusual circumstances, or additional notes?\n\nExamples:\n• Felt shaky/sweaty (low sugar symptoms)\n• Very thirsty/tired (high sugar symptoms)\n• Exercised after eating\n• Ate faster/slower than usual\n• Stress or illness factors", 
          rows: 4
        )
  - **Action Buttons**:
    - `NSpace` (vertical, size: "small"):
      - `NButton` (type: "primary", size: "large", text: "💾 SAVE FEEDBACK", onClick: save feedback and navigate back)
      - `NButton` (type: "default", text: "Skip for Now", onClick: navigate back without saving)

## Data Flow

### **Input Data** (from meal history):
```typescript
interface FeedbackScreenProps {
  mealId: string
  meal: {
    foodName: string
    photoUrl: string
    carbs: number
    insulin: number
    strategy: BolusStrategy
    mealType: string
    timestamp: Date
    isTweaked: boolean
  }
}
```

### **Feedback Types**:
```typescript
type FeedbackRating = 'low' | 'spot-on' | 'high'

interface MealFeedback {
  mealId: string
  rating: FeedbackRating
  symptoms: string
  feedbackAt: Date
  timeSinceMeal: number  // hours between meal and feedback
}
```

### **Output Data** (saved to meal record):
```typescript
interface MealEntryWithFeedback extends MealEntry {
  feedback?: MealFeedback
  accuracyScore?: number  // derived from feedback
}
```

## Feedback Processing

### **Accuracy Scoring**:
- Low: -1 (insulin was too much)
- Spot-on: +1 (insulin was correct)
- High: -1 (insulin was too little)

### **Learning Insights**:
- Track feedback patterns by food type
- Identify foods that consistently need adjustments
- Build user-specific correction factors
- Improve future recommendations based on history

## Validation & UX

### **Required Fields**:
- Feedback rating (low/spot-on/high)

### **Optional Fields**:
- Symptoms and notes

### **Smart Defaults**:
- Pre-select time range based on when feedback is given
- Suggest common symptoms based on rating selected

### **Confirmation**:
- Show summary before saving
- Confirm if feedback seems inconsistent with previous patterns

## Development Notes
- Access meal data via route parameter `:mealId`
- Show meal timestamp and calculate time elapsed
- Use color coding for feedback options (red=low, green=spot-on, yellow=high)
- Store feedback linked to original meal entry
- Consider push notifications to remind users to provide feedback 2-4 hours post-meal
- Add analytics to track feedback completion rates
- Use feedback data to improve ML model recommendations over time
- Consider adding blood glucose reading input for more precise feedback
