/* Function for banner text processing */
export function processBannerTexts() {
  $(".extended-banner-texts").each(function () {
    const $banner = $(this);
    const $title = $banner.find(".extended-banner-text");
    let text = $title.text();
    const originalText = text; // for checking if there was "no match"

    // Perform case-insensitive comparison
    const lowerText = text.toLowerCase();

    if (lowerText.includes("blacktext")) {
      $banner.addClass("is-black");
      text = text.replace(/blacktext/gi, "").trim(); // Remove occurrence regardless of letter case
      $title.text(text);
    } else if (lowerText.includes("whitetext")) {
      $banner.addClass("is-white");
      text = text.replace(/whitetext/gi, "").trim();
      $title.text(text);
    } else {
      // If none of the tags were found
      $banner.addClass("has-background");
      $title.text(originalText.trim());
    }
  });
}
/* Function for banner text processing */
