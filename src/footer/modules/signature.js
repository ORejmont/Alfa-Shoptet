import { translations } from "../config/translations.js";
import { getTranslation } from "../utils/getTranslation.js";

/* Signature */
export function initSignature() {
  const dict = getTranslation();
  const translation = dict.footer.createdBy;

  const signature = document.querySelector("#signature");

  if (signature) {
    const div = document.createElement("div");
    div.classList.add("signature-rejmedia");
    div.innerHTML = translation;

    signature.insertAdjacentElement("afterend", div);
  }
}
/* Signature */
