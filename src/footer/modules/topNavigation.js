let areTopNavigationListenersRegistered = false;

export function initTopNavigation() {
  updateTopNavigationOffset();

  const ready = document.fonts?.ready ?? Promise.resolve();

  ready.then(() => {
    requestAnimationFrame(() => {
      toggleContacts();

      if (!areTopNavigationListenersRegistered) {
        window.addEventListener("resize", toggleContacts);
        window.addEventListener("resize", updateTopNavigationOffset);
        areTopNavigationListenersRegistered = true;
      }
    });
  });
}

function toggleContacts() {
  const bar = document.querySelector(".top-navigation-bar");
  const contacts = document.querySelector(".top-navigation-contacts");

  if (!bar || !contacts) return;

  const contactsHeight = contacts.offsetHeight;

  if (contactsHeight <= 40) {
    bar.classList.add("show-contacts");
  } else {
    bar.classList.remove("show-contacts");
  }

  updateTopNavigationOffset();
}

function updateTopNavigationOffset() {
  const navBar = document.querySelector(".top-navigation-bar");
  const userAction = document.querySelector(".user-action");
  const loginWidget = document.querySelector(".login-widget");

  if (!navBar) return;

  const navHeight = navBar.offsetHeight;

  navBar.style.top = `-${navHeight}px`;

  if (userAction) {
    userAction.style.top = `-${navHeight}px`;
    userAction.style.marginBottom = `${navHeight}px`;

    if (loginWidget) {
      loginWidget.style.top = `${navHeight + 68}px`;
    }

    if (hasUserActionSibling(navBar, "user-action")) {
      navBar.style.marginTop = `-${navHeight}px`;
    }
  }

  navBar.classList.add("top-loaded");
}

function hasUserActionSibling(element, targetClass) {
  let prev = element.previousElementSibling;

  while (prev) {
    if (prev.classList.contains(targetClass)) return true;
    if (!prev.classList.contains("admin-bar")) break;
    prev = prev.previousElementSibling;
  }

  return false;
}
