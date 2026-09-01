import { translations } from "../config/translations.js";

export function getLanguage() {
  return (
    window.getShoptetDataLayer?.().language ||
    document.documentElement.lang ||
    "en"
  );
}

export function getTranslation() {
  const lang = getLanguage();

  return translations[lang] || translations.en;
}
