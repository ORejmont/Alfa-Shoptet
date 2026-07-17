import { initSignature } from "./modules/signature.js";
import { initCartWindow } from "./modules/cartWindow.js";
import { initSearchResults } from "./modules/searchResults.js";
import { initSiteMessage } from "./modules/siteMessage.js";
import { initAccountButton } from "./modules/accountButton.js";
import { initHeaderHover } from "./modules/headerHover.js";
import { initMenuMore } from "./modules/menuMore.js";
import { initMobileSearch } from "./modules/mobileSearch.js";
import { initTopNavigation } from "./modules/topNavigation.js";
import { initHamburgerMenu } from "./modules/hamburgerMenu.js";
import { initMobileSubmenu } from "./modules/mobileSubmenu.js";
import { initCarouselSwipe } from "./modules/carouselSwipe.js";
import { initCarouselIndicators } from "./modules/carouselIndicators.js";
import { initAnchorScroll } from "./modules/anchorScroll.js";
import { initTopCategories } from "./modules/topCategories.js";
import { initProductAvailability } from "./modules/productAvailability.js";
import { initSorting } from "./modules/sorting.js";
import { initFilters } from "./modules/filters.js";
import { initProductDetail } from "./modules/productDetail.js";
import { initProductSlick } from "./modules/productSlick.js";
import { initProductImageSwipe } from "./modules/productImageSwipe.js";

document.body.classList.add("rej-media-alfa");

function safeRun(fn) {
  try {
    fn();
  } catch (error) {
    console.error(error);
  }
}

function initOnce() {
  [
    initSignature,
    initCartWindow,
    initSearchResults,
    initAccountButton,
    initHeaderHover,
    initMenuMore,
    initMobileSearch,
    initTopNavigation,
    initHamburgerMenu,
    initMobileSubmenu,
    initCarouselSwipe,
    initCarouselIndicators,
    initAnchorScroll,
    initTopCategories,
  ].forEach(safeRun);
}

function initPerRender() {
  [
    initSiteMessage,
    initProductAvailability,
    initSorting,
    initFilters,
    initProductDetail,
    initProductSlick,
    initProductImageSwipe,
  ].forEach(safeRun);
}

document.addEventListener("DOMContentLoaded", () => {
  initOnce();
  initPerRender();
});

document.addEventListener("ShoptetDOMContentLoaded", () => {
  initPerRender();
});
