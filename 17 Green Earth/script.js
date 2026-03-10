const categoriesContainer = document.getElementById("categories-container");
const treesContainer = document.getElementById("trees-container");
const loadingSpinner = document.getElementById("loading-spinner");
const allTreesBtn = document.getElementById("all-trees-btn");
const treeDetailsModal = document.getElementById("tree-details-modal");
const modalTitle = document.getElementById("modalTitle");
const modalImage = document.getElementById("modalImage");
const modalCategory = document.getElementById("modalCategory");
const modalDescription = document.getElementById("modalDescription");
const modalPrice = document.getElementById("modalPrice");
const cartContainer = document.getElementById("cart-container");
const totalPrice = document.getElementById("total-price");
const emptyCartMessage = document.getElementById("empty-cart-message");
let cart = [];

function showLoading() {
  loadingSpinner.classList.remove("hidden");
  treesContainer.innerHTML = "";
}

function hideLoading() {
  loadingSpinner.classList.add("hidden");
}

async function loadCategories() {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/categories",
  );

  const data = await response.json();
  data.categories.forEach((category) => {
    const btn = document.createElement("button");
    // Fix: Add classes for mobile responsiveness
    btn.className = "btn flex-shrink-0 lg:w-full";
    btn.textContent = category.category_name;
    btn.onclick = () => selectCategory(category.id, btn);
    categoriesContainer.appendChild(btn);
  });
}

async function selectCategory(categoryId, btn) {
  showLoading();
  const allButtons = document.querySelectorAll(
    "#categories-container button, #all-trees-btn",
  );
  allButtons.forEach((btn) => {
    btn.classList.remove("btn-success");
  });
  btn.classList.add("btn-success");

  const response = await fetch(
    `https://openapi.programming-hero.com/api/category/${categoryId}`,
  );
  const data = await response.json();
  displayTrees(data.plants);
  hideLoading();
}

allTreesBtn.addEventListener("click", () => {
  const allButtons = document.querySelectorAll(
    "#categories-container button, #all-trees-btn",
  );
  allButtons.forEach((btn) => {
    btn.classList.remove("btn-success");
  });
  allTreesBtn.classList.add("btn-success");
  loadTrees();
});

async function loadTrees() {
  showLoading();
  const response = await fetch(
    "https://openapi.programming-hero.com/api/plants",
  );
  const data = await response.json();
  displayTrees(data.plants);
  hideLoading();
}

function displayTrees(trees) {
  treesContainer.innerHTML = "";
  trees.forEach((tree) => {
    const card = document.createElement("div");
    card.className = "card bg-base-100 shadow-sm";
    card.innerHTML = `
        <figure>
          <img
            src="${tree.image}"
            alt="${tree.name}"
            title="${tree.name}"
            class="h-48 w-full object-cover hover:cursor-pointer" onclick="openTreeModal(${tree.id})"
          />
        </figure>
        <div class="card-body">
           <h2 class="card-title cursor-pointer hover:text-success" onclick="openTreeModal(${tree.id})">${tree.name}</h2>
           <p class="line-clamp-2">${tree.description}</p>
           <div class="badge badge-success">${tree.category}</div>
           <div class="card-actions flex justify-between items-center">
             <h2 class="font-bold text-2xl text-red-600">$${tree.price}</h2>
             <button class="btn btn-success border-0" onclick="addToCart(${tree.id}, '${tree.name}', ${tree.price})">Cart</button>
           </div>
        </div>
    `;
    treesContainer.appendChild(card);
  });
}

async function openTreeModal(treeId) {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/plant/${treeId}`,
  );
  const data = await response.json();
  const plantDetails = data.plants;

  treeDetailsModal.showModal();
  modalTitle.textContent = plantDetails.name;
  modalImage.src = plantDetails.image;
  modalCategory.textContent = plantDetails.category;
  modalDescription.textContent = plantDetails.description;
  modalPrice.textContent = plantDetails.price;
}

function addToCart(id, name, price) {
  const existingItem = cart.find((item) => item.id === id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id,
      name,
      price,
      quantity: 1,
    });
  }

  updateCart();
}

function updateCart() {
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    emptyCartMessage.classList.remove("hidden");
    totalPrice.textContent = `$${0}`;
    return;
  }
  emptyCartMessage.classList.add("hidden");

  let total = 0;
  cart.forEach((item) => {
    total += item.price * item.quantity;
    const cartItem = document.createElement("div");
    cartItem.classList = "card card-body shadow-2xl bg-slate-100 font-semibold";
    cartItem.innerHTML = `
                  <div class="flex justify-between items-center">
                    <div>
                      <h2>${item.name}</h2>
                      <p>$${item.price} x ${item.quantity}</p>
                    </div>
                    <button class="btn btn-ghost" onclick="removeFromCart(${item.id})">X</button>
                  </div>
                  <p class="text-right font-semibold text-xl text-success">$${item.price * item.quantity}</p>
    `;
    cartContainer.appendChild(cartItem);
  });
  totalPrice.innerHTML = `$${total}`;
}

function removeFromCart(treeId) {
  cart = cart.filter((item) => item.id != treeId);
  updateCart();
}

loadCategories();
loadTrees();
