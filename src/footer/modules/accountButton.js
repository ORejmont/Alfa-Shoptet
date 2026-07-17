export function initAccountButton() {
  moveLoginAccountButton();

  if (!window.accountButtonResizeInitialized) {
    window.accountButtonResizeInitialized = true;
    window.addEventListener("resize", moveLoginAccountButton);
  }
}

/* Move account icon */
function moveLoginAccountButton() {
  // Runs only on 768px and above
  if (window.innerWidth < 768) return;

  const navigationButtons = document.querySelector(".navigation-buttons");

  if (!navigationButtons) return;

  // Login or Account – use whichever exists
  const loginBtn = document.querySelector(
    ".top-navigation-bar .container .top-navigation-tools .top-nav-button-login",
  );
  const accountBtn = document.querySelector(
    ".top-navigation-bar .container .top-navigation-tools .top-nav-button-account",
  );

  const buttonToMove = loginBtn || accountBtn;
  if (!buttonToMove) return;

  // Move button to the beginning (.prepend)
  navigationButtons.prepend(buttonToMove);
}
/* Move account icon */
