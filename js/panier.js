// Gestion du panier ElevateFit
// 1. Affichage des articles du panier
// 2. Modification quantité et suppression
// 3. Calcul du total

// Récupère le panier depuis localStorage
function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
}

// Sauvegarde le panier dans localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Affiche les articles du panier
function renderCart() {
    const cart = getCart();
    const cardShop = document.querySelector('.card_shop');
    const prixTotal = document.querySelector('.prix_total');
    if (!cardShop) return;
    // Supprime les anciens produits (hors .prix_total et .buy)
    cardShop.querySelectorAll('.product').forEach(e => e.remove());
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
        const div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = `
            <img src="${item.image}" alt="">
            <div class="detail_product">
                <h4>${item.name}</h4>
                <p>price $${item.price}.00</p>
                <p class="Remove" style="cursor:pointer;color:red;">Remove</p>
            </div>
            <div class="prix_contitu">
                <input type="number" class="number" min="1" value="${item.quantity}" style="width:50px;">
                <p> $${(item.price * item.quantity).toFixed(2)}</p>
            </div>
        `;
        // Suppression
        div.querySelector('.Remove').onclick = function() {
            removeFromCart(item.id);
        };
        // Changement de quantité
        div.querySelector('.number').onchange = function(e) {
            updateQuantity(item.id, parseInt(e.target.value));
        };
        cardShop.insertBefore(div, prixTotal);
    });
    // Mise à jour du total
    document.querySelector('.prix_total p:nth-child(1)').textContent = `Subtotal  $${subtotal.toFixed(2)}`;
    const tax = subtotal > 0 ? 0.15 * subtotal : 0;
    document.querySelector('.prix_total p:nth-child(2)').textContent = `Tax  $${tax.toFixed(2)}`;
    document.querySelector('.prix_total p:nth-child(3)').textContent = `Total  $${(subtotal + tax).toFixed(2)}`;
}

function removeFromCart(id) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== id);
    saveCart(cart);
    renderCart();
}

function updateQuantity(id, qty) {
    let cart = getCart();
    cart = cart.map(item => item.id === id ? { ...item, quantity: qty > 0 ? qty : 1 } : item);
    saveCart(cart);
    renderCart();
}

// Initialisation
renderCart();
