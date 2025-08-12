# Phase 2: Core App Flow

## Overview
Build the main app functionality: Home → Camera → Analysis → History. This covers the primary user journey for meal analysis and tracking.

## Naive UI Components Used

### **`NButton`** (Primary & Secondary Buttons)
- **Props**: 
  - `type?: 'primary' | 'default' | 'tertiary'` - Button variant
  - `disabled?: boolean` - Disabled state
  - `onClick: () => void` - Click handler
  - `size?: 'small' | 'medium' | 'large'` - Button size
- **Content**: Text with optional emoji icons
- **Styling**: Themed through GlobalThemeOverrides

### **`NPageHeader`** (Header)
- **Props**: 
  - `title: string` - Page title
  - `onBack?: () => void` - Back button handler
  - `extra?: VNode` - Right-side content (settings icon)
- **Features**: Built-in navigation and title styling

### **`NTabBar`** (Navigation Bar)
- **Props**: 
  - `value: string` - Active tab value
  - `onUpdateValue: (value: string) => void` - Tab change handler
  - `type?: 'line' | 'card' | 'segment'` - Tab style
- **Items**: Array of tab objects with name and value
- **Styling**: Fixed bottom position with glassmorphism

### **`NInput`** (Text & Number Inputs)
- **Props**: 
  - `value: string | number` - Input value
  - `placeholder: string` - Placeholder text
  - `type?: 'text' | 'number' | 'textarea'` - Input type
  - `onUpdateValue: (value: string | number) => void` - Value change callback
  - `disabled?: boolean` - Disabled state
- **Styling**: Themed for glassmorphism

### **`NSelect`** (Dropdown)
- **Props**: 
  - `value: string` - Currently selected option
  - `options: Array<{value: string, label: string}>` - Available options
  - `placeholder: string` - Placeholder text
  - `onUpdateValue: (value: string) => void` - Selection callback
- **Styling**: Themed for glassmorphism

### **`NCard`** (Content Containers)
- **Props**: 
  - `title?: string` - Card title
  - `size?: 'small' | 'medium' | 'large'` - Card size
  - `hoverable?: boolean` - Hover effects
- **Styling**: Glassmorphism background

### **`NSpace`** (Layout & Spacing)
- **Props**: 
  - `vertical?: boolean` - Vertical layout
  - `size?: number | 'small' | 'medium' | 'large'` - Gap size
  - `justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between'`
  - `align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch'`

## Custom Components (Built with Naive UI)

### **`CameraViewfinder`** (Custom Component)
- **Built with**: HTML5 video element + `NButton` for capture
- **Props**: 
  - `onCapture: (imageData: string) => void` - Callback for photo capture
  - `preview?: string` - Optional preview image URL
- **Features**: Live camera feed with capture button
- **Styling**: Full-width container with `NCard` wrapper

### **`ContainerSelector`** (Built with `NButtonGroup`)
- **Props**: 
  - `value: 'plate' | 'bowl' | 'glass'` - Currently selected container
  - `onUpdateValue: (type: string) => void` - Selection change callback
- **Implementation**: 
```vue
<NButtonGroup>
  <NButton :type="value === 'plate' ? 'primary' : 'default'">🍽️ Plate</NButton>
  <NButton :type="value === 'bowl' ? 'primary' : 'default'">🥣 Bowl</NButton>
  <NButton :type="value === 'glass' ? 'primary' : 'default'">🥤 Glass</NButton>
</NButtonGroup>
```

### **`ParameterSlider`** (Built with `NSlider`)
- **Props**: 
  - `label: string` - Slider label (e.g., "Plate Diameter")
  - `value: number` - Current value
  - `min: number` - Minimum value
  - `max: number` - Maximum value
  - `unit: string` - Unit display (e.g., "cm", "ml")
  - `onUpdateValue: (value: number) => void` - Value change callback
- **Implementation**: `NSlider` with `NText` label and unit display

### **`ResultCard`** (Built with `NCard`)
- **Props**: 
  - `foodName: string` - Identified food name
  - `category: string` - Food category
  - `weight: number` - Estimated weight
  - `carbs: number` - Carbohydrate content
  - `insulin: number` - Recommended insulin units
  - `rations: number` - Carb rations
- **Implementation**: `NCard` with `NSpace` layout and `NStatistic` for metrics

### **`BolusStrategySelector`** (Built with `NRadioGroup`)
- **Props**: 
  - `value: 'standard' | 'extended' | 'combo'` - Selected strategy
  - `standardTime?: number` - Standard bolus timing (minutes before meal)
  - `extendedDuration?: number` - Extended duration in hours
  - `comboUpfront?: number` - Combo upfront percentage
  - `comboDuration?: number` - Combo duration in hours
  - `onUpdateValue: (strategy: object) => void` - Strategy change callback
- **Implementation**: `NRadioGroup` with conditional `NInputNumber` components

### **`MealHistoryItem`** (Built with `NCard`)
- **Props**: 
  - `foodName: string` - Meal name
  - `timeAgo: string` - Time since meal (e.g., "2h", "1d")
  - `carbs: number` - Carbohydrate content
  - `insulin: number` - Insulin units used
  - `strategy: string` - Bolus strategy used
  - `onClick: () => void` - Item selection callback
- **Implementation**: `NCard` with `hoverable=true` and `NSpace` layout

## Screen Components

### **Screen: `HomeScreen`**
- **Route**: `/`
- **Layout**: Centered content with navigation
- **Component Tree**:
  - `NPageHeader` (title: "Carb Counter", extra: settings icon button)
  - `NSpace` (vertical, size: "large", justify: "center"):
    - App logo/branding area
    - `NButton` (type: "primary", size: "large", text: "📷 ANALYZE MEAL", onClick: navigate to `/camera`)
  - `NTabBar` (value: "home", tabs: [{name: "🏠 Home", value: "home"}, {name: "📋 History", value: "history"}])

### **Screen: `CameraScreen`**
- **Route**: `/camera`
- **Layout**: Full-screen camera with controls overlay
- **Component Tree**:
  - `NPageHeader` (title: "Photo Analysis", onBack: navigate back)
  - `NSpace` (vertical, size: "medium"):
    - `CameraViewfinder` (onCapture: handle photo)
    - `NCard` (title: "Analysis Settings"):
      - `NSpace` (vertical, size: "small"):
        - `ContainerSelector` (onUpdateValue: update container type)
        - `ParameterSlider` (conditional based on container):
          - Plate: "Diameter (15-35cm)"
          - Bowl: "Diameter (10-25cm)" 
          - Glass: "Volume (100-500ml)"
        - `NSelect` (placeholder: "Meal Type", options: [
          {value: "breakfast", label: "🌅 Breakfast"},
          {value: "lunch", label: "🌞 Lunch"},
          {value: "dinner", label: "🌙 Dinner"},
          {value: "snack", label: "🍿 Snack"}
        ])
        - `NInput` (placeholder: "Weight (optional)", type: "number")
        - `NInput` (placeholder: "General Comments (optional)", type: "textarea")
    - `NButton` (type: "primary", size: "large", text: "📤 ANALYZE", onClick: submit analysis)
  - `NTabBar` (value: "home")

### **Screen: `ResultsScreen`**
- **Route**: `/results`
- **Layout**: Scrollable content with analysis results
- **Component Tree**:
  - `NPageHeader` (title: "Meal Analysis", onBack: navigate back)
  - `NSpace` (vertical, size: "medium"):
    - Photo preview (small image in `NCard`)
    - `ResultCard` (food details and metrics)
    - `NCard` (title: "Insulin Strategy"):
      - `BolusStrategySelector` (onUpdateValue: update strategy)
    - `NSpace` (vertical, size: "small"):
      - `NButton` (type: "primary", text: "✅ ACCEPT & SAVE", onClick: save to history)
      - `NButton` (type: "default", text: "🔄 REDO ANALYSIS", onClick: return to camera)
      - `NInput` (placeholder: "Redo Comment (optional)", type: "textarea", conditional)
  - `NTabBar` (value: "home")

### **Screen: `HistoryScreen`**
- **Route**: `/history`
- **Layout**: List view with filters
- **Component Tree**:
  - `NPageHeader` (title: "Meal History", extra: search icon)
  - `NSpace` (vertical, size: "small"):
    - `NCard` (size: "small"):
      - `NSpace` (horizontal, size: "medium"):
        - `NSelect` (placeholder: "All Meals", options: meal type filters)
        - `NSelect` (placeholder: "All Time", options: time period filters)
    - `NSpace` (vertical, size: "small"):
      - Array of `MealHistoryItem` components
  - `NTabBar` (value: "history")

## Mock API Responses

### **Container Analysis Response**
```json
{
  "container": {
    "type": "plate",
    "diameter": 25,
    "estimatedVolume": 400
  },
  "food": {
    "name": "Spaghetti Bolognese",
    "category": "Pasta & Grains",
    "weight": 280,
    "carbohydrates": 45,
    "rations": 3,
    "confidence": 0.87
  },
  "insulin": {
    "recommended": 4.5,
    "strategy": "standard",
    "timing": 15
  },
  "timestamp": "2024-01-15T18:30:00Z"
}
```

### **Mock Data Sets**

#### **Plate Responses**
- Pizza slice: 35g carbs, 3.5 units
- Chicken & rice: 50g carbs, 5 units  
- Pasta: 45g carbs, 4.5 units
- Salad with bread: 25g carbs, 2.5 units

#### **Bowl Responses**
- Cereal: 30g carbs, 3 units
- Soup with crackers: 20g carbs, 2 units
- Rice bowl: 55g carbs, 5.5 units
- Fruit salad: 35g carbs, 3.5 units

#### **Glass Responses**
- Orange juice: 25g carbs, 2.5 units
- Smoothie: 40g carbs, 4 units
- Milk: 15g carbs, 1.5 units
- Sports drink: 20g carbs, 2 units

## Naive UI Additional Components

### **`NSlider`** (Parameter Slider)
- **Props**: 
  - `value: number` - Current value
  - `min: number` - Minimum value
  - `max: number` - Maximum value
  - `step?: number` - Step increment
  - `onUpdateValue: (value: number) => void` - Value change callback
  - `marks?: object` - Value markers
- **Styling**: Themed for glassmorphism

### **`NButtonGroup`** (Container Selector)
- **Props**: 
  - `value: string` - Selected button value
  - `onUpdateValue: (value: string) => void` - Selection callback
- **Content**: Array of `NButton` components
- **Styling**: Grouped button appearance

### **`NRadioGroup`** (Bolus Strategy)
- **Props**: 
  - `value: string` - Selected radio value
  - `onUpdateValue: (value: string) => void` - Selection callback
  - `options: Array<{label: string, value: string}>` - Radio options
- **Styling**: Themed radio buttons

### **`NStatistic`** (Result Metrics)
- **Props**: 
  - `label: string` - Metric label
  - `value: string | number` - Metric value
  - `suffix?: string` - Unit suffix
- **Usage**: Display carbs, insulin, weight values
- **Styling**: Prominent value display

### **`NInputNumber`** (Numeric Inputs)
- **Props**: 
  - `value: number` - Current value
  - `min?: number` - Minimum value
  - `max?: number` - Maximum value
  - `step?: number` - Step increment
  - `onUpdateValue: (value: number) => void` - Value change callback
- **Usage**: Bolus timing, duration inputs

## Development Notes
- Use camera simulator for testing (upload image files)
- Implement local storage for meal history using Pinia store
- Add `NLoading` and `NSkeleton` for analysis loading states
- Use `NResult` component for empty states
- Focus on smooth navigation between screens with Vue Router
- Mock API should randomly select from response sets based on container type
- Use `NConfigProvider` at app root with GlobalThemeOverrides
- Implement responsive design with `NGrid` system if needed
