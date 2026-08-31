import { getTargetOffsetTop } from "../utils/getTargetOffsetTop.js";

let isAnchorScrollRegistered = false;

export function initAnchorScroll() {
  if (isAnchorScrollRegistered) return;

  /* Scroll to anchors while accounting for the navigation offset */
  $(document).on(
    "click.anchorScroll",
    'a[href^="#"]:not(.shp-tabs-row a)',
    function (e) {
      const targetSelector = $(this).attr("href");

      if (!targetSelector || targetSelector === "#") return;

      const $target = $(targetSelector);
      if (!$target.length) return;

      e.preventDefault();

      const navigationOffset = window.innerWidth <= 767 ? 60 : 124;
      const targetTop = getTargetOffsetTop($target, navigationOffset + 15);

      $("html, body").stop(true).animate({ scrollTop: targetTop }, 300);
    }
  );
  /* Scroll to anchors while accounting for the navigation offset */

  /* Scroll to the product detail tabs */
  $(document).on(
    "click.anchorScroll",
    ".type-detail .shp-tabs-row .shp-tab-link",
    function () {
      const $tabs = $("#p-detail-tabs");

      if (!$tabs.length) return;

      /*
       * Allow Shoptet to switch the tab first,
       * then override any immediate scroll it may trigger.
       */
      window.setTimeout(() => {
        const navigationOffset = window.innerWidth <= 767 ? 60 : 124;
        const targetTop = getTargetOffsetTop($tabs, navigationOffset + 15);

        $("html, body").stop(true).animate({ scrollTop: targetTop }, 300);
      }, 0);
    }
  );
  /* Scroll to the product detail tabs */

  isAnchorScrollRegistered = true;
}
