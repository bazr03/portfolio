import "../sass/main.scss";


/* Importar imagenes */
// import "../static/Logo_Iván_Bazaldúa.png"
import "../static/Logo_ICBR1_v2.png"
import "../static/Logo_ICBR2_mobile.png"
import "../static/heroBkgimg.jpg"
import "../static/Ivan-web-small1.png";
import "../static/logos_html-5.png";
import "../static/logos_css-3.png";
import "../static/logos_javascript.png";
import "../static/logos_webpack.png";
import "../static/logos_sass.png";
import "../static/fa-brands_git-alt.png";
import "../static/grommet-icons_figma.png";

import "../static/logos_php.png";
import "../static/logos_laravel.png";
import "../static/logos_python.png";
import "../static/logos_django.png";
import "../static/dashicons_database.png";
import "../static/logos_linux-tux.png";
import "../static/logos_angular-icon.png";
import "../static/sprite.svg";


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
    rootMargin: "-180px"
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