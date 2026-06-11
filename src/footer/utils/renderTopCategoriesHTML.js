export function renderTopCategoriesHTML(categories, options = {}) {
  const { itemClass = "top-category-item", useOriginalImage = false } = options;

  return categories
    .map((cat) => {
      let imageSrc = cat.image;

      if (useOriginalImage && imageSrc.includes("/thumb/")) {
        imageSrc = imageSrc.replace("/thumb/", "/orig/");
      }

      return `
        <a href="${cat.href}" class="${itemClass}">
          <img src="${imageSrc}" alt="${cat.name}" />
          <p>${cat.name}</p>
        </a>
      `;
    })
    .join("");
}
