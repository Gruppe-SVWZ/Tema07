let categoriesContainer = document.querySelector(".categories");

fetch(`https://dummyjson.com/products/categories`)
  .then((response) => response.json())
  .then(showCategories);

function showCategories(categories) {
  console.log(categories);

  const markup = categories
    .map(
      (category) =>
        `<li><a href="produktside.html?category=${category.slug}">${category.name}</a></li>`)
    
      .join("");

      console.log("markup er: ", markup);
    
      categoriesContainer.innerHTML = markup;
    }






    // category dropdown menu JS
    let dropdownContainer = document.querySelector(".dropdown_ul");

fetch(`https://dummyjson.com/products/categories`)
  .then((response) => response.json())
  .then(showCategoriesDropdown);

function showCategoriesDropdown(categories) {
  console.log(categories);

  const markup = categories
    .map(
      (category) =>
        `<li><a href="produktside.html?category=${category.slug}">${category.name}</a></li>
`)
    
      .join("");

      console.log("markup er: ", markup);
    
      dropdownContainer.innerHTML = markup;
    }
