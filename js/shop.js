let cart = [];

// Load cart from localStorage when page loads
window.onload = function() {
    loadCart();
    setupEventListeners();
};

function setupEventListeners() {
    const buttons = document.querySelectorAll(".panier");
    buttons.forEach(function(button) {
        button.addEventListener("click", function() {
            const price = parseFloat(button.getAttribute("data-price"));
            const productName = button.parentElement.querySelector("h4").textContent;
            const productImage = button.parentElement.querySelector("img").src;
            
            addToCart(price, productName, productImage);
            updateCartDisplay();
        });
    });
}

function addToCart(price, name, image) {
    cart.push({
        price: price,
        name: name,
        image: image,
        quantity: 1
    });
    
    // Save to localStorage
    saveCart();
    
    // Update cart total
    updateCartTotal();
    
    // Show confirmation
    alert('Product added to cart!');
}

function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const cartTotal = document.getElementById('cart-total');
    if (cartTotal) {
        cartTotal.textContent = `$${total.toFixed(2)}`;
    }
}

function saveCart() {
    localStorage.setItem('shopping-cart', JSON.stringify(cart));
}

function loadCart() {
    const savedCart = localStorage.getItem('shopping-cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartTotal();
    }
}

// Filter products functionality
const productFilter = document.getElementById('product-filter');
const priceRange = document.getElementById('priceRange');

if (productFilter) {
    productFilter.addEventListener('change', filterProducts);
}

if (priceRange) {
    priceRange.addEventListener('input', filterProducts);
}

function filterProducts() {
    const products = document.querySelectorAll('.product');
    const selectedCategory = productFilter.value;
    const maxPrice = parseFloat(priceRange.value);

    products.forEach(product => {
        const category = product.getAttribute('data-category');
        const price = parseFloat(product.getAttribute('data-price'));
        
        const categoryMatch = selectedCategory === 'all' || category === selectedCategory;
        const priceMatch = price <= maxPrice;

        if (categoryMatch && priceMatch) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}