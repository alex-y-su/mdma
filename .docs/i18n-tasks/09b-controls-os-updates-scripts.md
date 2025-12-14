# Task: Manage Controls - OS Updates & Scripts (settings namespace)

## Overview
Implement i18n for OS Updates and Scripts sections. Part 2 of 3.

## Project Context
- **Namespace:** `settings` (add `controls.osUpdates` and `controls.scripts`)
- **Files:** `frontend/locales/{en,ru}/settings.json` AND `assets/locales/{en,ru}/settings.json`

---

## Components: OS Updates

- `frontend/pages/ManageControlsPage/OSUpdates/OSUpdates.tsx`
- `frontend/pages/ManageControlsPage/OSUpdates/components/PlatformTabs/PlatformTabs.tsx`
- `frontend/pages/ManageControlsPage/OSUpdates/components/CurrentVersionSection/CurrentVersionSection.tsx`
- `frontend/pages/ManageControlsPage/OSUpdates/components/TargetSection/TargetSection.tsx`
- `frontend/pages/ManageControlsPage/OSUpdates/components/OSVersionTable/OSVersionTable.tsx`
- `frontend/pages/ManageControlsPage/OSUpdates/components/OSVersionTable/OSVersionTableConfig.tsx`
- `frontend/pages/ManageControlsPage/OSUpdates/components/OSVersionsEmptyState/OSVersionsEmptyState.tsx`
- `frontend/pages/ManageControlsPage/OSUpdates/components/OSTypeCell/OSTypeCell.tsx`
- `frontend/pages/ManageControlsPage/OSUpdates/components/EndUserOSRequirementPreview/EndUserOSRequirementPreview.tsx`
- `frontend/pages/ManageControlsPage/OSUpdates/components/AppleOSTargetForm/AppleOSTargetForm.tsx`
- `frontend/pages/ManageControlsPage/OSUpdates/components/WindowsTargetForm/WindowsTargetForm.tsx`

---

## Components: Scripts

- `frontend/pages/ManageControlsPage/Scripts/Scripts.tsx`
- `frontend/pages/ManageControlsPage/Scripts/ScriptsNavItems.tsx`
- `frontend/pages/ManageControlsPage/Scripts/ScriptBatchDetailsPage/ScriptBatchDetailsPage.tsx`
- `frontend/pages/ManageControlsPage/Scripts/ScriptBatchDetailsPage/ScriptBatchHostsTable/ScriptBatchHostsTable.tsx`
- `frontend/pages/ManageControlsPage/Scripts/cards/ScriptBatchProgress/ScriptBatchProgress.tsx`
- `frontend/pages/ManageControlsPage/Scripts/cards/ScriptLibrary/ScriptLibrary.tsx`
- `frontend/pages/ManageControlsPage/Scripts/components/ScriptListHeading/ScriptListHeading.tsx`
- `frontend/pages/ManageControlsPage/Scripts/components/ScriptListItem/ScriptListItem.tsx`
- `frontend/pages/ManageControlsPage/Scripts/components/ScriptUploader/ScriptUploader.tsx`
- `frontend/pages/ManageControlsPage/Scripts/components/ScriptUploadModal/ScriptUploadModal.tsx`
- `frontend/pages/ManageControlsPage/Scripts/components/EditScriptModal/EditScriptModal.tsx`
- `frontend/pages/ManageControlsPage/Scripts/components/DeleteScriptModal/DeleteScriptModal.tsx`
- `frontend/pages/ManageControlsPage/Scripts/components/CancelScriptBatchModal/CancelScriptBatchModal.tsx`
- `frontend/pages/ManageControlsPage/Scripts/components/RerunScriptModal/RerunScriptModal.tsx`

---

## Implementation Pattern

```tsx
import { useTranslation } from "react-i18next";

const Scripts = () => {
  const { t } = useTranslation("settings");
  return <h1>{t("controls.scripts.title")}</h1>;
};
```

---

## English Translations

```json
{
  "controls": {
    "osUpdates": {
      "title": "OS updates",
      "description": "Manage operating system updates",
      "currentVersion": "Current version",
      "targetVersion": "Target version",
      "deadline": "Deadline",
      "minimumVersion": "Minimum version",
      "platforms": {
        "macos": "macOS",
        "windows": "Windows",
        "ios": "iOS",
        "ipados": "iPadOS"
      },
      "form": {
        "targetVersionLabel": "Target version",
        "deadlineLabel": "Deadline",
        "deadlineHelp": "Hosts must update by this date"
      },
      "empty": {
        "title": "No OS versions configured",
        "description": "Set target OS versions for your hosts"
      },
      "preview": {
        "title": "End user experience preview",
        "description": "What end users will see"
      }
    },
    "scripts": {
      "title": "Scripts",
      "description": "Manage and run scripts on hosts",
      "library": "Script library",
      "addScript": "Add script",
      "uploadScript": "Upload script",
      "editScript": "Edit script",
      "deleteScript": "Delete script",
      "runScript": "Run script",
      "cancelScript": "Cancel script",
      "rerunScript": "Rerun script",
      "scriptName": "Script name",
      "scriptContent": "Script content",
      "noScripts": "No scripts",
      "addScriptDescription": "Upload scripts to run on your hosts",
      "batchDetails": {
        "title": "Script batch details",
        "progress": "Progress",
        "hosts": "Hosts",
        "status": "Status",
        "startedAt": "Started at",
        "completedAt": "Completed at"
      },
      "modals": {
        "upload": {
          "title": "Upload script",
          "dragDrop": "Drag and drop or click to upload",
          "supportedTypes": "Supported: .sh, .ps1, .py"
        },
        "edit": {
          "title": "Edit script",
          "nameLabel": "Name",
          "contentLabel": "Content"
        },
        "delete": {
          "title": "Delete script",
          "message": "Are you sure you want to delete \"{{name}}\"?",
          "warning": "This will cancel any pending runs of this script."
        },
        "cancel": {
          "title": "Cancel script batch",
          "message": "Are you sure you want to cancel this script batch?"
        },
        "rerun": {
          "title": "Rerun script",
          "message": "Run this script again on failed hosts?"
        }
      },
      "status": {
        "pending": "Pending",
        "running": "Running",
        "completed": "Completed",
        "failed": "Failed",
        "cancelled": "Cancelled"
      }
    }
  }
}
```

---

## Russian Translations

```json
{
  "controls": {
    "osUpdates": {
      "title": "Обновления ОС",
      "description": "Управление обновлениями операционной системы",
      "currentVersion": "Текущая версия",
      "targetVersion": "Целевая версия",
      "deadline": "Крайний срок",
      "minimumVersion": "Минимальная версия",
      "platforms": {
        "macos": "macOS",
        "windows": "Windows",
        "ios": "iOS",
        "ipados": "iPadOS"
      },
      "form": {
        "targetVersionLabel": "Целевая версия",
        "deadlineLabel": "Крайний срок",
        "deadlineHelp": "Хосты должны обновиться до этой даты"
      },
      "empty": {
        "title": "Версии ОС не настроены",
        "description": "Установите целевые версии ОС для хостов"
      },
      "preview": {
        "title": "Предпросмотр для пользователя",
        "description": "Что увидят пользователи"
      }
    },
    "scripts": {
      "title": "Скрипты",
      "description": "Управление и запуск скриптов на хостах",
      "library": "Библиотека скриптов",
      "addScript": "Добавить скрипт",
      "uploadScript": "Загрузить скрипт",
      "editScript": "Редактировать скрипт",
      "deleteScript": "Удалить скрипт",
      "runScript": "Запустить скрипт",
      "cancelScript": "Отменить скрипт",
      "rerunScript": "Запустить повторно",
      "scriptName": "Название скрипта",
      "scriptContent": "Содержимое скрипта",
      "noScripts": "Нет скриптов",
      "addScriptDescription": "Загрузите скрипты для запуска на хостах",
      "batchDetails": {
        "title": "Детали пакетного запуска",
        "progress": "Прогресс",
        "hosts": "Хосты",
        "status": "Статус",
        "startedAt": "Начало",
        "completedAt": "Завершение"
      },
      "modals": {
        "upload": {
          "title": "Загрузить скрипт",
          "dragDrop": "Перетащите или нажмите для загрузки",
          "supportedTypes": "Поддерживаются: .sh, .ps1, .py"
        },
        "edit": {
          "title": "Редактировать скрипт",
          "nameLabel": "Название",
          "contentLabel": "Содержимое"
        },
        "delete": {
          "title": "Удалить скрипт",
          "message": "Вы уверены, что хотите удалить \"{{name}}\"?",
          "warning": "Все ожидающие запуски этого скрипта будут отменены."
        },
        "cancel": {
          "title": "Отменить пакетный запуск",
          "message": "Вы уверены, что хотите отменить этот пакетный запуск?"
        },
        "rerun": {
          "title": "Запустить повторно",
          "message": "Запустить скрипт снова на неудачных хостах?"
        }
      },
      "status": {
        "pending": "Ожидание",
        "running": "Выполняется",
        "completed": "Завершено",
        "failed": "Ошибка",
        "cancelled": "Отменено"
      }
    }
  }
}
```

---

## Quality Checklist
- [ ] All OS Updates components translated
- [ ] All Scripts components translated
- [ ] English and Russian JSONs updated
- [ ] Files synced to `assets/locales/`
