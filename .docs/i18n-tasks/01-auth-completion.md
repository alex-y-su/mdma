# Task: Complete Authentication Pages i18n (auth namespace)

## Overview
Finish translating remaining authentication pages to Russian. Some auth pages are already done.

## Project Context
- **Repository:** MDM application (React + TypeScript)
- **i18n Library:** i18next, react-i18next
- **Target Language:** Russian (ru)
- **Namespace:** `auth`

## File Locations
- **English translations:** `frontend/locales/en/auth.json` AND `assets/locales/en/auth.json`
- **Russian translations:** `frontend/locales/ru/auth.json` AND `assets/locales/ru/auth.json`

**IMPORTANT:** Always update BOTH `frontend/locales/` AND `assets/locales/` to keep them in sync.

---

## Already Completed (DO NOT MODIFY)
These components already have i18n implemented:
- `frontend/pages/LoginPage/LoginPage.tsx`
- `frontend/components/forms/LoginForm/LoginForm.tsx`
- `frontend/pages/ForgotPasswordPage/ForgotPasswordPage.tsx`
- `frontend/pages/ResetPasswordPage/ResetPasswordPage.tsx`
- `frontend/components/forms/ResetPasswordForm/ResetPasswordForm.tsx`
- `frontend/pages/ConfirmInvitePage/ConfirmInvitePage.tsx`
- `frontend/components/forms/ConfirmInviteForm/ConfirmInviteForm.tsx`

---

## Components to Translate

### 1. MfaPage
**File:** `frontend/pages/MfaPage/MfaPage.tsx`

### 2. LogoutPage
**File:** `frontend/pages/LogoutPage/LogoutPage.tsx`

### 3. ConfirmSSOInvitePage
**File:** `frontend/pages/ConfirmSSOInvitePage/ConfirmSSOInvitePage.tsx`

### 4. RegistrationPage
**Files:**
- `frontend/pages/RegistrationPage/RegistrationPage.tsx`
- `frontend/pages/RegistrationPage/Breadcrumbs/Breadcrumbs.tsx`

### 5. AccountPage
**Files:**
- `frontend/pages/AccountPage/AccountPage.tsx`
- `frontend/pages/AccountPage/AccountSidePanel/AccountSidePanel.tsx`

### 6. MDM Apple SSO Pages
**Files:**
- `frontend/pages/MDMAppleSSOPage/MDMAppleSSOPage.tsx`
- `frontend/pages/MDMAppleSSOCallbackPage/MDMAppleSSOCallbackPage.tsx`

### 7. Other Auth Pages
**Files:**
- `frontend/pages/ApiOnlyUser/ApiOnlyUser.tsx`
- `frontend/pages/NoAccessPage/NoAccessPage.tsx`

---

## Implementation Steps

### Step 1: Read the component file
```bash
# Read each component to identify hardcoded strings
```

### Step 2: Add useTranslation hook
```tsx
import { useTranslation } from "react-i18next";

const MyComponent = () => {
  const { t } = useTranslation("auth");
  // ...
};
```

### Step 3: Replace hardcoded strings
```tsx
// Before
<h1>Two-factor authentication</h1>

// After
<h1>{t("mfa.title")}</h1>
```

### Step 4: Add translations to JSON files

**English (auth.json):**
```json
{
  "mfa": {
    "title": "Two-factor authentication",
    "subtitle": "Enter the verification code from your authenticator app."
  }
}
```

**Russian (auth.json):**
```json
{
  "mfa": {
    "title": "Двухфакторная аутентификация",
    "subtitle": "Введите код подтверждения из приложения-аутентификатора."
  }
}
```

### Step 5: Sync to assets
Copy updated JSON files from `frontend/locales/` to `assets/locales/` for both `en` and `ru`.

---

## Existing Translation Keys (auth.json)
Reference these existing keys to maintain consistency:
- `login.*` - Login page strings
- `logout.*` - Logout page strings
- `forgotPassword.*` - Forgot password flow
- `resetPassword.*` - Reset password flow
- `changePassword.*` - Change password form
- `changeEmail.*` - Change email form
- `mfa.*` - MFA page (partially exists)
- `invite.*` - Invite confirmation
- `session.*` - Session messages
- `apiToken.*` - API token modal

---

## Russian Translation Reference
| English | Russian |
|---------|---------|
| Two-factor authentication | Двухфакторная аутентификация |
| Verification code | Код подтверждения |
| Verify | Подтвердить |
| Log out | Выйти |
| Logged out | Вы вышли из системы |
| My account | Мой аккаунт |
| Profile | Профиль |
| Registration | Регистрация |
| Sign up | Зарегистрироваться |
| Single sign-on | Единый вход (SSO) |
| No access | Нет доступа |
| API only | Только API |

---

## Quality Checklist
- [ ] All hardcoded strings replaced with `t()` calls
- [ ] Translation keys are descriptive and hierarchical
- [ ] English translations added to `frontend/locales/en/auth.json`
- [ ] Russian translations added to `frontend/locales/ru/auth.json`
- [ ] Both files synced to `assets/locales/`
- [ ] No TypeScript errors
- [ ] Interpolation variables preserved (e.g., `{{name}}`)
