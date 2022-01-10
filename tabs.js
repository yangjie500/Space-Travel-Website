const tabLists = document.querySelector('[role="tablist"]')
const tabs = tabLists.querySelectorAll('[role="tab"]')

let tabFocus = 0;

tabLists.addEventListener("keydown", changeTabFocus)

tabs.forEach(tab => {
  tab.addEventListener("click", changeTabPanel)
});

function changeTabFocus(e) {
  const keydownLeft = 37;
  const keydownRight = 39;

  // change the tab index of the current tab to -1
  if (e.keyCode === keydownLeft || e.keyCode === keydownRight) {
    tabs[tabFocus].setAttribute('tabindex', -1)
  
    // if the right key is pushed, move to the next tab on the right
    if (e.keyCode === keydownRight) {
      tabFocus++
      if (tabFocus >= tabs.length) {
        tabFocus = 0;
      }
    }
    // if the left key is pushed, move to the next tab to on left
    if (e.keyCode === keydownLeft) {
      tabFocus--
      if (tabFocus < 0) {
        tabFocus = tabs.length - 1;
      }
    }
}

  tabs[tabFocus].setAttribute("tabindex", 0);
  tabs[tabFocus].focus();
  
}

function changeTabPanel(e) {
  const targetTab = e.target;
  const targetPanel = targetTab.getAttribute("aria-controls");
  const targetImage = targetTab.getAttribute("data-image");

  const tabContainer = targetTab.parentNode;
  const mainContainer = tabContainer.parentNode;

  tabContainer
    .querySelector('[aria-selected="true')
    .setAttribute("aria-selected", false)

  targetTab.setAttribute("aria-selected", true)

  mainContainer
    .querySelectorAll('[role="tabpanel"]')
    .forEach(article => article.setAttribute("hidden", true))

  mainContainer
    .querySelectorAll('picture')
    .forEach(pic => pic.setAttribute("style", "display: none"))

  mainContainer.querySelector([`#${targetImage}`]).setAttribute("style", "display: block");

  mainContainer.querySelector([`#${targetPanel}`]).removeAttribute("hidden")
}