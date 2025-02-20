function toggleDropdown(id) {
  var content = document.getElementById(id);
  if (content.style.display === "none" || content.style.display === "") {
    content.style.display = "block";
  } else {
    content.style.display = "none";
  }
}

// const productId = new URLSearchParams(window.location.search).get("id");
// const productContainer = document.querySelector(".product_container")

// fetch('https://dummyjson.com/products/1')
// .then(res => res.json())
// .then(console.log);
//     productContainer.innerHTML = `
//     <section class="product_image_container">
// <img src="" alt="">
// </section>

// <section class="product_info">
// <div class="product-info">
//     <div class="product-name">
//         <h1>Annibale Colombo Sofa</h1>
//         <p>The Annibale Colombo Sofa is a sophisticated and comfortable seating option,
//             featuring exquisite design and premium upholstery for your living room.</p>
//         </div>
//     <div class="price_discount">
//         <div class="price">$2499.99</div>
//         <div class="discount">-18.54%</div>
//     </div>
//         <div class="cart-section">
//             <input type="number" class="quantity" value="1" min="1">
//             <button class="add-to-cart">ADD TO CART</button>
//         </div>
//         <div class="info">
//             <p>Stock: 16</p>
//             <p>Shipping: Ships overnight</p>
//             <p>Warranty: 1 month warranty</p>
//         </div>
// </div>
//     `
// // Hent produkt-ID'et fra URL'en
// const urlParams = new URLSearchParams(window.location.search);
// const productId = urlParams.get("id");
// const productContainer = document.querySelector(".product_details");

// function fetchProductDetails() {
//   if (!productId) {
//     console.error("Product ID is missing from the URL.");
//     productContainer.innerHTML = "<p>Produkt-ID mangler.</p>";
//     return;
//   }

//   // Hent produktdata baseret på ID'et
//   fetch(`https://dummyjson.com/products/${productId}`)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Produktet kunne ikke hentes.");
//       }
//       return response.json();
//     })
//     .then((product) => {
//       console.log("Produktdata:", product);
//       displayProductDetails(product);
//     })
//     .catch((error) => {
//       console.error("Fejl ved hentning af produktdata:", error);
//       productContainer.innerHTML = "<p>Kunne ikke hente produktdata.</p>";
//     });
// }

// // Funktion til at vise produktdetaljer
// function displayProductDetails(product) {
//   if (!product) {
//     productContainer.innerHTML = "<p>Produktet blev ikke fundet.</p>";
//     return;
//   }

//   const productMarkup = `
//     <div class="product_detail_container">
//       <h2>${product.title}</h2>
//       <img src="${product.images[0]}" alt="${product.title}">
//       <p>${product.description}</p>
//       <p><strong>Pris: </strong>${product.price} kr.</p>
//       <p><strong>Kategori: </strong>${product.category}</p>
//       <p><strong>Vurdering: </strong>${product.rating} / 5</p>
//       <button class="add_to_cart">Læg i kurv</button>
//     </div>
//   `;

//   productContainer.innerHTML = productMarkup;
// }

// // Kald funktionen for at hente produktdetaljer
// fetchProductDetails();
// Hent produkt-id fra URL'en

// victors seneste

// Hent produkt-id fra URL'en
// const urlParams = new URLSearchParams(window.location.search);
// const productId = urlParams.get("id");
// if (productId) {
//   fetch(`https://dummyjson.com/products/${productId}`)
//     .then((res) => res.json())
//     .then(showProduct)
//     .catch((error) => console.error("Fejl ved hentning af produkt:", error));
// } else {
//   console.log("Produkt-id mangler.");
// }

// // Funktion til at vise produktdata på siden
// function showProduct(product) {
//   if (!product) {
//     document.querySelector(".product-info").innerHTML = "Produktet kunne ikke findes.";
//     return;
//   }

//   // Find elementerne på siden
//   const productName = document.querySelector(".product-name h1");
//   const productDescription = document.querySelector(".product-name p");
//   const productPrice = document.querySelector(".price");
//   const productImage = document.querySelector(".product_image_container img");

//   // Opdater indholdet med produktdata
//   productName.textContent = product.title;
//   productDescription.textContent = product.description;
//   productPrice.textContent = `${product.price} kr.`;
//   productImage.src = product.image; // Opdater produktbillede
// }

const productId = new URLSearchParams(window.location.search).get("id");
const productContainer = document.querySelector(".product");

fetch(`https://dummyjson.com/products/${productId}`)
  .then((response) => response.json())
  .then((data) => {
    productContainer.innerHTML = `
    <div class="product_image_container">
     <img src="${data.images?.[0] || data.thumbnail}" 
     alt="${data.title}" 
     class="product-image" />
        </div>

        <section class="product_info">
          <div class="product-info">
            <div class="product-name">
              <h1>${data.title}</h1>
              <p>${data.description}</p>
            </div>
            <div class="price-discount">
              <div class="price">${data.price} €</div>
              <div class="discount">${data.discountPercentage}%</div>
            </div>
            <div class="cart-section">
              <input type="number" class="quantity" value="1" min="1" />
              <button class="add-to-cart">ADD TO CART</button>
            </div>
            <div class="info">
              <p>Stock: ${data.stock}</p>
              <p>Shipping: Ships in 1-2 business days</p>
            </div>
          </div>

          <button class="toggle-btn" onclick="toggleDropdown('description-content')">Description ↓</button>
          <div id="description-content" class="toggle-content">
            <p>${data.description}</p>
            <p>
              Dimensions:<br />
              Width: ${data.dimensions?.width ?? "N/A"} CM<br />
              Height: ${data.dimensions?.height ?? "N/A"} CM<br />
              Depth: ${data.dimensions?.depth ?? "N/A"} CM<br />
              Weight: ${data.weight ?? "N/A"} KG
            </p>
          </div>

          <button class="toggle-btn" onclick="toggleDropdown('review-content')">Reviews ↓</button>
          <div id="review-content" class="toggle-content">
            <p>★★★☆☆ - 3.08/5 (Based on 120 reviews)</p>
          </div>
        </section>
    `;
  })
  .catch((error) => console.error("Error fetching product data:", error));
