/* Move availability below price */
export function initProductAvailability() {
  moveAvailabilityToPrices();
}

function moveAvailabilityToPrices() {
  document.querySelectorAll(".products-block .product").forEach((product) => {
    const availability = product.querySelector(".availability");
    const prices = product.querySelector(".prices");

    // Move availability into prices
    if (availability && prices && !prices.contains(availability)) {
      prices.appendChild(availability);
    }

    // If flag-discount exists, move price-standard into price-final
    if (product.querySelector(".flag-discount")) {
      const priceStandard = product.querySelector(".price-standard");
      const priceFinal = product.querySelector(".price-final");

      if (priceFinal && priceStandard && !priceFinal.contains(priceStandard)) {
        priceFinal.prepend(priceStandard);
      }
    }
  });
}
/* Move availability below price */
