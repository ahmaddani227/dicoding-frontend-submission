const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("hidden");
    navMenu.classList.toggle("nav-menu-active");
    navToggle.classList.toggle("ri-menu-line");
    navToggle.classList.toggle("ri-close-line");
  });
}

window.addEventListener("click", function (e) {
  if (e.target != navToggle && e.target != navMenu) {
    navMenu.classList.add("hidden");
    navMenu.classList.remove("nav-menu-active");
    navToggle.classList.add("ri-menu-line");
    navToggle.classList.remove("ri-close-line");
  }
});

window.onscroll = function () {
  const header = document.querySelector("header");
  const fixedNav = header.offsetTop;

  if (window.pageYOffset > fixedNav) {
    header.classList.add("navbar-active");
  } else {
    header.classList.remove("navbar-active");
  }
};

const books = [
  {
    judul: "Filosofi Teras",
    penulis: "Henry Manampiring",
    genre: "Filsafat",
    harga: 50000,
    deskripsi: `Lebih dari 2000 tahun lalu, sebuah mazhab filsafat menemukan akar masalah dan juga solusi dari banyak emosi negatif. Stoisisme, atau Filosofi Teras, adalah filsafat Yunani-Romawi kuno yang bisa membantu kita mengatasi emosi negatif dan menghasilkan mental yang tangguh dalam menghadapi naik-turun nya kehidupan.`,
    gambar: "https://cdn.gramedia.com/uploads/items/filosofi_teras_hc.png",
  },
  {
    judul: "The Leadership Tricks",
    penulis: "Ayub R. Noviandaru",
    genre: "Kepemimpinan",
    harga: 50000,
    deskripsi: `Ada dua karakter yang harus dimiliki oleh seorang pemimpin di masa sekarang. Pertama, seorang pemimpin harus mempunyai tujuan yang jelas. Dia harus mampu merumuskan dengan jelas arah tujuan organisasi yang dipimpinnya.`,
    gambar:
      "https://cdn.gramedia.com/uploads/picture_meta/2023/7/5/b8otgaw5ar9fcdmehq4veg.jpg",
  },
  {
    judul: "Sejarah Nusantara",
    penulis: "Alfred Russel Wallace",
    genre: "Fantasi",
    harga: 50000,
    deskripsi: `Buku Sejarah Nusantara (The Malay Archipelago) adalah sebuah karya penjelajah dan ilmuwan terkenal, Alfred Russel Wallace, yang diterbitkan pada tahun 1869.`,
    gambar:
      "https://cdn.gramedia.com/uploads/picture_meta/2024/2/12/fkdsbbwr3ra757k9xlff4b.jpg",
  },
];

const bookContainer = document.querySelector(".card-book-container");

const makeCard = (el) => {
  const img = document.createElement("img");
  img.setAttribute("src", el.gambar);
  img.setAttribute("alt", el.judul);

  const judul = document.createElement("h1");
  judul.classList.add("card-title");
  judul.innerText = el.judul;

  const deskripsi = document.createElement("p");
  deskripsi.classList.add("card-description");
  deskripsi.innerText = el.deskripsi;

  const deskripsi2 = document.createElement("div");
  deskripsi2.classList.add("description-two");

  const penulis = document.createElement("p");
  penulis.classList.add("penulis");
  penulis.innerText = `Penulis: ${el.penulis}`;

  const cart = document.createElement("h5");
  cart.innerHTML = `<i class="ri-shopping-cart-2-line"></i>`;
  cart.style.fontSize = "1.3rem";

  const harga = document.createElement("h5");
  harga.innerText = `Harga: ${el.harga}`;

  deskripsi2.append(harga, cart);

  const cardContainer = document.createElement("div");
  cardContainer.classList.add("card");

  cardContainer.append(img, judul, deskripsi, penulis, deskripsi2);

  return cardContainer;
};

document.addEventListener("DOMContentLoaded", () => {
  books.forEach((book) => {
    const card = makeCard(book);

    bookContainer.append(card);
  });
});
