const BANNER_IMAGE_CONFIGS = [
  {
    container: ".banner-wrapper",
    text: ".extended-banner-texts",
    img: "img",
  },
  {
    container: ".item",
    text: ".extended-banner-texts",
    img: "img",
  },
  {
    container: ".footer-banner",
    text: ".extended-banner-texts",
    img: "img",
  },
  {
    container: ".banner-category",
    text: ".extended-banner-texts",
    img: "img",
  },
];

/* Banner size based on text and image */
export function adjustBannerImages() {
  let foundSomething = false;

  BANNER_IMAGE_CONFIGS.forEach(({ container, text, img }) => {
    document.querySelectorAll(container).forEach((wrapper) => {
      const textEl = wrapper.querySelector(text);
      const imgEl = wrapper.querySelector(img);

      if (!textEl || !imgEl) return;

      const rect = textEl.getBoundingClientRect();
      const computedStyle = window.getComputedStyle(textEl);

      const contentHeight = Math.max(
        rect.height,
        textEl.offsetHeight,
        textEl.scrollHeight,
      );

      const totalHeight =
        contentHeight +
        parseFloat(computedStyle.marginTop) +
        parseFloat(computedStyle.marginBottom);

      const prev = parseFloat(imgEl.style.minHeight) || 0;
      const newHeight = Math.max(prev, totalHeight);

      imgEl.style.minHeight = `${newHeight}px`;
      foundSomething = true;
    });
  });

  return foundSomething;
}
/* Banner size based on text and image */
