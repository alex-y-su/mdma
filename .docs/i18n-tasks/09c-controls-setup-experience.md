# Task: Manage Controls - Setup Experience & Secrets (settings namespace)

## Overview
Implement i18n for Setup Experience and Secrets sections. Part 3 of 3.

## Project Context
- **Namespace:** `settings` (add `controls.setupExperience` and `controls.secrets`)
- **Files:** `frontend/locales/{en,ru}/settings.json` AND `assets/locales/{en,ru}/settings.json`

---

## Components: Secrets

- `frontend/pages/ManageControlsPage/Secrets/Secrets.tsx`
- `frontend/pages/ManageControlsPage/Secrets/AddSecretModal/AddSecretModal.tsx`
- `frontend/pages/ManageControlsPage/Secrets/DeleteSecretModal/DeleteSecretModal.tsx`

---

## Components: Setup Experience Main

- `frontend/pages/ManageControlsPage/SetupExperience/SetupExperience.tsx`
- `frontend/pages/ManageControlsPage/SetupExperience/SetupExperienceNavItems.tsx`
- `frontend/pages/ManageControlsPage/SetupExperience/SetupExperienceContentContainer/SetupExperienceContentContainer.tsx`

---

## Components: Bootstrap Package

- `frontend/pages/ManageControlsPage/SetupExperience/cards/BootstrapPackage/BootstrapPackage.tsx`
- `frontend/pages/ManageControlsPage/SetupExperience/cards/BootstrapPackage/BootstrapPackageListItem/BootstrapPackageListItem.tsx`
- `frontend/pages/ManageControlsPage/SetupExperience/cards/BootstrapPackage/BootstrapPackageTable/BootstrapPackageTable.tsx`
- `frontend/pages/ManageControlsPage/SetupExperience/cards/BootstrapPackage/BootstrapAdvancedOptions/BootstrapAdvancedOptions.tsx`
- `frontend/pages/ManageControlsPage/SetupExperience/cards/BootstrapPackage/BootstrapPackageUploader/BootstrapPackageUploader.tsx`
- `frontend/pages/ManageControlsPage/SetupExperience/cards/BootstrapPackage/DeleteBootstrapPackageModal/DeleteBootstrapPackageModal.tsx`
- `frontend/pages/ManageControlsPage/SetupExperience/cards/BootstrapPackage/UploadedPackageView/UploadedPackageView.tsx`

---

## Components: Setup Assistant

- `frontend/pages/ManageControlsPage/SetupExperience/cards/SetupAssistant/SetupAssistant.tsx`
- `frontend/pages/ManageControlsPage/SetupExperience/cards/SetupAssistant/SetupAssistantProfileCard/SetupAssistantProfileCard.tsx`
- `frontend/pages/ManageControlsPage/SetupExperience/cards/SetupAssistant/SetupAssistantProfileUploader/SetupAssistantProfileUploader.tsx`
- `frontend/pages/ManageControlsPage/SetupExperience/cards/SetupAssistant/AdvancedOptionsForm/AdvancedOptionsForm.tsx`
- `frontend/pages/ManageControlsPage/SetupExperience/cards/SetupAssistant/DeleteAutoEnrollmentProfile/DeleteAutoEnrollmentProfile.tsx`

---

## Components: Install Software

- `frontend/pages/ManageControlsPage/SetupExperience/cards/InstallSoftware/InstallSoftware.tsx`
- `frontend/pages/ManageControlsPage/SetupExperience/cards/InstallSoftware/AddInstallSoftware/AddInstallSoftware.tsx`
- `frontend/pages/ManageControlsPage/SetupExperience/cards/InstallSoftware/SelectSoftwareModal/SelectSoftwareModal.tsx`
- `frontend/pages/ManageControlsPage/SetupExperience/cards/InstallSoftware/SelectSoftwareTable/SelectSoftwareTable.tsx`

---

## Components: End User Auth & Run Script

- `frontend/pages/ManageControlsPage/SetupExperience/cards/EndUserAuthentication/EndUserAuthentication.tsx`
- `frontend/pages/ManageControlsPage/SetupExperience/cards/EndUserAuthentication/EndUserAuthForm/EndUserAuthForm.tsx`
- `frontend/pages/ManageControlsPage/SetupExperience/cards/RunScript/RunScript.tsx`
- `frontend/pages/ManageControlsPage/SetupExperience/cards/RunScript/SetupExperienceScriptCard/SetupExperienceScriptCard.tsx`
- `frontend/pages/ManageControlsPage/SetupExperience/cards/RunScript/SetupExperienceScriptUploader/SetupExperienceScriptUploader.tsx`
- `frontend/pages/ManageControlsPage/SetupExperience/cards/RunScript/DeleteSetupExperienceScriptModal/DeleteSetupExperienceScriptModal.tsx`

---

## Components: Shared

- `frontend/pages/ManageControlsPage/components/UploadList/UploadList.tsx`

---

## Implementation Pattern

```tsx
import { useTranslation } from "react-i18next";

const SetupExperience = () => {
  const { t } = useTranslation("settings");
  return <h1>{t("controls.setupExperience.title")}</h1>;
};
```

---

## English Translations

```json
{
  "controls": {
    "secrets": {
      "title": "Secrets",
      "description": "Manage secrets for scripts",
      "addSecret": "Add secret",
      "deleteSecret": "Delete secret",
      "secretName": "Secret name",
      "secretValue": "Secret value",
      "noSecrets": "No secrets",
      "addSecretDescription": "Add secrets that can be used in scripts",
      "modals": {
        "add": {
          "title": "Add secret",
          "nameLabel": "Name",
          "namePlaceholder": "SECRET_NAME",
          "valueLabel": "Value",
          "valuePlaceholder": "Secret value"
        },
        "delete": {
          "title": "Delete secret",
          "message": "Are you sure you want to delete \"{{name}}\"?",
          "warning": "Scripts using this secret will fail."
        }
      }
    },
    "setupExperience": {
      "title": "Setup experience",
      "description": "Configure the new device setup experience",
      "navItems": {
        "bootstrapPackage": "Bootstrap package",
        "setupAssistant": "Setup assistant",
        "installSoftware": "Install software",
        "endUserAuth": "End user authentication",
        "runScript": "Run script"
      },
      "bootstrapPackage": {
        "title": "Bootstrap package",
        "description": "Package installed during device setup",
        "upload": "Upload package",
        "delete": "Delete package",
        "noPackage": "No bootstrap package",
        "uploadDescription": "Upload a package to install during setup",
        "advancedOptions": "Advanced options",
        "modals": {
          "delete": {
            "title": "Delete bootstrap package",
            "message": "Are you sure you want to delete this package?",
            "warning": "New devices will not receive this package."
          }
        }
      },
      "setupAssistant": {
        "title": "Setup assistant",
        "description": "Configure the macOS setup assistant",
        "uploadProfile": "Upload profile",
        "deleteProfile": "Delete profile",
        "noProfile": "No setup assistant profile",
        "uploadDescription": "Upload a profile to customize setup assistant",
        "advancedOptions": "Advanced options",
        "modals": {
          "delete": {
            "title": "Delete setup assistant profile",
            "message": "Are you sure you want to delete this profile?"
          }
        }
      },
      "installSoftware": {
        "title": "Install software",
        "description": "Software installed during setup",
        "addSoftware": "Add software",
        "selectSoftware": "Select software",
        "noSoftware": "No software configured",
        "addDescription": "Add software to install during device setup",
        "modals": {
          "select": {
            "title": "Select software",
            "searchPlaceholder": "Search software"
          }
        }
      },
      "endUserAuth": {
        "title": "End user authentication",
        "description": "Require authentication during setup",
        "enabled": "Enabled",
        "disabled": "Disabled",
        "form": {
          "idpLabel": "Identity provider",
          "idpPlaceholder": "Select identity provider"
        }
      },
      "runScript": {
        "title": "Run script",
        "description": "Script run during device setup",
        "uploadScript": "Upload script",
        "deleteScript": "Delete script",
        "noScript": "No setup script",
        "uploadDescription": "Upload a script to run during setup",
        "modals": {
          "delete": {
            "title": "Delete setup script",
            "message": "Are you sure you want to delete this script?"
          }
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
    "secrets": {
      "title": "Секреты",
      "description": "Управление секретами для скриптов",
      "addSecret": "Добавить секрет",
      "deleteSecret": "Удалить секрет",
      "secretName": "Название секрета",
      "secretValue": "Значение секрета",
      "noSecrets": "Нет секретов",
      "addSecretDescription": "Добавьте секреты для использования в скриптах",
      "modals": {
        "add": {
          "title": "Добавить секрет",
          "nameLabel": "Название",
          "namePlaceholder": "SECRET_NAME",
          "valueLabel": "Значение",
          "valuePlaceholder": "Значение секрета"
        },
        "delete": {
          "title": "Удалить секрет",
          "message": "Вы уверены, что хотите удалить \"{{name}}\"?",
          "warning": "Скрипты, использующие этот секрет, перестанут работать."
        }
      }
    },
    "setupExperience": {
      "title": "Настройка устройства",
      "description": "Настройка процесса первоначальной настройки устройства",
      "navItems": {
        "bootstrapPackage": "Пакет начальной загрузки",
        "setupAssistant": "Ассистент настройки",
        "installSoftware": "Установка ПО",
        "endUserAuth": "Аутентификация пользователя",
        "runScript": "Запуск скрипта"
      },
      "bootstrapPackage": {
        "title": "Пакет начальной загрузки",
        "description": "Пакет, устанавливаемый при настройке устройства",
        "upload": "Загрузить пакет",
        "delete": "Удалить пакет",
        "noPackage": "Нет пакета начальной загрузки",
        "uploadDescription": "Загрузите пакет для установки при настройке",
        "advancedOptions": "Дополнительные параметры",
        "modals": {
          "delete": {
            "title": "Удалить пакет",
            "message": "Вы уверены, что хотите удалить этот пакет?",
            "warning": "Новые устройства не получат этот пакет."
          }
        }
      },
      "setupAssistant": {
        "title": "Ассистент настройки",
        "description": "Настройка ассистента настройки macOS",
        "uploadProfile": "Загрузить профиль",
        "deleteProfile": "Удалить профиль",
        "noProfile": "Нет профиля ассистента настройки",
        "uploadDescription": "Загрузите профиль для настройки ассистента",
        "advancedOptions": "Дополнительные параметры",
        "modals": {
          "delete": {
            "title": "Удалить профиль ассистента",
            "message": "Вы уверены, что хотите удалить этот профиль?"
          }
        }
      },
      "installSoftware": {
        "title": "Установка ПО",
        "description": "ПО, устанавливаемое при настройке",
        "addSoftware": "Добавить ПО",
        "selectSoftware": "Выбрать ПО",
        "noSoftware": "ПО не настроено",
        "addDescription": "Добавьте ПО для установки при настройке устройства",
        "modals": {
          "select": {
            "title": "Выбрать ПО",
            "searchPlaceholder": "Поиск ПО"
          }
        }
      },
      "endUserAuth": {
        "title": "Аутентификация пользователя",
        "description": "Требовать аутентификацию при настройке",
        "enabled": "Включено",
        "disabled": "Отключено",
        "form": {
          "idpLabel": "Провайдер идентификации",
          "idpPlaceholder": "Выберите провайдер"
        }
      },
      "runScript": {
        "title": "Запуск скрипта",
        "description": "Скрипт, выполняемый при настройке устройства",
        "uploadScript": "Загрузить скрипт",
        "deleteScript": "Удалить скрипт",
        "noScript": "Нет скрипта настройки",
        "uploadDescription": "Загрузите скрипт для запуска при настройке",
        "modals": {
          "delete": {
            "title": "Удалить скрипт настройки",
            "message": "Вы уверены, что хотите удалить этот скрипт?"
          }
        }
      }
    }
  }
}
```

---

## Quality Checklist
- [ ] All Secrets components translated
- [ ] All Setup Experience components translated
- [ ] All Bootstrap Package components translated
- [ ] All Setup Assistant components translated
- [ ] All Install Software components translated
- [ ] End User Auth components translated
- [ ] Run Script components translated
- [ ] English and Russian JSONs updated
- [ ] Files synced to `assets/locales/`
