/* Add "More" before .top-navigation-bar hamburger */
export function initMenuMore() {
  const span = document.querySelector("#header .menu-helper > span");
  const target = document.querySelector(
    ".top-navigation-bar .container .top-navigation-menu .top-navigation-menu-trigger",
  );

  if (!span || !target || target.querySelector("span")) return;

  const clonedSpan = span.cloneNode(true);
  target.prepend(clonedSpan);
}
/* Add "More" before .top-navigation-bar hamburger */
