# i18n Translation Audit Report - Authentication Components
**Date**: 2025-12-14
**Branch**: i18n
**Auditor**: Claude Code

## ✅ COMPLETE - Fully Translated Components

### 1. LoginPage + LoginForm
- **Status**: ✅ Complete
- **Files**:
  - `frontend/pages/LoginPage/LoginPage.tsx`
  - `frontend/components/forms/LoginForm/LoginForm.tsx`
- **Translation Keys Used**: `auth:login.*`, `forms:validation.*`
- **Verification**: No hardcoded user-facing strings found

### 2. ForgotPasswordPage + ForgotPasswordForm
- **Status**: ✅ Complete
- **Files**:
  - `frontend/pages/ForgotPasswordPage/ForgotPasswordPage.tsx`
  - `frontend/components/forms/ForgotPasswordForm/ForgotPasswordForm.jsx`
- **Translation Keys Used**: `auth:forgotPassword.*`
- **Verification**: No hardcoded user-facing strings found

### 3. ResetPasswordPage + ResetPasswordForm
- **Status**: ✅ Complete
- **Files**:
  - `frontend/pages/ResetPasswordPage/ResetPasswordPage.tsx`
  - `frontend/components/forms/ResetPasswordForm/ResetPasswordForm.tsx`
- **Translation Keys Used**: `auth:resetPassword.*`, `forms:validation.*`
- **Verification**: No hardcoded user-facing strings found

### 4. ConfirmInvitePage
- **Status**: ✅ Complete
- **File**: `frontend/pages/ConfirmInvitePage/ConfirmInvitePage.tsx`
- **Translation Keys Used**: Imports `useTranslation()`
- **Note**: Uses existing `auth:invite.*` keys

---

## ⚠️ INCOMPLETE - Components with Untranslated Strings

### 5. MfaPage
- **Status**: ❌ NOT TRANSLATED
- **File**: `frontend/pages/MfaPage/MfaPage.tsx`
- **Hardcoded Strings Found**:
  - Line 99: `"Log in"` (button text)
  - Line 106: `"Invalid token"` (header)
  - Line 109: `"Log in again for a new link."` (description)
  - Line 111: `"Back to login"` (button text)
- **Required Action**: Add `useTranslation()` and use `auth:mfa.*` keys
- **Translation Keys Needed**:
  ```
  auth:mfa.loginButton
  auth:mfa.invalidToken.title
  auth:mfa.invalidToken.message
  auth:mfa.backToLogin
  ```

### 6. LogoutPage
- **Status**: ❌ NOT TRANSLATED
- **File**: `frontend/pages/LogoutPage/LogoutPage.tsx`
- **Hardcoded Strings Found**:
  - Line 30: `"Unable to log out of your account"` (error message)
- **Required Action**: Add `useTranslation()` and translate error message
- **Translation Keys Needed**:
  ```
  auth:logout.error
  ```

### 7. NoAccessPage
- **Status**: ❌ NOT TRANSLATED
- **File**: `frontend/pages/NoAccessPage/NoAccessPage.tsx`
- **Hardcoded Strings Found**:
  - Line 44: `"Access denied"` (header)
  - Line 52: `"This account does not currently have access to Fleet."`
  - Line 57: `"contact your administrator"` (link text)
  - Line 63: `"Back to login"` (button text)
- **Required Action**: Add `useTranslation()` and create translation keys
- **Translation Keys Needed**:
  ```
  auth:noAccess.title
  auth:noAccess.message
  auth:noAccess.contactLink
  auth:noAccess.backToLogin
  ```

### 8. ApiOnlyUser
- **Status**: ❌ NOT TRANSLATED
- **File**: `frontend/pages/ApiOnlyUser/ApiOnlyUser.tsx`
- **Hardcoded Strings Found**:
  - Line 41: `"Access denied"` (header)
  - Line 45: `"You attempted to access Fleet with an"`
  - Line 47: `"API only user"` (link text)
  - Line 54: `"This user doesn't have access to the Fleet UI."`
  - Line 58: `"Back to login"` (button text)
- **Required Action**: Add `useTranslation()` and create translation keys
- **Translation Keys Needed**:
  ```
  auth:apiOnlyUser.title
  auth:apiOnlyUser.description
  auth:apiOnlyUser.linkText
  auth:apiOnlyUser.noUiAccess
  auth:apiOnlyUser.backToLogin
  ```

### 9. ConfirmSSOInvitePage
- **Status**: ❌ NOT TRANSLATED
- **File**: `frontend/pages/ConfirmSSOInvitePage/ConfirmSSOInvitePage.tsx`
- **Required Action**: Audit for hardcoded strings, add i18n

### 10. RegistrationPage + Breadcrumbs
- **Status**: ❌ NOT TRANSLATED
- **Files**:
  - `frontend/pages/RegistrationPage/RegistrationPage.tsx`
  - `frontend/pages/RegistrationPage/Breadcrumbs/Breadcrumbs.tsx`
- **Required Action**: Audit for hardcoded strings, add i18n

### 11. AccountPage + AccountSidePanel
- **Status**: ❌ NOT TRANSLATED
- **Files**:
  - `frontend/pages/AccountPage/AccountPage.tsx`
  - `frontend/pages/AccountPage/AccountSidePanel/AccountSidePanel.tsx`
- **Required Action**: Audit for hardcoded strings, add i18n

---

## Summary Statistics

- **Total Auth Components**: 11
- **Fully Translated**: 4 (36%)
- **Not Translated**: 7 (64%)
- **Critical User-Facing Strings Found**: ~15+ hardcoded strings

## Priority Actions Required

### 1. High Priority (User sees these frequently)
- **MfaPage** - 4 hardcoded strings
- **NoAccessPage** - 4 hardcoded strings
- **ApiOnlyUser** - 5 hardcoded strings

### 2. Medium Priority (Error scenarios)
- **LogoutPage** - 1 error message

### 3. Lower Priority (Infrequent flows)
- ConfirmSSOInvitePage
- RegistrationPage
- AccountPage

---

## Recommended Next Steps

1. ✅ Complete MfaPage, NoAccessPage, and ApiOnlyUser translations first
2. ✅ Add corresponding Russian translations to `frontend/locales/ru/auth.json`
3. ✅ Sync translations to `assets/locales/` directory
4. ✅ Test each page with Russian language selected
5. ✅ Create PR with translations
6. ⚠️ Address remaining components (ConfirmSSOInvitePage, RegistrationPage, AccountPage)

## Russian Translations Needed

Add these sections to `frontend/locales/ru/auth.json`:

```json
{
  "mfa": {
    "loginButton": "Войти",
    "invalidToken": {
      "title": "Недействительный токен",
      "message": "Войдите снова для получения новой ссылки."
    },
    "backToLogin": "Вернуться к входу"
  },
  "logout": {
    "error": "Не удалось выйти из вашей учетной записи"
  },
  "noAccess": {
    "title": "Доступ запрещен",
    "message": "Эта учетная запись в настоящее время не имеет доступа к Fleet.",
    "contactLink": "свяжитесь с администратором",
    "backToLogin": "Вернуться к входу"
  },
  "apiOnlyUser": {
    "title": "Доступ запрещен",
    "description": "Вы попытались получить доступ к Fleet с помощью",
    "linkText": "пользователя только для API",
    "noUiAccess": "Этот пользователь не имеет доступа к интерфейсу Fleet.",
    "backToLogin": "Вернуться к входу"
  }
}
```
