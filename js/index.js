const mycategory = new URLSearchParams(window.location.search).get("category");
const listcontainer = document.querySelector(".category_list");

fetch(`https://dummyjson.com/products?category=${mycategory}`);
