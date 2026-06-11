/* Product image swiping */
export function initProductImageSwipe() {
  const mainImgWrapper = document.querySelector(".p-image");

  if (!mainImgWrapper || mainImgWrapper.dataset.swipeInitialized === "true") {
    return;
  }

  const thumbnails = Array.from(
    document.querySelectorAll(".p-thumbnails .p-thumbnail"),
  );

  if (thumbnails.length === 0) return;

  let startX = 0;
  let endX = 0;

  const anchor = mainImgWrapper.querySelector("a.p-main-image");
  const mainImg = mainImgWrapper.querySelector("img");

  if (!anchor || !mainImg) return;

  function getCurrentIndex() {
    return thumbnails.findIndex((t) => t.classList.contains("highlighted"));
  }

  function switchTo(index) {
    if (index < 0 || index >= thumbnails.length) return;

    const thumb = thumbnails[index];
    const bigHref = thumb.getAttribute("href");

    if (!bigHref) return;

    const origHref = bigHref.replace("/big/", "/orig/");

    mainImg.src = bigHref;

    anchor.setAttribute("href", bigHref);
    anchor.setAttribute("data-href", origHref);

    thumbnails.forEach((t) => t.classList.remove("highlighted"));
    thumb.classList.add("highlighted");
  }

  mainImgWrapper.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  mainImgWrapper.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX;
    const diff = endX - startX;

    if (Math.abs(diff) < 40) return;

    const currentIndex = getCurrentIndex();

    if (diff < 0) {
      switchTo(currentIndex + 1);
    } else {
      switchTo(currentIndex - 1);
    }
  });

  mainImgWrapper.dataset.swipeInitialized = "true";
}
/* Product image swiping */
