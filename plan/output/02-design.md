# Design System

## 1. Color System

### Base Colors
| Token | Light Value | Dark Value | Usage |
| :--- | :--- | :--- | :--- |
| `--color-bg` | `#ffffff` | `#000000` | Primary background |
| `--color-text` | `#000000` | `#ffffff` | Primary text |
| `--color-text-muted` | `rgba(0,0,0,0.7)` | `rgba(255,255,255,0.7)` | Secondary text |
| `--color-border` | `rgba(0,0,0,0.1)` | `rgba(255,255,255,0.1)` | Subtle borders |

### Interactive Colors
| Token | Light Value | Dark Value | Usage |
| :--- | :--- | :--- | :--- |
| **Primary** | `#000000` | `#ffffff` | Buttons, interactive elements |
| **Primary Hover** | `#333333` | `#ffffff` | Hover states |
| **Primary Pressed** | `#000000` | `#e0e0e0` | Active states |


### Surface Colors
| Token | Value | Usage |
| :--- | :--- | :--- |
| `--color-card` | `rgba(bg, 0.99)` | Card backgrounds |
| `--color-nav-bg` | `rgba(bg, 0.2)` | Navigation bar with blur |

## 2. Typography

### Font Stack
```css
font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
```

### Type Scale
| Token | Size | Rem | Usage |
| :--- | :--- | :--- | :--- |
| `--font-size-sm` | `12px` | `0.75rem` | Navigation labels, metadata, captions |
| `--font-size-base` | `16px` | `1rem` | Body text, forms, buttons |
| `--font-size-lg` | `32px` | `2rem` | Section headers, featured content |
| `--font-size-display` | `72px` | `4.5rem` | Hero text, primary display values |

### Typography Rules
- **Base**: 16px font size, 1.5 line height
- **Weight**: 400 (regular) for body, bold for emphasis
- **Rendering**: Optimized with `text-rendering: optimizeLegibility`
- **Smoothing**: `-webkit-font-smoothing: antialiased`

## 3. Spacing System

### Base Unit: 4px

| Token | Value | Multiplier | Usage |
| :--- | :--- | :--- | :--- |
| `--space-xs` | `4px` | 1× | Micro spacing, icon gaps |
| `--space-sm` | `8px` | 2× | Small gaps, tight padding |
| `--space-md` | `16px` | 4× | Standard spacing, button padding |
| `--space-lg` | `24px` | 6× | Section spacing, card padding |
| `--space-xl` | `32px` | 8× | Large spacing, content margins |
| `--space-2xl` | `48px` | 12× | Major spacing, component separation |
| `--space-3xl` | `72px` | 18× | Navigation height, page padding |

## 4. Border Radius

| Token | Value | Usage |
| :--- | :--- | :--- |
| `--border-radius-sm` | `4px` | Small elements |
| `--border-radius-md` | `8px` | Standard elements |
| `--border-radius-lg` | `12px` | Cards, large buttons |
| `--border-radius-full` | `9999px` | Circular elements (play button) |

## 5. Component Patterns

### Glassmorphism Pattern
Used for cards, navigation, and elevated surfaces:
```css
.glass-surface {
  background-color: color-mix(in srgb, var(--color-bg) 60%, transparent);
  backdrop-filter: blur(50px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: var(--border-radius-lg);
  border: none;
}
```

**Applications:**
- Cards and content containers
- Navigation bar background
- Modal overlays
- Button backgrounds

## 6. Layout System

### App Structure
```css
#app {
  display: flex;
  flex-direction: column;
  height: 100%;
}
```

### Content Areas
- **Main Content**: `max-width: 600px`, centered
- **Navigation**: Fixed bottom, `var(--space-3xl)` height, glass background
- **Content Padding**: `var(--space-3xl)` top and bottom (navigation clearance)

## 7. Responsive Design

### Mobile Optimizations
- Touch targets: `touch-action: manipulation`
- Font size: Minimum 16px to prevent zoom on iOS
- Overflow: `-webkit-overflow-scrolling: touch`
- Viewport: Full height layouts with proper scrolling

### Accessibility
- High contrast ratios maintained in both themes
- System font stack for optimal readability
- Touch-friendly sizing (minimum 44px targets)

## 8. Animation & Effects

### Backdrop Filters
- Navigation: `blur(20px)`
- Cards/Buttons: `blur(50px)` 

## 9. Theme Implementation

### CSS Custom Properties
All colors use CSS custom properties for automatic theme switching:

```css
:root { /* Light theme defaults */ }
[data-theme="dark"] { /* Dark theme overrides */ }
```

### Naive UI Integration
Component library theming through `GlobalThemeOverrides` for consistent button and form styling.

