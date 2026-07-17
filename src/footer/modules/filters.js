let isClickListenerRegistered = false;

export function initFilters() {
  cloneUnveilButtonIfNoSidebar();
  syncFiltersState();
  ensureCloseButton();

  if (!isClickListenerRegistered) {
    document.addEventListener("click", handleMobileFiltersClick);
    isClickListenerRegistered = true;
  }
}

/* Move filter open button */
function cloneUnveilButtonIfNoSidebar() {
  const sidebar = document.querySelector(".sidebar");
  const categoryHeader = document.querySelector("#category-header");

  if (
    !categoryHeader ||
    categoryHeader.querySelector(".filters-unveil-button-wrapper")
  ) {
    return;
  }

  const content = document.querySelector("#content");
  const originalButton = content?.querySelector(
    ".filters-unveil-button-wrapper",
  );

  if (!sidebar && originalButton) {
    const clone = originalButton.cloneNode(true);
    categoryHeader.appendChild(clone);
  }
}
/* Move filter open button */

/* Fix automatic filter closing */
function syncFiltersState() {
  if (!document.body.classList.contains("type-category")) return;

  const filters = document.querySelector("#filters");
  if (!filters) return;

  document.body.classList.toggle(
    "filters-visible",
    filters.classList.contains("visible"),
  );
}
/* Fix automatic filter closing */

/* Opening and closing filters on mobile */
function ensureCloseButton() {
  const filters = document.querySelector("#filters");
  const toggleWrapper = document.querySelector(
    ".filters-unveil-button-wrapper",
  );

  if (!filters) return;

  if (!filters.querySelector(".close")) {
    const closeElement = document.createElement("button");
    closeElement.type = "button";
    closeElement.className = "close";
    closeElement.setAttribute("aria-label", "Close filters");

    filters.prepend(closeElement);
  }

  if (!toggleWrapper) {
    document.body.classList.add("filter-open-only");
  }
}

function handleMobileFiltersClick(e) {
  const isMobile = window.innerWidth < 768;
  const body = document.body;
  const filters = document.querySelector("#filters");
  const toggleBtn = document.querySelector(
    ".filters-unveil-button-wrapper .btn",
  );
  const closeBtn = filters ? filters.querySelector(".close") : null;

  if (!isMobile || !filters) return;

  if (toggleBtn && toggleBtn.contains(e.target)) {
    return;
  }

  if (closeBtn && closeBtn.contains(e.target)) {
    if (toggleBtn) toggleBtn.click();
    return;
  }

  if (!body.classList.contains("filters-visible")) return;

  if (!filters.contains(e.target)) {
    if (toggleBtn) toggleBtn.click();
  }
}
/* Opening and closing filters on mobile */
