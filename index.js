const navLinks = document.querySelectorAll(".nav-link");
const planetName = document.getElementById("planet-name");
const planetInfo = document.getElementById("planet-info");
const source = document.getElementById("source");
const rotationTime = document.getElementById("rotation-time");
const revolutionTime = document.getElementById("revolution-time");
const radius = document.getElementById("radius");
const avgTemp = document.getElementById("avg-temp");
const planetImg = document.getElementById("planet-img");
const buttons = document.querySelectorAll(".btn");
const overviewBtn = document.getElementById("overview-btn");
const structureBtn = document.getElementById("structure-btn");
const geologyBtn = document.getElementById("geology-btn");
const imgOverlay = document.getElementById("img-overlay");
const toggleBtn = document.getElementById("toggle-btn");
const navMenu = document.getElementById("nav-menu");
const closeBtn = document.getElementById("close-btn");

document.addEventListener("DOMContentLoaded", function () {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      const mercury = data[0];

      planetName.textContent = mercury.name;
      planetInfo.textContent = mercury.overview.content;
      source.innerHTML = `Source: <a href="${mercury.overview.source}" target="_blank">Wikipedia <span><img src="./assets/icon-source.svg"></span></a>`;
      rotationTime.textContent = mercury.rotation;
      revolutionTime.textContent = mercury.revolution;
      radius.textContent = mercury.radius;
      avgTemp.textContent = mercury.temperature;
      buttons[0].classList.add("mercury");
      planetImg.src = mercury.images.planet;

      overviewBtn.addEventListener("click", function () {
        planetInfo.textContent = mercury.overview.content;
        source.innerHTML = `Source: <a href="${mercury.overview.source}" target="_blank">Wikipedia <span><img src="./assets/icon-source.svg"></span></a>`;
        buttons[0].classList.add("mercury");
        buttons[1].classList.remove("mercury");
        buttons[2].classList.remove("mercury");
        planetImg.src = mercury.images.planet;
        imgOverlay.src = "";
      });

      structureBtn.addEventListener("click", function () {
        planetInfo.textContent = mercury.structure.content;
        source.innerHTML = `Source: <a href="${mercury.structure.source}" target="_blank">Wikipedia <span><img src="./assets/icon-source.svg"></span></a>`;
        buttons[0].classList.remove("mercury");
        buttons[1].classList.add("mercury");
        buttons[2].classList.remove("mercury");
        planetImg.src = mercury.images.internal;
        imgOverlay.src = "";
      });

      geologyBtn.addEventListener("click", function () {
        planetInfo.textContent = mercury.geology.content;
        source.innerHTML = `Source: <a href="${mercury.geology.source}" target="_blank">Wikipedia <span><img src="./assets/icon-source.svg"></span></a>`;
        buttons[0].classList.remove("mercury");
        buttons[1].classList.remove("mercury");
        buttons[2].classList.add("mercury");
        planetImg.src = mercury.images.planet;
        imgOverlay.src = mercury.images.geology;
      });

      navLinks.forEach((link, index) => {
        link.addEventListener("click", function () {
          imgOverlay.src = "";
          planetName.textContent = data[index].name;
          planetInfo.textContent = data[index].overview.content;
          source.innerHTML = `Source: <a href="${data[index].overview.source}" target="_blank">Wikipedia <span><img src="./assets/icon-source.svg"></span></a>`;
          rotationTime.textContent = data[index].rotation;
          revolutionTime.textContent = data[index].revolution;
          radius.textContent = data[index].radius;
          avgTemp.textContent = data[index].temperature;
          planetImg.src = data[index].images.planet;

          buttons.forEach((button) => {
            button.className = "";
            button.classList.add("btn");
          });
          buttons[0].classList.add(data[index].name.toLowerCase());

          overviewBtn.addEventListener("click", function () {
            planetInfo.textContent = data[index].overview.content;
            source.innerHTML = `Source: <a href="${data[index].overview.source}" target="_blank">Wikipedia <span><img src="./assets/icon-source.svg"></span></a>`;
            buttons.forEach((button) => {
              button.className = "";
              button.classList.add("btn");
            });
            buttons[0].classList.add(`${data[index].name.toLowerCase()}`);
            planetImg.src = data[index].images.planet;
            imgOverlay.src = "";
          });

          structureBtn.addEventListener("click", function () {
            planetInfo.textContent = data[index].structure.content;
            source.innerHTML = `Source: <a href="${data[index].structure.source}" target="_blank">Wikipedia <img src="./assets/icon-source.png"></a>`;
            buttons.forEach((button) => {
              button.className = "";
              button.classList.add("btn");
            });
            buttons[1].classList.add(`${data[index].name.toLowerCase()}`);
            planetImg.src = data[index].images.internal;
            imgOverlay.src = "";
          });

          geologyBtn.addEventListener("click", function () {
            planetInfo.textContent = data[index].geology.content;
            source.innerHTML = `Source: <a href="${data[index].geology.source}" target="_blank">Wikipedia <img src="./assets/icon-source.png"></a>`;
            buttons.forEach((button) => {
              button.className = "";
              button.classList.add("btn");
            });
            buttons[2].classList.add(`${data[index].name.toLowerCase()}`);
            planetImg.src = data[index].images.planet;
            imgOverlay.src = data[index].images.geology;
          });
        });
      });
    })

    .catch((error) => {
      console.log(error);
    });
});

toggleBtn.addEventListener("click", function (e) {
  navMenu.classList.add("active");
  e.target.classList.add("active");
  closeBtn.classList.add("active");
});

closeBtn.addEventListener("click", function (e) {
  if (navMenu.classList.contains("active")) {
    navMenu.classList.remove("active");
    e.target.classList.remove("active");
    toggleBtn.classList.remove("active");
  } else {
    e.target.classList.add("active");
    toggleBtn.classList.add("active");
  }
});

navLinks.forEach((navLink) => navLink.addEventListener("click", closeMenu));

function closeMenu() {
  toggleBtn.classList.remove("active");
  navMenu.classList.remove("active");
  closeBtn.classList.remove("active");
}
