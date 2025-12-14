import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

// Supported languages
export const SUPPORTED_LANGUAGES = ["en", "es", "fr", "de", "ru"] as const;
export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

// Default language (Russian as per requirements)
export const DEFAULT_LANGUAGE: SupportedLanguage = "ru";

// Namespaces for organizing translations
export const NAMESPACES = [
  "common", // Buttons, labels, shared UI elements
  "auth", // Login, password, SSO, authentication
  "forms", // Validation messages, form labels
  "dashboard", // Dashboard-specific strings
  "errors", // Error messages
  "hosts", // Host management
  "labels", // Label management
  "policies", // Policy management
  "queries", // Query management
  "settings", // Settings pages
  "software", // Software management
] as const;

export type Namespace = typeof NAMESPACES[number];

// Language display names for UI
export const LANGUAGE_NAMES: Record<SupportedLanguage, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  ru: "Русский",
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // Default and fallback language
    fallbackLng: "en",
    lng: DEFAULT_LANGUAGE,

    // Supported languages
    supportedLngs: SUPPORTED_LANGUAGES,

    // Namespaces configuration
    ns: NAMESPACES,
    defaultNS: "common",

    // Backend configuration for loading translation files
    backend: {
      loadPath: "/assets/locales/{{lng}}/{{ns}}.json",
    },

    // Language detection configuration
    detection: {
      // Order of language detection methods
      order: ["localStorage", "navigator"],
      // Key used in localStorage
      lookupLocalStorage: "fleet_language",
      // Cache user language preference
      caches: ["localStorage"],
    },

    // Interpolation settings
    interpolation: {
      // React already escapes values
      escapeValue: false,
    },

    // Debug mode (disable in production)
    debug: process.env.NODE_ENV === "development",

    // React settings
    react: {
      // Wait for translations to load before rendering
      useSuspense: true,
    },
  });

export default i18n;
