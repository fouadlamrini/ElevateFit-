

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