let categoriesContainer = document.querySelector(".category_list");

fetch(`https://dummyjson.com/products/category-list`)
  .then((response) => response.json())
  .then(showCategories);

function showCategories(categories) {
  console.log(categories);

  const markup = categories
    .map(
      (category) =>
        `<div class="category_list_container">
            
            <a href="produktside.html?category=${category}">${category}</a></div>`
    )

    .join("");

  console.log("markup er: ", markup);

  categoriesContainer.innerHTML = markup;
}

let currentIndex = 0;
const slides = document.querySelectorAll('input[type="radio"]');
const totalSlides = slides.length;

function showNextSlide() {
  slides[currentIndex].checked = false; // Fjern check fra nuværende slide
  currentIndex = (currentIndex + 1) % totalSlides; // Næste slide
  slides[currentIndex].checked = true; // Check næste slide
}

setInterval(showNextSlide, 3000); // Skift hvert 3. sekund
