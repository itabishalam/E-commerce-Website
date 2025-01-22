const newArrivals = [
  { name: "Transformers: Megatron", price: 2999, image: "static/new_arrival_1.jpg" },
  { name: "Solids: Off-White", price: 2499, image: "static/new_arrival_2.jpg" },
  { name: "Venom: Tattered", price: 999, image: "static/new_arrival_3.jpg" },
  { name: "Cable Knit Pullover: Emerald", price: 1899, image: "static/new_arrival_4.jpg" },
  { name: "Batman: Ikkat Print", price: 799, image: "static/new_arrival_5.jpg" },
  { name: "Punisher: Classic Logo", price: 999, image: "static/new_arrival_6.jpg" },
  { name: "Urban Blaze: Kaali Peeli", price: 1999, image: "static/new_arrival_7.jpg" },
  { name: "TSS Originals: Earth", price: 999, image: "static/new_arrival_8.jpg" },
  { name: "Denim: Sky Blue (Baggy Fit)", price: 2999, image: "static/new_arrival_9.jpg" },
];

const swiperWrapper = document.getElementById('swiper-wrapper');

// Create and add Swiper slides
newArrivals.forEach((product, index) => {
  const slide = document.createElement("div");
  slide.classList.add("swiper-slide");
  slide.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p>₹${product.price}</p>
    <button onclick="addToCart(${index})">Add to Cart</button> 
  `;
  swiperWrapper.appendChild(slide);
});

// Initialize Swiper
const swiper = new Swiper('.swiper-container', {
  slidesPerView: 4,
  spaceBetween: 30,
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1240: {
      slidesPerView: 4,
      spaceBetween: 40,
    }
  }



});

const cartIcon = document.querySelector('.cart');
const cartTab = document.getElementById('cartTab');
const cartItemsContainer = document.querySelector('.cart-items');
const cartCount = document.getElementById('cart-count');
let cartItems = []; // Initialize an empty array to store cart items

// Load cart items from localStorage (if any)
const storedCartItems = localStorage.getItem('cartItems');
if (storedCartItems) {
  cartItems = JSON.parse(storedCartItems);
  updateCartUI();
  updateCartCount();
}

function addToCart(productIndex) {
  const product = newArrivals[productIndex];

  // Debugging: Log the product being added
  console.log("Adding to cart:", product);

  const existingItem = cartItems.find(item => item.name === product.name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItems.push({ ...product, quantity: 1 });
  }

  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  updateCartUI();
  updateCartCount();
}

function updateCartUI() {
  cartItemsContainer.innerHTML = '';

  if (cartItems.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    cartItems.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('cart-item');
      itemDiv.innerHTML = `
        <img src="${item.image}" alt="${item.name}" width="50">
        <div>
          <h4>${item.name}</h4>
          <p>₹${item.price} x ${item.quantity}</p>
          <button onclick="removeFromCart(${cartItems.indexOf(item)})">Remove</button>
        </div>
      `;
      cartItemsContainer.appendChild(itemDiv);
    });
  }

  updateCartCount();
}

function removeFromCart(index) {
  cartItems.splice(index, 1);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  updateCartUI();
  updateCartCount();
}

function updateCartCount() {
  cartCount.textContent = cartItems.reduce((sum, item) => sum + item.quantity, 0);
}

cartIcon.addEventListener('click', () => {
  cartTab.classList.add('open');
  document.body.classList.add('lock-scroll');
});

const closeCartBtn = document.querySelector('.cart-tab .close');
closeCartBtn.addEventListener('click', () => {
  cartTab.classList.remove('open');
  document.body.classList.remove('lock-scroll');
}); 
