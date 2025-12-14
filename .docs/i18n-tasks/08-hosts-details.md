# Task: Host Details Pages i18n (hosts namespace)

## Overview
Translate all remaining host detail components to Russian. Management pages are mostly done, but details pages need work.

## Project Context
- **Repository:** MDM application (React + TypeScript)
- **i18n Library:** i18next, react-i18next
- **Target Language:** Russian (ru)
- **Namespace:** `hosts`

## File Locations
- **English translations:** `frontend/locales/en/hosts.json` AND `assets/locales/en/hosts.json`
- **Russian translations:** `frontend/locales/ru/hosts.json` AND `assets/locales/ru/hosts.json`

**IMPORTANT:** Always update BOTH `frontend/locales/` AND `assets/locales/` to keep them in sync.

---

## Already Completed (DO NOT MODIFY)
- `frontend/pages/hosts/ManageHostsPage/ManageHostsPage.tsx`
- `frontend/pages/hosts/components/DeleteHostModal/DeleteHostModal.tsx`
- `frontend/pages/hosts/components/TransferHostModal/TransferHostModal.tsx`
- `frontend/pages/hosts/ManageHostsPage/components/EditColumnsModal/EditColumnsModal.jsx`
- `frontend/pages/hosts/ManageHostsPage/components/DeleteLabelModal/DeleteLabelModal.tsx`
- `frontend/pages/hosts/ManageHostsPage/components/CustomLabelGroupHeading/CustomLabelGroupHeading.tsx`
- `frontend/pages/hosts/details/cards/About/About.tsx`
- `frontend/pages/hosts/details/cards/Activity/Activity.tsx`
- `frontend/pages/hosts/details/cards/Software/HostSoftware.tsx`
- `frontend/pages/hosts/details/cards/Policies/HostPolicies.tsx`
- `frontend/pages/hosts/details/cards/Queries/HostQueries.tsx`
- `frontend/pages/hosts/details/cards/Labels/Labels.tsx`
- `frontend/pages/hosts/details/cards/LocalUserAccounts/LocalUserAccounts.tsx`
- `frontend/pages/hosts/details/cards/MunkiIssues/MunkiIssues.tsx`

---

## Components to Translate

### Section 1: Host Details Main
**Files:**
- `frontend/pages/hosts/details/HostDetailsPage/HostDetailsPage.tsx`
- `frontend/pages/hosts/details/HostDetailsPage/HostActionsDropdown/HostActionsDropdown.tsx`
- `frontend/pages/hosts/details/HostDetailsPage/HostDetailsBanners/HostDetailsBanners.tsx`

### Section 2: Host Header & Summary
**Files:**
- `frontend/pages/hosts/details/cards/HostHeader/HostHeader.tsx`
- `frontend/pages/hosts/details/cards/HostSummary/HostSummary.tsx`
- `frontend/pages/hosts/details/cards/HostSummary/BootstrapPackageIndicator/BootstrapPackageIndicator.tsx`
- `frontend/pages/hosts/details/cards/HostSummary/OSSettingsIndicator/OSSettingsIndicator.tsx`

### Section 3: Activity Items
**Files:**
- `frontend/pages/hosts/details/cards/Activity/ActivityItems/CanceledInstallSoftwareActivityItem/CanceledInstallSoftwareActivityItem.tsx`
- `frontend/pages/hosts/details/cards/Activity/ActivityItems/CanceledRunScriptActivityItem/CanceledRunScriptActivityItem.tsx`
- `frontend/pages/hosts/details/cards/Activity/ActivityItems/CanceledUninstallSoftwareActivityItem/CanceledUninstallSoftwareActivityItem.tsx`
- `frontend/pages/hosts/details/cards/Activity/ActivityItems/InstalledSoftwareActivityItem/InstalledSoftwareActivityItem.tsx`
- `frontend/pages/hosts/details/cards/Activity/ActivityItems/LockedHostActivityItem/LockedHostActivityItem.tsx`
- `frontend/pages/hosts/details/cards/Activity/ActivityItems/RanScriptActivityItem/RanScriptActivityItem.tsx`
- `frontend/pages/hosts/details/cards/Activity/ActivityItems/ReadHostDiskEncryptionKey/ReadHostDiskEncryptionKey.tsx`
- `frontend/pages/hosts/details/cards/Activity/ActivityItems/UnlockedHostActivityItem/UnlockedHostActivityItem.tsx`
- `frontend/pages/hosts/details/cards/Activity/ActivityItems/WipedHostActivityItem/WipedHostActivityItem.tsx`
- `frontend/pages/hosts/details/cards/Activity/EmptyFeed/EmptyFeed.tsx`
- `frontend/pages/hosts/details/cards/Activity/PastActivityFeed/PastActivityFeed.tsx`
- `frontend/pages/hosts/details/cards/Activity/UpcomingActivityFeed/UpcomingActivityFeed.tsx`
- `frontend/pages/hosts/details/cards/Activity/ActivityConfig.tsx`

### Section 4: Host Details Modals
**Files:**
- `frontend/pages/hosts/details/HostDetailsPage/BootstrapPackageModal/BootstrapPackageModal.tsx`
- `frontend/pages/hosts/details/HostDetailsPage/CancelActivityModal/CancelActivityModal.tsx`
- `frontend/pages/hosts/details/HostDetailsPage/ConfirmRunScriptModal/ConfirmRunScriptModal.tsx`
- `frontend/pages/hosts/details/HostDetailsPage/DiskEncryptionKeyModal/DiskEncryptionKeyModal.tsx`
- `frontend/pages/hosts/details/HostDetailsPage/LockModal/LockModal.tsx`
- `frontend/pages/hosts/details/HostDetailsPage/RunScriptModal/RunScriptModal.tsx`
- `frontend/pages/hosts/details/HostDetailsPage/ScriptModalGroup/ScriptModalGroup.tsx`
- `frontend/pages/hosts/details/HostDetailsPage/SelectQueryModal/SelectQueryModal.tsx`
- `frontend/pages/hosts/details/HostDetailsPage/UnenrollMdmModal/UnenrollMdmModal.tsx`
- `frontend/pages/hosts/details/HostDetailsPage/UnlockModal/UnlockModal.tsx`
- `frontend/pages/hosts/details/HostDetailsPage/WipeModal/WipeModal.tsx`

### Section 5: Software Tables
**Files:**
- `frontend/pages/hosts/details/cards/Software/HostSoftwareTable/HostSoftwareTable.tsx`
- `frontend/pages/hosts/details/cards/Software/HostSoftwareTable/HostSoftwareTableConfig.tsx`
- `frontend/pages/hosts/details/cards/Software/HostSoftwareLibraryTable/HostSoftwareLibraryTable.tsx`
- `frontend/pages/hosts/details/cards/Software/HostInstallerActionCell/HostInstallerActionCell.tsx`

### Section 6: Self Service
**Files:**
- `frontend/pages/hosts/details/cards/Software/SelfService/SelfService.tsx`
- `frontend/pages/hosts/details/cards/Software/SelfService/SelfServiceCard/SelfServiceCard.tsx`
- `frontend/pages/hosts/details/cards/Software/SelfService/CategoriesMenu/CategoriesMenu.tsx`
- `frontend/pages/hosts/details/cards/Software/SelfService/OpenSoftwareModal/OpenSoftwareModal.tsx`
- `frontend/pages/hosts/details/cards/Software/SelfService/SelfServiceFilters/SelfServiceFilters.tsx`
- `frontend/pages/hosts/details/cards/Software/SelfService/SelfServiceHeader/SelfServiceHeader.tsx`
- `frontend/pages/hosts/details/cards/Software/SelfService/SelfServiceTable/SelfServiceTable.tsx`
- `frontend/pages/hosts/details/cards/Software/SelfService/SelfServiceTiles/SelfServiceTiles.tsx`
- `frontend/pages/hosts/details/cards/Software/SelfService/SoftwareUpdateModal/SoftwareUpdateModal.tsx`
- `frontend/pages/hosts/details/cards/Software/SelfService/TileActionStatus/TileActionStatus.tsx`
- `frontend/pages/hosts/details/cards/Software/SelfService/UninstallSoftwareModal/UninstallSoftwareModal.tsx`
- `frontend/pages/hosts/details/cards/Software/SelfService/UpdatesCard/UpdatesCard.tsx`
- `frontend/pages/hosts/details/cards/Software/SelfService/UpdatesCard/UpdateSoftwareItem/UpdateSoftwareItem.tsx`

### Section 7: Other Cards
**Files:**
- `frontend/pages/hosts/details/cards/Certificates/Certificates.tsx`
- `frontend/pages/hosts/details/cards/Certificates/CertificatesTable/CertificatesTable.tsx`
- `frontend/pages/hosts/details/cards/Certificates/CertificatesTable/CertificatesTableConfig.tsx`
- `frontend/pages/hosts/details/cards/Packs/Packs.tsx`
- `frontend/pages/hosts/details/cards/Packs/PackTable/PackTableConfig.tsx`
- `frontend/pages/hosts/details/cards/AgentOptions/AgentOptions.tsx`
- `frontend/pages/hosts/details/cards/User/User.tsx`
- `frontend/pages/hosts/details/cards/User/UpdateEndUserModal/UpdateEndUserModal.tsx`
- `frontend/pages/hosts/details/cards/User/UserValue/UserValue.tsx`

### Section 8: Device User Page
**Files:**
- `frontend/pages/hosts/details/DeviceUserPage/DeviceUserPage.tsx`
- `frontend/pages/hosts/details/DeviceUserPage/AutoEnrollMdmModal/AutoEnrollMdmModal.tsx`
- `frontend/pages/hosts/details/DeviceUserPage/BitLockerPinModal/BitLockerPinModal.tsx`
- `frontend/pages/hosts/details/DeviceUserPage/CreateLinuxKeyModal/CreateLinuxKeyModal.tsx`
- `frontend/pages/hosts/details/DeviceUserPage/InfoModal/InfoModal.tsx`
- `frontend/pages/hosts/details/DeviceUserPage/DeviceUserBanners/DeviceUserBanners.tsx`
- `frontend/pages/hosts/details/DeviceUserPage/InfoButton/InfoButton.tsx`
- `frontend/pages/hosts/details/DeviceUserPage/SettingUpYourDevice/SettingUpYourDevice.tsx`
- `frontend/pages/hosts/details/DeviceUserPage/SetupStatusTable/SetupStatusTable.tsx`

### Section 9: OS Settings Modal
**Files:**
- `frontend/pages/hosts/details/OSSettingsModal/OSSettingsModal.tsx`
- `frontend/pages/hosts/details/OSSettingsModal/OSSettingsTable/OSSettingsTable.tsx`
- `frontend/pages/hosts/details/OSSettingsModal/OSSettingsTable/OSSettingsTableConfig.tsx`
- `frontend/pages/hosts/details/OSSettingsModal/OSSettingStatusCell/OSSettingStatusCell.tsx`
- `frontend/pages/hosts/details/OSSettingsModal/OSSettingStatusCell/ActionRequired.tsx`
- `frontend/pages/hosts/details/OSSettingsModal/OSSettingStatusCell/TooltipContent.tsx`
- `frontend/pages/hosts/details/OSSettingsModal/OSSettingsErrorCell/OSSettingsErrorCell.tsx`
- `frontend/pages/hosts/details/OSSettingsModal/OSSettingsNameCell/OSSettingsNameCell.tsx`

### Section 10: Other Components
**Files:**
- `frontend/pages/hosts/details/HostQueryReport/HostQueryReport.tsx`
- `frontend/pages/hosts/details/HostQueryReport/HQRTable/HQRTable.tsx`
- `frontend/pages/hosts/details/HostQueryReport/HQRTable/HQRTableConfig.tsx`
- `frontend/pages/hosts/details/ProfileStatusIndicator/ProfileStatusIndicator.tsx`
- `frontend/pages/hosts/details/CertificateDetailsModal/CertificateDetailsModal.tsx`
- `frontend/pages/hosts/details/InventoryVersionsModal/InventoryVersionsModal.tsx`

### Section 11: Manage Hosts Filters
**Files:**
- `frontend/pages/hosts/ManageHostsPage/components/HostsFilterBlock/HostsFilterBlock.tsx`
- `frontend/pages/hosts/ManageHostsPage/components/BootstrapPackageStatusFilter/BootstrapPackageStatusFilter.tsx`
- `frontend/pages/hosts/ManageHostsPage/components/DiskEncryptionStatusFilter/DiskEncryptionStatusFilter.tsx`
- `frontend/pages/hosts/ManageHostsPage/components/LabelFilterSelect/LabelFilterSelect.tsx`
- `frontend/pages/hosts/ManageHostsPage/components/PoliciesFilter/PoliciesFilter.tsx`
- `frontend/pages/hosts/ManageHostsPage/components/FilterPill/FilterPill.tsx`
- `frontend/pages/hosts/ManageHostsPage/components/RunScriptBatchModal/RunScriptBatchModal.tsx`

---

## Additional Translation Keys Needed

```json
{
  "detailsPage": {
    "title": "Host details",
    "banners": {
      "refetching": "Refetching host data...",
      "mdmOff": "MDM is turned off for this host",
      "pendingLock": "Lock pending",
      "pendingWipe": "Wipe pending"
    }
  },
  "header": {
    "hostname": "Hostname",
    "platform": "Platform",
    "osVersion": "OS version",
    "status": "Status",
    "team": "Team"
  },
  "summary": {
    "osSettings": "OS settings",
    "bootstrapPackage": "Bootstrap package",
    "diskEncryption": "Disk encryption",
    "mdm": "MDM"
  },
  "activityItems": {
    "canceledInstall": "Canceled software install",
    "canceledScript": "Canceled script run",
    "canceledUninstall": "Canceled software uninstall",
    "installedSoftware": "Installed software",
    "lockedHost": "Locked host",
    "ranScript": "Ran script",
    "readDiskKey": "Read disk encryption key",
    "unlockedHost": "Unlocked host",
    "wipedHost": "Wiped host"
  },
  "modals": {
    "lock": {
      "title": "Lock host",
      "message": "Are you sure you want to lock this host?",
      "warning": "The user will be locked out of their device."
    },
    "unlock": {
      "title": "Unlock host",
      "message": "Enter the unlock PIN to unlock this host."
    },
    "wipe": {
      "title": "Wipe host",
      "message": "Are you sure you want to wipe this host?",
      "warning": "All data will be permanently deleted."
    },
    "diskEncryptionKey": {
      "title": "Disk encryption key",
      "copyKey": "Copy key"
    },
    "runScript": {
      "title": "Run script",
      "selectScript": "Select a script to run"
    }
  },
  "selfService": {
    "title": "Self-service",
    "install": "Install",
    "uninstall": "Uninstall",
    "update": "Update",
    "categories": "Categories",
    "allApps": "All apps"
  },
  "certificates": {
    "title": "Certificates",
    "noCertificates": "No certificates found"
  },
  "deviceUser": {
    "title": "My device",
    "settingUp": "Setting up your device",
    "enrollMdm": "Enroll in MDM",
    "bitlockerPin": "BitLocker PIN",
    "createLinuxKey": "Create Linux encryption key"
  },
  "osSettingsModal": {
    "title": "OS settings",
    "status": "Status",
    "profile": "Profile",
    "actionRequired": "Action required"
  }
}
```

---

## Russian Translations (additional keys)

```json
{
  "detailsPage": {
    "title": "Детали хоста",
    "banners": {
      "refetching": "Обновление данных хоста...",
      "mdmOff": "MDM отключён для этого хоста",
      "pendingLock": "Ожидается блокировка",
      "pendingWipe": "Ожидается очистка"
    }
  },
  "header": {
    "hostname": "Имя хоста",
    "platform": "Платформа",
    "osVersion": "Версия ОС",
    "status": "Статус",
    "team": "Команда"
  },
  "summary": {
    "osSettings": "Настройки ОС",
    "bootstrapPackage": "Пакет начальной загрузки",
    "diskEncryption": "Шифрование диска",
    "mdm": "MDM"
  },
  "activityItems": {
    "canceledInstall": "Установка ПО отменена",
    "canceledScript": "Выполнение скрипта отменено",
    "canceledUninstall": "Удаление ПО отменено",
    "installedSoftware": "ПО установлено",
    "lockedHost": "Хост заблокирован",
    "ranScript": "Скрипт выполнен",
    "readDiskKey": "Ключ шифрования диска прочитан",
    "unlockedHost": "Хост разблокирован",
    "wipedHost": "Хост очищен"
  },
  "modals": {
    "lock": {
      "title": "Заблокировать хост",
      "message": "Вы уверены, что хотите заблокировать этот хост?",
      "warning": "Пользователь будет заблокирован на своём устройстве."
    },
    "unlock": {
      "title": "Разблокировать хост",
      "message": "Введите PIN-код для разблокировки хоста."
    },
    "wipe": {
      "title": "Очистить хост",
      "message": "Вы уверены, что хотите очистить этот хост?",
      "warning": "Все данные будут безвозвратно удалены."
    },
    "diskEncryptionKey": {
      "title": "Ключ шифрования диска",
      "copyKey": "Копировать ключ"
    },
    "runScript": {
      "title": "Запустить скрипт",
      "selectScript": "Выберите скрипт для запуска"
    }
  },
  "selfService": {
    "title": "Самообслуживание",
    "install": "Установить",
    "uninstall": "Удалить",
    "update": "Обновить",
    "categories": "Категории",
    "allApps": "Все приложения"
  },
  "certificates": {
    "title": "Сертификаты",
    "noCertificates": "Сертификаты не найдены"
  },
  "deviceUser": {
    "title": "Моё устройство",
    "settingUp": "Настройка вашего устройства",
    "enrollMdm": "Зарегистрироваться в MDM",
    "bitlockerPin": "PIN-код BitLocker",
    "createLinuxKey": "Создать ключ шифрования Linux"
  },
  "osSettingsModal": {
    "title": "Настройки ОС",
    "status": "Статус",
    "profile": "Профиль",
    "actionRequired": "Требуется действие"
  }
}
```

---

## Quality Checklist
- [ ] All 85+ components have `useTranslation("hosts")` added
- [ ] All hardcoded strings replaced with `t()` calls
- [ ] English translations added for all new keys
- [ ] Russian translations added for all keys
- [ ] Files synced to `assets/locales/`
- [ ] Host details page fully translated
- [ ] All modals fully translated
- [ ] Activity items translated
- [ ] Self-service section translated
- [ ] Device user page translated
- [ ] OS settings modal translated
