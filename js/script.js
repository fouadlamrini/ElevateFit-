// Global helpers for localStorage
function getLS(key){
  try{ return JSON.parse(localStorage.getItem(key) || '[]'); }catch(e){ return []; }
}
function setLS(key, value){ localStorage.setItem(key, JSON.stringify(value)); }

// Header total helper
function updateHeaderTotal(){
  try{
    const cart = JSON.parse(localStorage.getItem('add_to_cart')||'[]');
    const total = cart.reduce((sum,it)=> sum + (Number(it.price)||0) * (Number(it.qty)||1), 0);
    const el = document.getElementById('total_in_header');
    if(el){ el.textContent = `${total.toFixed(2)}`; }
  }catch(e){ /* ignore */ }
}

// Extract product info from a product card (.col-4)
function extractProductData(card, { idSource } = {}){
  const imgEl = card.querySelector('img');
  const titleEl = card.querySelector('h4');
  const priceEl = card.querySelector('p');
  const img = imgEl ? imgEl.getAttribute('src') : '';
  const title = titleEl ? titleEl.textContent.trim() : '';
  const priceText = priceEl ? priceEl.textContent.trim() : '';
  // normalize price like $50.00 -> 50.00
  const price = parseFloat(priceText.replace(/[^0-9.]/g,'') || '0').toFixed(2);
  // use title|img as a stable unique id for both wishlist and cart
  const id = title + '|' + img;
  return { id, img, title, price: Number(price) };
}

// Wishlist: toggle heart background to red and store product
function handleWishlistClick(btn){
  const card = btn.closest('.col-4');
  if(!card) return;
  const product = extractProductData(card, { idSource: 'wishlist' });
  let wishlist = getLS('wishlist');
  const exists = wishlist.findIndex(it => it.id === product.id);
  if(exists === -1){
    wishlist.push({ id: product.id, img: product.img, title: product.title, price: product.price });
    setLS('wishlist', wishlist);
    // visual state -> red heart
    btn.classList.add('wish-active');
  } else {
    // toggle off removes from wishlist
    wishlist.splice(exists,1);
    setLS('wishlist', wishlist);
    btn.classList.remove('wish-active');
  }
}

// Cart: add to localStorage
function handleAddToCartClick(btn){
  const card = btn.closest('.col-4');
  if(!card) return;
  const product = extractProductData(card, { idSource: 'cart' });
  let cart = getLS('add_to_cart');
  // if already exists, increment quantity else add with qty 1
  const idx = cart.findIndex(it => it.id === product.id);
  if(idx === -1){
    cart.push({ id: product.id, img: product.img, title: product.title, price: product.price, qty: 1 });
  } else {
    cart[idx].qty = (cart[idx].qty || 1) + 1;
  }
  setLS('add_to_cart', cart);
  updateHeaderTotal();
}

// Wire up events on DOMContentLoaded
window.addEventListener('DOMContentLoaded', () => {
  updateHeaderTotal();
  // Make all heart buttons clickable (assume they are the buttons preceding the add_to_cart_button within a card)
  document.querySelectorAll('.col-4 > button').forEach((btn) => {
    // identify heart button via embedded SVG id="Layer_1" or by absence of add_to_cart_button class
    const isHeart = !btn.classList.contains('add_to_cart_button');
    if(isHeart){
      btn.addEventListener('click', (e)=>{
        e.stopPropagation();
        handleWishlistClick(btn);
      });
    }
  });

  // Apply initial wish-active class for hearts that are already in wishlist
  const wishlist = getLS('wishlist');
  document.querySelectorAll('.col-4').forEach(card => {
    const heartBtn = card.querySelector('button:not(.add_to_cart_button)');
    if(!heartBtn) return;
    const product = extractProductData(card, { idSource: 'wishlist' });
    if(wishlist.some(it => it.id === product.id)){
      heartBtn.classList.add('wish-active');
    }
  });

  // Add to cart buttons
  document.querySelectorAll('.add_to_cart_button').forEach((btn)=>{
    btn.addEventListener('click', (e)=>{
      e.stopPropagation();
      handleAddToCartClick(btn);
    });
  });
});
