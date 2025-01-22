// Product Data
const products = [
    { name: "Nike SB Day One", price: 4999, image: "static/shoes-1.jpg", style: "sneakers" },
    { name: "Retro trainers", price: 3699, image: "static/shoes-2.jpg", style: "sneakers" },
    { name: "Lee Cooper Men's Textured Lightweight Shoe", price: 1999, image: "static/shoes-3.jpg", style: "sports" },
    { name: "Boys' Grade School UA HOVR™ Turbulence 2 Running Shoes", price: 1199, image: "static/shoes-4.jpg", style: "sports" },
    { name: "Classical Formal Shoes : Brown", price: 2199, image: "static/shoes-5.jpg", style: "formal" },
    { name: "Boors chelsea : Black", price: 1999, image: "static/shoes-6.jpg", style: "boots" },
    { name: "Formal Shoes : Black", price: 3999, image: "static/shoes-7.jpg", style: "formal" },
    { name: "Mens Classic boots : Black", price: 4999, image: "static/shoes-8.jpg", style: "boots" },
    { name: "Reebok bb 4000 : casual shoes", price: 4999, image: "static/shoes-9.jpg", style: "sneakers" },

  ];
  const productContainer = document.getElementById('product-container');
  const cartIcon = document.querySelector('.cart');
  const cartTab = document.querySelector('.cart-tab');
  const closeCartBtn = document.querySelector('.close');
  const cartItemsContainer = document.querySelector('.cart-items');
  const cartCount = document.getElementById('cart-count');
  
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