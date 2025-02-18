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
const pageTitle = document.querySelector(".alleprodukter");
const sortSelect = document.querySelector("#sort");

let productsData = [];

function fetchCategories() {
  return fetch("https://dummyjson.com/products/categories")
    .then((response) => response.json())
    .then((categories) => {
      console.log("Hentede kategorier:", categories);
      const formattedCategories = {};

      // Gennemgå hvert objekt og brug 'name' til kategorinavnet
      categories.forEach((category) => {
        // Sørg for, at 'name' er en streng, før vi bruger den
        if (category.name && typeof category.name === "string") {
          // Konverterer navn til lowercase og bruger den som nøgle
          formattedCategories[category.slug] = category.name.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
        } else {
          console.warn("Uventet datatype for category:", category);
        }
      });
      return formattedCategories;
    })
    .catch((error) => {
      console.error("Fejl ved hentning af kategorier:", error);
      return {};
    });
}

// Funktion til at hente produkter_______________________________________
function fetchProducts(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      productsData = data.products;
      showList(productsData);
    })
    .catch((error) => console.error("Fejl ved hentning af produkter:", error));
}

// Håndter kategorier og opdater titlen______________________________________
function handleCategory() {
  fetchCategories().then((categories) => {
    const formattedCategory = mycategory ? categories[mycategory.toLowerCase()] || "All Products" : "All Products";

    pageTitle.textContent = formattedCategory;

    if (mycategory) {
      fetchProducts(`https://dummyjson.com/products/category/${mycategory.toLowerCase()}`);
    } else {
      fetchProducts("https://dummyjson.com/products?limit=50");
    }
  });
}

// Funktion til at vise produkterne_____________________________________
function showList(products) {
  if (!Array.isArray(products) || products.length === 0) {
    listContainer.innerHTML = "<p>Ingen produkter fundet i denne kategori.</p>";
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

  listContainer.innerHTML = markup;
}

// Funktion til at sortere produkterne___________________________________
function sortProducts() {
  const selectedSort = sortSelect.value;

  let sortedProducts = [...productsData];

  switch (selectedSort) {
    case "price-low-high":
      sortedProducts.sort((a, b) => a.price - b.price);
      break;
    case "price-high-low":
      sortedProducts.sort((a, b) => b.price - a.price);
      break;
    case "newest":
      sortedProducts.sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
    default:
      break;
  }

  showList(sortedProducts);
}

sortSelect.addEventListener("change", sortProducts);

handleCategory();
