// Get DOM elements
const productImg = document.getElementById("ProductImg");
const smallImg = document.getElementsByClassName("small-img");
const quantityInput = document.querySelector('.quantity-input');
const addToCartBtn = document.querySelector('.add-to-cart');

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem('shopping-cart')) || [];

// Product image gallery
for (let i = 0; i < smallImg.length; i++) {
    smallImg[i].onclick = function() {
        productImg.src = smallImg[i].src;
    }
}

// Update cart total
function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const cartTotal = document.getElementById('cart-total');
    if (cartTotal) {
        cartTotal.textContent = `$${total.toFixed(2)}`;
    }
}

// Add to cart functionality
function addToCart() {
    const productName = document.querySelector('.product-details h1').textContent;
    const price = parseFloat(document.querySelector('.product-details h4').textContent.replace('$', ''));
    const quantity = parseInt(quantityInput.value);
    const productImage = productImg.src;

    // Check if product already exists in cart
    const existingItem = cart.find(item => item.name === productName);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            name: productName,
            price: price,
            image: productImage,
            quantity: quantity
        });
    }

    // Save to localStorage
    localStorage.setItem('shopping-cart', JSON.stringify(cart));
    updateCartTotal();

    // Show success message
    showSuccessMessage();
}

// Show success message
function showSuccessMessage() {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = 'Added to cart!';
    document.querySelector('.product-details').appendChild(successMessage);
    
    setTimeout(() => {
        successMessage.remove();
    }, 2000);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Update cart total on page load
    updateCartTotal();

    // Setup quantity input validation
    if (quantityInput) {
        quantityInput.addEventListener('change', () => {
            if (quantityInput.value < 1) {
                quantityInput.value = 1;
            }
        });
    }

    // Setup add to cart button
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', addToCart);
    }
});