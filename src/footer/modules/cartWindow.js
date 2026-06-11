import { translations } from "../config/translations.js";
import { getTopCategoriesData } from "../utils/getTopCategoriesData.js";
import { renderTopCategoriesHTML } from "../utils/renderTopCategoriesHTML.js";
import { getTranslation } from "../utils/getTranslation.js";

let isCartWindowInitialized = false;

export function initCartWindow() {
  if (isCartWindowInitialized) return;

  initCartWindowEvents();
  isCartWindowInitialized = true;
}

/* Cart opening */
function initCartWindowEvents() {
  const cartCountButton = document.querySelector(".cart-count");
  const cartWidget = document.querySelector("#cart-widget");

  if (!cartCountButton || !cartWidget) return;

  cartCountButton.classList.add("custom-open");

  cartCountButton.addEventListener("click", (event) => {
    event.preventDefault();
    toggleCartWindow(cartWidget, cartCountButton);
  });

  document.addEventListener("click", (event) => {
    closeCartOnOutsideClick(event, cartWidget, cartCountButton);
  });

  document.addEventListener("ShoptetDOMContentLoaded", () => {
    if (document.body.classList.contains("cart-window-visible-custom")) {
      updateCartContent(cartWidget, cartCountButton);
    }
  });
}

function toggleCartWindow(cartWidget, cartCountButton) {
  const isVisible = document.body.classList.contains(
    "cart-window-visible-custom",
  );

  if (isVisible) {
    document.body.classList.remove("cart-window-visible-custom");
    return;
  }

  document.body.classList.add("cart-window-visible-custom");
  updateCartContent(cartWidget, cartCountButton);
}

function closeCartOnOutsideClick(event, cartWidget, cartCountButton) {
  const isInsideCart = cartWidget.contains(event.target);
  const isCartCount = cartCountButton.contains(event.target);

  if (!isInsideCart && !isCartCount) {
    document.body.classList.remove("cart-window-visible-custom");
  }
}

function updateCartContent(cartWidget, cartCountButton) {
  const dict = getTranslation();

  removeCartCustomElements(cartWidget);

  const titleHTML = renderCartTitle(cartWidget, dict);
  updateEmptyCartContent(cartWidget, cartCountButton, titleHTML, dict);

  const totalData = renderCartTotal(cartWidget, dict);
  renderFreeShippingProgress(cartWidget, totalData.total);
}

function removeCartCustomElements(cartWidget) {
  cartWidget
    .querySelectorAll(
      ".cart-window-title, .cart-window-empty-content, .cart-window-total, .price-range, .cart-suggested-categories",
    )
    .forEach((el) => el.remove());
}

function renderCartTitle(cartWidget, dict) {
  const itemCountEl = document.querySelector(".cart-count i");
  const itemCount = itemCountEl ? itemCountEl.textContent.trim() : "0";

  const titleHTML = document.createElement("div");
  titleHTML.className = "cart-window-title";
  titleHTML.innerHTML = `
    <h4>${dict.cart.title(itemCount)}</h4>
    <button type="button" class="cart-window-close"></button>
  `;

  cartWidget.prepend(titleHTML);

  const closeBtn = titleHTML.querySelector(".cart-window-close");

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      document.body.classList.remove("cart-window-visible-custom");
    });
  }

  return titleHTML;
}

function updateEmptyCartContent(cartWidget, cartCountButton, titleHTML, dict) {
  if (cartCountButton.classList.contains("full")) {
    cartWidget.classList.remove("cart-empty-custom");
    removeEmptyCartElements(cartWidget);
    return;
  }

  cartWidget.classList.add("cart-empty-custom");

  const emptyHTML = document.createElement("div");
  emptyHTML.className = "cart-window-empty-content";
  emptyHTML.textContent = dict.cart.empty;
  cartWidget.insertBefore(emptyHTML, titleHTML.nextSibling);

  renderSuggestedCategories(cartWidget, emptyHTML, dict);
  renderContinueShoppingButton(cartWidget, dict);
}

function removeEmptyCartElements(cartWidget) {
  cartWidget
    .querySelectorAll(
      ".cart-window-empty-content, .cart-suggested-categories, .cart-continue-shopping",
    )
    .forEach((el) => el.remove());
}

function renderSuggestedCategories(cartWidget, emptyHTML, dict) {
  if (
    typeof topCategories === "undefined" ||
    !Array.isArray(topCategories) ||
    !topCategories.length
  ) {
    return;
  }

  const topCatsData = getTopCategoriesData(topCategories);
  const topCategoriesHTML = renderTopCategoriesHTML(topCatsData, {
    itemClass: "top-category-item-cart",
    useOriginalImage: true,
  });

  if (!topCategoriesHTML) return;

  const suggestWrap = document.createElement("div");
  suggestWrap.className = "cart-suggested-categories";
  suggestWrap.innerHTML = `
    <span>${dict.cart.suggest}</span>
    <div class="top-categories-wrapper-cart">
      ${topCategoriesHTML}
    </div>
  `;

  cartWidget.insertBefore(suggestWrap, emptyHTML.nextSibling);
}

function renderContinueShoppingButton(cartWidget, dict) {
  if (cartWidget.querySelector(".cart-continue-shopping")) return;

  const continueBtn = document.createElement("button");
  continueBtn.type = "button";
  continueBtn.className = "cart-continue-shopping";
  continueBtn.textContent = dict.cart.continue;

  continueBtn.addEventListener("click", () => {
    document.body.classList.remove("cart-window-visible-custom");
  });

  const continueOrderButton = cartWidget.querySelector(
    "#continue-order-button",
  );

  if (continueOrderButton) {
    continueOrderButton.parentNode.insertBefore(
      continueBtn,
      continueOrderButton,
    );
  }
}

function renderCartTotal(cartWidget, dict) {
  const priceEls = cartWidget.querySelectorAll(
    ".cart-widget-product .cart-widget-product-name > span",
  );

  const totalData = calculateCartTotal(priceEls);

  if (priceEls.length === 0) {
    return totalData;
  }

  const totalHTML = document.createElement("div");
  totalHTML.className = "cart-window-total";
  totalHTML.innerHTML = `
    <strong>${dict.cart.total}:</strong> ${formatCartTotal(totalData)}
  `;

  const cartButton = cartWidget.querySelector(".cart-widget-button");

  if (cartButton) {
    cartWidget.insertBefore(totalHTML, cartButton);
  }

  return totalData;
}

function calculateCartTotal(priceEls) {
  let total = 0;
  let currency = "";
  let decimalSeparator = ".";
  let hasDecimals = false;

  priceEls.forEach((el, idx) => {
    const text = el.textContent.trim();

    if (idx === 0) {
      decimalSeparator = getDecimalSeparator(text);
    }

    const number = parseLocalizedPrice(text);

    if (isNaN(number)) return;

    total += number;

    if (number % 1 !== 0) {
      hasDecimals = true;
    }

    if (!currency && idx === 0) {
      currency = getCurrency(text);
    }
  });

  return {
    total,
    currency,
    decimalSeparator,
    hasDecimals,
  };
}

function formatCartTotal({ total, currency, decimalSeparator, hasDecimals }) {
  let formattedTotal = hasDecimals ? total.toFixed(2) : total.toFixed(0);

  if (decimalSeparator === ",") {
    formattedTotal = formattedTotal.replace(".", ",");
  }

  return `${formattedTotal} ${currency}`.trim();
}

function renderFreeShippingProgress(cartWidget, total) {
  const freeShippingEl = cartWidget.querySelector(".cart-free-shipping strong");

  if (!freeShippingEl) return;

  const freeContainer = cartWidget.querySelector(".cart-free-shipping");
  const freeText = freeShippingEl.textContent.trim();
  const remaining = parseLocalizedPrice(freeText);

  if (!isNaN(remaining) && total > 0) {
    const goal = total + remaining;
    const progress = Math.min(100, (total / goal) * 100);

    const range = document.createElement("div");
    range.className = "price-range";
    range.innerHTML = `<div style="width: ${progress.toFixed(0)}%"></div>`;

    freeContainer.appendChild(range);
    freeContainer.classList.remove("free");
    return;
  }

  freeContainer.classList.add("free");
}

function getDecimalSeparator(text) {
  if (text.match(/\d+,\d{1,2}/)) return ",";
  if (text.match(/\d+\.\d{1,2}/)) return ".";

  return ".";
}

function getCurrency(text) {
  const currency = text.replace(/[\d\s.,-]/g, "").trim();

  if (currency) return currency;

  return text.match(/[^\d\s.,-]+/g)?.[0] || "";
}

function parseLocalizedPrice(text) {
  const cleaned = text.replace(/[^\d,.-]/g, "");

  const lastComma = cleaned.lastIndexOf(",");
  const lastDot = cleaned.lastIndexOf(".");

  let normalized = cleaned;

  if (lastComma > -1 && lastDot > -1) {
    if (lastComma > lastDot) {
      normalized = cleaned.replace(/\./g, "").replace(",", ".");
    } else {
      normalized = cleaned.replace(/,/g, "");
    }
  } else if (lastComma > -1) {
    normalized = cleaned.replace(",", ".");
  } else if (lastDot > -1) {
    const parts = cleaned.split(".");

    if (parts.length === 2 && parts[1].length === 3) {
      normalized = cleaned.replace(/\./g, "");
    }
  }

  return parseFloat(normalized);
}
/* Cart opening */
