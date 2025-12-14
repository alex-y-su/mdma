# Task: Complete Admin Pages i18n (settings namespace)

## Overview
Finish translating remaining admin/settings pages to Russian. Some admin components are already done.

## Project Context
- **Repository:** MDM application (React + TypeScript)
- **i18n Library:** i18next, react-i18next
- **Target Language:** Russian (ru)
- **Namespace:** `settings`

## File Locations
- **English translations:** `frontend/locales/en/settings.json` AND `assets/locales/en/settings.json`
- **Russian translations:** `frontend/locales/ru/settings.json` AND `assets/locales/ru/settings.json`

**IMPORTANT:** Always update BOTH `frontend/locales/` AND `assets/locales/` to keep them in sync.

---

## Already Completed (DO NOT MODIFY)
- `frontend/pages/admin/AdminWrapper.tsx`
- `frontend/pages/admin/TeamManagementPage/TeamManagementPage.tsx`
- `frontend/pages/admin/TeamManagementPage/components/CreateTeamModal/CreateTeamModal.tsx`
- `frontend/pages/admin/TeamManagementPage/components/DeleteTeamModal/DeleteTeamModal.tsx`
- `frontend/pages/admin/UserManagementPage/components/UsersTable/UsersTable.tsx`
- `frontend/pages/admin/UserManagementPage/components/AddUserModal/AddUserModal.tsx`
- `frontend/pages/admin/UserManagementPage/components/EditUserModal/EditUserModal.tsx`
- `frontend/pages/admin/UserManagementPage/components/DeleteUserModal/DeleteUserModal.tsx`
- `frontend/pages/admin/IntegrationsPage/cards/Integrations/Integrations.tsx`
- `frontend/pages/admin/IntegrationsPage/cards/CertificateAuthorities/CertificateAuthorities.tsx`

---

## Components to Translate

### Section 1: User Management
**Files:**
- `frontend/pages/admin/UserManagementPage/UserManagementPage.tsx`
- `frontend/pages/admin/UserManagementPage/components/UserForm/UserForm.tsx`
- `frontend/pages/admin/UserManagementPage/components/SelectRoleForm/SelectRoleForm.tsx`
- `frontend/pages/admin/UserManagementPage/components/SelectedTeamsForm/SelectedTeamsForm.tsx`
- `frontend/pages/admin/UserManagementPage/components/ResetPasswordModal/ResetPasswordModal.tsx`
- `frontend/pages/admin/UserManagementPage/components/ResetSessionsModal/ResetSessionsModal.tsx`

### Section 2: Organization Settings
**Files:**
- `frontend/pages/admin/OrgSettingsPage/OrgSettingsPage.tsx`
- `frontend/pages/admin/OrgSettingsPage/cards/Info/Info.tsx`
- `frontend/pages/admin/OrgSettingsPage/cards/WebAddress/WebAddress.tsx`
- `frontend/pages/admin/OrgSettingsPage/cards/Smtp/Smtp.tsx`
- `frontend/pages/admin/OrgSettingsPage/cards/Statistics/Statistics.tsx`
- `frontend/pages/admin/OrgSettingsPage/cards/Agents/Agents.tsx`
- `frontend/pages/admin/OrgSettingsPage/cards/FleetDesktop/FleetDesktop.tsx`
- `frontend/pages/admin/OrgSettingsPage/cards/Advanced/Advanced.tsx`

### Section 3: Team Management Additional
**Files:**
- `frontend/pages/admin/TeamManagementPage/TeamDetailsWrapper/TeamSettings/TeamSettings.tsx`
- `frontend/pages/admin/TeamManagementPage/TeamDetailsWrapper/TeamSettings/TeamHostExpiryToggle/TeamHostExpiryToggle.tsx`
- `frontend/pages/admin/TeamManagementPage/TeamDetailsWrapper/UsersPage/UsersPage.tsx`
- `frontend/pages/admin/TeamManagementPage/TeamDetailsWrapper/AgentOptionsPage/AgentOptionsPage.tsx`

### Section 4: Integrations Page
**Files:**
- `frontend/pages/admin/IntegrationsPage/IntegrationsPage.tsx`
- `frontend/pages/admin/IntegrationsPage/cards/Integrations/AddIntegrationModal/AddIntegrationModal.tsx`
- `frontend/pages/admin/IntegrationsPage/cards/Integrations/DeleteIntegrationModal/DeleteIntegrationModal.tsx`
- `frontend/pages/admin/IntegrationsPage/cards/Integrations/IntegrationForm/IntegrationForm.tsx`

### Section 5: SSO Settings
**Files:** `frontend/pages/admin/IntegrationsPage/cards/Sso/` (all files)

### Section 6: Identity Providers
**Files:**
- `frontend/pages/admin/IntegrationsPage/cards/IdentityProviders/IdentityProviderSection.tsx`
- `frontend/pages/admin/IntegrationsPage/cards/IdentityProviders/EndUserAuthSection.tsx`

### Section 7: Calendars
**Files:** `frontend/pages/admin/IntegrationsPage/cards/Calendars/` (all files)

### Section 8: Change Management
**Files:** `frontend/pages/admin/IntegrationsPage/cards/ChangeManagement/` (all files)

### Section 9: Conditional Access
**Files:**
- `frontend/pages/admin/IntegrationsPage/cards/ConditionalAccess/EntraConditionalAccessModal.tsx`
- `frontend/pages/admin/IntegrationsPage/cards/ConditionalAccess/OktaConditionalAccessModal.tsx`

### Section 10: Host Status Webhook
**Files:** `frontend/pages/admin/IntegrationsPage/cards/GlobalHostStatusWebhook/` (all files)

### Section 11: MDM Settings
**Files:**
- `frontend/pages/admin/IntegrationsPage/cards/MdmSettings/AppleMdmPage/AppleMdmPage.tsx`
- `frontend/pages/admin/IntegrationsPage/cards/MdmSettings/AppleMdmPage/components/content/` (all files)
- `frontend/pages/admin/IntegrationsPage/cards/MdmSettings/AppleMdmPage/components/modals/RenewCertModal/RenewCertModal.tsx`
- `frontend/pages/admin/IntegrationsPage/cards/MdmSettings/AppleMdmPage/components/modals/TurnOffAppleMdmModal/TurnOffAppleMdmModal.tsx`
- `frontend/pages/admin/IntegrationsPage/cards/MdmSettings/AndroidMdmPage/AndroidMdmPage.tsx`
- `frontend/pages/admin/IntegrationsPage/cards/MdmSettings/AndroidMdmPage/TurnOffAndroidMdmModal/TurnOffAndroidMdmModal.tsx`
- `frontend/pages/admin/IntegrationsPage/cards/MdmSettings/WindowsMdmPage/WindowsMdmPage.tsx`
- `frontend/pages/admin/IntegrationsPage/cards/MdmSettings/WindowsAutomaticEnrollmentPage/WindowsAutomaticEnrollmentPage.tsx`

### Section 12: VPP Page
**Files:**
- `frontend/pages/admin/IntegrationsPage/cards/MdmSettings/VppPage/VppPage.tsx`
- `frontend/pages/admin/IntegrationsPage/cards/MdmSettings/VppPage/VppTable/VppTable.tsx`
- `frontend/pages/admin/IntegrationsPage/cards/MdmSettings/VppPage/VppSetupSteps/VppSetupSteps.tsx`
- `frontend/pages/admin/IntegrationsPage/cards/MdmSettings/VppPage/AddVppModal/AddVppModal.tsx`
- `frontend/pages/admin/IntegrationsPage/cards/MdmSettings/VppPage/EditTeamsVppModal/EditTeamsVppModal.tsx`
- `frontend/pages/admin/IntegrationsPage/cards/MdmSettings/VppPage/RenewVppModal/RenewVppModal.tsx`
- `frontend/pages/admin/IntegrationsPage/cards/MdmSettings/VppPage/DeleteVppModal/DeleteVppModal.tsx`
- `frontend/pages/admin/IntegrationsPage/cards/MdmSettings/VppPage/VppTable/TeamsCell/TeamsCell.tsx`

### Section 13: Apple Business Manager
**Files:**
- `frontend/pages/admin/IntegrationsPage/cards/MdmSettings/AppleBusinessManagerPage/AppleBusinessManagerPage.tsx`
- `frontend/pages/admin/IntegrationsPage/cards/MdmSettings/AppleBusinessManagerPage/AppleBusinessManagerTable/AppleBusinessManagerTable.tsx`
- `frontend/pages/admin/IntegrationsPage/cards/MdmSettings/AppleBusinessManagerPage/AppleBusinessManagerTable/OrgNameCell/OrgNameCell.tsx`
- `frontend/pages/admin/IntegrationsPage/cards/MdmSettings/AppleBusinessManagerPage/AddAbmModal/AddAbmModal.tsx`
- `frontend/pages/admin/IntegrationsPage/cards/MdmSettings/AppleBusinessManagerPage/EditTeamsAbmModal/EditTeamsAbmModal.tsx`
- `frontend/pages/admin/IntegrationsPage/cards/MdmSettings/AppleBusinessManagerPage/RenewAbmModal/RenewAbmModal.tsx`
- `frontend/pages/admin/IntegrationsPage/cards/MdmSettings/AppleBusinessManagerPage/DeleteAbmModal/DeleteAbmModal.tsx`

### Section 14: Certificate Authorities Forms
**Files:**
- `frontend/pages/admin/IntegrationsPage/cards/CertificateAuthorities/CustomSCEPForm/CustomSCEPForm.tsx`
- `frontend/pages/admin/IntegrationsPage/cards/CertificateAuthorities/CustomESTForm/CustomESTForm.tsx`
- `frontend/pages/admin/IntegrationsPage/cards/CertificateAuthorities/SmallstepForm/SmallstepForm.tsx`
- `frontend/pages/admin/IntegrationsPage/cards/CertificateAuthorities/NDESForm/NDESForm.tsx`
- `frontend/pages/admin/IntegrationsPage/cards/CertificateAuthorities/DigicertForm/DigicertForm.tsx`
- `frontend/pages/admin/IntegrationsPage/cards/CertificateAuthorities/HydrantForm/HydrantForm.tsx`
- `frontend/pages/admin/IntegrationsPage/cards/CertificateAuthorities/CertificateAuthorityList/CertificateAuthorityList.tsx`
- `frontend/pages/admin/IntegrationsPage/cards/CertificateAuthorities/CertAuthorityListHeader/CertAuthorityListHeader.tsx`
- `frontend/pages/admin/IntegrationsPage/cards/CertificateAuthorities/CertAuthorityListItem/CertAuthorityListItem.tsx`
- `frontend/pages/admin/IntegrationsPage/cards/CertificateAuthorities/AddCertAuthorityCard/AddCertAuthorityCard.tsx`
- `frontend/pages/admin/IntegrationsPage/cards/CertificateAuthorities/AddCertAuthorityModal/AddCertAuthorityModal.tsx`
- `frontend/pages/admin/IntegrationsPage/cards/CertificateAuthorities/EditCertAuthorityModal/EditCertAuthorityModal.tsx`
- `frontend/pages/admin/IntegrationsPage/cards/CertificateAuthorities/DeleteCertificateAuthorityModal/DeleteCertificateAuthorityModal.tsx`

### Section 15: MDM Settings Sections
**Files:**
- `frontend/pages/admin/IntegrationsPage/cards/MdmSettings/components/MdmSettingsSection/MdmSettingsSection.tsx`
- `frontend/pages/admin/IntegrationsPage/cards/MdmSettings/components/MdmSettingsSection/AppleMdmCard/AppleMdmCard.tsx`
- `frontend/pages/admin/IntegrationsPage/cards/MdmSettings/components/MdmSettingsSection/AndroidMdmCard/AndroidMdmCard.tsx`
- `frontend/pages/admin/IntegrationsPage/cards/MdmSettings/components/MdmSettingsSection/WindowsMdmCard/WindowsMdmCard.tsx`
- `frontend/pages/admin/IntegrationsPage/cards/MdmSettings/components/AppleBusinessManagerSection/AppleBusinessManagerSection.tsx`
- `frontend/pages/admin/IntegrationsPage/cards/MdmSettings/components/AppleBusinessManagerSection/AppleAutomaticEnrollmentCard/AppleAutomaticEnrollmentCard.tsx`
- `frontend/pages/admin/IntegrationsPage/cards/MdmSettings/components/AppleBusinessManagerSection/VppCard/VppCard.tsx`
- `frontend/pages/admin/IntegrationsPage/cards/MdmSettings/components/MicrosoftEntraSection/MicrosoftEntraSection.tsx`
- `frontend/pages/admin/IntegrationsPage/cards/MdmSettings/components/MicrosoftEntraSection/WindowsAutomaticEnrollmentCard/WindowsAutomaticEnrollmentCard.tsx`
- `frontend/pages/admin/IntegrationsPage/cards/MdmSettings/components/EulaSection/EulaSection.tsx`
- `frontend/pages/admin/IntegrationsPage/cards/MdmSettings/components/EulaSection/EulaListItem/EulaListItem.tsx`
- `frontend/pages/admin/IntegrationsPage/cards/MdmSettings/components/EulaSection/EulaUploader/EulaUploader.tsx`
- `frontend/pages/admin/IntegrationsPage/cards/MdmSettings/components/EulaSection/UploadedEulaView/UploadedEulaView.tsx`
- `frontend/pages/admin/IntegrationsPage/cards/MdmSettings/components/EulaSection/DeleteEulaModal/DeleteEulaModal.tsx`
- `frontend/pages/admin/IntegrationsPage/cards/MdmSettings/components/EndUserMigrationSection/EndUserMigrationSection.tsx`
- `frontend/pages/admin/IntegrationsPage/cards/MdmSettings/components/SectionCard/SectionCard.tsx`
- `frontend/pages/admin/IntegrationsPage/cards/MdmSettings/components/RenewDateCell/RenewDateCell.tsx`
- `frontend/pages/admin/IntegrationsPage/cards/MdmSettings/components/ExampleWebhookUrlPayloadModal/ExampleWebhookUrlPayloadModal.tsx`

---

## Implementation Pattern

```tsx
import { useTranslation } from "react-i18next";

const OrgSettingsPage = () => {
  const { t } = useTranslation("settings");

  return (
    <div>
      <h1>{t("organization.title")}</h1>
    </div>
  );
};
```

---

## Additional Translation Keys

```json
{
  "userManagement": {
    "resetPassword": {
      "title": "Require password reset",
      "message": "The user will be required to reset their password on next login."
    },
    "resetSessions": {
      "title": "Reset sessions",
      "message": "All active sessions for this user will be terminated."
    },
    "forms": {
      "selectRole": "Select role",
      "selectTeams": "Select teams",
      "roleDescription": "Choose a role for this user"
    }
  },
  "orgSettings": {
    "info": {
      "orgName": "Organization name",
      "logoUrl": "Organization logo URL",
      "contactUrl": "Contact URL"
    },
    "webAddress": {
      "serverUrl": "Fleet server URL"
    },
    "smtp": {
      "title": "SMTP options",
      "senderAddress": "Sender address",
      "server": "SMTP server",
      "port": "Port",
      "enableTls": "Enable TLS",
      "authMethod": "Authentication method"
    },
    "agents": {
      "title": "Agent options",
      "description": "Configure osquery options for all hosts"
    },
    "statistics": {
      "title": "Usage statistics",
      "description": "Help improve Fleet by sharing anonymous usage data"
    },
    "fleetDesktop": {
      "title": "Fleet Desktop",
      "transparencyUrl": "Transparency URL"
    },
    "advanced": {
      "title": "Advanced options",
      "hostExpiry": "Host expiry",
      "hostExpiryWindow": "Host expiry window (days)",
      "disableLiveQueries": "Disable live queries"
    }
  },
  "mdmSettings": {
    "apple": {
      "title": "Apple MDM",
      "turnOn": "Turn on Apple MDM",
      "turnOff": "Turn off Apple MDM",
      "renewCert": "Renew certificate",
      "apnsExpiry": "APNs certificate expires"
    },
    "android": {
      "title": "Android MDM",
      "turnOn": "Turn on Android MDM",
      "turnOff": "Turn off Android MDM"
    },
    "windows": {
      "title": "Windows MDM",
      "turnOn": "Turn on Windows MDM",
      "turnOff": "Turn off Windows MDM"
    },
    "vpp": {
      "title": "Volume Purchasing Program (VPP)",
      "addToken": "Add VPP token",
      "renewToken": "Renew token",
      "deleteToken": "Delete token",
      "editTeams": "Edit teams"
    },
    "abm": {
      "title": "Apple Business Manager",
      "addConnection": "Add ABM connection",
      "renewToken": "Renew token",
      "deleteConnection": "Delete connection",
      "editTeams": "Edit teams"
    },
    "eula": {
      "title": "End user license agreement",
      "upload": "Upload EULA",
      "delete": "Delete EULA"
    }
  },
  "certificateAuthorities": {
    "title": "Certificate authorities",
    "add": "Add certificate authority",
    "edit": "Edit certificate authority",
    "delete": "Delete certificate authority",
    "types": {
      "scep": "SCEP",
      "est": "EST",
      "ndes": "NDES",
      "digicert": "DigiCert",
      "smallstep": "Smallstep",
      "hydrant": "Hydrant"
    }
  }
}
```

---

## Russian Translations

```json
{
  "userManagement": {
    "resetPassword": {
      "title": "Требовать сброс пароля",
      "message": "Пользователю потребуется сбросить пароль при следующем входе."
    },
    "resetSessions": {
      "title": "Сбросить сессии",
      "message": "Все активные сессии этого пользователя будут завершены."
    },
    "forms": {
      "selectRole": "Выберите роль",
      "selectTeams": "Выберите команды",
      "roleDescription": "Выберите роль для этого пользователя"
    }
  },
  "orgSettings": {
    "info": {
      "orgName": "Название организации",
      "logoUrl": "URL логотипа организации",
      "contactUrl": "URL для связи"
    },
    "webAddress": {
      "serverUrl": "URL сервера Fleet"
    },
    "smtp": {
      "title": "Настройки SMTP",
      "senderAddress": "Адрес отправителя",
      "server": "SMTP-сервер",
      "port": "Порт",
      "enableTls": "Включить TLS",
      "authMethod": "Метод аутентификации"
    },
    "agents": {
      "title": "Параметры агента",
      "description": "Настройка параметров osquery для всех хостов"
    },
    "statistics": {
      "title": "Статистика использования",
      "description": "Помогите улучшить Fleet, делясь анонимными данными об использовании"
    },
    "fleetDesktop": {
      "title": "Fleet Desktop",
      "transparencyUrl": "URL прозрачности"
    },
    "advanced": {
      "title": "Дополнительные параметры",
      "hostExpiry": "Срок действия хоста",
      "hostExpiryWindow": "Окно истечения срока хоста (дни)",
      "disableLiveQueries": "Отключить live-запросы"
    }
  },
  "mdmSettings": {
    "apple": {
      "title": "Apple MDM",
      "turnOn": "Включить Apple MDM",
      "turnOff": "Выключить Apple MDM",
      "renewCert": "Обновить сертификат",
      "apnsExpiry": "Срок действия сертификата APNs истекает"
    },
    "android": {
      "title": "Android MDM",
      "turnOn": "Включить Android MDM",
      "turnOff": "Выключить Android MDM"
    },
    "windows": {
      "title": "Windows MDM",
      "turnOn": "Включить Windows MDM",
      "turnOff": "Выключить Windows MDM"
    },
    "vpp": {
      "title": "Программа массовых закупок (VPP)",
      "addToken": "Добавить токен VPP",
      "renewToken": "Обновить токен",
      "deleteToken": "Удалить токен",
      "editTeams": "Изменить команды"
    },
    "abm": {
      "title": "Apple Business Manager",
      "addConnection": "Добавить подключение ABM",
      "renewToken": "Обновить токен",
      "deleteConnection": "Удалить подключение",
      "editTeams": "Изменить команды"
    },
    "eula": {
      "title": "Лицензионное соглашение",
      "upload": "Загрузить EULA",
      "delete": "Удалить EULA"
    }
  },
  "certificateAuthorities": {
    "title": "Центры сертификации",
    "add": "Добавить центр сертификации",
    "edit": "Редактировать центр сертификации",
    "delete": "Удалить центр сертификации",
    "types": {
      "scep": "SCEP",
      "est": "EST",
      "ndes": "NDES",
      "digicert": "DigiCert",
      "smallstep": "Smallstep",
      "hydrant": "Hydrant"
    }
  }
}
```

---

## Quality Checklist
- [ ] All 70+ components have `useTranslation("settings")` added
- [ ] All hardcoded strings replaced with `t()` calls
- [ ] English translations added for all new keys
- [ ] Russian translations added for all keys
- [ ] Files synced to `assets/locales/`
- [ ] User management section fully translated
- [ ] Organization settings fully translated
- [ ] All integrations pages translated
- [ ] All MDM settings pages translated
- [ ] Certificate authority forms translated
- [ ] All modals translated
