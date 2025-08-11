src
├── app
│   ├── App.vue
│   └── routes
│       └── index.ts
├── assets
│   ├── images
│   │   ├── common
│   │   │   ├── logo-icon.svg
│   │   │   └── logo-with-words.svg
│   │   ├── icons
│   │   │   ├── combine_pdfs.png
│   │   │   ├── download_data.png
│   │   │   └── update_gp_patient_list.png
│   │   └── tools
│   │       └── combine_pdfs.png
│   └── styles
│       ├── bootstrap
│       │   ├── bootstrap-overrides.scss
│       │   └── custom-variables.scss
│       └── global.scss
├── components
│   ├── base
│   │   ├── WSpinner
│   │   │   ├── WSpinner.vue
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── index.ts
│   └── layout
│       ├── AppHeader.vue
│       ├── AppLayout.vue
│       ├── ContentCard.vue
│       ├── GenericDetailView.vue
│       ├── GenericListView.vue
│       └── index.ts
├── features
│   └── tools
│       ├── admin
│       │   ├── components
│       │   │   ├── CreateUserGroup.vue
│       │   │   ├── ListAuditLogs.vue
│       │   │   ├── ListPatients.vue
│       │   │   ├── ListSchedules.vue
│       │   │   ├── ListSsoTokenInfo.vue
│       │   │   ├── ListToolsWithoutIcons.vue
│       │   │   ├── ListUnderConstruction.vue
│       │   │   ├── ListUsers.vue
│       │   │   ├── RegisterTool.vue
│       │   │   ├── RegisterUser.vue
│       │   │   ├── SessionDestroyer.vue
│       │   │   ├── SsoDebug.vue
│       │   │   ├── UpdateTool.vue
│       │   │   ├── UpdateUser.vue
│       │   │   ├── __tests__
│       │   │   │   ├── CreateUserGroup.spec.ts
│       │   │   │   ├── ListAuditLogs.spec.ts
│       │   │   │   ├── ListSchedules.spec.ts
│       │   │   │   ├── ListSsoTokenInfo.spec.ts
│       │   │   │   ├── ListUnderConstruction.spec.ts
│       │   │   │   ├── ListUsers.spec.ts
│       │   │   │   ├── RegisterTool.spec.ts
│       │   │   │   ├── RegisterUser.spec.ts
│       │   │   │   ├── SessionDestroyer.spec.ts
│       │   │   │   ├── SsoDebug.spec.ts
│       │   │   │   └── UpdateTool.spec.ts
│       │   │   ├── index.ts
│       │   │   └── shared
│       │   │       ├── UserEmailSelect.vue
│       │   │       └── index.ts
│       │   ├── composables
│       │   │   ├── use-admin-tool-by-slug.ts
│       │   │   ├── use-admin-tools.ts
│       │   │   ├── useFetchAuditLogs.ts
│       │   │   ├── useFetchPatients.ts
│       │   │   └── useFetchUsers.ts
│       │   └── views
│       │       ├── AdminToolsDetailView.vue
│       │       └── AdminToolsListView.vue
│       ├── import
│       │   ├── components
│       │   │   ├── CombinePdfs.vue
│       │   │   ├── __tests__
│       │   │   │   └── CombinePdfs.spec.ts
│       │   │   └── index.ts
│       │   ├── composables
│       │   │   ├── use-import-tool-by-slug.ts
│       │   │   └── use-user-tools.ts
│       │   └── views
│       │       ├── ImportToolsDetailView.vue
│       │       ├── ImportToolsListView.vue
│       │       └── __tests__
│       │           └── ImportToolsListView.spec.ts
│       └── shared
│           ├── composables
│           │   ├── index.ts
│           │   ├── pagination.config.ts
│           │   ├── use-icon-map.ts
│           │   ├── use-tool-by-slug-generic.ts
│           │   └── usePaginatedFetch.ts
│           ├── services
│           │   ├── static_openapi.json
│           │   └── tools-service.ts
│           ├── types.ts
│           ├── utils
│           │   └── slug-utils.ts
│           └── views
│               └── ToolsDetailView.vue
├── globals.d.ts
├── main.ts
├── shared
│   ├── api
│   │   ├── authorization-types.ts
│   │   └── types.ts
│   ├── composables
│   │   ├── use-authorization.ts
│   │   ├── use-session.ts
│   │   └── use-sso-authentication.ts
│   ├── services
│   │   ├── authorization-service.ts
│   │   ├── backend-api-service.ts
│   │   ├── backend-http-client-service.ts
│   │   ├── saas-api-service.ts
│   │   ├── saas-http-client-service.ts
│   │   └── sso-authentication-service.ts
│   └── types.ts
├── stores
│   ├── env-store.ts
│   └── tools-store.ts
├── test
│   └── setup.ts
└── views
    └── TempSsoDebugView.vue