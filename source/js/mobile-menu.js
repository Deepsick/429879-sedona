var button = document.querySelector(".main-nav__toggle");
var menu = document.querySelector(".site-list");

button.classList.remove("main-nav__toggle--nojs");
menu.classList.remove("site-list--nojs");

button.addEventListener("click", function(event) {
  event.preventDefault();
  if ( menu.classList.contains("site-list--opened")) {
    menu.classList.remove("site-list--opened");
    button.classList.remove("main-nav__toggle--close");
  } else {
    menu.classList.add("site-list--opened");
    button.classList.add("main-nav__toggle--close");
  }
})
