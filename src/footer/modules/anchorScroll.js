import { getTargetOffsetTop } from "../utils/getTargetOffsetTop.js";

let isAnchorScrollRegistered = false;

/* Scroll to # accounts for navigation */
export function initAnchorScroll() {
  if (isAnchorScrollRegistered) return;

  $(document).on("click", 'a[href^="#"]:not(.shp-tabs-row a)', function (e) {
    const targetSelector = $(this).attr("href");
    const $target = $(targetSelector);

    if ($target.length === 0) return;

    e.preventDefault();

    const isMobile = window.innerWidth <= 767;
    const offset = isMobile ? 60 : 124;
    const targetTop = getTargetOffsetTop($target, offset);

    $("html, body").animate({ scrollTop: targetTop }, 300);
  });

  isAnchorScrollRegistered = true;
}
/* Scroll to # accounts for navigation */
