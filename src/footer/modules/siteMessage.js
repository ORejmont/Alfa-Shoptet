export function initSiteMessage() {
  handleSiteMsgVisibility();
}

/* Hide site-msg */
function handleSiteMsgVisibility() {
  const siteMsg = document.querySelector(".site-msg");
  const container = siteMsg?.querySelector(".container");
  const textEl = container?.querySelector(".text");
  const toggleKey = "siteMsgVisible";
  const textKey = "siteMsgText";

  if (!siteMsg || !container || !textEl) return;

  let hideBtn = container.querySelector(".site-msg-hide");

  if (!hideBtn) {
    hideBtn = document.createElement("button");
    hideBtn.type = "button";
    hideBtn.className = "site-msg-hide";
    hideBtn.setAttribute("aria-label", "Hide message");
    container.appendChild(hideBtn);
  }

  const currentText = textEl.textContent.trim();

  let savedText = null;
  let wasVisible = null;
  let canUseStorage = true;

  try {
    savedText = localStorage.getItem(textKey);
    wasVisible = localStorage.getItem(toggleKey);
  } catch {
    canUseStorage = false;
  }

  if (savedText !== currentText) {
    siteMsg.classList.add("site-msg-visible");

    if (canUseStorage) {
      try {
        localStorage.setItem(textKey, currentText);
        localStorage.setItem(toggleKey, "true");
      } catch {
        canUseStorage = false;
      }
    }
  } else if (wasVisible === "true" || wasVisible === null) {
    siteMsg.classList.add("site-msg-visible");
  } else {
    siteMsg.classList.remove("site-msg-visible");
  }

  hideBtn.addEventListener("click", () => {
    const isNowVisible = siteMsg.classList.toggle("site-msg-visible");

    if (canUseStorage) {
      try {
        localStorage.setItem(toggleKey, isNowVisible.toString());
      } catch {
        // Ignore storage errors.
      }
    }
  });
}
/* Hide site-msg */
