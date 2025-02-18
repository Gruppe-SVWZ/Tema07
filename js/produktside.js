// const mycategory = new URLSearchParams(window.location.search).get("category");
// const listContainer = document.querySelector(".product_list");

// fetch(`https://dummyjson.com/products/category/${mycategory}`)
//   .then((response) => response.json())
//   .then((data) => showList(data.products))
//   .catch((error) => console.error("Fejl ved hentning af data:", error));

// function showList(products) {
//   console.log(products);
//   if (!Array.isArray(products)) {
//     console.error("Forventede en array, men fik:", products);
//     return;
//   }

//   const markup = products
//     .map(
//       (product) =>
//         `<article class="product_list_container">
//           <a href="indvidueltprodukt.html?id=${product.id}">
//             <img src="${product.thumbnail}" alt="${product.title}">
//             <h3>${product.title}</h3>
//             <p>Pris: ${product.price} kr.</p>
//           </a>
//         </article>`
//     )
//     .join("");

//   console.log(markup);
//   listContainer.innerHTML = markup;
// }

// const listContainer = document.querySelector(".product_list");

// fetch("https://dummyjson.com/products")
//   .then((response) => response.json())
//   .then((data) => showList(data.products))
//   .catch((error) => console.error("Fejl ved hentning af data:", error));

// function showList(products) {
//   console.log(products);
//   if (!Array.isArray(products)) {
//     console.error("Forventede en array, men fik:", products);
//     return;
//   }

//   const markup = products
//     .map(
//       (product) => `
//       <article class="product_list_container">
//         <a href="indvidueltprodukt.html?id=${product.id}">
//           <img src="${product.thumbnail}" alt="${product.title}">
//           <h3>${product.title}</h3>
//           <p>Pris: ${product.price} kr.</p>
//         </a>
//       </article>`
//     )
//     .join("");

//   console.log(markup);
//   listContainer.innerHTML = markup;
// }

const mycategory = new URLSearchParams(window.location.search).get("category");
const listContainer = document.querySelector(".product_list");

// Funktion til at hente produkter
function fetchProducts(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => showList(data.products))
    .catch((error) => console.error("Fejl ved hentning af data:", error));
}

// Tjek om der er en kategori i URL'en
if (mycategory) {
  fetchProducts(`https://dummyjson.com/products/category/${mycategory}`);
} else {
  fetchProducts("https://dummyjson.com/products?limit=50");
}

// Funktion til at vise produkter
function showList(products) {
  console.log(products);
  if (!Array.isArray(products)) {
    console.error("Forventede en array, men fik:", products);
    return;
  }

  const markup = products
    .map((product) => {
      const imageUrl = product.images?.[1] || product.thumbnail;

      return `
      <article class="product_list_container">
        <a href="indvidueltprodukt.html?id=${product.id}">
          <img src="${imageUrl}" alt="${product.title}">
          <h3>${product.title}</h3>
          <p>Pris: ${product.price} kr.</p>
        </a>
      </article>`;
    })
    .join("");

  console.log(markup);
  listContainer.innerHTML = markup;
}
// -----------------------------------------------------------------------------------
const carouselItems = document.querySelector(".carousel-items");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

let currentIndex = 0;

function updateCarousel() {
  const items = document.querySelectorAll(".carousel-items img");
  const totalItems = items.length;
  const itemWidth = window.innerWidth > 700 ? 250 : 200;

  carouselItems.style.transform = `translateX(-${currentIndex * (itemWidth + 20)}px)`;

  if (currentIndex === totalItems - 1) {
    nextButton.disabled = true;
  } else {
    nextButton.disabled = false;
  }

  if (currentIndex === 0) {
    prevButton.disabled = true;
  } else {
    prevButton.disabled = false;
  }
}

prevButton.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
});

nextButton.addEventListener("click", () => {
  const totalItems = document.querySelectorAll(".carousel-items img").length;
  if (currentIndex < totalItems - 1) {
    currentIndex++;
    updateCarousel();
  }
});

updateCarousel();
