/* Get top categories */
export function getTopCategoriesData(slugs) {
  const menuItems = Array.from(
    document.querySelectorAll(
      "#navigation .menu-level-1 > li > a, #navigation .menu-level-2 li > div > a",
    ),
  );

  const menuItemsBySlug = new Map();

  menuItems.forEach((item) => {
    const href = item.getAttribute("href");
    if (!href) return;

    const slug = href.replace(/^\/|\/$/g, "");
    menuItemsBySlug.set(slug, item);
  });

  return slugs
    .map((slug) => {
      const item = menuItemsBySlug.get(slug);
      if (!item) return null;

      const parentLi = item.closest("li");

      const itemHref = item.getAttribute("href");

      const imgEl = [
        ...(parentLi?.querySelectorAll("a.menu-image img") || []),
      ].find((img) => img.closest("a")?.getAttribute("href") === itemHref);

      const imageSrc =
        imgEl?.dataset.src ||
        imgEl?.src ||
        "https://cdn.myshoptet.com/prj/dist/master/cms/templates/frontend_templates/00/img/folder.svg";

      const nameEl =
        parentLi?.querySelector("b") || parentLi?.querySelector("span") || item;

      const name = nameEl?.textContent.trim() || slug;

      return {
        href: item.getAttribute("href"),
        name,
        image: imageSrc,
      };
    })
    .filter(Boolean);
}
/* Get top categories */
