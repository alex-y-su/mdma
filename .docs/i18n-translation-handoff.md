# i18n Translation Handoff Document

## Project Overview

This project is an MDM (Mobile Device Management) application that needs full internationalization (i18n) support with Russian translations. The i18n infrastructure is already set up using `i18next` and `react-i18next`.

**Repository:** `/Users/x0040h/projects/mdm`
**Framework:** React + TypeScript
**i18n Library:** i18next, react-i18next

## Current Progress

The following has been completed:
- i18n infrastructure setup (`frontend/i18n/config.ts`)
- Translation namespaces defined
- Partial translations for some components

## Translation File Locations

**Source (English):**
- `frontend/locales/en/*.json` - Development locale files
- `assets/locales/en/*.json` - Production locale files (copied from frontend)

**Target (Russian):**
- `frontend/locales/ru/*.json` - Development locale files
- `assets/locales/ru/*.json` - Production locale files (must sync with frontend)

**IMPORTANT:** When modifying translations, update BOTH `frontend/locales/` AND `assets/locales/` directories to keep them in sync.

## Namespaces (Translation Files)

| Namespace | File | Description |
|-----------|------|-------------|
| `common` | common.json | Buttons, labels, shared UI elements |
| `auth` | auth.json | Login, password, SSO, authentication |
| `forms` | forms.json | Validation messages, form labels |
| `dashboard` | dashboard.json | Dashboard-specific strings |
| `errors` | errors.json | Error messages |
| `hosts` | hosts.json | Host management pages |
| `labels` | labels.json | Label management pages |
| `policies` | policies.json | Policy management pages |
| `queries` | queries.json | Query management pages |
| `settings` | settings.json | Settings/Admin pages |
| `software` | software.json | Software management pages |

---

## Pages to Translate (Organized by Priority)

### Priority 1: Core Navigation & Common Components

**Files to translate:**
- `frontend/components/MainContent/MainContent.tsx` - Main navigation
- `frontend/components/SideNav/SideNav.tsx` - Side navigation menu
- `frontend/components/TeamsDropdown/TeamsDropdown.tsx` - Team selector
- `frontend/components/buttons/*.tsx` - All button components
- `frontend/components/Modal/*.tsx` - Modal base components

**Pattern:** Use `common` namespace for shared elements.

---

### Priority 2: Authentication Pages (auth namespace)

**Path:** `frontend/pages/`

| Page | Files |
|------|-------|
| LoginPage | `LoginPage/LoginPage.tsx`, `LoginPreviewPage.tsx` |
| ForgotPasswordPage | `ForgotPasswordPage/ForgotPasswordPage.tsx` |
| ResetPasswordPage | `ResetPasswordPage/ResetPasswordPage.tsx` |
| RegistrationPage | `RegistrationPage/RegistrationPage.tsx`, `Breadcrumbs/` |
| ConfirmInvitePage | `ConfirmInvitePage/ConfirmInvitePage.tsx` |
| ConfirmSSOInvitePage | `ConfirmSSOInvitePage/ConfirmSSOInvitePage.tsx` |
| MfaPage | `MfaPage/MfaPage.tsx` |
| LogoutPage | `LogoutPage/LogoutPage.tsx` |
| AccountPage | `AccountPage/AccountPage.tsx`, `AccountSidePanel/` |

---

### Priority 3: Dashboard Page (dashboard namespace)

**Path:** `frontend/pages/DashboardPage/`

| Component | Files |
|-----------|-------|
| Main Dashboard | `index.tsx` |
| Activity Feed | `cards/ActivityFeed/*.tsx` - All files |
| Host Count Card | `cards/HostCountCard/*.tsx` |
| Total Hosts | `cards/TotalHosts/TotalHosts.tsx` |
| Low Disk Space | `cards/LowDiskSpaceHosts/LowDiskSpaceHosts.tsx` |
| Missing Hosts | `cards/MissingHosts/MissingHosts.tsx` |
| Welcome Host | `cards/WelcomeHost/WelcomeHost.tsx` |
| Learn Fleet | `cards/LearnFleet/LearnFleet.tsx` |
| MDM Card | `cards/MDM/*.tsx` |
| Software Card | `cards/Software/*.tsx` |
| Munki Card | `cards/Munki/*.tsx` |
| Operating Systems | `cards/OperatingSystems/*.tsx` |
| Sections | `sections/MetricsHostCounts/`, `sections/PlatformHostCounts/` |
| Components | `components/InfoCard/`, `components/MdmSolutionModal/` |

---

### Priority 4: Hosts Pages (hosts namespace)

**Path:** `frontend/pages/hosts/`

| Section | Files |
|---------|-------|
| **Manage Hosts** | |
| Main Page | `ManageHostsPage/ManageHostsPage.tsx` |
| Table Config | `ManageHostsPage/HostTableConfig.tsx` |
| Filters | `ManageHostsPage/components/HostsFilterBlock/`, `LabelFilterSelect/`, `PoliciesFilter/`, `DiskEncryptionStatusFilter/`, `BootstrapPackageStatusFilter/` |
| Modals | `components/DeleteHostModal/`, `components/TransferHostModal/`, `ManageHostsPage/components/DeleteLabelModal/`, `RunScriptBatchModal/` |
| **Host Details** | |
| Main Page | `details/HostDetailsPage/HostDetailsPage.tsx` |
| Header | `details/cards/HostHeader/HostHeader.tsx` |
| Summary | `details/cards/HostSummary/HostSummary.tsx` |
| About | `details/cards/About/About.tsx` |
| Activity | `details/cards/Activity/*.tsx` - All activity items |
| Software | `details/cards/Software/HostSoftware.tsx`, `HostSoftwareTable/`, `HostSoftwareLibraryTable/` |
| Self Service | `details/cards/Software/SelfService/*.tsx` - All files |
| Policies | `details/cards/Policies/HostPolicies.tsx` |
| Labels | `details/cards/Labels/Labels.tsx` |
| Certificates | `details/cards/Certificates/*.tsx` |
| Queries | `details/cards/Queries/HostQueries.tsx` |
| Packs | `details/cards/Packs/*.tsx` |
| Local Users | `details/cards/LocalUserAccounts/*.tsx` |
| Munki Issues | `details/cards/MunkiIssues/*.tsx` |
| Agent Options | `details/cards/AgentOptions/*.tsx` |
| User | `details/cards/User/*.tsx` |
| Modals | `details/HostDetailsPage/*.tsx` - All modals (Lock, Unlock, Wipe, RunScript, etc.) |
| **Device User Page** | |
| Main | `details/DeviceUserPage/DeviceUserPage.tsx` |
| Components | All files in `details/DeviceUserPage/` |
| **OS Settings Modal** | |
| All files | `details/OSSettingsModal/*.tsx` |

---

### Priority 5: Labels Pages (labels namespace)

**Path:** `frontend/pages/labels/`

| Component | Files |
|-----------|-------|
| Manage Labels | `ManageLabelsPage/ManageLabelsPage.tsx`, `LabelsTable/` |
| New Label | `NewLabelPage/NewLabelPage.tsx` |
| Edit Label | `EditLabelPage/EditLabelPage.tsx` |
| Forms | `components/LabelForm/`, `components/ManualLabelForm/`, `components/DynamicLabelForm/` |
| Platform Field | `components/PlatformField/PlatformField.tsx` |

---

### Priority 6: Policies Pages (policies namespace)

**Path:** `frontend/pages/policies/`

| Component | Files |
|-----------|-------|
| Manage Policies | `ManagePoliciesPage/ManagePoliciesPage.tsx`, `PoliciesTable/` |
| Policy Page | `PolicyPage/PolicyPage.tsx`, `PolicyForm.tsx`, `PolicyResults.tsx` |
| Tables | `PolicyResultsTable/`, `PolicyErrorsTable/` |
| Modals | `CalendarEventsModal/`, `CalendarEventPreviewModal/`, `ConditionalAccessModal/`, `DeletePoliciesModal/`, `InstallSoftwareModal/`, `OtherWorkflowsModal/`, `PolicyRunScriptModal/`, `SaveNewPolicyModal/` |
| Components | `ExamplePayload/`, `ExampleTicket/`, `PassingColumnHeader/`, `PoliciesPaginatedList/` |

---

### Priority 7: Queries Pages (queries namespace)

**Path:** `frontend/pages/queries/`

| Component | Files |
|-----------|-------|
| Manage Queries | `ManageQueriesPage/ManageQueriesPage.tsx`, `QueriesTable/` |
| Query Details | `details/QueryDetailsPage/QueryDetailsPage.tsx`, `QueryReport/` |
| Edit Query | `edit/EditQueryPage.tsx`, `EditQueryForm/`, `QueryResults/` |
| Live Query | `live/LiveQueryPage/LiveQueryPage.tsx` |
| Modals | `DeleteQueryModal/`, `ManageQueryAutomationsModal/`, `PreviewDataModal/`, `ConfirmSaveChangesModal/`, `SaveNewQueryModal/`, `SaveAsNewQueryModal/` |

---

### Priority 8: Software Pages (software namespace)

**Path:** `frontend/pages/SoftwarePage/`

| Component | Files |
|-----------|-------|
| Main Page | `SoftwarePage.tsx` |
| Titles | `SoftwareTitles/SoftwareTitles.tsx`, `SoftwareTable/` |
| OS | `SoftwareOS/SoftwareOS.tsx`, `SoftwareOSTable/` |
| Vulnerabilities | `SoftwareVulnerabilities/*.tsx` |
| Add Software | `SoftwareAddPage/*.tsx` - All files including AppStore, CustomPackage, FleetMaintained |
| Title Details | `SoftwareTitleDetailsPage/*.tsx` - All files |
| OS Details | `SoftwareOSDetailsPage.tsx` |
| Version Details | `SoftwareVersionDetailsPage.tsx` |
| Vulnerability Details | `SoftwareVulnerabilityDetailsPage/*.tsx` |
| Forms | `components/forms/PackageForm/`, `SoftwareAndroidForm/`, `SoftwareVppForm/` |
| Cards | `components/cards/*.tsx` |
| Modals | `components/modals/*.tsx` - All modals |
| Tables | `components/tables/*.tsx` - All tables and cells |

---

### Priority 9: Manage Controls Pages (settings namespace)

**Path:** `frontend/pages/ManageControlsPage/`

| Section | Files |
|---------|-------|
| Main | `ManageControlsPage.tsx` |
| **OS Settings** | |
| Main | `OSSettings/OSSettings.tsx` |
| Custom Settings | `CustomSettings/*.tsx` - All files including ProfileUploader, modals |
| Disk Encryption | `DiskEncryption/*.tsx` |
| **OS Updates** | |
| Main | `OSUpdates/OSUpdates.tsx` |
| Components | `PlatformTabs/`, `CurrentVersionSection/`, `TargetSection/`, `OSVersionTable/` |
| Forms | `AppleOSTargetForm/`, `WindowsTargetForm/` |
| **Scripts** | |
| Main | `Scripts/Scripts.tsx` |
| Batch Details | `ScriptBatchDetailsPage/*.tsx` |
| Components | `ScriptLibrary/`, `ScriptListHeading/`, `ScriptListItem/`, `ScriptUploader/` |
| Modals | All script-related modals |
| **Secrets** | |
| Main | `Secrets/Secrets.tsx` |
| Modals | `AddSecretModal/`, `DeleteSecretModal/` |
| **Setup Experience** | |
| Main | `SetupExperience/SetupExperience.tsx` |
| Bootstrap Package | `BootstrapPackage/*.tsx` - All files |
| Setup Assistant | `SetupAssistant/*.tsx` - All files |
| Install Software | `InstallSoftware/*.tsx` - All files |
| End User Auth | `EndUserAuthentication/*.tsx` |
| Run Script | `RunScript/*.tsx` |

---

### Priority 10: Admin Pages (settings namespace)

**Path:** `frontend/pages/admin/`

| Section | Files |
|---------|-------|
| **User Management** | |
| Main | `UserManagementPage/UserManagementPage.tsx`, `UsersTable/` |
| Forms | `UserForm/`, `SelectRoleForm/`, `SelectedTeamsForm/` |
| Modals | All user modals (Add, Edit, Delete, ResetPassword, ResetSessions) |
| **Org Settings** | |
| Main | `OrgSettingsPage/OrgSettingsPage.tsx` |
| Cards | `Info/`, `WebAddress/`, `Smtp/`, `Statistics/`, `Agents/`, `FleetDesktop/`, `Advanced/` |
| **Team Management** | |
| Main | `TeamManagementPage/TeamManagementPage.tsx` |
| Settings | `TeamSettings/*.tsx` |
| Users | `UsersPage/*.tsx` |
| Agent Options | `AgentOptionsPage/*.tsx` |
| **Integrations** | |
| Main | `IntegrationsPage/IntegrationsPage.tsx` |
| Cards | `Integrations/`, `Sso/`, `IdentityProviders/`, `Calendars/`, `ChangeManagement/`, `ConditionalAccess/`, `GlobalHostStatusWebhook/` |
| **MDM Settings** | |
| Apple MDM | `MdmSettings/AppleMdmPage/*.tsx` |
| Android MDM | `MdmSettings/AndroidMdmPage/*.tsx` |
| Windows MDM | `MdmSettings/WindowsMdmPage/*.tsx` |
| VPP | `MdmSettings/VppPage/*.tsx` |
| ABM | `MdmSettings/AppleBusinessManagerPage/*.tsx` |
| Certificate Authorities | `MdmSettings/CertificateAuthorities/*.tsx` - All forms and components |
| Sections | All MdmSettings sections and cards |

---

### Priority 11: Packs Pages (queries namespace)

**Path:** `frontend/pages/packs/`

| Component | Files |
|-----------|-------|
| Manage Packs | `ManagePacksPage/ManagePacksPage.tsx`, `PacksTable/` |
| Edit Pack | `EditPackPage/EditPackPage.tsx` |
| Pack Composer | `PackComposerPage/PackComposerPage.tsx` |
| Modals | `DeletePackModal/`, `PackQueryEditorModal/`, `RemovePackQueryModal/` |

---

### Priority 12: Error Pages (errors namespace)

**Path:** `frontend/pages/errors/`

| Page | File |
|------|------|
| 403 | `Fleet403/Fleet403.tsx` |
| 404 | `Fleet404/Fleet404.tsx` |
| 500 | `Fleet500/Fleet500.tsx` |

---

## Implementation Pattern

### Step 1: Add Translation Hook
```tsx
import { useTranslation } from "react-i18next";

const MyComponent = () => {
  const { t } = useTranslation("namespace"); // e.g., "hosts", "dashboard"

  return <div>{t("key.path")}</div>;
};
```

### Step 2: Add English Translations
Add keys to `frontend/locales/en/<namespace>.json`:
```json
{
  "key": {
    "path": "English text"
  }
}
```

### Step 3: Add Russian Translations
Add keys to `frontend/locales/ru/<namespace>.json`:
```json
{
  "key": {
    "path": "Русский текст"
  }
}
```

### Step 4: Sync to Assets
Copy updated files to `assets/locales/` for both languages.

### Interpolation
For dynamic values:
```tsx
t("message", { count: 5, name: "John" })
```
```json
{
  "message": "Found {{count}} items for {{name}}"
}
```

### Plurals
```json
{
  "items": "{{count}} item",
  "items_plural": "{{count}} items"
}
```

---

## Agent Prompt Templates

### Template for Each Page Translation Task

```
## Task: Translate [PAGE_NAME] to Russian

### Context
You are working on translating the MDM application frontend to Russian. The i18n infrastructure is already set up.

### Files to Modify
1. Page component: `frontend/pages/[PATH]/[Component].tsx`
2. English translations: `frontend/locales/en/[namespace].json`
3. Russian translations: `frontend/locales/ru/[namespace].json`
4. Assets (sync): `assets/locales/en/[namespace].json` and `assets/locales/ru/[namespace].json`

### Instructions
1. Read the page component file
2. Identify all hardcoded strings (titles, labels, buttons, messages, tooltips, placeholders)
3. Add `useTranslation` hook if not present
4. Replace hardcoded strings with `t("key.path")` calls
5. Add corresponding keys to English translation file
6. Add Russian translations to Russian translation file
7. Sync both translation files to assets/locales/

### Quality Requirements
- Use descriptive, hierarchical key names
- Keep translations contextually accurate
- Maintain consistent terminology across the app
- Preserve all interpolation variables
- Test that no hardcoded strings remain

### Example
Before:
```tsx
<h1>Host Details</h1>
<p>Last seen: {lastSeen}</p>
```

After:
```tsx
const { t } = useTranslation("hosts");
// ...
<h1>{t("details.title")}</h1>
<p>{t("details.lastSeen", { time: lastSeen })}</p>
```

Translation files:
```json
// en/hosts.json
{ "details": { "title": "Host Details", "lastSeen": "Last seen: {{time}}" } }

// ru/hosts.json
{ "details": { "title": "Сведения о хосте", "lastSeen": "Последняя активность: {{time}}" } }
```
```

---

## Batch Task Prompts for Cloud Agents

### Batch 1: Authentication & Account Pages
```
Translate all authentication pages to Russian:
- LoginPage, ForgotPasswordPage, ResetPasswordPage
- RegistrationPage, ConfirmInvitePage, ConfirmSSOInvitePage
- MfaPage, LogoutPage, AccountPage

Use "auth" namespace. Files are in frontend/pages/.
```

### Batch 2: Dashboard Components
```
Translate all Dashboard page components to Russian:
- Main Dashboard index.tsx
- All cards in cards/ directory
- All sections in sections/ directory
- All components in components/ directory

Use "dashboard" namespace. Files are in frontend/pages/DashboardPage/.
```

### Batch 3: Hosts - Management
```
Translate Hosts management pages to Russian:
- ManageHostsPage and all filters
- DeleteHostModal, TransferHostModal
- RunScriptBatchModal
- All table configs

Use "hosts" namespace. Files are in frontend/pages/hosts/ManageHostsPage/.
```

### Batch 4: Hosts - Details
```
Translate Host details pages to Russian:
- HostDetailsPage main component
- All cards: About, Activity, Software, Policies, Queries, etc.
- All modals: Lock, Unlock, Wipe, RunScript, etc.

Use "hosts" namespace. Files are in frontend/pages/hosts/details/.
```

### Batch 5: Labels Pages
```
Translate all Labels pages to Russian:
- ManageLabelsPage, NewLabelPage, EditLabelPage
- LabelForm, ManualLabelForm, DynamicLabelForm
- LabelsTable

Use "labels" namespace. Files are in frontend/pages/labels/.
```

### Batch 6: Policies Pages
```
Translate all Policies pages to Russian:
- ManagePoliciesPage, PolicyPage
- PolicyForm, PolicyResults, all tables
- All modals

Use "policies" namespace. Files are in frontend/pages/policies/.
```

### Batch 7: Queries Pages
```
Translate all Queries pages to Russian:
- ManageQueriesPage, QueryDetailsPage
- EditQueryPage, LiveQueryPage
- All forms and modals

Use "queries" namespace. Files are in frontend/pages/queries/.
```

### Batch 8: Software Pages
```
Translate all Software pages to Russian:
- SoftwarePage main, all sub-pages
- SoftwareAddPage and all add methods
- SoftwareTitleDetailsPage
- All forms, modals, tables

Use "software" namespace. Files are in frontend/pages/SoftwarePage/.
```

### Batch 9: Manage Controls Pages
```
Translate all Manage Controls pages to Russian:
- OSSettings, OSUpdates sections
- Scripts, Secrets sections
- SetupExperience section
- All forms, modals, components

Use "settings" namespace. Files are in frontend/pages/ManageControlsPage/.
```

### Batch 10: Admin Pages
```
Translate all Admin pages to Russian:
- UserManagementPage, OrgSettingsPage
- TeamManagementPage, IntegrationsPage
- All MDM settings pages
- All forms, modals, tables

Use "settings" namespace. Files are in frontend/pages/admin/.
```

### Batch 11: Packs & Error Pages
```
Translate Packs and Error pages to Russian:
- ManagePacksPage, EditPackPage, PackComposerPage
- Fleet403, Fleet404, Fleet500

Use "queries" namespace for packs, "errors" namespace for error pages.
Files are in frontend/pages/packs/ and frontend/pages/errors/.
```

---

## Notes for Agents

1. **Always read the file first** before making changes
2. **Check existing translations** in the namespace before adding new keys
3. **Use consistent terminology** - check existing Russian translations for common terms
4. **Don't translate technical terms** that should remain in English (API, URL, UUID, etc.)
5. **Preserve JSX structure** - only replace string content
6. **Test interpolation** - ensure variables are correctly placed in Russian translations
7. **Sync both locations** - frontend/locales AND assets/locales

## Common Russian Translations Reference

| English | Russian |
|---------|---------|
| Host | Хост |
| Device | Устройство |
| Team | Команда |
| User | Пользователь |
| Policy | Политика |
| Query | Запрос |
| Software | Программное обеспечение |
| Settings | Настройки |
| Save | Сохранить |
| Cancel | Отмена |
| Delete | Удалить |
| Edit | Редактировать |
| Add | Добавить |
| Search | Поиск |
| Filter | Фильтр |
| Status | Статус |
| Online | Онлайн |
| Offline | Офлайн |
| Error | Ошибка |
| Success | Успешно |
| Loading | Загрузка |
| No results | Нет результатов |
