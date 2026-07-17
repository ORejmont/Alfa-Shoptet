export function imagesLoaded(container, callback) {
  const images = Array.from(container.querySelectorAll("img")).filter((img) => {
    const hasSrc = img.currentSrc || img.src;
    const rect = img.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

    return hasSrc && isVisible;
  });

  let loaded = 0;

  if (images.length === 0) {
    callback();
    return;
  }

  images.forEach((img) => {
    if (img.complete) {
      loaded++;

      if (loaded === images.length) {
        callback();
      }
    } else {
      img.addEventListener("load", check);
      img.addEventListener("error", check);
    }
  });

  function check() {
    loaded++;

    if (loaded === images.length) {
      callback();
    }
  }
}
