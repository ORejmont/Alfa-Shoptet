/* Custom scroll and hover classes */
export function initHeaderHover() {
  const header = document.getElementById("header");
  const html = document.documentElement;

  if (!header) return;

  let hoverCleanup = null;
  let scrollHandlerActive = false;

  function checkHeader() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const headerOffsetTop = header.offsetTop;

    if (scrollTop >= headerOffsetTop) {
      html.classList.add("scrolled-custom");
    } else {
      html.classList.remove("scrolled-custom");
    }
  }

  function handleHeaderHover() {
    const addClass = () => document.body.classList.add("header-hover");
    const removeClass = () => document.body.classList.remove("header-hover");

    header.addEventListener("mouseenter", addClass);
    header.addEventListener("mouseleave", removeClass);

    return () => {
      header.removeEventListener("mouseenter", addClass);
      header.removeEventListener("mouseleave", removeClass);
      document.body.classList.remove("header-hover");
    };
  }

  function enableHeaderEffects() {
    if (!scrollHandlerActive) {
      checkHeader();
      window.addEventListener("scroll", checkHeader, { passive: true });
      scrollHandlerActive = true;
    }

    if (!hoverCleanup) {
      hoverCleanup = handleHeaderHover();
    }
  }

  function disableHeaderEffects() {
    if (scrollHandlerActive) {
      window.removeEventListener("scroll", checkHeader);
      html.classList.remove("scrolled-custom");
      scrollHandlerActive = false;
    }

    if (hoverCleanup) {
      hoverCleanup();
      hoverCleanup = null;
    }
  }

  function handleResponsiveInit() {
    if (window.innerWidth >= 768) {
      enableHeaderEffects();
    } else {
      disableHeaderEffects();
    }
  }

  handleResponsiveInit();
  window.addEventListener("resize", handleResponsiveInit);
}
/* Custom scroll and hover classes */
