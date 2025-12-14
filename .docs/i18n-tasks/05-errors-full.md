# Task: Error Pages i18n (errors namespace)

## Overview
Implement i18n for ALL error pages. This section has NOT been started yet.

## Project Context
- **Repository:** MDM application (React + TypeScript)
- **i18n Library:** i18next, react-i18next
- **Target Language:** Russian (ru)
- **Namespace:** `errors`

## File Locations
- **English translations:** `frontend/locales/en/errors.json` AND `assets/locales/en/errors.json`
- **Russian translations:** `frontend/locales/ru/errors.json` AND `assets/locales/ru/errors.json`

**IMPORTANT:** Always update BOTH `frontend/locales/` AND `assets/locales/` to keep them in sync.

---

## ALL Components to Translate

### 1. Fleet403 (Forbidden)
**File:** `frontend/pages/errors/Fleet403/Fleet403.tsx`

### 2. Fleet404 (Not Found)
**File:** `frontend/pages/errors/Fleet404/Fleet404.tsx`

### 3. Fleet500 (Server Error)
**File:** `frontend/pages/errors/Fleet500/Fleet500.tsx`

---

## Implementation Pattern

```tsx
import { useTranslation } from "react-i18next";

const Fleet403 = () => {
  const { t } = useTranslation("errors");

  return (
    <div>
      <h1>{t("403.title")}</h1>
      <p>{t("403.message")}</p>
      <a href="/">{t("common.backToHome")}</a>
    </div>
  );
};
```

---

## Current errors.json Structure
The file exists but may need expansion:
```json
{
  "somethingWentWrong": "Something went wrong",
  "tryAgain": "Please try again",
  "contactSupport": "If the problem persists, please contact support"
}
```

---

## Complete Translation Structure

```json
{
  "common": {
    "backToHome": "Back to home",
    "backToDashboard": "Back to dashboard",
    "tryAgain": "Try again",
    "contactSupport": "Contact support",
    "contactAdmin": "Contact your administrator"
  },
  "403": {
    "title": "Access denied",
    "code": "403",
    "message": "You don't have permission to access this page.",
    "description": "If you believe this is an error, please contact your administrator.",
    "possibleReasons": {
      "title": "This might happen because:",
      "noPermission": "You don't have the required permissions",
      "sessionExpired": "Your session has expired",
      "roleChanged": "Your role was recently changed"
    }
  },
  "404": {
    "title": "Page not found",
    "code": "404",
    "message": "The page you're looking for doesn't exist.",
    "description": "The page may have been moved or deleted.",
    "possibleReasons": {
      "title": "This might happen because:",
      "typo": "There's a typo in the URL",
      "moved": "The page has been moved",
      "deleted": "The page has been deleted"
    },
    "searchSuggestion": "Try searching for what you need"
  },
  "500": {
    "title": "Server error",
    "code": "500",
    "message": "Something went wrong on our end.",
    "description": "We're working to fix the problem. Please try again later.",
    "possibleActions": {
      "title": "What you can do:",
      "refresh": "Refresh the page",
      "wait": "Wait a few minutes and try again",
      "contact": "Contact support if the problem persists"
    }
  },
  "network": {
    "title": "Connection error",
    "message": "Unable to connect to the server.",
    "description": "Please check your internet connection and try again."
  },
  "timeout": {
    "title": "Request timeout",
    "message": "The request took too long to complete.",
    "description": "Please try again or contact support if the problem persists."
  },
  "generic": {
    "title": "Something went wrong",
    "message": "An unexpected error occurred.",
    "description": "Please try again or contact support if the problem persists."
  }
}
```

---

## Russian Translations

```json
{
  "common": {
    "backToHome": "На главную",
    "backToDashboard": "На панель управления",
    "tryAgain": "Попробовать снова",
    "contactSupport": "Связаться с поддержкой",
    "contactAdmin": "Свяжитесь с администратором"
  },
  "403": {
    "title": "Доступ запрещён",
    "code": "403",
    "message": "У вас нет прав для доступа к этой странице.",
    "description": "Если вы считаете, что это ошибка, свяжитесь с администратором.",
    "possibleReasons": {
      "title": "Это могло произойти потому, что:",
      "noPermission": "У вас нет необходимых разрешений",
      "sessionExpired": "Срок вашей сессии истёк",
      "roleChanged": "Ваша роль была недавно изменена"
    }
  },
  "404": {
    "title": "Страница не найдена",
    "code": "404",
    "message": "Страница, которую вы ищете, не существует.",
    "description": "Страница могла быть перемещена или удалена.",
    "possibleReasons": {
      "title": "Это могло произойти потому, что:",
      "typo": "В URL есть опечатка",
      "moved": "Страница была перемещена",
      "deleted": "Страница была удалена"
    },
    "searchSuggestion": "Попробуйте найти то, что вам нужно"
  },
  "500": {
    "title": "Ошибка сервера",
    "code": "500",
    "message": "Что-то пошло не так на нашей стороне.",
    "description": "Мы работаем над исправлением проблемы. Пожалуйста, попробуйте позже.",
    "possibleActions": {
      "title": "Что вы можете сделать:",
      "refresh": "Обновить страницу",
      "wait": "Подождать несколько минут и попробовать снова",
      "contact": "Связаться с поддержкой, если проблема сохраняется"
    }
  },
  "network": {
    "title": "Ошибка соединения",
    "message": "Не удаётся подключиться к серверу.",
    "description": "Пожалуйста, проверьте подключение к интернету и попробуйте снова."
  },
  "timeout": {
    "title": "Превышено время ожидания",
    "message": "Запрос выполнялся слишком долго.",
    "description": "Пожалуйста, попробуйте снова или свяжитесь с поддержкой, если проблема сохраняется."
  },
  "generic": {
    "title": "Что-то пошло не так",
    "message": "Произошла непредвиденная ошибка.",
    "description": "Пожалуйста, попробуйте снова или свяжитесь с поддержкой, если проблема сохраняется."
  }
}
```

---

## Quality Checklist
- [ ] All 3 error page components have `useTranslation("errors")` added
- [ ] All hardcoded strings replaced with `t()` calls
- [ ] English translations complete in errors.json
- [ ] Russian translations complete in errors.json
- [ ] Files synced to `assets/locales/`
- [ ] Error codes displayed correctly
- [ ] Action buttons translated
- [ ] Helpful messages and suggestions translated
