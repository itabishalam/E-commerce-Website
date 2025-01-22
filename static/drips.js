// Product Data
const products = [
  { name: "Varsity Jacket", price: 2999, image: "static/product_1.jpg", style: "Jacket" },
  { name: "White Varsity", price: 2499, image: "static/product_2.jpg", style: "Jacket" },
  { name: "Batman Sweatshirt", price: 999, image: "static/product_3.jpg", style: "Hoodie" },
  { name: "Colour Block: Hoodie", price: 1899, image: "static/product_4.jpg", style: "Hoodie" },
  { name: "Arc reactor : Oversized Tee", price: 799, image: "static/product_5.jpg", style: "t-shirts" },
  { name: "Polo Tee", price: 999, image: "static/product_6.jpg", style: "t-shirts" },
  { name: "Linen Shirt:Black", price: 1999, image: "static/product_7.jpg", style: "Shirt" },
  { name: "Linen Shirt:Striped", price: 999, image: "static/product_8.jpg", style: "Shirt" },
  { name: "Green Cargo:Pant", price: 2999, image: "static/product_9.jpg", style: "Pant" },
  { name: "Punisher Cargo", price: 1999, image: "static/product_10.jpg", style: "Pant" }
];

const productContainer = document.getElementById('product-container');
const cartIcon = document.querySelector('.cart');
const cartTab = document.querySelector('.cart-tab');
const closeCartBtn = document.querySelector('.close');
const cartItemsContainer = document.querySelector('.cart-items');
const cartCount = document.getElementById('cart-count');
const checkOut = document.getElementById('checkout-btn');

let cartItems = [];

// Load cart data from localStorage on page load
window.onload = () => {
  // Check if cart data exists in localStorage
  const savedCart = JSON.parse(localStorage.getItem('cartItems'));
  if (savedCart) {
    cartItems = savedCart;
    updateCartUI();
  }

  // Display products
  products.forEach((product, index) => {
    const card = document.createElement('div');
    card.classList.add('product-card');
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
        <button onclick="addToCart(${index})">Add to Cart</button>
      `;
    productContainer.appendChild(card);
  });
};

// Add to Cart Function
function addToCart(productIndex, source = 'products') {
  const productList = source === 'newArrival' ? newArrival : products;
  const product = productList[productIndex];
  const existingItem = cartItems.find(item => item.name === product.name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItems.push({ ...product, quantity: 1 });
  }

  // Save the updated cart to localStorage
  localStorage.setItem('cartItems', JSON.stringify(cartItems));

  updateCartUI();
}

// Update Cart UI
function updateCartUI() {
  cartItemsContainer.innerHTML = '';

  cartItems.forEach((item, index) => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('cart-item');
    itemDiv.innerHTML = `
        <img src="${item.image}" alt="${item.name}" width="50">
        <div>
          <h4>${item.name}</h4>
          <p>₹${item.price} x ${item.quantity}</p>
          <button onclick="removeFromCart(${index})">Remove</button>
          <br>
        </div>
      `;
    cartItemsContainer.appendChild(itemDiv);
  });

  updateCartCount();
}

// Remove Item from Cart
function removeFromCart(index) {
  cartItems.splice(index, 1);

  // Save the updated cart to localStorage
  localStorage.setItem('cartItems', JSON.stringify(cartItems));

  updateCartUI();
}

// Update cart item count
function updateCartCount() {
  cartCount.textContent = cartItems.reduce((sum, item) => sum + item.quantity, 0);
}

// Open Cart Sidebar
cartIcon.addEventListener('click', () => {
  cartTab.style.right = '0';
  document.body.classList.add('lock-scroll');
});

// Close Cart Sidebar
closeCartBtn.addEventListener('click', () => {
  cartTab.style.right = '-400px';
  document.body.classList.remove('lock-scroll');
});

// Sidebar Functions
function openNav() {
  document.getElementById("mySidenav").style.width = "300px";
  document.querySelector(".sidenav-btn").style.display = "none";
  document.querySelector(".product-section").classList.add("shift-right");
  document.body.classList.add("lock-scroll");
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.querySelector(".sidenav-btn").style.display = "block";
  document.querySelector(".product-section").classList.remove("shift-right");
  document.body.classList.remove("lock-scroll");
}

function openCart() {
  document.querySelector(".cart-tab").classList.add("active");
  document.querySelector(".product-section").classList.add("shift-left");
}

// Close Cart: Reset content position
function closeCart() {
  document.querySelector(".cart-tab").classList.remove("active");
  document.querySelector(".product-section").classList.remove("shift-left");
}

// Price Filter
const priceRange = document.getElementById("priceRange");
const priceValue = document.getElementById("priceValue");

priceRange.addEventListener("input", () => {
  priceValue.textContent = priceRange.value;
});

// Apply Filters
document.querySelector(".apply-btn").addEventListener("click", () => {
  const maxPrice = parseInt(priceRange.value);
  const selectedStyles = Array.from(document.querySelectorAll('.style-options input:checked')).map(input => input.value);

  document.querySelectorAll('.product-card').forEach((card, index) => {
    const product = products[index];
    const matchesPrice = product.price <= maxPrice;
    const matchesStyle = selectedStyles.length === 0 || selectedStyles.includes(product.style);

    card.style.display = (matchesPrice && matchesStyle) ? "block" : "none";
  });

  closeNav();
});
function checkout() {
  if (cartItems.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const confirmation = confirm("Do you want to proceed to checkout?");
  if (confirmation) {
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Display the modal with the total price
    const modal = document.getElementById('checkout-modal');
    const totalText = document.getElementById('checkout-total');
    modal.classList.remove('hidden'); // Show the modal
    totalText.textContent = `Total Amount: ₹${totalPrice}`;

    // Clear the cart
    cartItems = [];
    localStorage.removeItem("cartItems");
    updateCartUI();
  }
}

// Close Modal Functionality
const closeModalBtn = document.getElementById('close-modal-btn');
closeModalBtn.addEventListener('click', () => {
  const modal = document.getElementById('checkout-modal');
  modal.classList.add('hidden'); // Hide the modal
});
// Checkout function
function checkout() {
  if (cartItems.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const confirmation = confirm("Do you want to proceed to checkout?");
  if (confirmation) {
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Display the modal with the total price
    const modal = document.getElementById('checkout-modal');
    const totalText = document.getElementById('checkout-total');
    modal.classList.remove('hidden'); // Show the modal
    totalText.textContent = `Total Amount: ₹${totalPrice}`;

    // Clear the cart
    cartItems = [];
    localStorage.removeItem("cartItems");
    updateCartUI();
  }
}

