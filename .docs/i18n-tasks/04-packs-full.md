# Task: Packs Pages i18n (queries namespace)

## Overview
Implement i18n for ALL pack-related pages. This section has NOT been started yet.
Packs share the `queries` namespace since they are query-related.

## Project Context
- **Repository:** MDM application (React + TypeScript)
- **i18n Library:** i18next, react-i18next
- **Target Language:** Russian (ru)
- **Namespace:** `queries` (add `packs` section)

## File Locations
- **English translations:** `frontend/locales/en/queries.json` AND `assets/locales/en/queries.json`
- **Russian translations:** `frontend/locales/ru/queries.json` AND `assets/locales/ru/queries.json`

**IMPORTANT:** Always update BOTH `frontend/locales/` AND `assets/locales/` to keep them in sync.

---

## ALL Components to Translate

### 1. ManagePacksPage
**Files:**
- `frontend/pages/packs/ManagePacksPage/ManagePacksPage.tsx`
- `frontend/pages/packs/ManagePacksPage/index.tsx`

### 2. PacksTable
**Files:**
- `frontend/pages/packs/ManagePacksPage/PacksTable/PacksTable.tsx`
- `frontend/pages/packs/ManagePacksPage/PacksTable/PacksTableConfig.tsx`

### 3. EditPackPage
**File:** `frontend/pages/packs/EditPackPage/EditPackPage.tsx`

### 4. PackComposerPage
**File:** `frontend/pages/packs/PackComposerPage/PackComposerPage.tsx`

### 5. Pack Modals
**Files:**
- `frontend/pages/packs/ManagePacksPage/components/DeletePackModal/DeletePackModal.tsx`
- `frontend/pages/packs/ManagePacksPage/components/PackQueryEditorModal/PackQueryEditorModal.tsx`
- `frontend/pages/packs/ManagePacksPage/components/RemovePackQueryModal/RemovePackQueryModal.tsx`

---

## Implementation Pattern

```tsx
import { useTranslation } from "react-i18next";

const ManagePacksPage = () => {
  const { t } = useTranslation("queries");

  return (
    <div>
      <h1>{t("packs.manage.title")}</h1>
      <button>{t("packs.manage.addPack")}</button>
    </div>
  );
};
```

---

## Translation Structure (add to queries.json)

```json
{
  "packs": {
    "title": "Packs",
    "manage": {
      "title": "Manage packs",
      "addPack": "Add pack",
      "editPack": "Edit pack",
      "deletePack": "Delete pack",
      "description": "Packs are collections of queries that run on a schedule."
    },
    "columns": {
      "name": "Name",
      "queriesCount": "Queries",
      "hostsCount": "Hosts",
      "lastUpdated": "Last updated",
      "status": "Status"
    },
    "details": {
      "title": "Pack details",
      "name": "Name",
      "description": "Description",
      "queries": "Queries",
      "targets": "Targets"
    },
    "create": {
      "title": "Create pack",
      "name": "Pack name",
      "description": "Description",
      "namePlaceholder": "Enter pack name",
      "descriptionPlaceholder": "Enter description (optional)",
      "submitButton": "Create pack",
      "nameRequired": "Pack name is required"
    },
    "edit": {
      "title": "Edit pack",
      "saveChanges": "Save changes",
      "addQuery": "Add query",
      "removeQuery": "Remove query",
      "editQuery": "Edit query"
    },
    "composer": {
      "title": "Pack composer",
      "selectQueries": "Select queries",
      "selectedQueries": "Selected queries",
      "availableQueries": "Available queries",
      "noQueriesSelected": "No queries selected"
    },
    "modals": {
      "delete": {
        "title": "Delete pack",
        "message": "Are you sure you want to delete \"{{name}}\"?",
        "warning": "This will stop all scheduled queries in this pack.",
        "deleteButton": "Delete",
        "cancelButton": "Cancel"
      },
      "queryEditor": {
        "title": "Edit pack query",
        "interval": "Interval",
        "platform": "Platform",
        "version": "Minimum osquery version",
        "logging": "Logging",
        "shard": "Shard"
      },
      "removeQuery": {
        "title": "Remove query from pack",
        "message": "Are you sure you want to remove \"{{name}}\" from this pack?",
        "removeButton": "Remove",
        "cancelButton": "Cancel"
      }
    },
    "empty": {
      "title": "No packs found",
      "description": "No packs match the current filters",
      "addFirst": "Create your first pack to get started"
    },
    "status": {
      "enabled": "Enabled",
      "disabled": "Disabled"
    }
  }
}
```

---

## Russian Translations (add to queries.json)

```json
{
  "packs": {
    "title": "Пакеты",
    "manage": {
      "title": "Управление пакетами",
      "addPack": "Добавить пакет",
      "editPack": "Редактировать пакет",
      "deletePack": "Удалить пакет",
      "description": "Пакеты — это коллекции запросов, выполняемых по расписанию."
    },
    "columns": {
      "name": "Название",
      "queriesCount": "Запросы",
      "hostsCount": "Хосты",
      "lastUpdated": "Последнее обновление",
      "status": "Статус"
    },
    "details": {
      "title": "Детали пакета",
      "name": "Название",
      "description": "Описание",
      "queries": "Запросы",
      "targets": "Цели"
    },
    "create": {
      "title": "Создать пакет",
      "name": "Название пакета",
      "description": "Описание",
      "namePlaceholder": "Введите название пакета",
      "descriptionPlaceholder": "Введите описание (необязательно)",
      "submitButton": "Создать пакет",
      "nameRequired": "Название пакета обязательно"
    },
    "edit": {
      "title": "Редактировать пакет",
      "saveChanges": "Сохранить изменения",
      "addQuery": "Добавить запрос",
      "removeQuery": "Удалить запрос",
      "editQuery": "Редактировать запрос"
    },
    "composer": {
      "title": "Конструктор пакетов",
      "selectQueries": "Выбрать запросы",
      "selectedQueries": "Выбранные запросы",
      "availableQueries": "Доступные запросы",
      "noQueriesSelected": "Запросы не выбраны"
    },
    "modals": {
      "delete": {
        "title": "Удалить пакет",
        "message": "Вы уверены, что хотите удалить \"{{name}}\"?",
        "warning": "Это остановит все запланированные запросы в этом пакете.",
        "deleteButton": "Удалить",
        "cancelButton": "Отмена"
      },
      "queryEditor": {
        "title": "Редактировать запрос пакета",
        "interval": "Интервал",
        "platform": "Платформа",
        "version": "Минимальная версия osquery",
        "logging": "Логирование",
        "shard": "Шард"
      },
      "removeQuery": {
        "title": "Удалить запрос из пакета",
        "message": "Вы уверены, что хотите удалить \"{{name}}\" из этого пакета?",
        "removeButton": "Удалить",
        "cancelButton": "Отмена"
      }
    },
    "empty": {
      "title": "Пакеты не найдены",
      "description": "Нет пакетов, соответствующих текущим фильтрам",
      "addFirst": "Создайте свой первый пакет"
    },
    "status": {
      "enabled": "Включён",
      "disabled": "Отключён"
    }
  }
}
```

---

## Quality Checklist
- [ ] All 7 pack components have `useTranslation("queries")` added
- [ ] All hardcoded strings replaced with `t("packs.*")` calls
- [ ] English translations added to `packs` section in queries.json
- [ ] Russian translations added to `packs` section in queries.json
- [ ] Files synced to `assets/locales/`
- [ ] Table column headers translated
- [ ] Modal content translated
- [ ] Form labels and placeholders translated
- [ ] Empty states translated
