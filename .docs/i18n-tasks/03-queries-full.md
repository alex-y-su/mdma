# Task: Queries Pages i18n (queries namespace)

## Overview
Implement i18n for ALL query-related pages. This section has NOT been started yet.

## Project Context
- **Repository:** MDM application (React + TypeScript)
- **i18n Library:** i18next, react-i18next
- **Target Language:** Russian (ru)
- **Namespace:** `queries`

## File Locations
- **English translations:** `frontend/locales/en/queries.json` AND `assets/locales/en/queries.json`
- **Russian translations:** `frontend/locales/ru/queries.json` AND `assets/locales/ru/queries.json`

**IMPORTANT:** Always update BOTH `frontend/locales/` AND `assets/locales/` to keep them in sync.

---

## Current Translation File (queries.json)
The file exists with basic structure but components don't use it yet:
```json
{
  "title": "Queries",
  "manage": { ... },
  "columns": { ... },
  "details": { ... },
  "create": { ... },
  "run": { ... },
  "performance": { ... },
  "schedule": { ... },
  "empty": { ... }
}
```

---

## ALL Components to Translate

### 1. ManageQueriesPage
**Files:**
- `frontend/pages/queries/ManageQueriesPage/ManageQueriesPage.tsx`
- `frontend/pages/queries/ManageQueriesPage/index.tsx`

### 2. QueriesTable
**Files:**
- `frontend/pages/queries/ManageQueriesPage/QueriesTable/QueriesTable.tsx`
- `frontend/pages/queries/ManageQueriesPage/QueriesTable/QueriesTableConfig.tsx`

### 3. Query Management Modals
**Files:**
- `frontend/pages/queries/ManageQueriesPage/components/DeleteQueryModal/DeleteQueryModal.tsx`
- `frontend/pages/queries/ManageQueriesPage/components/ManageQueryAutomationsModal/ManageQueryAutomationsModal.tsx`
- `frontend/pages/queries/ManageQueriesPage/components/PreviewDataModal/PreviewDataModal.tsx`

### 4. QueryAutomationsStatusIndicator
**File:** `frontend/pages/queries/ManageQueriesPage/components/QueryAutomationsStatusIndicator/QueryAutomationsStatusIndicator.tsx`

### 5. QueryDetailsPage
**Files:**
- `frontend/pages/queries/details/QueryDetailsPage/QueryDetailsPage.tsx`
- `frontend/pages/queries/details/QueryDetailsPage/QueryDetailsPageConfig.tsx`

### 6. QueryReport
**Files:**
- `frontend/pages/queries/details/QueryDetailsPage/QueryReport/QueryReport.tsx`
- `frontend/pages/queries/details/QueryDetailsPage/QueryReport/QueryReportTableConfig.tsx`

### 7. NoResults Component
**File:** `frontend/pages/queries/details/QueryDetailsPage/NoResults/NoResults.tsx`

### 8. EditQueryPage
**File:** `frontend/pages/queries/edit/EditQueryPage.tsx`

### 9. EditQueryForm
**Files:**
- `frontend/pages/queries/edit/components/EditQueryForm/EditQueryForm.tsx`
- `frontend/pages/queries/edit/components/EditQueryForm/EditQueryForm.tests.tsx`

### 10. QueryResults
**Files:**
- `frontend/pages/queries/edit/components/QueryResults/QueryResults.tsx`
- `frontend/pages/queries/edit/components/QueryResults/QueryResultsTableConfig.tsx`

### 11. Edit Query Modals
**Files:**
- `frontend/pages/queries/edit/components/ConfirmSaveChangesModal/ConfirmSaveChangesModal.tsx`
- `frontend/pages/queries/edit/components/SaveNewQueryModal/SaveNewQueryModal.tsx`
- `frontend/pages/queries/edit/components/SaveAsNewQueryModal/SaveAsNewQueryModal.tsx`

### 12. DiscardDataOption
**File:** `frontend/pages/queries/edit/components/DiscardDataOption/DiscardDataOption.tsx`

### 13. LiveQueryPage
**Files:**
- `frontend/pages/queries/live/LiveQueryPage/LiveQueryPage.tsx`
- `frontend/pages/queries/live/screens/RunQuery.tsx`

---

## Implementation Pattern

```tsx
import { useTranslation } from "react-i18next";

const ManageQueriesPage = () => {
  const { t } = useTranslation("queries");

  return (
    <div>
      <h1>{t("manage.title")}</h1>
      <button>{t("manage.addQuery")}</button>
    </div>
  );
};
```

---

## Complete Translation Structure

```json
{
  "title": "Queries",
  "manage": {
    "title": "Manage queries",
    "addQuery": "Add query",
    "editQuery": "Edit query",
    "deleteQuery": "Delete query",
    "runQuery": "Run query",
    "liveQuery": "Live query",
    "searchPlaceholder": "Search queries by name",
    "automationsEnabled": "Automations enabled",
    "automationsDisabled": "Automations disabled"
  },
  "columns": {
    "name": "Name",
    "platform": "Platform",
    "author": "Author",
    "lastModified": "Last modified",
    "frequency": "Frequency",
    "performance": "Performance impact",
    "automations": "Automations",
    "hostsTargeted": "Hosts targeted",
    "hostsResponded": "Hosts responded"
  },
  "details": {
    "title": "Query details",
    "sql": "SQL",
    "description": "Description",
    "platform": "Platform",
    "performance": "Performance impact",
    "schedule": "Schedule",
    "logging": "Logging",
    "automations": "Automations",
    "report": "Report",
    "lastRun": "Last run",
    "totalResults": "Total results"
  },
  "create": {
    "title": "Create query",
    "name": "Name",
    "description": "Description",
    "sql": "SQL query",
    "platform": "Platform",
    "performanceImpact": "Performance impact",
    "submitButton": "Save query",
    "namePlaceholder": "Enter query name",
    "descriptionPlaceholder": "Enter description (optional)",
    "sqlPlaceholder": "SELECT * FROM ...",
    "nameRequired": "Query name is required",
    "sqlRequired": "SQL query is required"
  },
  "edit": {
    "title": "Edit query",
    "saveChanges": "Save changes",
    "discardChanges": "Discard changes",
    "confirmDiscard": "Are you sure you want to discard your changes?",
    "unsavedChanges": "You have unsaved changes"
  },
  "run": {
    "title": "Run query",
    "liveQuery": "Live query",
    "selectHosts": "Select hosts",
    "selectLabels": "Select labels",
    "selectTeams": "Select teams",
    "runButton": "Run",
    "stopButton": "Stop",
    "results": "Results",
    "noResults": "No results",
    "exportResults": "Export results",
    "running": "Running...",
    "stopped": "Query stopped",
    "completed": "Query completed",
    "hostsResponding": "{{count}} host responding",
    "hostsResponding_plural": "{{count}} hosts responding"
  },
  "performance": {
    "minimal": "Minimal",
    "low": "Low",
    "medium": "Medium",
    "high": "High",
    "excessive": "Excessive",
    "unknown": "Unknown"
  },
  "schedule": {
    "title": "Schedule",
    "frequency": "Frequency",
    "enabled": "Enabled",
    "disabled": "Disabled",
    "never": "Never",
    "daily": "Daily",
    "weekly": "Weekly",
    "monthly": "Monthly",
    "custom": "Custom",
    "interval": "Every {{value}} {{unit}}"
  },
  "automations": {
    "title": "Query automations",
    "manage": "Manage automations",
    "webhook": "Webhook",
    "logging": "Logging",
    "enabled": "Enabled",
    "disabled": "Disabled"
  },
  "modals": {
    "delete": {
      "title": "Delete query",
      "message": "Are you sure you want to delete \"{{name}}\"?",
      "warning": "This action cannot be undone.",
      "deleteButton": "Delete",
      "cancelButton": "Cancel"
    },
    "saveNew": {
      "title": "Save new query",
      "nameLabel": "Query name",
      "descriptionLabel": "Description",
      "saveButton": "Save",
      "cancelButton": "Cancel"
    },
    "saveAsNew": {
      "title": "Save as new query",
      "message": "Save a copy of this query with a new name."
    },
    "confirmSave": {
      "title": "Save changes",
      "message": "Do you want to save your changes to this query?"
    },
    "previewData": {
      "title": "Preview data",
      "noData": "No data available"
    }
  },
  "empty": {
    "title": "No queries found",
    "description": "No queries match the current filters",
    "addFirst": "Create your first query to get started",
    "noResults": "No results",
    "noResultsDescription": "This query returned no results"
  },
  "report": {
    "title": "Query report",
    "lastUpdated": "Last updated",
    "hostsReported": "Hosts reported",
    "exportCsv": "Export CSV"
  }
}
```

---

## Russian Translations

```json
{
  "title": "Запросы",
  "manage": {
    "title": "Управление запросами",
    "addQuery": "Добавить запрос",
    "editQuery": "Редактировать запрос",
    "deleteQuery": "Удалить запрос",
    "runQuery": "Выполнить запрос",
    "liveQuery": "Live-запрос",
    "searchPlaceholder": "Поиск запросов по названию",
    "automationsEnabled": "Автоматизация включена",
    "automationsDisabled": "Автоматизация отключена"
  },
  "columns": {
    "name": "Название",
    "platform": "Платформа",
    "author": "Автор",
    "lastModified": "Последнее изменение",
    "frequency": "Частота",
    "performance": "Влияние на производительность",
    "automations": "Автоматизация",
    "hostsTargeted": "Целевые хосты",
    "hostsResponded": "Ответившие хосты"
  },
  "details": {
    "title": "Детали запроса",
    "sql": "SQL",
    "description": "Описание",
    "platform": "Платформа",
    "performance": "Влияние на производительность",
    "schedule": "Расписание",
    "logging": "Логирование",
    "automations": "Автоматизация",
    "report": "Отчёт",
    "lastRun": "Последний запуск",
    "totalResults": "Всего результатов"
  },
  "create": {
    "title": "Создать запрос",
    "name": "Название",
    "description": "Описание",
    "sql": "SQL-запрос",
    "platform": "Платформа",
    "performanceImpact": "Влияние на производительность",
    "submitButton": "Сохранить запрос",
    "namePlaceholder": "Введите название запроса",
    "descriptionPlaceholder": "Введите описание (необязательно)",
    "sqlPlaceholder": "SELECT * FROM ...",
    "nameRequired": "Название запроса обязательно",
    "sqlRequired": "SQL-запрос обязателен"
  },
  "edit": {
    "title": "Редактировать запрос",
    "saveChanges": "Сохранить изменения",
    "discardChanges": "Отменить изменения",
    "confirmDiscard": "Вы уверены, что хотите отменить изменения?",
    "unsavedChanges": "У вас есть несохранённые изменения"
  },
  "run": {
    "title": "Выполнить запрос",
    "liveQuery": "Live-запрос",
    "selectHosts": "Выбрать хосты",
    "selectLabels": "Выбрать метки",
    "selectTeams": "Выбрать команды",
    "runButton": "Выполнить",
    "stopButton": "Остановить",
    "results": "Результаты",
    "noResults": "Нет результатов",
    "exportResults": "Экспорт результатов",
    "running": "Выполняется...",
    "stopped": "Запрос остановлен",
    "completed": "Запрос завершён",
    "hostsResponding": "{{count}} хост отвечает",
    "hostsResponding_plural": "{{count}} хостов отвечают"
  },
  "performance": {
    "minimal": "Минимальное",
    "low": "Низкое",
    "medium": "Среднее",
    "high": "Высокое",
    "excessive": "Чрезмерное",
    "unknown": "Неизвестно"
  },
  "schedule": {
    "title": "Расписание",
    "frequency": "Частота",
    "enabled": "Включено",
    "disabled": "Отключено",
    "never": "Никогда",
    "daily": "Ежедневно",
    "weekly": "Еженедельно",
    "monthly": "Ежемесячно",
    "custom": "Настраиваемое",
    "interval": "Каждые {{value}} {{unit}}"
  },
  "automations": {
    "title": "Автоматизация запросов",
    "manage": "Управление автоматизацией",
    "webhook": "Вебхук",
    "logging": "Логирование",
    "enabled": "Включено",
    "disabled": "Отключено"
  },
  "modals": {
    "delete": {
      "title": "Удалить запрос",
      "message": "Вы уверены, что хотите удалить \"{{name}}\"?",
      "warning": "Это действие нельзя отменить.",
      "deleteButton": "Удалить",
      "cancelButton": "Отмена"
    },
    "saveNew": {
      "title": "Сохранить новый запрос",
      "nameLabel": "Название запроса",
      "descriptionLabel": "Описание",
      "saveButton": "Сохранить",
      "cancelButton": "Отмена"
    },
    "saveAsNew": {
      "title": "Сохранить как новый запрос",
      "message": "Сохранить копию этого запроса с новым названием."
    },
    "confirmSave": {
      "title": "Сохранить изменения",
      "message": "Вы хотите сохранить изменения в этом запросе?"
    },
    "previewData": {
      "title": "Предпросмотр данных",
      "noData": "Данные недоступны"
    }
  },
  "empty": {
    "title": "Запросы не найдены",
    "description": "Нет запросов, соответствующих текущим фильтрам",
    "addFirst": "Создайте свой первый запрос",
    "noResults": "Нет результатов",
    "noResultsDescription": "Этот запрос не вернул результатов"
  },
  "report": {
    "title": "Отчёт по запросу",
    "lastUpdated": "Последнее обновление",
    "hostsReported": "Хостов отчиталось",
    "exportCsv": "Экспорт CSV"
  }
}
```

---

## Quality Checklist
- [ ] All 15+ components have `useTranslation("queries")` added
- [ ] All hardcoded strings replaced with `t()` calls
- [ ] English translations complete in `frontend/locales/en/queries.json`
- [ ] Russian translations complete in `frontend/locales/ru/queries.json`
- [ ] Files synced to `assets/locales/`
- [ ] Table column headers translated
- [ ] Modal content translated
- [ ] Form labels and placeholders translated
- [ ] Error messages translated
- [ ] Empty states translated
