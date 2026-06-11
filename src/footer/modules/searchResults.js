import { translations } from "../config/translations.js";
import { getTranslation } from "../utils/getTranslation.js";

export function initSearchResults() {
  document.addEventListener(
    "ShoptetDOMSearchResultsLoaded",
    handleSearchResults,
  );
}

/* Modify opened search */
function handleSearchResults() {
  const dict = getTranslation();

  const container = document.querySelector(".search-whisperer-documents");
  if (!container) return;

  // Clear previous wrappers (for repeated event execution safety)
  container
    .querySelectorAll(
      ".search-whisperer-category-wrapper, .search-whisperer-other-wrapper",
    )
    .forEach((el) => el.remove());

  // Select categories and other results
  const categories = Array.from(
    container.querySelectorAll(".search-whisperer-category"),
  );
  const others = Array.from(
    container.querySelectorAll(
      ".search-whisperer-document:not(.search-whisperer-category)",
    ),
  );

  // If categories exist
  if (categories.length) {
    const wrapper = document.createElement("div");
    wrapper.className = "search-whisperer-category-wrapper";

    const title = document.createElement("div");
    title.className = "search-whisperer-title";
    title.textContent = dict.search.categories;

    wrapper.appendChild(title);
    categories.forEach((cat) => wrapper.appendChild(cat));

    container.prepend(wrapper);
  }

  // If other results exist
  if (others.length) {
    const wrapper = document.createElement("div");
    wrapper.className = "search-whisperer-other-wrapper";

    const title = document.createElement("div");
    title.className = "search-whisperer-title";
    title.textContent = dict.search.others;

    wrapper.appendChild(title);
    others.forEach((o) => wrapper.appendChild(o));

    container.appendChild(wrapper);
  }

  // If .search-whisperer contains products block, move documents after it
  const whisperer = document.querySelector(".search-whisperer");
  const products = whisperer
    ? whisperer.querySelector(".search-whisperer-products")
    : null;
  if (whisperer && products) {
    products.insertAdjacentElement("afterend", container);
  }
}
/* Modify opened search */
