/**
 * i18next type declarations
 *
 * This file augments the i18next module to provide proper TypeScript support
 * for the translation function. Without this, TFunction expects no arguments.
 */

import "i18next";

declare module "i18next" {
  interface CustomTypeOptions {
    // Allow any string as a translation key
    // This is less strict but provides flexibility for dynamic keys
    defaultNS: "common";
    resources: {
      common: Record<string, string>;
      auth: Record<string, string>;
      dashboard: Record<string, string>;
      errors: Record<string, string>;
      forms: Record<string, string>;
      hosts: Record<string, string>;
      labels: Record<string, string>;
      policies: Record<string, string>;
      queries: Record<string, string>;
      settings: Record<string, string>;
      software: Record<string, string>;
    };
    // Allow string keys to be passed to t function
    returnNull: false;
  }
}
