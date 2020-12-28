/* Importar imagenes */

import "../static/Logo_ICBR1_v2.png";
import "../static/Logo_ICBR2_mobile.png";
import "../static/ICBR4.png"
import "../static/heroBkgMobile.png"
import "../static/Ivan-web-small1.png";
import "../static/heroBkgimg.jpg"
import "../static/Logo_ICBR1.png"
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
    rootMargin: "-270px"
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

/*--------------------------
------- MOBILE NAV ----------
----------------------------*/
const mobileNav = document.querySelector(".mobile-nav");
const toggleNavButton = document.querySelector(".navigation__toggle-button");
const backdrop = document.querySelector(".backdrop")

toggleNavButton.addEventListener('click', function(){
  backdrop.style.display = "block";
  mobileNav.classList.add('open');
  setTimeout(function(){
    backdrop.classList.add('open');
  }, 10);
});

backdrop.addEventListener('click', function(){
  backdrop.classList.remove('open');
  mobileNav.classList.remove('open');
  setTimeout(function(){
    backdrop.style.display = "none";
  }, 200);
});