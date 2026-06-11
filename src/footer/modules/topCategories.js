import { translations } from "../config/translations.js";
import { getTopCategoriesData } from "../utils/getTopCategoriesData.js";
import { imagesLoaded } from "../utils/imagesLoaded.js";
import { adjustBannerImages } from "../utils/adjustBannerImages.js";
import { processBannerTexts } from "../utils/processBannerTexts.js";
import { renderTopCategoriesHTML } from "../utils/renderTopCategoriesHTML.js";
import { getTranslation } from "../utils/getTranslation.js";

/* Top categories */
export function initTopCategories() {
  const isIndex = document.body.classList.contains("type-index");
  const isCategory = document.body.classList.contains("type-category");

  if (isIndex) {
    initHomepageTopCategories();
  }

  if (isCategory) {
    initCategoryBannerTexts();
  }
}

function initHomepageTopCategories() {
  const bannersRow = getHomepageBannersRow();

  if (!bannersRow) return;

  handleMissingCarousel(bannersRow);
  renderHomepageTopCategories(bannersRow);
  wrapRightColumns(bannersRow);
  handleHomepageBannerLoading(bannersRow);
}

function getHomepageBannersRow() {
  const isMobile = document.body.classList.contains("mobile");
  const isSimplifiedLayout = !document.querySelector(".before-carousel");

  return document.querySelector(
    isMobile || isSimplifiedLayout
      ? "#content > .row.banners-row"
      : ".before-carousel .row.banners-row",
  );
}

function handleMissingCarousel(bannersRow) {
  const carousel = document.querySelector("#carousel");

  if (carousel) return;

  bannersRow.classList.add("no-carousel");

  const wideCarousel = bannersRow.querySelector(".wide-carousel");

  if (wideCarousel) {
    wideCarousel.remove();
  }
}

function renderHomepageTopCategories(bannersRow) {
  if (
    typeof topCategories === "undefined" ||
    !Array.isArray(topCategories) ||
    !topCategories.length ||
    bannersRow.querySelector(".top-categories-custom")
  ) {
    return;
  }

  const topCatsData = getTopCategoriesData(topCategories);

  if (!topCatsData.length) return;

  const dict = getTranslation();
  const topCategoriesHTML = renderTopCategoriesHTML(topCatsData);

  if (!topCategoriesHTML) return;

  bannersRow.insertAdjacentHTML(
    "afterbegin",
    `<div class="top-categories-custom">
      <h4>${dict.topCategories}</h4>
      <div class="top-categories-wrapper">
        ${topCategoriesHTML}
      </div>
    </div>`,
  );
}

function wrapRightColumns(bannersRow) {
  if (bannersRow.querySelector(".right-columns-wrapper")) return;

  const col8 = bannersRow.querySelector(".col-sm-8");
  const col4 = bannersRow.querySelector(".col-sm-4");
  const wideCarousel = bannersRow.querySelector(".wide-carousel");
  const nextToCarousel = bannersRow.querySelector(".next-to-carousel-banners");
  const wideCarouselHasContent = wideCarousel?.querySelector(
    ".carousel-inner .item",
  );

  const wrapper = document.createElement("div");
  wrapper.className = "right-columns-wrapper";

  if (col8 && col4) {
    wrapper.appendChild(col8);
    wrapper.appendChild(col4);
  } else if (wideCarousel && nextToCarousel && wideCarouselHasContent) {
    wrapper.appendChild(wideCarousel);
    wrapper.appendChild(nextToCarousel);
  } else if (wideCarousel && wideCarouselHasContent) {
    wrapper.appendChild(wideCarousel);
  } else {
    return;
  }

  bannersRow.appendChild(wrapper);
}

function handleHomepageBannerLoading(bannersRow) {
  const bannersInCritical =
    document.querySelector("#carousel .extended-banner-texts") ||
    document.querySelector(".next-to-carousel-banners .extended-banner-texts");

  if (bannersInCritical) {
    imagesLoaded(bannersRow, () => {
      processBannerTexts();
      requestAnimationFrame(() => adjustBannerImages?.());
      setTimeout(() => adjustBannerImages?.(), 600);
      finalizeLoadedState(bannersRow);
    });

    return;
  }

  imagesLoaded(bannersRow, () => finalizeLoadedState(bannersRow));
}

function initCategoryBannerTexts() {
  const bannerCategory = document.querySelector(".banner-category");

  if (!bannerCategory) return;

  const hasBanners = document.querySelector(
    ".banner-category .extended-banner-texts",
  );

  if (!hasBanners) return;

  imagesLoaded(bannerCategory, () => {
    processBannerTexts();
    requestAnimationFrame(() => adjustBannerImages?.());
    setTimeout(() => adjustBannerImages?.(), 600);
  });
}

function finalizeLoadedState(element) {
  requestAnimationFrame(() => {
    element.classList.add("loaded-state");
  });
}
/* Top categories */
