let isMobileSearchListenerRegistered = false;

/* On mobile, close search when clicking outside */
export function initMobileSearch() {
  if (isMobileSearchListenerRegistered) return;

  document.addEventListener("click", (e) => {
    const body = document.body;

    if (
      body.classList.contains("mobile") &&
      body.classList.contains("search-window-visible") &&
      !e.target.closest(".search")
    ) {
      body.classList.remove("search-window-visible");
    }
  });

  isMobileSearchListenerRegistered = true;
}
/* On mobile, close search when clicking outside */
