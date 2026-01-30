// Render wishlist from localStorage into wishlist.html table
(function(){
  const tbody = document.getElementById('body_of_table');
  if(!tbody) return;

  function getLS(){
    try{ return JSON.parse(localStorage.getItem('wishlist')||'[]'); }catch(e){ return []; }
  }
  function setLS(data){ localStorage.setItem('wishlist', JSON.stringify(data)); }

  function updateHeaderTotal(){
    try{
      const cart = JSON.parse(localStorage.getItem('add_to_cart')||'[]');
      const total = cart.reduce((sum,it)=> sum + (Number(it.price)||0) * (Number(it.qty)||1), 0);
      const el = document.getElementById('total_in_header');
      if(el){ el.textContent = `${total.toFixed(2)}`; }
    }catch(e){ /* ignore */ }
  }

  function render(){
    const data = getLS();
    tbody.innerHTML = '';
    if(!data.length){
      const tr = document.createElement('tr');
      tr.innerHTML = '<td colspan="3" style="text-align:center; padding: 20px;">Wishlist est vide</td>';
      tbody.appendChild(tr);
      return;
    }
    data.forEach(item => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>
          <div class="cart-info">
            <img src="${item.img}" alt="${item.title}">
            <div>
              <p>${item.title || ''}</p>
            </div>
          </div>
        </td>
        <td>${(item.price??0).toFixed ? item.price.toFixed(2) : Number(item.price).toFixed(2)}</td>
        <td style="display:flex; gap:10px; justify-content:flex-end;">
          <button class="add_from_wishlist" data-id="${item.id}">Add To Cart</button>
          <button class="remove_prodact_from_cart" data-id="${item.id}">Delete</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  tbody.addEventListener('click', (e)=>{
    const del = e.target.closest('button.remove_prodact_from_cart');
    if(del){
      const id = del.dataset.id;
      const data = getLS();
      const idx = data.findIndex(it => it.id === id);
      if(idx !== -1){
        data.splice(idx,1);
        setLS(data);
        render();
      }
      return;
    }
    const add = e.target.closest('button.add_from_wishlist');
    if(add){
      const id = add.dataset.id;
      const data = getLS();
      const item = data.find(it => it.id === id);
      if(item){
        // push to cart
        const cart = JSON.parse(localStorage.getItem('add_to_cart')||'[]');
        const idx = cart.findIndex(it => it.id === item.id);
        if(idx === -1){
          cart.push({ id: item.id, img: item.img, title: item.title, price: item.price, qty: 1 });
        }else{
          cart[idx].qty = (cart[idx].qty||1)+1;
        }
        localStorage.setItem('add_to_cart', JSON.stringify(cart));
      }
      updateHeaderTotal();
    }
  });

  updateHeaderTotal();
  render();
})();
