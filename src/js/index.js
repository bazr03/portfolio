import "../sass/main.scss";


/* Importar imagenes */
import "../static/Logo_Iván_Bazaldúa.png"
import "../static/heroBkgimg.jpg"
import "../static/Ivan-web-small1.png"

/*--------------------------
------- SELECTORES ----------
----------------------------*/
const header = document.querySelector(".header");
const mainNav = document.querySelector(".navigation");
const navImage = document.querySelector(".navigation__logo");
const mainNavLinks = document.querySelectorAll(".navigation__link");

/*--------------------------
------- OBSERVADORES ----------
----------------------------*/
observadores();

function observadores() {
  const heroOptions = {
    rootMargin: "-140px"
  };

  const heroObserver = new IntersectionObserver(function(
    entries,
    heroObserver
  ) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        mainNav.classList.add("nav-scrolled");
        navImage.classList.add("navImg-scrolled");
        mainNavLinks.forEach(link => {
          link.classList.add("navigation__link-scrolled");
        });
      } else {
        mainNav.classList.remove("nav-scrolled");
        navImage.classList.remove("navImg-scrolled");
        mainNavLinks.forEach(link => {
          link.classList.remove("navigation__link-scrolled");
        });
      }
    });
  },
  heroOptions);

  heroObserver.observe(header);
}