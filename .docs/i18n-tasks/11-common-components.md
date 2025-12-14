# Task: Common Components i18n (common namespace)

## Overview
Translate remaining common/shared components to Russian. Some common components are already done.

## Project Context
- **Repository:** MDM application (React + TypeScript)
- **i18n Library:** i18next, react-i18next
- **Target Language:** Russian (ru)
- **Namespace:** `common`

## File Locations
- **English translations:** `frontend/locales/en/common.json` AND `assets/locales/en/common.json`
- **Russian translations:** `frontend/locales/ru/common.json` AND `assets/locales/ru/common.json`

**IMPORTANT:** Always update BOTH `frontend/locales/` AND `assets/locales/` to keep them in sync.

---

## Already Completed (DO NOT MODIFY)
- `frontend/components/TeamsDropdown/TeamsDropdown.tsx`
- `frontend/components/TargetLabelSelector/TargetLabelSelector.tsx`
- `frontend/components/top_nav/SiteTopNav/SiteTopNav.tsx`
- `frontend/components/top_nav/UserMenu/UserMenu.tsx`
- `frontend/components/EnrollSecrets/EnrollSecretModal/EnrollSecretModal.tsx`
- `frontend/components/EnrollSecrets/DeleteSecretModal/DeleteSecretModal.tsx`
- `frontend/components/EnrollSecrets/SecretEditorModal/SecretEditorModal.tsx`
- `frontend/components/DeviceUserError/DeviceUserError.tsx`
- `frontend/components/LanguageSwitcher/LanguageSwitcher.tsx`
- `frontend/components/forms/UserSettingsForm/UserSettingsForm.jsx`
- `frontend/components/forms/ChangePasswordForm/ChangePasswordForm.jsx`
- `frontend/components/forms/ChangeEmailForm/ChangeEmailForm.jsx`

---

## Components to Translate

### Section 1: Main Layout
**Files:**
- `frontend/components/MainContent/MainContent.tsx`
- `frontend/components/SideNav/SideNav.tsx`
- `frontend/components/SideNav/NavItem.tsx`

### Section 2: Navigation
**Files:**
- `frontend/components/top_nav/` - Any remaining files
- `frontend/components/Pagination/Pagination.tsx`
- `frontend/components/Breadcrumbs/Breadcrumbs.tsx`

### Section 3: Buttons (check for any with hardcoded text)
**Files:**
- `frontend/components/buttons/Button/Button.tsx`
- `frontend/components/buttons/BackLink/BackLink.tsx`
- `frontend/components/buttons/RevealButton/RevealButton.tsx`
- `frontend/components/buttons/CopyButton/CopyButton.tsx`
- `frontend/components/buttons/DownloadButton/DownloadButton.tsx`

### Section 4: Modal Base Components
**Files:**
- `frontend/components/Modal/Modal.tsx`
- `frontend/components/Modal/ModalHeader.tsx`
- `frontend/components/Modal/ModalFooter.tsx`
- `frontend/components/ConfirmationModal/ConfirmationModal.tsx`

### Section 5: Table Components
**Files:**
- `frontend/components/TableContainer/TableContainer.tsx`
- `frontend/components/TableContainer/DataTable/DataTable.tsx`
- `frontend/components/TableContainer/TableCount/TableCount.tsx`
- `frontend/components/TableContainer/EmptyTable/EmptyTable.tsx`
- `frontend/components/TableContainer/FilterButtons/FilterButtons.tsx`

### Section 6: Form Components
**Files:**
- `frontend/components/forms/fields/InputField/InputField.tsx`
- `frontend/components/forms/fields/SelectField/SelectField.tsx`
- `frontend/components/forms/fields/Checkbox/Checkbox.tsx`
- `frontend/components/forms/fields/Radio/Radio.tsx`
- `frontend/components/forms/fields/TextareaField/TextareaField.tsx`
- `frontend/components/forms/fields/FileUploader/FileUploader.tsx`
- `frontend/components/forms/validators/` - Validation messages

### Section 7: Search & Filter
**Files:**
- `frontend/components/SearchField/SearchField.tsx`
- `frontend/components/FilterDropdown/FilterDropdown.tsx`
- `frontend/components/Dropdown/Dropdown.tsx`

### Section 8: Status & Indicators
**Files:**
- `frontend/components/StatusIndicator/StatusIndicator.tsx`
- `frontend/components/Spinner/Spinner.tsx`
- `frontend/components/ProgressBar/ProgressBar.tsx`
- `frontend/components/Badge/Badge.tsx`
- `frontend/components/Pill/Pill.tsx`

### Section 9: Tooltips & Info
**Files:**
- `frontend/components/Tooltip/Tooltip.tsx`
- `frontend/components/InfoBanner/InfoBanner.tsx`
- `frontend/components/WarningBanner/WarningBanner.tsx`
- `frontend/components/HelpText/HelpText.tsx`

### Section 10: Cards & Containers
**Files:**
- `frontend/components/Card/Card.tsx`
- `frontend/components/SectionHeader/SectionHeader.tsx`
- `frontend/components/Panel/Panel.tsx`

### Section 11: Other Shared Components
**Files:**
- `frontend/components/Avatar/Avatar.tsx`
- `frontend/components/ClipboardButton/ClipboardButton.tsx`
- `frontend/components/CodeBlock/CodeBlock.tsx`
- `frontend/components/EmptyState/EmptyState.tsx`
- `frontend/components/FlashMessage/FlashMessage.tsx`
- `frontend/components/Icon/Icon.tsx`
- `frontend/components/LastUpdatedText/LastUpdatedText.tsx`
- `frontend/components/LiveQuery/` - Components related to live queries
- `frontend/components/PlatformIcon/PlatformIcon.tsx`
- `frontend/components/StatusCell/StatusCell.tsx`
- `frontend/components/UserBlock/UserBlock.tsx`

### Section 12: GitOps Components
**Files:**
- `frontend/components/GitOpsMessage/GitOpsMessage.tsx`
- `frontend/components/GitOpsModeTooltip/GitOpsModeTooltip.tsx`

### Section 13: Premium Features
**Files:**
- `frontend/components/PremiumFeatureMessage/PremiumFeatureMessage.tsx`
- `frontend/components/SandboxGate/SandboxGate.tsx`

---

## Implementation Pattern

```tsx
import { useTranslation } from "react-i18next";

const SearchField = ({ placeholder }) => {
  const { t } = useTranslation("common");

  return (
    <input
      placeholder={placeholder || t("labels.search")}
    />
  );
};
```

---

## Additional Translation Keys

```json
{
  "layout": {
    "mainContent": "Main content",
    "sideNav": "Side navigation",
    "skipToMain": "Skip to main content"
  },
  "pagination": {
    "previous": "Previous",
    "next": "Next",
    "page": "Page",
    "of": "of",
    "showing": "Showing",
    "to": "to",
    "results": "results"
  },
  "tables": {
    "noData": "No data available",
    "loading": "Loading...",
    "selectAll": "Select all",
    "selected": "{{count}} selected",
    "sortAscending": "Sort ascending",
    "sortDescending": "Sort descending",
    "rowsPerPage": "Rows per page"
  },
  "forms": {
    "required": "Required",
    "optional": "Optional",
    "chooseFile": "Choose file",
    "dragAndDrop": "Drag and drop or click to upload",
    "maxFileSize": "Maximum file size: {{size}}",
    "supportedFormats": "Supported formats: {{formats}}"
  },
  "search": {
    "placeholder": "Search...",
    "noResults": "No results found",
    "clearSearch": "Clear search"
  },
  "status": {
    "loading": "Loading...",
    "saving": "Saving...",
    "saved": "Saved",
    "error": "Error",
    "success": "Success",
    "pending": "Pending",
    "inProgress": "In progress",
    "completed": "Completed",
    "failed": "Failed",
    "cancelled": "Cancelled"
  },
  "messages": {
    "copiedToClipboard": "Copied to clipboard",
    "downloadStarted": "Download started",
    "uploadComplete": "Upload complete",
    "uploadFailed": "Upload failed",
    "changesSaved": "Changes saved",
    "changesDiscarded": "Changes discarded"
  },
  "modals": {
    "close": "Close",
    "confirm": "Confirm",
    "cancel": "Cancel",
    "areYouSure": "Are you sure?",
    "cannotUndo": "This action cannot be undone."
  },
  "premium": {
    "featureUnavailable": "This feature is available in Fleet Premium",
    "upgradeTo": "Upgrade to Fleet Premium",
    "learnMore": "Learn more about Fleet Premium"
  },
  "gitops": {
    "readOnly": "This item is managed by GitOps and cannot be edited here.",
    "learnMore": "Learn more about GitOps"
  },
  "empty": {
    "noItems": "No items",
    "getStarted": "Get started by adding your first item"
  },
  "accessibility": {
    "expandMenu": "Expand menu",
    "collapseMenu": "Collapse menu",
    "openDropdown": "Open dropdown",
    "closeDropdown": "Close dropdown",
    "showPassword": "Show password",
    "hidePassword": "Hide password"
  }
}
```

---

## Russian Translations

```json
{
  "layout": {
    "mainContent": "Основное содержимое",
    "sideNav": "Боковая навигация",
    "skipToMain": "Перейти к основному содержимому"
  },
  "pagination": {
    "previous": "Назад",
    "next": "Далее",
    "page": "Страница",
    "of": "из",
    "showing": "Показано",
    "to": "до",
    "results": "результатов"
  },
  "tables": {
    "noData": "Данные отсутствуют",
    "loading": "Загрузка...",
    "selectAll": "Выбрать все",
    "selected": "Выбрано: {{count}}",
    "sortAscending": "Сортировать по возрастанию",
    "sortDescending": "Сортировать по убыванию",
    "rowsPerPage": "Строк на странице"
  },
  "forms": {
    "required": "Обязательно",
    "optional": "Необязательно",
    "chooseFile": "Выбрать файл",
    "dragAndDrop": "Перетащите или нажмите для загрузки",
    "maxFileSize": "Максимальный размер файла: {{size}}",
    "supportedFormats": "Поддерживаемые форматы: {{formats}}"
  },
  "search": {
    "placeholder": "Поиск...",
    "noResults": "Результаты не найдены",
    "clearSearch": "Очистить поиск"
  },
  "status": {
    "loading": "Загрузка...",
    "saving": "Сохранение...",
    "saved": "Сохранено",
    "error": "Ошибка",
    "success": "Успешно",
    "pending": "Ожидание",
    "inProgress": "Выполняется",
    "completed": "Завершено",
    "failed": "Не удалось",
    "cancelled": "Отменено"
  },
  "messages": {
    "copiedToClipboard": "Скопировано в буфер обмена",
    "downloadStarted": "Загрузка началась",
    "uploadComplete": "Загрузка завершена",
    "uploadFailed": "Загрузка не удалась",
    "changesSaved": "Изменения сохранены",
    "changesDiscarded": "Изменения отменены"
  },
  "modals": {
    "close": "Закрыть",
    "confirm": "Подтвердить",
    "cancel": "Отмена",
    "areYouSure": "Вы уверены?",
    "cannotUndo": "Это действие нельзя отменить."
  },
  "premium": {
    "featureUnavailable": "Эта функция доступна в Fleet Premium",
    "upgradeTo": "Перейти на Fleet Premium",
    "learnMore": "Узнать больше о Fleet Premium"
  },
  "gitops": {
    "readOnly": "Этот элемент управляется GitOps и не может быть изменён здесь.",
    "learnMore": "Узнать больше о GitOps"
  },
  "empty": {
    "noItems": "Элементы отсутствуют",
    "getStarted": "Начните с добавления первого элемента"
  },
  "accessibility": {
    "expandMenu": "Развернуть меню",
    "collapseMenu": "Свернуть меню",
    "openDropdown": "Открыть выпадающий список",
    "closeDropdown": "Закрыть выпадающий список",
    "showPassword": "Показать пароль",
    "hidePassword": "Скрыть пароль"
  }
}
```

---

## Quality Checklist
- [ ] All remaining common components have `useTranslation("common")` added
- [ ] All hardcoded strings replaced with `t()` calls
- [ ] English translations added for all new keys
- [ ] Russian translations added for all keys
- [ ] Files synced to `assets/locales/`
- [ ] Navigation components translated
- [ ] Table components translated
- [ ] Form components and validation messages translated
- [ ] Status indicators translated
- [ ] Modal common elements translated
- [ ] Accessibility labels translated
