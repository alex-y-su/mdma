# Task: Manage Controls - OS Settings (settings namespace)

## Overview
Implement i18n for OS Settings section of Manage Controls. Part 1 of 3.

## Project Context
- **Repository:** MDM application (React + TypeScript)
- **i18n Library:** i18next, react-i18next
- **Target Language:** Russian (ru)
- **Namespace:** `settings` (add `controls.osSettings` section)

## File Locations
- **English:** `frontend/locales/en/settings.json` AND `assets/locales/en/settings.json`
- **Russian:** `frontend/locales/ru/settings.json` AND `assets/locales/ru/settings.json`

**IMPORTANT:** Update BOTH `frontend/locales/` AND `assets/locales/`.

---

## Components to Translate

### Main Page
- `frontend/pages/ManageControlsPage/ManageControlsPage.tsx`

### OS Settings Main
- `frontend/pages/ManageControlsPage/OSSettings/OSSettings.tsx`
- `frontend/pages/ManageControlsPage/OSSettings/OSSettingsNavItems.tsx`
- `frontend/pages/ManageControlsPage/OSSettings/ProfileStatusAggregate/ProfileStatusAggregate.tsx`
- `frontend/pages/ManageControlsPage/OSSettings/ProfileStatusAggregate/ProfileStatusAggregateOptions.tsx`

### Custom Settings Card
- `frontend/pages/ManageControlsPage/OSSettings/cards/CustomSettings/CustomSettings.tsx`
- `frontend/pages/ManageControlsPage/OSSettings/cards/CustomSettings/ProfileListHeading/ProfileListHeading.tsx`
- `frontend/pages/ManageControlsPage/OSSettings/cards/CustomSettings/ProfileListItem/ProfileListItem.tsx`
- `frontend/pages/ManageControlsPage/OSSettings/cards/CustomSettings/ProfileUploader/ProfileUploader.tsx`
- `frontend/pages/ManageControlsPage/OSSettings/cards/CustomSettings/ProfileUploader/AddProfileCard/AddProfileCard.tsx`
- `frontend/pages/ManageControlsPage/OSSettings/cards/CustomSettings/ProfileUploader/AddProfileModal/AddProfileModal.tsx`
- `frontend/pages/ManageControlsPage/OSSettings/cards/CustomSettings/ProfileUploader/ProfileGraphic/ProfileGraphic.tsx`
- `frontend/pages/ManageControlsPage/OSSettings/cards/CustomSettings/ConfigProfileStatusModal/ConfigProfileStatusModal.tsx`
- `frontend/pages/ManageControlsPage/OSSettings/cards/CustomSettings/ProfileLabelsModal/ProfileLabelsModal.tsx`
- `frontend/pages/ManageControlsPage/OSSettings/cards/CustomSettings/DeleteProfileModal/DeleteProfileModal.tsx`
- `frontend/pages/ManageControlsPage/OSSettings/cards/CustomSettings/ResendConfigProfileModal/ResendConfigProfileModal.tsx`
- `frontend/pages/ManageControlsPage/OSSettings/cards/CustomSettings/ConfigProfileHostCountCell/ConfigProfileHostCountCell.tsx`
- `frontend/pages/ManageControlsPage/OSSettings/cards/CustomSettings/ConfigProfileStatusTable/ConfigProfileStatusTable.tsx`

### Disk Encryption Card
- `frontend/pages/ManageControlsPage/OSSettings/cards/DiskEncryption/DiskEncryption.tsx`
- `frontend/pages/ManageControlsPage/OSSettings/cards/DiskEncryption/DiskEncryptionTable/DiskEncryptionTable.tsx`

---

## Implementation Pattern

```tsx
import { useTranslation } from "react-i18next";

const OSSettings = () => {
  const { t } = useTranslation("settings");
  return <h1>{t("controls.osSettings.title")}</h1>;
};
```

---

## English Translations

```json
{
  "controls": {
    "title": "Controls",
    "osSettings": {
      "title": "OS settings",
      "description": "Manage configuration profiles and disk encryption",
      "navItems": {
        "customSettings": "Custom settings",
        "diskEncryption": "Disk encryption"
      },
      "profileStatus": {
        "title": "Profile status",
        "verified": "Verified",
        "pending": "Pending",
        "failed": "Failed"
      },
      "customSettings": {
        "title": "Custom settings",
        "addProfile": "Add profile",
        "uploadProfile": "Upload profile",
        "deleteProfile": "Delete profile",
        "resendProfile": "Resend profile",
        "profileLabels": "Profile labels",
        "profileStatus": "Profile status",
        "noProfiles": "No configuration profiles",
        "addProfileDescription": "Add a configuration profile to customize settings",
        "confirmDelete": "Are you sure you want to delete this profile?",
        "deleteWarning": "Hosts with this profile will no longer receive these settings."
      },
      "diskEncryption": {
        "title": "Disk encryption",
        "description": "Require disk encryption on hosts",
        "enabled": "Enabled",
        "disabled": "Disabled",
        "enforced": "Enforced",
        "status": {
          "verified": "Verified",
          "verifying": "Verifying",
          "actionRequired": "Action required",
          "enforcing": "Enforcing",
          "failed": "Failed"
        }
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
    "title": "Управление",
    "osSettings": {
      "title": "Настройки ОС",
      "description": "Управление профилями конфигурации и шифрованием диска",
      "navItems": {
        "customSettings": "Пользовательские настройки",
        "diskEncryption": "Шифрование диска"
      },
      "profileStatus": {
        "title": "Статус профиля",
        "verified": "Проверено",
        "pending": "Ожидание",
        "failed": "Ошибка"
      },
      "customSettings": {
        "title": "Пользовательские настройки",
        "addProfile": "Добавить профиль",
        "uploadProfile": "Загрузить профиль",
        "deleteProfile": "Удалить профиль",
        "resendProfile": "Отправить повторно",
        "profileLabels": "Метки профиля",
        "profileStatus": "Статус профиля",
        "noProfiles": "Нет профилей конфигурации",
        "addProfileDescription": "Добавьте профиль конфигурации для настройки параметров",
        "confirmDelete": "Вы уверены, что хотите удалить этот профиль?",
        "deleteWarning": "Хосты с этим профилем больше не будут получать эти настройки."
      },
      "diskEncryption": {
        "title": "Шифрование диска",
        "description": "Требовать шифрование диска на хостах",
        "enabled": "Включено",
        "disabled": "Отключено",
        "enforced": "Принудительно",
        "status": {
          "verified": "Проверено",
          "verifying": "Проверка",
          "actionRequired": "Требуется действие",
          "enforcing": "Применение",
          "failed": "Ошибка"
        }
      }
    }
  }
}
```

---

## Quality Checklist
- [ ] All OS Settings components have `useTranslation("settings")`
- [ ] All strings use `t("controls.osSettings.*")`
- [ ] English translations added
- [ ] Russian translations added
- [ ] Files synced to `assets/locales/`
