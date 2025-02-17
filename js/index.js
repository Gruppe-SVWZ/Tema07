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
