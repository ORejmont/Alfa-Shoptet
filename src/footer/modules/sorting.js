import { getTargetOffsetTop } from "../utils/getTargetOffsetTop.js";

let isSortingListenerRegistered = false;

export function initSorting() {
  updateOrderPlaceholder();

  if (!isSortingListenerRegistered) {
    document.addEventListener("ShoptetPageSortingChanged", () => {
      updateOrderPlaceholder();
      scrollToProductsListHeading();
    });

    isSortingListenerRegistered = true;
  }
}

/* Sorting - Display selected label as placeholder */
function scrollToProductsListHeading() {
  const $target = $("#productsListHeading");
  if ($target.length === 0) return;

  const isMobile = window.innerWidth <= 767;
  const offset = isMobile ? 60 : 124;
  const targetTop = getTargetOffsetTop($target, offset);

  $("html, body").animate({ scrollTop: targetTop }, 300);
}

function updateOrderPlaceholder() {
  const current = document.querySelector(".listSorting__control--current");
  const controls = document.querySelector(".listSorting__controls");

  if (current && controls) {
    const liParent = current.closest("li");

    if (liParent) {
      controls.insertBefore(liParent, controls.firstChild);
    }
  }
}
/* Sorting - Display selected label as placeholder */
