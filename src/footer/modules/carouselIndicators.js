/* Carousel indicator */
export function initCarouselIndicators() {
  const carousel = document.querySelector(".in-index #carousel");
  if (!carousel) return;

  const carouselInner = carousel.querySelector(".carousel-inner");
  if (!carouselInner) return;

  const items = carouselInner.querySelectorAll(".item");

  if (items.length <= 1) return;

  if (carousel.querySelector(".carousel-indicators")) return;

  const indicators = document.createElement("ol");
  indicators.className = "carousel-indicators";
  carousel.insertBefore(indicators, carouselInner);

  items.forEach((item, index) => {
    const li = document.createElement("li");
    li.setAttribute("data-target", "#carousel");
    li.setAttribute("data-slide-to", index);

    if (index === 0) {
      li.classList.add("active");
    }

    indicators.appendChild(li);
  });
}
/* Carousel indicator */
