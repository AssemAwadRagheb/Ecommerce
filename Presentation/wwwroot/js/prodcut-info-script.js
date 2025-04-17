// DOM Elements
const colorOptions = document.querySelectorAll(".color-option");
const mainProductImage = document.getElementById("main-product-image");
const quantityEl = document.querySelector(".quantity");
const decreaseBtn = document.querySelector(".decrease");
const increaseBtn = document.querySelector(".increase");
const addToCartBtn = document.querySelector(".add-to-cart-btn");
const buyNowBtn = document.querySelector(".buy-now-btn");
const notification = document.getElementById("notification");
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

// Cart data
let cart = {
  items: [],
  total: 0,
};

// Product data
const product = {
  id: "sw001",
  name: "SmartWatch Pro X",
  price: 179.99,
  originalPrice: 299.99,
  discount: 40,
  colors: ["black", "orange"],
  images: {
    black:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=3264&auto=format&fit=crop&ixlib=rb-4.0.3",
    orange:
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=3272&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
};

// State
let currentColor = "black";
let quantity = 1;

// Event Listeners

decreaseBtn.addEventListener("click", () => {
  if (quantity > 1) {
    quantity--;
    updateQuantityDisplay();
  }
});

increaseBtn.addEventListener("click", () => {
  quantity++;
  updateQuantityDisplay();
});

addToCartBtn.addEventListener("click", () => {
  addToCart();
  showNotification("Product added to cart!");
});

buyNowBtn.addEventListener("click", () => {
  addToCart();
  showNotification("Proceeding to checkout...");
  // In a real implementation, redirect to checkout page
  // window.location.href = '/checkout';
});

// Handle window resize for mobile menu
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    mobileMenu.style.display = "none";
  }
});

// Functions
function updateQuantityDisplay() {
  quantityEl.textContent = quantity;
}

function addToCart() {
  const itemIndex = cart.items.findIndex(
    (item) => item.id === product.id && item.color === currentColor
  );

  if (itemIndex >= 0) {
    // Update existing item
    cart.items[itemIndex].quantity += quantity;
  } else {
    // Add new item
    cart.items.push({
      id: product.id,
      name: product.name,
      price: product.price,
      color: currentColor,
      quantity: quantity,
      image: product.images[currentColor],
    });
  }

  // Update cart total
  calculateCartTotal();

  // Update cart icon badge
  updateCartBadge();

  // Save cart to localStorage
  saveCart();

  console.log("Cart updated:", cart);
}

function calculateCartTotal() {
  cart.total = cart.items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
}

function updateCartBadge() {
  const cartBadge = document.querySelector(".icon-container .badge");
  const totalItems = cart.items.reduce(
    (total, item) => total + item.quantity,
    0
  );
  cartBadge.textContent = totalItems;
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function loadCart() {
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartBadge();
  }
}

function showNotification(message) {
  notification.textContent = message;
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 3000);
}

// Initialize
function init() {
  loadCart();
}

// Run initialization
init();
