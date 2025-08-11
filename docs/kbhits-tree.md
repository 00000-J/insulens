src
├── 0-domain
│   ├── ExerciseSelector.ts
│   └── models.ts
├── 1-application-business-rules
│   ├── HitPlanner.ts
│   └── ports
│       └── IHitPlanRepository.ts
├── 2-interface-adapters
│   ├── composables
│   │   └── useHit.ts
│   ├── data
│   │   ├── exercises.json
│   │   └── hits.json
│   ├── repositories
│   │   └── HitPlanPiniaRepository.ts
│   └── stores
│       ├── history.ts
│       ├── hit.ts
│       └── user.ts
├── 3-frameworks-and-drivers
│   ├── hardware-interactions
│   │   └── sound.ts
│   ├── ui-drivers
│   │   ├── components
│   │   │   ├── HitCard.vue
│   │   │   └── PlayButton.vue
│   │   └── pages
│   │       ├── HistoryPage.vue
│   │       ├── HitActivePage.vue
│   │       ├── HitSelectorPage.vue
│   │       ├── SettingsPage.vue
│   │       └── StatsPage.vue
│   └── web-framework-setup
│       ├── App.vue
│       ├── main.ts
│       └── router.ts
├── cc
│   ├── constants
│   │   └── assets.ts
│   └── styles
│       ├── style.css
│       └── theme.ts
├── test
│   ├── setup.ts
│   └── utils.test.ts
└── vite-env.d.ts