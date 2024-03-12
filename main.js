/*==================== SHOW SCROLL TOP ====================*/
function scrollTop() {
  const scrollTop = document.getElementById("scroll-top");
  // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if (this.scrollY >= 560) scrollTop.classList.add("show-scroll");
  else scrollTop.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollTop);

/*==================== Light / Dark Mode  ====================*/
const themeSave = "CVMaheutTheme";
let theme = localStorage.getItem(themeSave);
if (theme == null) theme = "light";

function switchTheme() {
  if (theme === "light") {
    theme = "dark";
    localStorage.setItem(themeSave, "dark");
  } else {
    theme = "light";
    localStorage.setItem(themeSave, "light");
  }
  switchLightSymbol();
  updateTheme();
}

function updateTheme() {
  if (theme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
  }
}

function switchLightSymbol() {
  document.getElementById("light").classList.toggle("disable");
  document.getElementById("dark").classList.toggle("disable");
}

document.getElementById("theme-button").addEventListener("click", switchTheme);
updateTheme();
if (theme === "dark") {
  switchLightSymbol();
}

/*================= CAROUSEL SETUP FUNCTION =================*/

function setupCarousel(slidesData, classData, name, number) {
  const slide = document.querySelector(slidesData);
  let count = 0;
  slide.insertAdjacentHTML(
    "beforeend",
    `<li class="slide" data-active>
      <img
          src="assets/${name}/${name}${count}.webp"
          alt="${name} ${count}"
          class="${classData}"
          /> 
          </li>`
  );
  for (count++; count <= number; count++) {
    slide.insertAdjacentHTML(
      "beforeend",
      `<li class="slide">
          <img
              src="assets/${name}/${name}${count}.webp"
              alt="${name} ${count}"
              class="${classData}"
              />
              </li>`
    );
  }
}

/*================== CAROUSEL EVENT FUNCTION ========================================*/

function initCarousel(buttonsData, slidesData) {
  const buttons = document.querySelectorAll(buttonsData);
  const slides = document.querySelector(slidesData);

  //set button to move carousel
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const offset = button.dataset.carouselButton === "next" ? 1 : -1;
      moveCarousel(offset, slides);
    });
  });

  //move carousel auto
  setInterval(moveCarousel, 5000, -1, slides);
}

//take the carousel and switch active img
function moveCarousel(offset, slides) {
  const activeSlide = slides.querySelector("[data-active]");
  let newIndex = [...slides.children].indexOf(activeSlide) + offset;
  if (newIndex < 0) newIndex = slides.children.length - 1;
  if (newIndex >= slides.children.length) newIndex = 0;

  slides.children[newIndex].dataset.active = true;
  delete activeSlide.dataset.active;
}

/*==================== CAROUSEL INSTANCE ==============================*/

/** ================== ANIMATION ===================== */
const animationName = "fade-in";

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const children = entry.target.children;
    if (entry.isIntersecting) {
      for (let i = 0; i < children.length; i++) {
        children[i].classList.add(animationName);
      }

      return; // if we added the class, exit the function
    }

    // We're not intersecting, so remove the class!
    for (let i = 0; i < children.length; i++) {
      children[i].classList.remove(animationName);
    }
  });
});
const container = document.querySelectorAll(".container");
container.forEach((element) => observer.observe(element));

/** ================== COPY Function ===================== */

function copyTel(event) {
  event.preventDefault();
  let input = document.createElement("input");
  let copyText = document.getElementById("tel").innerHTML;
  input.value = copyText.replaceAll(".", "");
  document.body.appendChild(input);
  input.select();
  input.setSelectionRange(0, 99999);
  document.execCommand("copy");
  document.body.removeChild(input);
}

function copyEmail(event) {
  event.preventDefault();
  let input = document.createElement("input");
  let copyText = document.getElementById("email").innerHTML;
  input.value = copyText;
  document.body.appendChild(input);
  input.select();
  input.setSelectionRange(0, 99999);
  document.execCommand("copy");
  document.body.removeChild(input);
}
