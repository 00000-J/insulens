# Phase 6: Meal Recommendations Screen

## Overview
Provide AI-powered meal recommendations based on user preferences, dietary restrictions, and carb goals. This screen helps users discover diabetes-friendly meals and plan their nutrition.

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

### **`NButtonGroup`** (Meal Type Selection)
- **Props**: 
  - `value: string` - Selected button value
  - `onUpdateValue: (value: string) => void` - Selection callback
- **Content**: Meal type buttons with emoji icons
- **Usage**: Quick meal type selection

### **`NInput`** (Preferences Input)
- **Props**: 
  - `value: string` - Input text
  - `placeholder: string` - Placeholder text
  - `type: 'textarea'` - Multi-line input
  - `onUpdateValue: (value: string) => void` - Value change callback
- **Usage**: Dietary preferences and restrictions

### **`NButton`** (Actions)
- **Props**: 
  - `type?: 'primary' | 'default'` - Button variant
  - `disabled?: boolean` - Disabled state
  - `loading?: boolean` - Loading state
  - `onClick: () => void` - Click handler
- **Usage**: Start chat, get recommendations

### **`NSpace`** (Layout)
- **Props**: 
  - `vertical?: boolean` - Vertical layout
  - `size?: number | 'small' | 'medium' | 'large'` - Gap size
- **Usage**: Consistent spacing between sections

### **`NSlider`** (Carb Target)
- **Props**: 
  - `value: number` - Current carb target
  - `min: number` - Minimum carbs (10)
  - `max: number` - Maximum carbs (100)
  - `step?: number` - Step increment (5)
  - `onUpdateValue: (value: number) => void` - Value change callback
  - `marks?: object` - Value markers
- **Usage**: Set target carb amount for meal

### **`NSelect`** (Quick Filters)
- **Props**: 
  - `value: string` - Selected option
  - `options: Array<{value: string, label: string}>` - Filter options
  - `multiple?: boolean` - Multiple selection
  - `onUpdateValue: (value: string | string[]) => void` - Selection callback
- **Usage**: Dietary restrictions, cuisine types

### **`NSkeleton`** (Loading States)
- **Props**: 
  - `text?: boolean` - Text skeleton
  - `width?: string | number` - Skeleton width
  - `height?: string | number` - Skeleton height
- **Usage**: Loading placeholder while AI generates recommendations

### **`NResult`** (Empty/Error States)
- **Props**: 
  - `status?: 'info' | 'success' | 'warning' | 'error'` - Result status
  - `title: string` - Result title
  - `description?: string` - Result description
- **Usage**: No recommendations, error states

## Custom Components (Built with Naive UI)

### **`MealRecommendationCard`** (Built with `NCard`)
- **Props**: 
  - `meal: MealRecommendation` - Meal data
  - `onSelect: (meal: MealRecommendation) => void` - Selection callback
- **Implementation**: 
```vue
<NCard hoverable @click="onSelect(meal)">
  <NSpace vertical size="small">
    <h3>{{ meal.name }}</h3>
    <NSpace horizontal size="small">
      <NTag>{{ meal.carbs }}g carbs</NTag>
      <NTag>{{ meal.prepTime }} min</NTag>
      <NTag type="success">{{ meal.difficulty }}</NTag>
    </NSpace>
    <p>{{ meal.description }}</p>
    <NSpace horizontal size="small">
      <span v-for="ingredient in meal.keyIngredients" :key="ingredient">
        {{ ingredient }}
      </span>
    </NSpace>
  </NSpace>
</NCard>
```

### **`QuickPreferencesSelector`** (Built with `NSelect`)
- **Props**: 
  - `selected: string[]` - Selected preferences
  - `onUpdate: (preferences: string[]) => void` - Update callback
- **Implementation**: Multiple `NSelect` components for different preference types

## Screen: `RecommendationsScreen`

### **Route**: `/recommendations`
### **Layout**: Form for meal recommendation request

### **Component Tree**:
- `NPageHeader` (title: "Meal Recommendations", onBack: navigate back)
- `NSpace` (vertical, size: "large"):
  - **Meal Type Selection**:
    - `NCard` (title: "What type of meal?"):
      - `NButtonGroup` (value: mealType, onUpdateValue: setMealType):
        - Options: [
          {value: "breakfast", label: "🌅 Breakfast"},
          {value: "lunch", label: "🌞 Lunch"},
          {value: "dinner", label: "🌙 Dinner"},
          {value: "snack", label: "🍿 Snack"}
        ]
  - **Carb Target Section**:
    - `NCard` (title: "Target Carbs"):
      - `NSlider` (
          value: carbTarget, 
          min: 10, 
          max: 100, 
          step: 5,
          marks: {15: "Low", 30: "Moderate", 45: "Standard", 60: "High"},
          onUpdateValue: setCarbTarget
        )
      - Display: "Aiming for ~{carbTarget}g carbs"
  - **Quick Preferences Section**:
    - `NCard` (title: "Dietary Preferences (Optional)"):
      - `NSpace` (vertical, size: "small"):
        - `NSelect` (
            placeholder: "Dietary Restrictions",
            multiple: true,
            options: [
              {value: "vegetarian", label: "Vegetarian"},
              {value: "vegan", label: "Vegan"},
              {value: "gluten-free", label: "Gluten-Free"},
              {value: "dairy-free", label: "Dairy-Free"},
              {value: "low-sodium", label: "Low Sodium"},
              {value: "keto-friendly", label: "Keto-Friendly"}
            ]
          )
        - `NSelect` (
            placeholder: "Cuisine Type",
            options: [
              {value: "mediterranean", label: "Mediterranean"},
              {value: "asian", label: "Asian"},
              {value: "mexican", label: "Mexican"},
              {value: "italian", label: "Italian"},
              {value: "american", label: "American"},
              {value: "indian", label: "Indian"}
            ]
          )
  - **Custom Preferences Section**:
    - `NCard` (title: "Additional Preferences"):
      - `NInput` (
          type: "textarea",
          placeholder: "Any specific requests?\n\nExamples:\n• Low carb options\n• Quick and easy recipes\n• Using ingredients I have\n• Comfort food\n• Heart-healthy\n• High protein",
          rows: 3
        )
  - **Action Button**:
    - `NButton` (
        type: "primary", 
        size: "large", 
        loading: isGenerating,
        text: "🔮 GET RECOMMENDATIONS",
        onClick: generateRecommendations
      )
  - **Recommendations Results** (conditional, when recommendations available):
    - `NCard` (title: "Recommended Meals"):
      - `NSpace` (vertical, size: "medium"):
        - Array of `MealRecommendationCard` components
        - `NButton` (type: "default", text: "Generate More Options", onClick: generateMore)

## Data Flow

### **Request Parameters**:
```typescript
interface RecommendationRequest {
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  targetCarbs: number
  dietaryRestrictions: string[]
  cuisineType?: string
  customPreferences: string
  userProfile: {
    previousMeals: MealHistory[]
    preferences: UserPreferences
    restrictions: string[]
  }
}
```

### **Meal Recommendation Structure**:
```typescript
interface MealRecommendation {
  id: string
  name: string
  description: string
  carbs: number
  estimatedInsulin: number
  prepTime: number
  difficulty: 'Easy' | 'Medium' | 'Complex'
  keyIngredients: string[]
  recipe?: {
    instructions: string[]
    ingredients: Array<{name: string, amount: string}>
    nutritionFacts: NutritionInfo
  }
  tags: string[]
  similarityScore: number  // how well it matches request
}
```

### **AI Prompt Generation**:
```typescript
const generatePrompt = (request: RecommendationRequest): string => {
  return `Generate 3-5 ${request.mealType} meal recommendations for someone with Type 1 diabetes.
  
  Requirements:
  - Target: ~${request.targetCarbs}g carbohydrates
  - Dietary restrictions: ${request.dietaryRestrictions.join(', ')}
  - Cuisine preference: ${request.cuisineType || 'Any'}
  - Additional preferences: ${request.customPreferences}
  
  For each meal, provide:
  - Name and brief description
  - Estimated carbs and insulin units needed
  - Prep time and difficulty level
  - Key ingredients
  - Why it's good for diabetes management
  
  Focus on balanced nutrition, blood sugar stability, and practical preparation.`
}
```

## AI Integration

### **Mock AI Responses** (for development):
```typescript
const mockRecommendations = {
  breakfast: [
    {
      name: "Greek Yogurt Parfait with Berries",
      carbs: 25,
      insulin: 2.5,
      prepTime: 5,
      difficulty: "Easy",
      description: "Protein-rich breakfast with controlled carbs from fresh berries"
    },
    {
      name: "Vegetable Omelet with Whole Grain Toast",
      carbs: 30,
      insulin: 3.0,
      prepTime: 15,
      difficulty: "Medium",
      description: "High protein, fiber-rich breakfast with steady carb release"
    }
  ]
  // ... more meal types
}
```

### **Loading States**:
- Show `NSkeleton` components while generating
- Display progress indicators for longer requests
- Handle timeout and error scenarios

### **Caching Strategy**:
- Cache recommendations by request parameters
- Store user's favorite recommendations
- Track which recommendations were used

## User Experience

### **Progressive Disclosure**:
1. Start with meal type selection
2. Add carb target
3. Optional preferences
4. Generate recommendations

### **Smart Defaults**:
- Use user's typical carb targets from history
- Pre-fill common dietary restrictions from profile
- Suggest meal types based on time of day

### **Personalization**:
- Learn from user's meal history
- Adapt recommendations based on feedback
- Consider insulin sensitivity from settings

### **Quick Actions**:
- "Surprise me" button for random recommendations
- Save favorite recommendations
- Share recommendations with others

## Development Notes
- Start with mock AI responses for testing
- Integrate with OpenAI/Claude API for production
- Implement request caching to reduce API costs
- Add rate limiting for API requests
- Store successful recommendations in local history
- Consider offline mode with pre-generated recommendations
- Add nutrition fact lookup for recommended meals
- Implement user rating system for recommendations
- Use recommendation feedback to improve future suggestions
- Add grocery list generation from selected recommendations
- Consider meal planning features (weekly meal prep)
- Include photo suggestions or meal visualization
