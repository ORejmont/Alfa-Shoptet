import { translations } from "../config/translations.js";

export function getTranslation() {
  const lang =
    window.getShoptetDataLayer?.().language ||
    document.documentElement.lang ||
    "en";

  return translations[lang] || translations.en;
}
