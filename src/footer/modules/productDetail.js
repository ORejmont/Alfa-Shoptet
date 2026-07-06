export function initProductDetail() {
  modifyProductTop();
}

/* Properly align elements in .product-top on product detail */
function modifyProductTop() {
  if (!document.body.classList.contains("type-detail")) return;

  const productTop = document.querySelector(".product-top");
  const infoWrapper = productTop?.querySelector(".p-info-wrapper");
  const header = document.querySelector(".p-detail-inner-header");
  const detailInfo = productTop?.querySelector(".p-detail-info");

  // New selectors
  const shortDescription = productTop?.querySelector(".p-short-description");
  const finalPriceWrapper = productTop?.querySelector(".p-final-price-wrapper");
  const cardDescr = productTop?.querySelector(".p-info-wrapper > p");

  if (productTop && infoWrapper && header) {
    // Existing moves
    infoWrapper.prepend(header);

    if (detailInfo) {
      header.insertAdjacentElement("afterend", detailInfo);
    }

    // Move .p-short-description before .p-final-price-wrapper
    if (shortDescription && finalPriceWrapper) {
      finalPriceWrapper.insertAdjacentElement("beforebegin", shortDescription);
    }

    // Move productCardDescr after shortDescription
    if (cardDescr && shortDescription) {
      shortDescription.insertAdjacentElement("afterend", cardDescr);
    }

    productTop.classList.add("loaded-state");
  }
}
/* Properly align elements in .product-top on product detail */
