# Step 3: High-Fidelity Mockups & Asset Export

**Goal:** Create detailed visual mockups for each screen in the application flow.

**Instructions:**

1.  Create detailed text-based ASCII art mockups for each screen in the user flow.
2.  **Document All Core Screens:** Include mockups for:
    - Home screen 
    - ___ screen
    - Settings screen
3.  **Include Interactive Elements:** Show button states, form fields, navigation elements, and user feedback mechanisms.
4.  **Document User Flow:** Add annotations explaining the navigation between screens and user actions.
5.  **Update the Specification:** Save the mockups as `plan/output/03-mockups.md`.


For example:

## 1. Carb Counter (home screen) 
```
┌─────────────────────────────────┐
│ ≡  Carb Counter         ⚙️      │
├─────────────────────────────────┤
│                                 │
│        📷 ANALYZE MEAL          │
│    ┌─────────────────────┐      │
│    │                     │      │
│    │    Take Photo of    │      │
│    │      Your Meal      │      │
│    │                     │      │
│    └─────────────────────┘      │
│                                 │
├─────────────────────────────────┤
│  🏠   📋   💬   📊   ⚙️        │
│ Home Hist Recs Stats Set        │
└─────────────────────────────────┘
```

## 2a. Photo Analysis (Plate)
```
┌─────────────────────────────────┐
│ ← Back    Photo Analysis        │
├─────────────────────────────────┤
│ ┌─────────────────────────────┐ │
│ │                             │ │
│ │        📷 CAMERA            │ │
│ │       VIEWFINDER            │ │
│ │                             │ │
│ │      [Photo Preview]        │ │
│ │                             │ │
│ └─────────────────────────────┘ │
│                                 │
│  Container:  ( Plate ) [  Bowl  ] [ Glass ] │
│                                 │
│  📏 Meal Size Parameters:       │
│  Plate Diameter: [●─────] 25cm  │
│                                 │
│  Meal Type: [Breakfast ▼]       │
│                                 │
│           Optional              │
|  Weight:[]g                      │
│                                  │
│  General Comments:                       │
│  ┌─────────────────────────────┐ │
│  │ e.g. "Post-workout meal"    │ │
│  └─────────────────────────────┘ │
│                                 │
│  ┌─────────────────────────────┐ │
│  │         📤 ANALYZE          │ │
│  └─────────────────────────────┘ │
│                                 │
├─────────────────────────────────┤
│  🏠   📋   💬   📊   ⚙️        │
└─────────────────────────────────┘
```