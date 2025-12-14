import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enAuth from "../locales/en/auth.json";
import esAuth from "../locales/es/auth.json";
import frAuth from "../locales/fr/auth.json";
import deAuth from "../locales/de/auth.json";
import ruAuth from "../locales/ru/auth.json";

const resources = {
  en: {
    auth: enAuth,
  },
  es: {
    auth: esAuth,
  },
  fr: {
    auth: frAuth,
  },
  de: {
    auth: deAuth,
  },
  ru: {
    auth: ruAuth,
  },
};

i18n
  // detect user language
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next
  .use(initReactI18next)
  // init i18next
  .init({
    resources,
    fallbackLng: "en",
    defaultNS: "auth",
    ns: ["auth"],

    interpolation: {
      escapeValue: false, // react already safes from xss
    },

    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "i18nextLng",
    },
  });

export default i18n;
