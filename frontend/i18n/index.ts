/**
 * i18n (Internationalization) Module
 *
 * This module provides internationalization support for the Fleet frontend.
 * It exports the configured i18n instance and helper utilities.
 */

// Import and initialize i18n configuration
import i18n, {
  SUPPORTED_LANGUAGES,
  DEFAULT_LANGUAGE,
  NAMESPACES,
  LANGUAGE_NAMES,
} from "./config";

import type { SupportedLanguage, Namespace } from "./config";

// Re-export hooks from react-i18next for convenience
export { useTranslation, Trans } from "react-i18next";

// Re-export configuration
export {
  i18n,
  SUPPORTED_LANGUAGES,
  DEFAULT_LANGUAGE,
  NAMESPACES,
  LANGUAGE_NAMES,
};

export type { SupportedLanguage, Namespace };

/**
 * Change the current language
 */
export const changeLanguage = async (
  language: SupportedLanguage
): Promise<void> => {
  await i18n.changeLanguage(language);
};

/**
 * Get the current language
 */
export const getCurrentLanguage = (): SupportedLanguage => {
  return i18n.language as SupportedLanguage;
};

/**
 * Check if a language is supported
 */
export const isLanguageSupported = (
  lang: string
): lang is SupportedLanguage => {
  return SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage);
};

/**
 * Get display name for a language code
 */
export const getLanguageDisplayName = (lang: SupportedLanguage): string => {
  return LANGUAGE_NAMES[lang] || lang;
};

export default i18n;
