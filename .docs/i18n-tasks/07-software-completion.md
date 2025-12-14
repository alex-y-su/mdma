# Task: Complete Software Pages i18n (software namespace)

## Overview
Finish translating remaining software pages to Russian. Some software components are already done.

## Project Context
- **Repository:** MDM application (React + TypeScript)
- **i18n Library:** i18next, react-i18next
- **Target Language:** Russian (ru)
- **Namespace:** `software`

## File Locations
- **English translations:** `frontend/locales/en/software.json` AND `assets/locales/en/software.json`
- **Russian translations:** `frontend/locales/ru/software.json` AND `assets/locales/ru/software.json`

**IMPORTANT:** Always update BOTH `frontend/locales/` AND `assets/locales/` to keep them in sync.

---

## Already Completed (DO NOT MODIFY)
- `frontend/pages/SoftwarePage/SoftwarePage.tsx`
- `frontend/pages/SoftwarePage/SoftwareAddPage/SoftwareAddPage.tsx`
- `frontend/pages/SoftwarePage/SoftwareTitles/SoftwareTable/SoftwareTable.tsx`
- `frontend/pages/SoftwarePage/SoftwareTitleDetailsPage/DeleteSoftwareModal/DeleteSoftwareModal.tsx`
- `frontend/pages/SoftwarePage/SoftwareTitleDetailsPage/EditSoftwareModal/EditSoftwareModal.tsx`
- `frontend/pages/SoftwarePage/SoftwareTitleDetailsPage/EditIconModal/EditIconModal.tsx`

---

## Components to Translate

### Section 1: Software Titles
**Files:**
- `frontend/pages/SoftwarePage/SoftwareTitles/SoftwareTitles.tsx`
- `frontend/pages/SoftwarePage/SoftwareTitles/SoftwareTable/SoftwareTitlesTableConfig.tsx`
- `frontend/pages/SoftwarePage/SoftwareTitles/SoftwareTable/SoftwareVersionsTableConfig.tsx`

### Section 2: Software OS
**Files:**
- `frontend/pages/SoftwarePage/SoftwareOS/SoftwareOS.tsx`
- `frontend/pages/SoftwarePage/SoftwareOS/SoftwareOSTable/SoftwareOSTable.tsx`

### Section 3: Software Vulnerabilities
**Files:**
- `frontend/pages/SoftwarePage/SoftwareVulnerabilities/SoftwareVulnerabilities.tsx`
- `frontend/pages/SoftwarePage/SoftwareVulnerabilities/SoftwareVulnerabilitiesTable/SoftwareVulnerabilitiesTable.tsx`
- `frontend/pages/SoftwarePage/SoftwareVulnerabilities/SoftwareVulnerabilitiesTable/SoftwareVulnerabilitiesTableConfig.tsx`

### Section 4: Software Add Pages
**Files:**
- `frontend/pages/SoftwarePage/SoftwareAddPage/SoftwareAppStore/SoftwareAppStore.tsx`
- `frontend/pages/SoftwarePage/SoftwareAddPage/SoftwareAppStore/helpers.tsx`
- `frontend/pages/SoftwarePage/SoftwareAddPage/SoftwareAppStoreAndroid/SoftwareAppStoreAndroid.tsx`
- `frontend/pages/SoftwarePage/SoftwareAddPage/SoftwareAppStoreVpp/SoftwareAppStoreVpp.tsx`
- `frontend/pages/SoftwarePage/SoftwareAddPage/SoftwareCustomPackage/SoftwareCustomPackage.tsx`
- `frontend/pages/SoftwarePage/SoftwareAddPage/SoftwareFleetMaintained/SoftwareFleetMaintained.tsx`
- `frontend/pages/SoftwarePage/SoftwareAddPage/SoftwareFleetMaintained/FleetMaintainedAppDetailsPage/FleetMaintainedAppDetailsPage.tsx`
- `frontend/pages/SoftwarePage/SoftwareAddPage/SoftwareFleetMaintained/FleetMaintainedAppsTable/FleetMaintainedAppsTable.tsx`
- `frontend/pages/SoftwarePage/SoftwareAddPage/SoftwareFleetMaintained/FleetMaintainedAppsTable/FleetMaintainedAppsTableConfig.tsx`
- `frontend/pages/SoftwarePage/SoftwareAddPage/SoftwareFleetMaintained/FleetAppDetailsModal/FleetAppDetailsModal.tsx`
- `frontend/pages/SoftwarePage/SoftwareAddPage/SoftwareFleetMaintained/FleetAppDetailsForm/FleetAppDetailsForm.tsx`
- `frontend/pages/SoftwarePage/SoftwareAddPage/SoftwareFleetMaintained/FleetAppDetailsForm/helpers.tsx`
- `frontend/pages/SoftwarePage/SoftwareAddPage/SoftwareFleetMaintained/AddFleetAppSoftwareModal/AddFleetAppSoftwareModal.tsx`

### Section 5: Software Title Details Page
**Files:**
- `frontend/pages/SoftwarePage/SoftwareTitleDetailsPage/SoftwareTitleDetailsPage.tsx`
- `frontend/pages/SoftwarePage/SoftwareTitleDetailsPage/SoftwareSummaryCard/SoftwareSummaryCard.tsx`
- `frontend/pages/SoftwarePage/SoftwareTitleDetailsPage/SoftwareSummaryCard/TitleVersionsTable/TitleVersionsTable.tsx`
- `frontend/pages/SoftwarePage/SoftwareTitleDetailsPage/SoftwareSummaryCard/TitleVersionsTable/TitleVersionsTableConfig.tsx`
- `frontend/pages/SoftwarePage/SoftwareTitleDetailsPage/SoftwareInstallerCard/SoftwareInstallerCard.tsx`
- `frontend/pages/SoftwarePage/SoftwareTitleDetailsPage/SoftwareInstallerCard/InstallerDetailsWidget/InstallerDetailsWidget.tsx`
- `frontend/pages/SoftwarePage/SoftwareTitleDetailsPage/SoftwareInstallerCard/InstallerStatusTable/InstallerStatusTable.tsx`
- `frontend/pages/SoftwarePage/SoftwareTitleDetailsPage/SoftwareInstallerCard/InstallerStatusTable/InstallerStatusTableConfig.tsx`
- `frontend/pages/SoftwarePage/SoftwareTitleDetailsPage/SoftwareInstallerCard/InstallerPoliciesTable/InstallerPoliciesTable.tsx`
- `frontend/pages/SoftwarePage/SoftwareTitleDetailsPage/SoftwareInstallerCard/InstallerPoliciesTable/InstallerPoliciesTableConfig.tsx`
- `frontend/pages/SoftwarePage/SoftwareTitleDetailsPage/AdvancedOptionsModal/AdvancedOptionsModal.tsx`
- `frontend/pages/SoftwarePage/SoftwareTitleDetailsPage/ConfirmSaveChangesModal/ConfirmSaveChangesModal.tsx`
- `frontend/pages/SoftwarePage/SoftwareTitleDetailsPage/ViewYamlModal/ViewYamlModal.tsx`

### Section 6: Other Details Pages
**Files:**
- `frontend/pages/SoftwarePage/SoftwareOSDetailsPage/SoftwareOSDetailsPage.tsx`
- `frontend/pages/SoftwarePage/SoftwareVersionDetailsPage/SoftwareVersionDetailsPage.tsx`
- `frontend/pages/SoftwarePage/SoftwareVulnerabilityDetailsPage/SoftwareVulnerabilityDetailsPage.tsx`
- `frontend/pages/SoftwarePage/SoftwareVulnerabilityDetailsPage/SoftwareVulnSummary/SoftwareVulnSummary.tsx`
- `frontend/pages/SoftwarePage/SoftwareVulnerabilityDetailsPage/SoftwareVulnOSVersions/SoftwareVulnOSVersions.tsx`
- `frontend/pages/SoftwarePage/SoftwareVulnerabilityDetailsPage/SoftwareVulnSoftwareVersions/SoftwareVulnSoftwareVersions.tsx`

### Section 7: Forms
**Files:**
- `frontend/pages/SoftwarePage/components/forms/PackageForm/PackageForm.tsx`
- `frontend/pages/SoftwarePage/components/forms/PackageForm/helpers.tsx`
- `frontend/pages/SoftwarePage/components/forms/PackageAdvancedOptions/PackageAdvancedOptions.tsx`
- `frontend/pages/SoftwarePage/components/forms/AdvancedOptionsFields/AdvancedOptionsFields.tsx`
- `frontend/pages/SoftwarePage/components/forms/SoftwareAndroidForm/SoftwareAndroidForm.tsx`
- `frontend/pages/SoftwarePage/components/forms/SoftwareVppForm/SoftwareVppForm.tsx`
- `frontend/pages/SoftwarePage/components/forms/SoftwareOptionsSelector/SoftwareOptionsSelector.tsx`

### Section 8: Cards
**Files:**
- `frontend/pages/SoftwarePage/components/cards/SoftwareDetailsSummary/SoftwareDetailsSummary.tsx`
- `frontend/pages/SoftwarePage/components/cards/DetailsNoHosts/DetailsNoHosts.tsx`

### Section 9: Modals
**Files:**
- `frontend/pages/SoftwarePage/components/modals/AddSoftwareModal/AddSoftwareModal.tsx`
- `frontend/pages/SoftwarePage/components/modals/SoftwareFiltersModal/SoftwareFiltersModal.tsx`
- `frontend/pages/SoftwarePage/components/modals/ManageSoftwareAutomationsModal/ManageSoftwareAutomationsModal.tsx`
- `frontend/pages/SoftwarePage/components/modals/CategoriesEndUserExperienceModal/CategoriesEndUserExperienceModal.tsx`
- `frontend/pages/SoftwarePage/components/modals/PreviewPayloadModal/PreviewPayloadModal.tsx`
- `frontend/pages/SoftwarePage/components/modals/PreviewTicketModal/PreviewTicketModal.tsx`

### Section 10: Tables & Cells
**Files:**
- `frontend/pages/SoftwarePage/components/tables/EmptySoftwareTable/EmptySoftwareTable.tsx`
- `frontend/pages/SoftwarePage/components/tables/SoftwareVulnerabilitiesTable/SoftwareVulnerabilitiesTable.tsx`
- `frontend/pages/SoftwarePage/components/tables/OSKernelsTable/OSKernelsTable.tsx`
- `frontend/pages/SoftwarePage/components/cells/HashCell/HashCell.tsx`
- `frontend/pages/SoftwarePage/components/cells/IconCell/IconCell.tsx`
- `frontend/pages/SoftwarePage/components/cells/InstalledPathCell/InstalledPathCell.tsx`
- `frontend/pages/SoftwarePage/components/cells/VersionCell/VersionCell.tsx`
- `frontend/pages/SoftwarePage/components/cells/VulnerabilitiesCell/VulnerabilitiesCell.tsx`

---

## Implementation Pattern

```tsx
import { useTranslation } from "react-i18next";

const SoftwareTitles = () => {
  const { t } = useTranslation("software");

  return (
    <div>
      <h1>{t("titles.title")}</h1>
      <p>{t("titles.description")}</p>
    </div>
  );
};
```

---

## Additional Translation Keys Needed

```json
{
  "titles": {
    "title": "Software titles",
    "description": "View and manage software across your fleet"
  },
  "os": {
    "title": "Operating systems",
    "description": "View operating systems installed on your hosts"
  },
  "addPages": {
    "appStore": {
      "title": "App Store",
      "searchPlaceholder": "Search App Store",
      "noResults": "No apps found"
    },
    "customPackage": {
      "title": "Custom package",
      "uploadLabel": "Upload package",
      "supportedFormats": "Supported formats: .pkg, .msi, .deb, .rpm, .exe"
    },
    "fleetMaintained": {
      "title": "Fleet-maintained apps",
      "description": "Pre-configured apps maintained by Fleet"
    }
  },
  "detailsPage": {
    "summary": {
      "title": "Summary",
      "versions": "Versions",
      "hosts": "Hosts"
    },
    "installer": {
      "title": "Installer",
      "details": "Details",
      "status": "Status",
      "policies": "Policies"
    }
  },
  "forms": {
    "package": {
      "name": "Name",
      "version": "Version",
      "selfService": "Self-service",
      "preInstallQuery": "Pre-install query",
      "installScript": "Install script",
      "postInstallScript": "Post-install script",
      "uninstallScript": "Uninstall script"
    },
    "advancedOptions": {
      "title": "Advanced options",
      "preInstallQuery": "Pre-install query",
      "installScript": "Install script",
      "postInstallScript": "Post-install script"
    }
  },
  "automations": {
    "title": "Software automations",
    "vulnerabilities": "Vulnerability automations",
    "webhook": "Webhook",
    "integration": "Integration"
  }
}
```

---

## Russian Translations (additional keys)

```json
{
  "titles": {
    "title": "Программное обеспечение",
    "description": "Просмотр и управление ПО на всех хостах"
  },
  "os": {
    "title": "Операционные системы",
    "description": "Просмотр операционных систем, установленных на хостах"
  },
  "addPages": {
    "appStore": {
      "title": "App Store",
      "searchPlaceholder": "Поиск в App Store",
      "noResults": "Приложения не найдены"
    },
    "customPackage": {
      "title": "Пользовательский пакет",
      "uploadLabel": "Загрузить пакет",
      "supportedFormats": "Поддерживаемые форматы: .pkg, .msi, .deb, .rpm, .exe"
    },
    "fleetMaintained": {
      "title": "Приложения от Fleet",
      "description": "Предварительно настроенные приложения, поддерживаемые Fleet"
    }
  },
  "detailsPage": {
    "summary": {
      "title": "Сводка",
      "versions": "Версии",
      "hosts": "Хосты"
    },
    "installer": {
      "title": "Установщик",
      "details": "Детали",
      "status": "Статус",
      "policies": "Политики"
    }
  },
  "forms": {
    "package": {
      "name": "Название",
      "version": "Версия",
      "selfService": "Самообслуживание",
      "preInstallQuery": "Запрос перед установкой",
      "installScript": "Скрипт установки",
      "postInstallScript": "Скрипт после установки",
      "uninstallScript": "Скрипт удаления"
    },
    "advancedOptions": {
      "title": "Дополнительные параметры",
      "preInstallQuery": "Запрос перед установкой",
      "installScript": "Скрипт установки",
      "postInstallScript": "Скрипт после установки"
    }
  },
  "automations": {
    "title": "Автоматизация ПО",
    "vulnerabilities": "Автоматизация уязвимостей",
    "webhook": "Вебхук",
    "integration": "Интеграция"
  }
}
```

---

## Quality Checklist
- [ ] All 55+ components have `useTranslation("software")` added
- [ ] All hardcoded strings replaced with `t()` calls
- [ ] English translations added for all new keys
- [ ] Russian translations added for all keys
- [ ] Files synced to `assets/locales/`
- [ ] Table column headers translated
- [ ] Modal content translated
- [ ] Form labels and placeholders translated
- [ ] Empty states translated
- [ ] Tooltips translated
- [ ] Status labels translated
