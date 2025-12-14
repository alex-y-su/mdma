# Task: Complete Policies Pages i18n (policies namespace)

## Overview
Finish translating remaining policy pages to Russian. Some policy components are already done.

## Project Context
- **Repository:** MDM application (React + TypeScript)
- **i18n Library:** i18next, react-i18next
- **Target Language:** Russian (ru)
- **Namespace:** `policies`

## File Locations
- **English translations:** `frontend/locales/en/policies.json` AND `assets/locales/en/policies.json`
- **Russian translations:** `frontend/locales/ru/policies.json` AND `assets/locales/ru/policies.json`

**IMPORTANT:** Always update BOTH `frontend/locales/` AND `assets/locales/` to keep them in sync.

---

## Already Completed (DO NOT MODIFY)
- `frontend/pages/policies/PolicyPage/components/PolicyResultsTable/PolicyResultsTable.tsx`
- `frontend/pages/policies/PolicyPage/components/PolicyErrorsTable/PolicyErrorsTable.tsx`
- `frontend/pages/policies/ManagePoliciesPage/components/DeletePoliciesModal/DeletePoliciesModal.tsx`

---

## Components to Translate

### 1. ManagePoliciesPage
**File:** `frontend/pages/policies/ManagePoliciesPage/ManagePoliciesPage.tsx`

### 2. PoliciesTable
**Files:**
- `frontend/pages/policies/ManagePoliciesPage/PoliciesTable/PoliciesTable.tsx`
- `frontend/pages/policies/ManagePoliciesPage/PoliciesTable/PoliciesTableConfig.tsx`

### 3. PolicyPage Main
**File:** `frontend/pages/policies/PolicyPage/PolicyPage.tsx`

### 4. PolicyForm
**Files:**
- `frontend/pages/policies/PolicyPage/components/PolicyForm/PolicyForm.tsx`

### 5. PolicyResults
**Files:**
- `frontend/pages/policies/PolicyPage/components/PolicyResults/PolicyResults.tsx`
- `frontend/pages/policies/PolicyPage/components/PolicyResults/helpers.tsx`

### 6. CalendarEventsModal
**Files:**
- `frontend/pages/policies/ManagePoliciesPage/components/CalendarEventsModal/CalendarEventsModal.tsx`

### 7. CalendarEventPreviewModal
**File:** `frontend/pages/policies/ManagePoliciesPage/components/CalendarEventPreviewModal/CalendarEventPreviewModal.tsx`

### 8. ConditionalAccessModal
**File:** `frontend/pages/policies/ManagePoliciesPage/components/ConditionalAccessModal/ConditionalAccessModal.tsx`

### 9. InstallSoftwareModal
**File:** `frontend/pages/policies/ManagePoliciesPage/components/InstallSoftwareModal/InstallSoftwareModal.tsx`

### 10. OtherWorkflowsModal
**File:** `frontend/pages/policies/ManagePoliciesPage/components/OtherWorkflowsModal/OtherWorkflowsModal.tsx`

### 11. PolicyRunScriptModal
**File:** `frontend/pages/policies/ManagePoliciesPage/components/PolicyRunScriptModal/PolicyRunScriptModal.tsx`

### 12. SaveNewPolicyModal
**Files:**
- `frontend/pages/policies/PolicyPage/components/SaveNewPolicyModal/SaveNewPolicyModal.tsx`

### 13. Helper Components
**Files:**
- `frontend/pages/policies/ManagePoliciesPage/components/ExamplePayload/ExamplePayload.tsx`
- `frontend/pages/policies/ManagePoliciesPage/components/ExampleTicket/ExampleTicket.tsx`
- `frontend/pages/policies/ManagePoliciesPage/components/PassingColumnHeader/PassingColumnHeader.tsx`
- `frontend/pages/policies/ManagePoliciesPage/components/PoliciesPaginatedList/PoliciesPaginatedList.tsx`

### 14. Query Screens
**Files:**
- `frontend/pages/policies/PolicyPage/screens/QueryEditor.tsx`
- `frontend/pages/policies/PolicyPage/screens/RunQuery.tsx`

### 15. Shared Helpers
**File:** `frontend/pages/policies/helpers.tsx`

---

## Implementation Pattern

```tsx
import { useTranslation } from "react-i18next";

const ManagePoliciesPage = () => {
  const { t } = useTranslation("policies");

  return (
    <div>
      <h1>{t("manage.title")}</h1>
      <button>{t("manage.addPolicy")}</button>
    </div>
  );
};
```

---

## Existing Translation Keys (policies.json)
The policies.json file already has comprehensive translations. Reference these keys:
- `title`, `manage.*`, `columns.*`, `status.*`
- `details.*`, `automations.*`, `create.*`
- `empty.*`, `results.*`, `save.*`, `delete.*`
- `otherWorkflows.*`, `calendar.*`, `conditionalAccess.*`
- `installSoftware.*`, `runScript.*`, `paginatedList.*`

---

## Additional Keys Needed

```json
{
  "queryEditor": {
    "title": "Query editor",
    "schema": "Schema",
    "examples": "Examples",
    "runQuery": "Run query",
    "savePolicy": "Save policy"
  },
  "runQuery": {
    "title": "Run query",
    "selectTargets": "Select targets",
    "running": "Running...",
    "completed": "Completed"
  },
  "form": {
    "unsavedChanges": "You have unsaved changes",
    "confirmLeave": "Are you sure you want to leave? Your changes will be lost.",
    "validation": {
      "nameRequired": "Policy name is required",
      "queryRequired": "Query is required",
      "platformRequired": "At least one platform is required"
    }
  }
}
```

---

## Russian Translations (additional keys)

```json
{
  "queryEditor": {
    "title": "Редактор запросов",
    "schema": "Схема",
    "examples": "Примеры",
    "runQuery": "Выполнить запрос",
    "savePolicy": "Сохранить политику"
  },
  "runQuery": {
    "title": "Выполнить запрос",
    "selectTargets": "Выбрать цели",
    "running": "Выполняется...",
    "completed": "Завершено"
  },
  "form": {
    "unsavedChanges": "У вас есть несохранённые изменения",
    "confirmLeave": "Вы уверены, что хотите уйти? Ваши изменения будут потеряны.",
    "validation": {
      "nameRequired": "Название политики обязательно",
      "queryRequired": "Запрос обязателен",
      "platformRequired": "Требуется хотя бы одна платформа"
    }
  }
}
```

---

## Quality Checklist
- [ ] All remaining 15+ components have `useTranslation("policies")` added
- [ ] All hardcoded strings replaced with `t()` calls
- [ ] New English translations added where needed
- [ ] Russian translations added for all keys
- [ ] Files synced to `assets/locales/`
- [ ] Table column headers translated
- [ ] Modal content translated
- [ ] Form labels, placeholders, and validation messages translated
- [ ] Automation modals fully translated
- [ ] Query editor and run screens translated
