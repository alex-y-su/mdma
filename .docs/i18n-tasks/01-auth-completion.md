# i18n Task: Authentication Flow Translation

## Objective
Complete internationalization (i18n) implementation for the authentication flow in the Fleet frontend application. This includes login, password reset, and forgot password pages.

## Scope
The following components need i18n support:

### 1. LoginPage (`frontend/pages/LoginPage/LoginPage.tsx`)
- Page header: "Welcome to Fleet"
- SSO status messages (4 messages)
- Authentication error messages

### 2. LoginForm (`frontend/components/forms/LoginForm/LoginForm.tsx`)
Strings to translate:
- "Email field must be completed"
- "Email must be a valid email address"
- "Password field must be completed"
- "Single sign-on"
- "Sign in with {idpName}"
- "Back to login"
- "Check your email"
- "We sent an email to you at {email}. Please click the magic link in the email to sign in."
- "Email" (label/placeholder)
- "Password" (label/placeholder)
- "Log in" (button text)
- "Forgot password?" (link text)

### 3. ForgotPasswordPage (`frontend/pages/ForgotPasswordPage/ForgotPasswordPage.tsx`)
Strings to translate:
- "Reset password" (header)
- Email sent confirmation message
- "Password reset FAQ" (link text)

### 4. ForgotPasswordForm (`frontend/components/forms/ForgotPasswordForm/ForgotPasswordForm.jsx`)
Strings to translate:
- "Enter your email below to receive an email with instructions to reset your password."
- "Email" (label/placeholder)
- "Get instructions" (button text)

### 5. ResetPasswordPage (`frontend/pages/ResetPasswordPage/ResetPasswordPage.tsx`)
Strings to translate:
- Password requirements description

### 6. ResetPasswordForm (`frontend/components/forms/ResetPasswordForm/ResetPasswordForm.tsx`)
Strings to translate:
- "New password confirmation field must be completed"
- "New password field must be completed"
- "Passwords do not match"
- "New password" (label/placeholder)
- "12-48 characters, with at least 1 number (e.g. 0 - 9) and 1 symbol (e.g. &*#)." (help text)
- "Confirm password" (label/placeholder)
- "Reset password" (button text)

## Implementation Steps

1. **Set up i18n infrastructure**
   - Install react-i18next and i18next packages
   - Configure i18n for the frontend application
   - Set up language detection and fallback
   - Create locale file structure

2. **Create translation keys and files**
   - Define translation key structure
   - Create English (en) translation file as baseline
   - Create translation files for Spanish (es), French (fr), German (de)

3. **Update components**
   - Replace hardcoded strings with translation hooks
   - Update components to use `useTranslation` hook
   - Ensure dynamic values (like email addresses) are properly interpolated

4. **Testing**
   - Test all authentication flows with each language
   - Verify translations display correctly
   - Ensure error messages are properly translated

## Target Languages
Based on existing i18n configuration in the codebase:
- English (en) - baseline
- Spanish (es)
- French (fr)
- German (de)

## Status
- [ ] i18n infrastructure setup
- [ ] Translation files created
- [ ] LoginPage/LoginForm updated
- [ ] ForgotPasswordPage/ForgotPasswordForm updated
- [ ] ResetPasswordPage/ResetPasswordForm updated
- [ ] Testing completed
- [ ] Documentation updated
