import "regenerator-runtime"; /* for async await transpile */
import "../styles/main.css";

window.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger-menu");
  const navList = document.getElementById("nav-list");
  const navMenu = document.getElementById("nav-menu");

  hamburger.addEventListener("click", () => {
    document.body.style.overflow = "hidden";
    navList.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  window.addEventListener("click", (event) => {
    if (event.target === navList) {
      document.body.style.overflow = "auto";
      navList.classList.toggle("active");
      navMenu.classList.toggle("active");
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      document.body.style.overflow = "auto";
      navList.classList.remove("active");
      navMenu.classList.remove("active");
    }
  });

  async function fetchDataAndDisplay() {
    try {
      const response = await fetch("./data/DATA.json");
      const data = await response.json();
      displayData(data.restaurants);
    } catch (error) {
      console.error("Error fetching JSON:", error);
    }
  }

  function displayData(data) {
    const container = document.querySelector(".card-container");
    container.innerHTML = data
      .map(
        (item) => `
      <div class="card" key="${item.id}" >
        <figure>
          <img src="${item.pictureId}" alt="${item.name}" />
        </figure>
        <div class="kota">
          <p>${item.city}</p>
        </div>
        <p class="rating">Rating: ${item.rating}</p>
        <h3 class="title">${item.name}</h3>
        <p class="description">${item.description}</p>
      </div>
    `
      )
      .join("");
  }

  fetchDataAndDisplay();
});
