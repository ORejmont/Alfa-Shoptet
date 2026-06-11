let isHamburgerMenuListenerRegistered = false;

/* Opening subcategories in hamburger menu */
export function initHamburgerMenu() {
  if (isHamburgerMenuListenerRegistered) return;

  document.addEventListener("click", (e) => {
    const arrow = e.target.closest(".menu-helper .submenu-arrow");
    if (!arrow) return;

    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    const parentLi = arrow.closest("li");
    if (!parentLi) return;

    document.querySelectorAll(".menu-helper li.exp-custom").forEach((item) => {
      if (item !== parentLi) item.classList.remove("exp-custom");
    });

    parentLi.classList.toggle("exp-custom");
  });

  isHamburgerMenuListenerRegistered = true;
}
/* Opening subcategories in hamburger menu */
