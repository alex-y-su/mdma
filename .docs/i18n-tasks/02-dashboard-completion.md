# Task: Complete Dashboard Page i18n (dashboard namespace)

## Overview
Finish translating remaining dashboard components to Russian. Many dashboard components are already done.

## Project Context
- **Repository:** MDM application (React + TypeScript)
- **i18n Library:** i18next, react-i18next
- **Target Language:** Russian (ru)
- **Namespace:** `dashboard`

## File Locations
- **English translations:** `frontend/locales/en/dashboard.json` AND `assets/locales/en/dashboard.json`
- **Russian translations:** `frontend/locales/ru/dashboard.json` AND `assets/locales/ru/dashboard.json`

**IMPORTANT:** Always update BOTH `frontend/locales/` AND `assets/locales/` to keep them in sync.

---

## Already Completed (DO NOT MODIFY)
- `frontend/pages/DashboardPage/DashboardPage.tsx`
- `frontend/pages/DashboardPage/cards/ActivityFeed/ActivityFeed.tsx`
- `frontend/pages/DashboardPage/cards/ActivityFeed/components/ActivityFeedFilters/ActivityFeedFilters.tsx`
- `frontend/pages/DashboardPage/cards/ActivityFeed/components/ActivityTypeDropdown/ActivityTypeDropdown.tsx`
- `frontend/pages/DashboardPage/components/ActivityFeedAutomationsModal/ActivityFeedAutomationsModal.tsx`
- `frontend/pages/DashboardPage/cards/LowDiskSpaceHosts/LowDiskSpaceHosts.tsx`
- `frontend/pages/DashboardPage/cards/MissingHosts/MissingHosts.tsx`
- `frontend/pages/DashboardPage/cards/TotalHosts/TotalHosts.tsx`
- `frontend/pages/DashboardPage/cards/WelcomeHost/WelcomeHost.tsx`
- `frontend/pages/DashboardPage/cards/Software/Software.tsx`
- `frontend/pages/DashboardPage/cards/MDM/MDM.tsx`
- `frontend/pages/DashboardPage/cards/Munki/Munki.tsx`
- `frontend/pages/DashboardPage/cards/OperatingSystems/OSTable.tsx`
- `frontend/pages/DashboardPage/cards/LearnFleet/LearnFleet.tsx`

---

## Components to Translate

### 1. HostCountCard
**File:** `frontend/pages/DashboardPage/cards/HostCountCard/HostCountCard.tsx`

### 2. MdmSolutionModal
**Files:**
- `frontend/pages/DashboardPage/components/MdmSolutionModal/MdmSolutionModal.tsx`
- `frontend/pages/DashboardPage/components/MdmSolutionModal/MdmSolutionModalTableConfig.tsx`

### 3. InfoCard
**File:** `frontend/pages/DashboardPage/components/InfoCard/InfoCard.tsx`

### 4. Activity Feed - GlobalActivityItem
**File:** `frontend/pages/DashboardPage/cards/ActivityFeed/GlobalActivityItem/GlobalActivityItem.tsx`

### 5. Activity Feed - Detail Modals
**Files:**
- `frontend/pages/DashboardPage/cards/ActivityFeed/components/ActivityAutomationDetailsModal/ActivityAutomationDetailsModal.tsx`
- `frontend/pages/DashboardPage/cards/ActivityFeed/components/AppStoreDetailsModal/AppStoreDetailsModal.tsx`
- `frontend/pages/DashboardPage/cards/ActivityFeed/components/LibrarySoftwareDetailsModal/LibrarySoftwareDetailsModal.tsx`
- `frontend/pages/DashboardPage/cards/ActivityFeed/components/RunScriptDetailsModal/RunScriptDetailsModal.tsx`
- `frontend/pages/DashboardPage/cards/ActivityFeed/components/ScriptBatchHostCountCell/ScriptBatchHostCountCell.tsx`

### 6. Dashboard Sections
**Files:**
- `frontend/pages/DashboardPage/sections/MetricsHostCounts/MetricsHostCounts.tsx`
- `frontend/pages/DashboardPage/sections/PlatformHostCounts/PlatformHostCounts.tsx`

### 7. MDM Table Configs
**Files:**
- `frontend/pages/DashboardPage/cards/MDM/MDMSolutionsTableConfig.tsx`
- `frontend/pages/DashboardPage/cards/MDM/MDMStatusTableConfig.tsx`

### 8. Software Table Config
**File:** `frontend/pages/DashboardPage/cards/Software/SoftwareTableConfig.tsx`

### 9. Munki Table Configs
**Files:**
- `frontend/pages/DashboardPage/cards/Munki/MunkiIssuesTableConfig.tsx`
- `frontend/pages/DashboardPage/cards/Munki/MunkiVersionsTableConfig.tsx`

### 10. Operating Systems Components
**Files:**
- `frontend/pages/DashboardPage/cards/OperatingSystems/OperatingSystems.tsx`
- `frontend/pages/DashboardPage/cards/OperatingSystems/OSTableConfig.tsx`

---

## Implementation Pattern

```tsx
import { useTranslation } from "react-i18next";

const MyComponent = () => {
  const { t } = useTranslation("dashboard");

  return (
    <div>
      <h2>{t("cards.hostCount")}</h2>
      <p>{t("activity.detailsModal.title")}</p>
    </div>
  );
};
```

---

## Suggested Translation Key Structure

```json
{
  "hostCountCard": {
    "title": "Host count",
    "online": "Online",
    "offline": "Offline"
  },
  "mdmSolutionModal": {
    "title": "MDM solution details",
    "columns": {
      "name": "Name",
      "hosts": "Hosts"
    }
  },
  "activityDetails": {
    "automationModal": {
      "title": "Automation details"
    },
    "appStoreModal": {
      "title": "App Store details"
    },
    "librarySoftwareModal": {
      "title": "Library software details"
    },
    "runScriptModal": {
      "title": "Run script details"
    }
  },
  "sections": {
    "metricsHostCounts": {
      "title": "Host metrics"
    },
    "platformHostCounts": {
      "title": "Hosts by platform"
    }
  }
}
```

---

## Russian Translation Reference
| English | Russian |
|---------|---------|
| Host count | Количество хостов |
| Online | Онлайн |
| Offline | Офлайн |
| MDM solution | MDM-решение |
| Automation details | Детали автоматизации |
| App Store | App Store |
| Library software | Библиотека ПО |
| Run script | Запуск скрипта |
| Script details | Детали скрипта |
| Hosts by platform | Хосты по платформам |
| Host metrics | Метрики хостов |
| Operating systems | Операционные системы |
| Munki issues | Проблемы Munki |
| Munki versions | Версии Munki |

---

## Quality Checklist
- [ ] All hardcoded strings replaced with `t()` calls
- [ ] Translation keys follow existing dashboard.json structure
- [ ] English translations added
- [ ] Russian translations added
- [ ] Both files synced to `assets/locales/`
- [ ] Table column headers translated
- [ ] Modal titles and content translated
- [ ] Tooltips translated
