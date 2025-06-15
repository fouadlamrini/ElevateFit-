// Tableau des produits (à adapter selon tes vrais produits)
const products = [
  {
    id: "1",
    name: "Red Printed T-shirt",
    price: 63,
    description: "This red printed T-shirt is made from high-quality cotton. It's comfortable, durable, and stylish. Perfect for casual wear.",
    images: [
      "images/product-1.jpg",
      "images/product-2.jpg",
      "images/product-3.jpg",
      "images/product-4.jpg"
    ]
  },
  {
    id: "2",
    name: "Red Printed T-shirt",
    price: 72,
    description: "Comfortable and stylish T-shirt for everyday use.",
    images: [
      "images/product-2.jpg",
      "images/product-1.jpg",
      "images/product-3.jpg",
      "images/product-4.jpg"
    ]
  },
  {
    id: "3",
    name: "Red Printed T-shirt",
    price: 50,
    description: "Classic T-shirt with a modern twist.",
    images: [
      "images/product-3.jpg",
      "images/product-1.jpg",
      "images/product-2.jpg",
      "images/product-4.jpg"
    ]
  },
  {
    id: "4",
    name: "Red Printed T-shirt",
    price: 99,
    description: "Premium quality T-shirt for special occasions.",
    images: [
      "images/product-4.jpg",
      "images/product-1.jpg",
      "images/product-2.jpg",
      "images/product-3.jpg"
    ]
  },
  {
    id: "5",
    name: "Red Printed T-shirt",
    price: 84,
    description: "Trendy and comfortable T-shirt.",
    images: [
      "images/product-5.jpg",
      "images/product-6.jpg",
      "images/product-7.jpg",
      "images/product-8.jpg"
    ]
  },
  {
    id: "6",
    name: "Red Printed T-shirt",
    price: 75,
    description: "Soft cotton T-shirt for all-day comfort.",
    images: [
      "images/product-6.jpg",
      "images/product-5.jpg",
      "images/product-7.jpg",
      "images/product-8.jpg"
    ]
  },
  {
    id: "7",
    name: "Red Printed T-shirt",
    price: 79,
    description: "A must-have T-shirt for your wardrobe.",
    images: [
      "images/product-7.jpg",
      "images/product-5.jpg",
      "images/product-6.jpg",
      "images/product-8.jpg"
    ]
  },
  {
    id: "8",
    name: "Red Printed T-shirt",
    price: 64,
    description: "Stylish T-shirt for any occasion.",
    images: [
      "images/product-8.jpg",
      "images/product-5.jpg",
      "images/product-6.jpg",
      "images/product-7.jpg"
    ]
  },
  {
    id: "9",
    name: "Red Printed T-shirt",
    price: 81,
    description: "High-quality T-shirt with a unique design.",
    images: [
      "images/product-9.jpg",
      "images/product-10.jpg",
      "images/product-11.jpg",
      "images/product-12.jpg"
    ]
  },
  {
    id: "10",
    name: "Red Printed T-shirt",
    price: 57,
    description: "Affordable and comfortable T-shirt.",
    images: [
      "images/product-10.jpg",
      "images/product-9.jpg",
      "images/product-11.jpg",
      "images/product-12.jpg"
    ]
  },
  {
    id: "11",
    name: "Red Printed T-shirt",
    price: 53,
    description: "Simple and elegant T-shirt.",
    images: [
      "images/product-11.jpg",
      "images/product-9.jpg",
      "images/product-10.jpg",
      "images/product-12.jpg"
    ]
  },
  {
    id: "12",
    name: "Red Printed T-shirt",
    price: 21,
    description: "Best value T-shirt for everyday use.",
    images: [
      "images/product-12.jpg",
      "images/product-9.jpg",
      "images/product-10.jpg",
      "images/product-11.jpg"
    ]
  }
];

// Fonction pour obtenir l'ID du produit depuis l'URL
function getProductIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

// Fonction pour afficher dynamiquement le produit
function displayProductDetail() {
  const id = getProductIdFromUrl();
  if (!id) return;
  const product = products.find(p => p.id === id);
  if (!product) return;

  // Met à jour les éléments de la page
  const mainImage = document.querySelector('.main-image');
  const thumbnails = document.querySelector('.thumbnails');
  const title = document.querySelector('.details h2');
  const price = document.querySelector('.details .price');
  const desc = document.querySelector('.details p:not(.price)');

  mainImage.src = product.images[0];
  mainImage.alt = product.name;
  title.textContent = product.name;
  price.textContent = `$${product.price}.00`;
  desc.textContent = product.description;

  // Miniatures dynamiques
  thumbnails.innerHTML = '';
  product.images.forEach((img, idx) => {
    const thumb = document.createElement('img');
    thumb.src = img;
    thumb.alt = `Thumb ${idx+1}`;
    thumb.addEventListener('click', function() {
      mainImage.src = img;
    });
    thumbnails.appendChild(thumb);
  });
}

// Exécute sur la page de détail produit
if (document.querySelector('.main-image')) {
  displayProductDetail();
}

// Responsive menu bar for header (affichage/masquage menu sur mobile)
document.addEventListener('DOMContentLoaded', function() {
  var show_bar = document.getElementById("show_bar");
  if (show_bar) {
    show_bar.addEventListener("click", function() {
      var bar_column = document.getElementById("bar_column");
      if (bar_column) {
        if (bar_column.style.display === "none" || bar_column.style.display === "") {
          bar_column.style.display = "block";
        } else {
          bar_column.style.display = "none";
        }
      }
    });
  }
});

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
// Gestion du bouton Add to Cart sur la page détail
const addToCartBtn = document.querySelector('.details button');
if(addToCartBtn) {
  addToCartBtn.addEventListener('click', function() {
    const id = getProductIdFromUrl();
    const product = products.find(p => p.id === id);
    if(!product) return;
    let cart = getCart();
    const found = cart.find(item => item.id === id);
    if(found) {
      found.quantity += 1;
    } else {
      cart.push({id: product.id, name: product.name, price: product.price, image: product.images[0], quantity: 1});
    }
    saveCart(cart);
    updateCartTotal();
    addToCartBtn.textContent = 'Added!';
    setTimeout(()=>{addToCartBtn.textContent = 'Add to Cart';}, 1000);
  });
}
// Mise à jour du total au chargement
updateCartTotal();
