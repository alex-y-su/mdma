# i18n Internationalization Handoff Document

## Current Status
**Phase 1 (Dashboard) - COMPLETED**
**Phase 2 (Hosts Pages) - IN PROGRESS**
Phases 3-8 - PENDING

## Overview
Adding i18n (internationalization) support with Russian translations to the Fleet frontend application using `react-i18next`.

## Completed Work

### Phase 1: Dashboard Page (~15 strings) - DONE
Files modified:
- `frontend/locales/en/dashboard.json` - Added translation keys
- `frontend/locales/ru/dashboard.json` - Added Russian translations
- `frontend/pages/DashboardPage/cards/LowDiskSpaceHosts/LowDiskSpaceHosts.tsx`
- `frontend/pages/DashboardPage/cards/MissingHosts/MissingHosts.tsx`
- `frontend/pages/DashboardPage/components/ActivityFeedAutomationsModal/ActivityFeedAutomationsModal.tsx`
- `frontend/pages/DashboardPage/cards/ActivityFeed/ActivityFeed.tsx`
- `frontend/pages/DashboardPage/cards/Munki/Munki.tsx`
- `frontend/pages/DashboardPage/cards/OperatingSystems/OSTable.tsx`

### Other Prior Work
- Added "labels" namespace to `frontend/i18n/config.ts`
- Created `frontend/locales/en/labels.json` and `frontend/locales/ru/labels.json`
- Updated various label-related pages with translations

## Remaining Phases

### Phase 2: Hosts Pages (~80 strings) - IN PROGRESS
**Completed files:**
- `frontend/pages/hosts/components/DeleteHostModal/DeleteHostModal.tsx` ✓
- `frontend/pages/hosts/components/TransferHostModal/TransferHostModal.tsx` ✓
- `frontend/pages/hosts/details/cards/About/About.tsx` ✓
- `frontend/pages/hosts/details/cards/Activity/Activity.tsx` ✓
- `frontend/pages/hosts/details/cards/Policies/HostPolicies.tsx` ✓
- `frontend/pages/hosts/details/cards/Queries/HostQueries.tsx` ✓
- `frontend/pages/hosts/details/cards/LocalUserAccounts/LocalUserAccounts.tsx` ✓
- `frontend/pages/hosts/details/cards/MunkiIssues/MunkiIssues.tsx` ✓

**Remaining files to modify:**
- `frontend/pages/hosts/ManageHostsPage/components/RunScriptBatchModal/RunScriptBatchModal.tsx`
- `frontend/pages/hosts/ManageHostsPage/components/HostsFilterBlock/HostsFilterBlock.tsx`
- `frontend/pages/hosts/details/HostDetailsPage/HostDetailsPage.tsx`
- `frontend/pages/hosts/details/cards/Software/` (multiple files)
- `frontend/pages/hosts/details/cards/Labels/Labels.tsx`

### Phase 3: Queries Pages (~35 strings)
**Files to modify:**
- `frontend/pages/queries/edit/components/EditQueryForm/EditQueryForm.tsx`
- `frontend/pages/queries/edit/components/SaveNewQueryModal/SaveNewQueryModal.tsx`
- `frontend/pages/queries/ManageQueriesPage/components/DeleteQueryModal/DeleteQueryModal.tsx`
- `frontend/pages/queries/details/components/QueryReport/QueryReport.tsx`
- `frontend/pages/queries/live/screens/RunQuery.tsx`

### Phase 4: Packs Pages (~20 strings) - NEW NAMESPACE NEEDED
Create `frontend/locales/en/packs.json` and `frontend/locales/ru/packs.json`
**Files to modify:**
- `frontend/pages/packs/ManagePacksPage/components/DeletePackModal/DeletePackModal.tsx`
- `frontend/pages/packs/EditPackPage/EditPackPage.tsx`
- `frontend/pages/packs/PackComposerPage/PackComposerPage.tsx`

### Phase 5: Admin Pages (~100 strings) - NEW NAMESPACE NEEDED
Create `frontend/locales/en/admin.json` and `frontend/locales/ru/admin.json`
**Files to modify:**
- `frontend/pages/admin/UserManagementPage/` (multiple files)
- `frontend/pages/admin/TeamManagementPage/` (multiple files)
- `frontend/pages/admin/IntegrationsPage/` (multiple files)
- `frontend/pages/admin/OrgSettingsPage/` (multiple files)

### Phase 6: Account Page (~15 strings) - NEW NAMESPACE NEEDED
Create `frontend/locales/en/account.json` and `frontend/locales/ru/account.json`
**Files to modify:**
- `frontend/pages/AccountPage/AccountPage.tsx`

### Phase 7: Auth Pages (~10 strings)
**Files to modify:**
- `frontend/pages/RegistrationPage/RegistrationPage.tsx`
- `frontend/pages/LoginPage/LoginPage.tsx`
- `frontend/pages/ForgotPasswordPage/ForgotPasswordPage.tsx`
- `frontend/pages/ResetPasswordPage/ResetPasswordPage.tsx`

### Phase 8: Policies Pages (~10 strings)
**Files to modify:**
- `frontend/pages/policies/ManagePoliciesPage/ManagePoliciesPage.tsx`
- `frontend/pages/policies/PolicyPage/` (remaining hardcoded strings)

## Implementation Pattern

For each component:
1. Import `useTranslation` hook:
   ```typescript
   import { useTranslation } from "react-i18next";
   ```

2. Initialize in component:
   ```typescript
   const { t } = useTranslation();
   ```

3. Replace hardcoded strings:
   ```typescript
   // Before
   title="Missing hosts"

   // After
   title={t("dashboard:missingHosts.title")}
   ```

4. For interpolation:
   ```typescript
   // JSON: "tooltip": "Hosts with {{gb}} GB available"
   t("dashboard:lowDiskSpace.tooltip", { gb: lowDiskSpaceGb })
   ```

## Existing Namespaces
- `auth.json` - Authentication
- `common.json` - Common UI elements (buttons, navigation, time)
- `dashboard.json` - Dashboard page
- `errors.json` - Error messages
- `forms.json` - Form validation
- `hosts.json` - Hosts page
- `labels.json` - Labels management
- `policies.json` - Policies management
- `queries.json` - Query management
- `settings.json` - Settings pages
- `software.json` - Software management

## New Namespaces to Create
- `packs.json` - Packs management (Phase 4)
- `admin.json` - Admin pages (Phase 5)
- `account.json` - Account/profile pages (Phase 6)

## Full Plan Reference
See `/Users/x0040h/.claude/plans/inherited-booping-torvalds.md` for detailed breakdown of all strings.

## Estimated Total: ~285 strings across 8 phases
