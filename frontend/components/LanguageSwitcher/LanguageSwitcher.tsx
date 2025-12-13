import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { SUPPORTED_LANGUAGES, LANGUAGE_NAMES, SupportedLanguage } from "i18n";

interface ILanguageSwitcherProps {
  className?: string;
}

const LanguageSwitcher = ({
  className = "",
}: ILanguageSwitcherProps): JSX.Element => {
  const { i18n } = useTranslation();

  const handleLanguageChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const newLanguage = event.target.value as SupportedLanguage;
      i18n.changeLanguage(newLanguage);
      // Store preference in localStorage
      localStorage.setItem("fleet_language", newLanguage);
    },
    [i18n]
  );

  return (
    <select
      className={`language-switcher ${className}`}
      value={i18n.language}
      onChange={handleLanguageChange}
      aria-label="Select language"
    >
      {SUPPORTED_LANGUAGES.map((lang) => (
        <option key={lang} value={lang}>
          {LANGUAGE_NAMES[lang]}
        </option>
      ))}
    </select>
  );
};

export default LanguageSwitcher;
