import "slick-carousel";

export function initProductSlick() {
  if (
    document.body.classList.contains("type-detail") &&
    !document.body.classList.contains("columns-1")
  ) {
    const detailContainer = document.querySelector(".products-related");

    if (detailContainer) {
      initProductsSlick(detailContainer);
    }
  }

  if (
    typeof productsCarouselHP !== "undefined" &&
    productsCarouselHP === true &&
    document.body.classList.contains("type-index")
  ) {
    const hpBlocks = document.querySelectorAll(".products-block");

    hpBlocks.forEach((block) => {
      initProductsSlick(block, true);
    });
  }
}

function initProductsSlick(container, isHP = false) {
  if (container.closest("#colorbox, .advanced-order")) return;
  if ($(container).hasClass("slick-initialized")) return;

  const finalConfig = getProductsSlickConfig();

  $(container).slick({
    slidesToScroll: 1,
    infinite: true,
    arrows: true,
    dots: false,
    ...finalConfig,
  });

  if (isHP) {
    document.body.classList.add("slick-active-custom");
  }
}

function getProductsSlickConfig() {
  const hasSidebar = document.querySelector(".sidebar") !== null;
  const hasColumnsMobile2 =
    document.body.classList.contains("columns-mobile-2");
  const hasColumns3 = document.body.classList.contains("columns-3");

  const mobileRule = { breakpoint: 480, settings: { slidesToShow: 1 } };

  const defaultConfig = {
    slidesToShow: 5,
    responsive: [
      { breakpoint: 1440, settings: { slidesToShow: 4 } },
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      ...(!hasColumnsMobile2 ? [mobileRule] : []),
    ],
  };

  const columns3Config = {
    slidesToShow: 4,
    responsive: [
      { breakpoint: 1440, settings: { slidesToShow: 3 } },
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      ...(!hasColumnsMobile2 ? [mobileRule] : []),
    ],
  };

  const sidebarConfig = {
    slidesToShow: 3,
    responsive: [
      { breakpoint: 1440, settings: { slidesToShow: 2 } },
      ...(!hasColumnsMobile2 ? [mobileRule] : []),
    ],
  };

  if (hasSidebar) return sidebarConfig;
  if (hasColumns3) return columns3Config;

  return defaultConfig;
}
