let show_bar = document.getElementById("show_bar");
show_bar.addEventListener("click", display_non);

function display_non() {
    
    let bar_column = document.getElementById("bar_column");
    if (bar_column.style.display == "none") { bar_column.style.display = "block"; }
    else { bar_column.style.display = "none"; }
   
    

}




//filtre par price et category


  let priceRange = document.getElementById('priceRange');
  let priceValue = document.getElementById('priceValue');

  priceRange.addEventListener('input', function() {
    priceValue.textContent = priceRange.value; 
  
  });



const filterSelect = document.getElementById("product-filter");
const products = document.querySelectorAll(".product");

// Fonction pour appliquer les deux filtres
function applyFilters() {
    const maxPrice = parseInt(priceRange.value);
    const selectedCategory = filterSelect.value;

    products.forEach(function(product) {
        const productPrice = parseInt(product.getAttribute("data-price"));
        const productCategory = product.getAttribute("data-category");

        // Vérifier si le produit correspond aux deux filtres
        if ((selectedCategory === "all" || productCategory === selectedCategory) && productPrice <= maxPrice) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
}

// Écouteur pour le filtre de catégorie
filterSelect.addEventListener("change", applyFilters);

// Écouteur pour le filtre de prix
priceRange.addEventListener("input", applyFilters);

// Gestion du panier ElevateFit
function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
}
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}
function updateCartTotal() {
    const cart = getCart();
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const cartTotal = document.getElementById('cart-total');
    if(cartTotal) cartTotal.textContent = `$${total.toFixed(2)}`;
}
// Ajout au panier depuis la page produits
const addCartBtns = document.querySelectorAll('.panier');
addCartBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation(); // Pour éviter la redirection
        const productCard = btn.closest('.product');
        const id = productCard.getAttribute('data-id');
        const name = productCard.querySelector('h4').textContent;
        const price = parseFloat(productCard.getAttribute('data-price'));
        const image = productCard.querySelector('img').getAttribute('src');
        let cart = getCart();
        const found = cart.find(item => item.id === id);
        if(found) {
            found.quantity += 1;
        } else {
            cart.push({id, name, price, image, quantity: 1});
        }
        saveCart(cart);
        updateCartTotal();
        btn.textContent = 'Added!';
        setTimeout(()=>{btn.innerHTML = "<i class='fas fa-shopping-cart'></i> Add to Cart";}, 1000);
    });
});
// Mise à jour du total au chargement
updateCartTotal();