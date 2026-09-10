let mobileSubmenuObserver = null;

/* Synchronize submenu-visible-custom with the actual submenu state */
export function initMobileSubmenu() {
  if (mobileSubmenuObserver) return;

  const menu = document.querySelector("#header #navigation .menu-level-1");

  if (!menu) return;

  const syncBodyClass = () => {
    const hasExpandedItem = Array.from(menu.children).some((item) => {
      if (!(item instanceof HTMLElement)) return false;

      const link = item.querySelector(":scope > a");

      return (
        item.classList.contains("exp") ||
        link?.getAttribute("aria-expanded") === "true"
      );
    });

    document.body.classList.toggle("submenu-visible-custom", hasExpandedItem);
  };

  mobileSubmenuObserver = new MutationObserver(syncBodyClass);

  mobileSubmenuObserver.observe(menu, {
    subtree: true,
    attributes: true,
    attributeFilter: ["class", "aria-expanded"]
  });

  syncBodyClass();
}
/* Synchronize submenu-visible-custom with the actual submenu state */
