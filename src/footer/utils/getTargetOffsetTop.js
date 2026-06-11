export function getTargetOffsetTop($target, offset) {
  if ($target.is(":visible")) {
    return $target.offset().top - offset;
  }

  const originalStyles = {
    display: $target.css("display"),
    visibility: $target.css("visibility"),
    position: $target.css("position"),
  };

  $target.css({
    display: "block",
    visibility: "hidden",
    position: "absolute",
  });

  const targetTop = $target.offset().top - offset;

  $target.css(originalStyles);

  return targetTop;
}
