// Render cart from localStorage into cart.html table with totals and delete
(function(){
  const tbody = document.getElementById('body_of_table');
  const totalNoTvaEl = document.getElementById('totaleWithoutTva');
  const totalWithTvaEl = document.getElementById('totaleWithTva');
  if(!tbody) return;

  function getLS(){
    try{ return JSON.parse(localStorage.getItem('add_to_cart')||'[]'); }catch(e){ return []; }
  }
  function setLS(data){ localStorage.setItem('add_to_cart', JSON.stringify(data)); }

  function calcTotals(items){
    const subtotal = items.reduce((sum, it)=> sum + (Number(it.price)||0) * (Number(it.qty)||1), 0);
    const tva = 0; // as per design Tax 0%
    const total = subtotal + tva;
    return { subtotal, total };
  }

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
      tr.innerHTML = '<td colspan="3" style="text-align:center; padding: 20px;">Cart est vide</td>';
      tbody.appendChild(tr);
      if(totalNoTvaEl) totalNoTvaEl.textContent = '0.00';
      if(totalWithTvaEl) totalWithTvaEl.textContent = '0.00';
      updateHeaderTotal();
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
              <small>Price: $${Number(item.price).toFixed(2)}</small>
              <br>
              <button class="remove_prodact_from_cart" data-id="${item.id}">Delete</button>
            </div>
          </div>
        </td>
        <td>
          <input type="number" min="1" value="${item.qty||1}" data-id="${item.id}" class="qty-input"/>
        </td>
        <td>$${(Number(item.price)*(item.qty||1)).toFixed(2)}</td>
      `;
      tbody.appendChild(tr);
    });

    const { subtotal, total } = calcTotals(data);
    if(totalNoTvaEl) totalNoTvaEl.textContent = subtotal.toFixed(2);
    if(totalWithTvaEl) totalWithTvaEl.textContent = total.toFixed(2);
    updateHeaderTotal();
  }

  // Delete item
  tbody.addEventListener('click', (e)=>{
    const btn = e.target.closest('button.remove_prodact_from_cart');
    if(!btn) return;
    const id = btn.dataset.id;
    const data = getLS();
    const idx = data.findIndex(it => it.id === id);
    if(idx !== -1){
      data.splice(idx,1);
      setLS(data);
      render();
    }
  });

  // Update qty
  tbody.addEventListener('change', (e)=>{
    const input = e.target.closest('input.qty-input');
    if(!input) return;
    const id = input.dataset.id;
    const qty = Math.max(1, parseInt(input.value||'1',10));
    const data = getLS();
    const idx = data.findIndex(it => it.id === id);
    if(idx !== -1){
      data[idx].qty = qty;
      setLS(data);
      render();
    }
  });

  updateHeaderTotal();
  render();
})();
