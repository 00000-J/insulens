# Phase 5: Statistics Screen

## Overview
Provide users with insights into their meal patterns, insulin accuracy, and health trends. This screen helps users understand their diabetes management patterns and track progress over time.

## Naive UI Components Used

### **`NPageHeader`** (Header)
- **Props**: 
  - `title: string` - Page title
  - `extra?: VNode` - Right-side content (date picker icon)
- **Features**: Built-in navigation and title styling

### **`NCard`** (Section Containers)
- **Props**: 
  - `title?: string` - Section title
  - `size?: 'small' | 'medium' | 'large'` - Card size
- **Styling**: Glassmorphism background

### **`NStatistic`** (Key Metrics)
- **Props**: 
  - `label: string` - Metric label
  - `value: string | number` - Metric value
  - `suffix?: string` - Unit suffix
  - `prefix?: string` - Prefix content
- **Usage**: Display carbs, insulin, accuracy statistics

### **`NProgress`** (Progress Bars)
- **Props**: 
  - `percentage: number` - Progress value (0-100)
  - `status?: 'default' | 'success' | 'warning' | 'error'` - Progress color
  - `showIndicator?: boolean` - Show percentage text
- **Usage**: Weekly nutrition goals, accuracy rates

### **`NGradientText`** (Highlighted Values)
- **Props**: 
  - `gradient: object` - Gradient configuration
  - `size?: string` - Font size
- **Usage**: Prominent daily values display

### **`NGrid`** (Responsive Layout)
- **Props**: 
  - `cols?: number | string` - Column count
  - `responsive?: 'screen' | 'self'` - Responsive behavior
  - `xGap?: number` - Horizontal gap
  - `yGap?: number` - Vertical gap
- **Usage**: Organize statistics in responsive grid

### **`NSpace`** (Layout)
- **Props**: 
  - `vertical?: boolean` - Vertical layout
  - `size?: number | 'small' | 'medium' | 'large'` - Gap size
  - `justify?: string` - Horizontal alignment
- **Usage**: Consistent spacing between sections

### **`NTag`** (Visual Indicators)
- **Props**: 
  - `type?: 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error'` - Tag style
  - `size?: 'small' | 'medium' | 'large'` - Tag size
- **Usage**: Trend indicators, food categories

### **`NDatePicker`** (Time Period Selection)
- **Props**: 
  - `value: number` - Selected timestamp
  - `type: 'date' | 'daterange' | 'week' | 'month'` - Picker type
  - `onUpdateValue: (value: number) => void` - Selection callback
- **Usage**: Filter statistics by time period

## Custom Components (Built with Naive UI)

### **`AccuracyVisualization`** (Built with `NCard` and `NTag`)
- **Props**: 
  - `recentMeals: Array<'low' | 'spot-on' | 'high'>` - Last 10 meal feedbacks
  - `accuracy: number` - Overall accuracy percentage
- **Implementation**: 
```vue
<NCard title="Recent Accuracy">
  <NSpace size="small">
    <div v-for="(feedback, index) in recentMeals" :key="index">
      <NTag :type="getFeedbackColor(feedback)">
        {{ getFeedbackIcon(feedback) }}
      </NTag>
    </div>
  </NSpace>
  <NGradientText :gradient="accuracyGradient">
    {{ accuracy }}% Accurate
  </NGradientText>
</NCard>
```

### **`NutritionProgress`** (Built with `NProgress`)
- **Props**: 
  - `nutrients: Array<{name: string, current: number, target: number}>` - Nutrition data
- **Implementation**: Multiple `NProgress` components with custom labels

## Screen: `StatsScreen`

### **Route**: `/stats`
### **Layout**: Dashboard with health metrics

### **Component Tree**:
- `NPageHeader` (title: "Health Statistics", extra: date picker icon)
- `NSpace` (vertical, size: "large"):
  - **Time Period Selector**:
    - `NCard` (size: "small"):
      - `NDatePicker` (type: "daterange", placeholder: "Select time period")
  - **Daily Overview Section**:
    - `NCard` (title: "Today's Summary"):
      - `NGrid` (cols: 2, xGap: 16, yGap: 16):
        - **Current Carbs**:
          - `NGradientText` (gradient: primary, size: "48px", text: currentCarbs + "g")
          - Label: "Carbs consumed"
        - **Target Carbs**:
          - `NGradientText` (gradient: secondary, size: "48px", text: targetCarbs + "g")
          - Label: "Daily target"
  - **Weekly Progress Section**:
    - `NCard` (title: "Weekly Nutrition Goals"):
      - `NSpace` (vertical, size: "medium"):
        - `NutritionProgress` (nutrients: [
          {name: "Grains & Starches", current: 65, target: 100},
          {name: "Vegetables", current: 80, target: 100},
          {name: "Fruits", current: 45, target: 100},
          {name: "Protein", current: 90, target: 100},
          {name: "Healthy Fats", current: 70, target: 100}
        ])
  - **Weekly Summary Section**:
    - `NCard` (title: "This Week's Statistics"):
      - `NGrid` (cols: 3, xGap: 16, yGap: 16):
        - `NStatistic` (label: "Average Daily Carbs", value: avgDailyCarbs, suffix: "g")
        - `NStatistic` (label: "Daily Target Carbs", value: targetCarbs, suffix: "g")
        - `NStatistic` (label: "Average Daily Insulin", value: avgDailyInsulin, suffix: "units")
  - **Accuracy Tracking Section**:
    - `AccuracyVisualization` (recentMeals: last10Feedbacks, accuracy: overallAccuracy)
  - **Trends Section**:
    - `NCard` (title: "Insights & Trends"):
      - `NSpace` (vertical, size: "small"):
        - Trend insights (e.g., "Your breakfast insulin accuracy has improved 15% this month")
        - `NTag` (type: "success", text: "↗️ Improving")
        - Most accurate meal type
        - Foods that need adjustment

## Data Sources

### **Daily Statistics**:
```typescript
interface DailyStats {
  date: Date
  totalCarbs: number
  targetCarbs: number
  totalInsulin: number
  mealCount: number
  feedbackCount: number
}
```

### **Nutrition Progress**:
```typescript
interface NutritionGoal {
  category: string
  currentPercent: number
  targetPercent: number
  status: 'behind' | 'on-track' | 'ahead'
}
```

### **Accuracy Data**:
```typescript
interface AccuracyMetrics {
  overallAccuracy: number
  recentFeedbacks: Array<'low' | 'spot-on' | 'high'>
  accuracyByMealType: Record<string, number>
  accuracyTrend: 'improving' | 'stable' | 'declining'
}
```

### **Trend Analysis**:
```typescript
interface TrendInsight {
  type: 'accuracy' | 'nutrition' | 'timing'
  message: string
  direction: 'up' | 'down' | 'stable'
  significance: 'low' | 'medium' | 'high'
}
```

## Calculations

### **Accuracy Rate**:
- Spot-on feedback: +1 point
- Low/High feedback: 0 points
- Rate = (spot-on count / total feedback count) × 100

### **Nutrition Progress**:
- Based on food categories from meal analysis
- Track against recommended daily percentages
- Show weekly averages and trends

### **Trend Detection**:
- Compare current period vs previous period
- Identify patterns in meal timing, accuracy, carb intake
- Generate actionable insights

## Visual Design

### **Color Coding**:
- Green: On target, improving trends
- Yellow: Caution, needs attention
- Red: Behind goals, declining trends
- Blue: Neutral information

### **Progress Indicators**:
- Use `NProgress` with status colors
- Show percentages and absolute values
- Include target lines and ranges

### **Responsive Layout**:
- Use `NGrid` for responsive statistics
- Stack cards vertically on mobile
- Prioritize most important metrics

## Development Notes
- Calculate statistics from meal history data
- Use local storage or Pinia for caching computed stats
- Update statistics real-time as new meals are added
- Consider date range filtering for historical analysis
- Add export functionality for sharing with healthcare providers
- Use `NLoading` for async stat calculations
- Implement trend analysis algorithms for insights
- Consider adding goals/targets configuration in settings
- Add comparison views (this week vs last week)
- Include motivational messaging for positive trends
