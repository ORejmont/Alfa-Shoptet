/* Carousel swipe */
export function initCarouselSwipe() {
  document.querySelectorAll(".carousel").forEach((carousel) => {
    if (carousel.dataset.swipeInitialized === "true") return;

    let xStart = null;

    function handleTouchStart(e) {
      xStart = e.touches[0].pageX;
    }

    function handleTouchMove(e) {
      if (xStart === null) return;

      const xMove = e.touches[0].pageX;
      const diff = xStart - xMove;
      const sensitivity = 5;

      if (diff > sensitivity) {
        carousel.querySelector(".right")?.click();
        xStart = null;
      } else if (diff < -sensitivity) {
        carousel.querySelector(".left")?.click();
        xStart = null;
      }
    }

    function handleTouchEnd() {
      xStart = null;
    }

    carousel.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    carousel.addEventListener("touchmove", handleTouchMove, {
      passive: true,
    });
    carousel.addEventListener("touchend", handleTouchEnd);

    carousel.dataset.swipeInitialized = "true";
  });
}
/* Carousel swipe */
