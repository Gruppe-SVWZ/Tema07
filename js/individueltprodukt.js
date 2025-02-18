function toggleDropdown(id) {
    var content = document.getElementById(id);
    if (content.style.display === "none" || content.style.display === "") {
        content.style.display = "block";
    } else {
        content.style.display = "none";
    }
}

// Hent produkt-ID'et fra URL'en
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");
const productContainer = document.querySelector(".product_details");

function fetchProductDetails() {
  if (!productId) {
    console.error("Product ID is missing from the URL.");
    productContainer.innerHTML = "<p>Produkt-ID mangler.</p>";
    return;
  }

  // Hent produktdata baseret på ID'et
  fetch(`https://dummyjson.com/products/${productId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Produktet kunne ikke hentes.");
      }
      return response.json();
    })
    .then((product) => {
      console.log("Produktdata:", product);
      displayProductDetails(product);
    })
    .catch((error) => {
      console.error("Fejl ved hentning af produktdata:", error);
      productContainer.innerHTML = "<p>Kunne ikke hente produktdata.</p>";
    });
}

// Funktion til at vise produktdetaljer
function displayProductDetails(product) {
  if (!product) {
    productContainer.innerHTML = "<p>Produktet blev ikke fundet.</p>";
    return;
  }

  const productMarkup = `
    <div class="product_detail_container">
      <h2>${product.title}</h2>
      <img src="${product.images[0]}" alt="${product.title}">
      <p>${product.description}</p>
      <p><strong>Pris: </strong>${product.price} kr.</p>
      <p><strong>Kategori: </strong>${product.category}</p>
      <p><strong>Vurdering: </strong>${product.rating} / 5</p>
      <button class="add_to_cart">Læg i kurv</button>
    </div>
  `;

  productContainer.innerHTML = productMarkup;
}

// Kald funktionen for at hente produktdetaljer
fetchProductDetails();