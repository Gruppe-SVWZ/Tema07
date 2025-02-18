let categoriesContainer = document.querySelector(".categories li");

fetch(`https://dummyjson.com/products/categories`)
  .then((response) => response.json())
  .then(showCategories);

function showCategories(categories) {
  console.log(categories);

  const markup = categories
    .map(
      (category) =>
        `<li><a href="produktside.html?category=${category}">${category.name}</a></li>`)
    
      .join("");

      console.log("markup er: ", markup);
    
      categoriesContainer.innerHTML = markup;
    }