# Software Pages i18n Translation - IMPLEMENTATION STATUS

## Completed Work

### ✅ 1. Locale Files Updated
Both English and Russian translation files have been created and synced:
- `/Users/x0040h/projects/mdm/frontend/locales/en/software.json` ✅
- `/Users/x0040h/projects/mdm/frontend/locales/ru/software.json` ✅
- `/Users/x0040h/projects/mdm/assets/locales/en/software.json` ✅
- `/Users/x0040h/projects/mdm/assets/locales/ru/software.json` ✅

### ✅ 2. Core Table Configurations Translated
The following critical files have been fully translated:
- `frontend/pages/SoftwarePage/SoftwareTitles/SoftwareTable/SoftwareTitlesTableConfig.tsx` ✅
- `frontend/pages/SoftwarePage/SoftwareTitles/SoftwareTable/SoftwareVersionsTableConfig.tsx` ✅
- `frontend/pages/SoftwarePage/SoftwareTitles/SoftwareTable/SoftwareTable.tsx` ✅
- `frontend/pages/SoftwarePage/SoftwareOS/SoftwareOSTable/SoftwareOSTable.tsx` ✅
- `frontend/pages/SoftwarePage/SoftwareVulnerabilities/SoftwareVulnerabilitiesTable/VulnerabilitiesTableConfig.tsx` ✅

---

## Translation Pattern Applied

### For React Components

```tsx
// 1. Add import at the top
import { useTranslation } from "react-i18next";

// 2. In the component function, add the hook
const MyComponent = () => {
  const { t } = useTranslation("software");  // Note: "software" namespace

  // 3. Replace hardcoded strings with t() calls
  return (
    <div>
      <h1>{t("titles.title")}</h1>
      <p>{t("table.helpText")}</p>
    </div>
  );
};
```

### For Table Config Factory Functions

```tsx
// Table configs are factory functions that need t passed as a parameter
const generateTableHeaders = (
  router: InjectedRouter,
  teamId?: number,
  t?: any  // Add t as optional parameter
): ITableConfig[] => {
  return [
    {
      Header: t ? t("columns.name") : "Name",  // Fallback for backward compatibility
      accessor: "name",
      Cell: (cellProps) => (
        <TextCell value={cellProps.cell.value} />
      ),
    },
  ];
};

// When calling the factory function:
const headers = useMemo(() => {
  if (!data) return [];
  return generateTableConfig(router, teamId, t);
}, [generateTableConfig, data, router, teamId, t]);
```

---

## Remaining Files to Translate (45+ files)

### Section 3: Software Vulnerabilities (2 remaining)
- `frontend/pages/SoftwarePage/SoftwareVulnerabilities/SoftwareVulnerabilities.tsx`
- `frontend/pages/SoftwarePage/SoftwareVulnerabilities/SoftwareVulnerabilitiesTable/SoftwareVulnerabilitiesTable.tsx`

### Section 4: Software Add Pages (14 files)
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

### Section 5: Software Title Details Page (16 files)
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

### Section 6: Other Details Pages (6 files)
- `frontend/pages/SoftwarePage/SoftwareOSDetailsPage/SoftwareOSDetailsPage.tsx`
- `frontend/pages/SoftwarePage/SoftwareVersionDetailsPage/SoftwareVersionDetailsPage.tsx`
- `frontend/pages/SoftwarePage/SoftwareVulnerabilityDetailsPage/SoftwareVulnerabilityDetailsPage.tsx`
- `frontend/pages/SoftwarePage/SoftwareVulnerabilityDetailsPage/SoftwareVulnSummary/SoftwareVulnSummary.tsx`
- `frontend/pages/SoftwarePage/SoftwareVulnerabilityDetailsPage/SoftwareVulnOSVersions/SoftwareVulnOSVersions.tsx`
- `frontend/pages/SoftwarePage/SoftwareVulnerabilityDetailsPage/SoftwareVulnSoftwareVersions/SoftwareVulnSoftwareVersions.tsx`

### Section 7: Forms (7 files)
- `frontend/pages/SoftwarePage/components/forms/PackageForm/PackageForm.tsx`
- `frontend/pages/SoftwarePage/components/forms/PackageForm/helpers.tsx`
- `frontend/pages/SoftwarePage/components/forms/PackageAdvancedOptions/PackageAdvancedOptions.tsx`
- `frontend/pages/SoftwarePage/components/forms/AdvancedOptionsFields/AdvancedOptionsFields.tsx`
- `frontend/pages/SoftwarePage/components/forms/SoftwareAndroidForm/SoftwareAndroidForm.tsx`
- `frontend/pages/SoftwarePage/components/forms/SoftwareVppForm/SoftwareVppForm.tsx`
- `frontend/pages/SoftwarePage/components/forms/SoftwareOptionsSelector/SoftwareOptionsSelector.tsx`

### Section 8: Cards (2 files)
- `frontend/pages/SoftwarePage/components/cards/SoftwareDetailsSummary/SoftwareDetailsSummary.tsx`
- `frontend/pages/SoftwarePage/components/cards/DetailsNoHosts/DetailsNoHosts.tsx`

### Section 9: Modals (6 files)
- `frontend/pages/SoftwarePage/components/modals/AddSoftwareModal/AddSoftwareModal.tsx`
- `frontend/pages/SoftwarePage/components/modals/SoftwareFiltersModal/SoftwareFiltersModal.tsx`
- `frontend/pages/SoftwarePage/components/modals/ManageSoftwareAutomationsModal/ManageSoftwareAutomationsModal.tsx`
- `frontend/pages/SoftwarePage/components/modals/CategoriesEndUserExperienceModal/CategoriesEndUserExperienceModal.tsx`
- `frontend/pages/SoftwarePage/components/modals/PreviewPayloadModal/PreviewPayloadModal.tsx`
- `frontend/pages/SoftwarePage/components/modals/PreviewTicketModal/PreviewTicketModal.tsx`

### Section 10: Tables & Cells (9 files)
- `frontend/pages/SoftwarePage/components/tables/EmptySoftwareTable/EmptySoftwareTable.tsx`
- `frontend/pages/SoftwarePage/components/tables/SoftwareVulnerabilitiesTable/SoftwareVulnerabilitiesTable.tsx`
- `frontend/pages/SoftwarePage/components/tables/OSKernelsTable/OSKernelsTable.tsx`
- `frontend/pages/SoftwarePage/components/cells/HashCell/HashCell.tsx`
- `frontend/pages/SoftwarePage/components/cells/IconCell/IconCell.tsx`
- `frontend/pages/SoftwarePage/components/cells/InstalledPathCell/InstalledPathCell.tsx`
- `frontend/pages/SoftwarePage/components/cells/VersionCell/VersionCell.tsx`
- `frontend/pages/SoftwarePage/components/cells/VulnerabilitiesCell/VulnerabilitiesCell.tsx`

---

## Quick Reference: Common Translation Keys

### Column Headers
```tsx
t("columns.name")           // Название
t("columns.version")        // Версия
t("columns.type")           // Тип
t("columns.vulnerabilities") // Уязвимости
t("columns.hosts")          // Устройства
t("columns.notSupported")   // Не поддерживается
```

### Vulnerabilities
```tsx
t("vulnerabilities.severity")           // Серьезность
t("vulnerabilities.severityTooltip")    // Tooltip text
t("vulnerabilities.probabilityOfExploit") // Вероятность эксплуатации
t("vulnerabilities.detected")           // Обнаружено
t("vulnerabilities.published")          // Опубликовано
```

### Forms
```tsx
t("forms.package.name")             // Название
t("forms.package.save")             // Сохранить
t("forms.package.cancel")           // Отмена
t("forms.package.addSoftware")      // Добавить ПО
t("forms.advancedOptions.title")    // Дополнительные параметры
```

### Table Related
```tsx
t("table.searchPlaceholder")  // Поиск по названию или уязвимости (CVE)
t("table.helpText")           // Видите неожиданное ПО или уязвимости?
t("table.helpLink")           // Сообщить о проблеме на GitHub
t("table.showVersions")       // Показать версии
```

### OS Platforms
```tsx
t("os.platforms.all")      // Все платформы
t("os.platforms.darwin")   // macOS
t("os.platforms.windows")  // Windows
t("os.platforms.linux")    // Linux
```

---

## Next Steps

To complete the translation, apply the established pattern to each remaining file:

1. Add `import { useTranslation } from "react-i18next";`
2. Add `const { t } = useTranslation("software");` in the component
3. Replace all hardcoded English strings with `t("key.path")` calls
4. For table configs, add `t?: any` parameter and pass it through
5. Test each section to ensure translations work correctly

The locale files are complete and ready - all translation keys are already defined in both English and Russian.
