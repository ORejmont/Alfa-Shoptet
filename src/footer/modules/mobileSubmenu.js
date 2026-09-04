let isMobileSubmenuListenerRegistered = false;

/* On mobile, create custom submenu-visible-custom class for opening navigation submenus */
export function initMobileSubmenu() {
  if (isMobileSubmenuListenerRegistered) return;

  const nav = document.querySelector("#header #navigation");
  if (!nav) return;

  nav.addEventListener("click", (e) => {
    const arrow = e.target.closest(".menu-level-1 > li > a > .submenu-arrow");

    if (!arrow) return;

    requestAnimationFrame(() => {
      const hasExpandedItem = Boolean(
        nav.querySelector(".menu-level-1 > li.exp")
      );

      document.body.classList.toggle("submenu-visible-custom", hasExpandedItem);
    });
  });

  isMobileSubmenuListenerRegistered = true;
}
/* On mobile, create custom submenu-visible-custom class for opening navigation submenus */
