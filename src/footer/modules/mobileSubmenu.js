let isMobileSubmenuListenerRegistered = false;

/* On mobile, create custom submenu-visible-custom class for opening navigation submenus */
export function initMobileSubmenu() {
  if (isMobileSubmenuListenerRegistered) return;

  const nav = document.querySelector("body #header #navigation");
  if (!nav) return;

  nav.addEventListener("click", (e) => {
    const arrow = e.target.closest(".menu-level-1 > li > a .submenu-arrow");
    if (!arrow) return;

    const menuItems = nav.querySelectorAll(".menu-level-1 > li");
    const hasExp = Array.from(menuItems).some((li) =>
      li.classList.contains("exp"),
    );

    if (!hasExp) {
      document.body.classList.add("submenu-visible-custom");
    } else {
      document.body.classList.remove("submenu-visible-custom");
    }
  });

  isMobileSubmenuListenerRegistered = true;
}
/* On mobile, create custom submenu-visible-custom class for opening navigation submenus */
