// Sélection des éléments de filtre
const priceRange = document.getElementById('priceRange');
const categoryFilter = document.getElementById('product-filter');
const products = document.querySelectorAll('.product');

// Fonction de filtrage
function filterProducts() {
    const maxPrice = parseFloat(priceRange.value);
    const selectedCategory = categoryFilter.value;

    // Boucle sur chaque produit pour appliquer le filtre
    products.forEach(product => {
        const productPrice = parseFloat(product.getAttribute('data-price'));
        const productCategory = product.getAttribute('data-category');

        // Conditions de filtrage
        const meetsPriceCondition = productPrice <= maxPrice;
        const meetsCategoryCondition = selectedCategory === 'all' || productCategory === selectedCategory;

        // Affichage ou masquage des produits en fonction des conditions
        if (meetsPriceCondition && meetsCategoryCondition) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Écouteurs d'événements pour les changements de filtre
priceRange.addEventListener('input', filterProducts);
categoryFilter.addEventListener('change', filterProducts);

// Appel initial pour afficher tous les produits
filterProducts();