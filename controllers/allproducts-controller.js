import { productServices } from "./../services/product-services.js";
import { validate } from "../assets/js/validations.js";

const products = document.querySelector("[data-allproducts]");
const searchInput = document.querySelector("[data-searchinput]");
const searchBar = document.querySelector("[data-searchbar]");

const newProduct = (name, price, imageURL, id) => {
  const card = document.createElement("div");
  const editBtn = document.createElement("div");
  const trashBtn = document.createElement("div");
  const productImage = document.createElement("img");
  const productName = document.createElement("p");
  const productPrice = document.createElement("p");
  const productId = document.createElement("span");

  editBtn.setAttribute("src", "../assets/img/edit-icon.svg");
  productImage.setAttribute("src", imageURL);
  trashBtn.setAttribute("src", "../assets/img/trash-icon.svg");

  card.classList.add("product");
  editBtn.classList.add("edit__button");
  productImage.classList.add("product__image");
  productName.classList.add("product__description");
  productPrice.classList.add("product__price");
  trashBtn.classList.add("trash__button");
  productId.classList.add("product__code");

  productName.innerHTML = name;
  productPrice.innerHTML = price;
  productId.innerHTML = "#" + id;

  card.appendChild(editBtn);
  card.appendChild(trashBtn);
  card.appendChild(productImage);
  card.appendChild(productName);
  card.appendChild(productPrice);
  card.appendChild(productId);

  return card;
};

const render = async () => {
  try {
    const productList = await productServices.productList();
    const url = new URL

    productList.forEach((element) => {
      products.appendChild(
        newProduct(element.name, element.price, element.imageURL, element.id)
      );
    });
  } catch (error) {
    console.log(error);
  }
};

searchBar.addEventListener("submit", (event) => {
  event.preventDefault();
  window.location.href = `./products.html?search=${searchInput.value}`;
});

render();
