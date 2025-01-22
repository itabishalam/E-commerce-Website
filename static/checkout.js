// Load cart data from localStorage on page load
window.onload = () => {
    const savedCart = JSON.parse(localStorage.getItem('cartItems'));
    if (savedCart) {
      displayCartItems(savedCart);
    }
  };
  
  // Display Cart Items in Checkout
  function displayCartItems(cartItems) {
    const productListContainer = document.getElementById('checkout-product-list');
    let totalPrice = 0;
  
    cartItems.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('checkout-item');
      itemDiv.innerHTML = `
        <div class="checkout-item-info">
          <img src="${item.image}" alt="${item.name}" width="50">
          <div>
            <h4>${item.name}</h4>
            <p>₹${item.price} x ${item.quantity}</p>
          </div>
        </div>
      `;
      productListContainer.appendChild(itemDiv);
  
      // Calculate total price
      totalPrice += item.price * item.quantity;
    });
  
    // Display total price
    const totalPriceElement = document.getElementById('total-price');
    totalPriceElement.textContent = totalPrice;
  
    // Initialize Stripe
    initializeStripe();
  }
  
  // Initialize Stripe
  function initializeStripe() {
    const stripe = Stripe('YOUR_PUBLISHABLE_KEY'); // Replace with your Stripe publishable key
    const elements = stripe.elements();
    const cardElement = elements.create('card');
    cardElement.mount('#card-element');
  
    const form = document.getElementById('payment-form');
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });
  
      if (error) {
        // Show error in payment result
        document.getElementById('payment-result').textContent = error.message;
      } else {
        // Handle successful payment
        completeCheckout(paymentMethod.id);
      }
    });
  }
  
  // Complete Checkout Function
  function completeCheckout(paymentMethodId) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
  
    if (!cartItems || cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
  
    // Here you would typically send the paymentMethodId to your server to process the payment
    // For demonstration, we'll just show a success message
    alert("Thank you for your purchase! Your order is complete.");
  
    // Clear the cart
    localStorage.removeItem('cartItems');
    window.location.href = 'index.html'; // Redirect back to homepage
  }