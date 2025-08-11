// Utilità semplici per carrello & form - solo lato client
const CART_KEY = 'cbn_cart_v1';

function getCart(){ 
  try{ return JSON.parse(localStorage.getItem(CART_KEY)) || []; }catch(e){ return []; }
}
function saveCart(items){ localStorage.setItem(CART_KEY, JSON.stringify(items)); }
function addToCart(item){ 
  const cart = getCart();
  const existing = cart.find(i => i.id === item.id);
  if (existing){ existing.qty += item.qty || 1; }
  else { cart.push(item); }
  saveCart(cart);
  alert('Aggiunto al carrello!');
}
function removeFromCart(id){
  const cart = getCart().filter(i => i.id !== id);
  saveCart(cart);
  renderCart && renderCart();
}
function cartTotal(){
  return getCart().reduce((sum, i) => sum + i.price * i.qty, 0);
}

// Se siamo nella pagina carrello, esegui il rendering
function renderCart(){
  const body = document.querySelector('#cart-body');
  const totalEl = document.querySelector('#cart-total');
  if(!body || !totalEl) return;
  const items = getCart();
  body.innerHTML = items.length ? '' : '<tr><td colspan="5">Il carrello è vuoto.</td></tr>';
  items.forEach(i => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>{}</td>
      <td>${i.name}</td>
      <td>€ ${i.price.toFixed(2)}</td>
      <td>${i.qty}</td>
      <td><button class="btn btn-ghost" onclick="removeFromCart('${i.id}')">Rimuovi</button></td>
    `;
    body.appendChild(tr);
  });
  totalEl.textContent = '€ ' + cartTotal().toFixed(2);
}
document.addEventListener('DOMContentLoaded', renderCart);

// Registrazione (solo demo)
function handleRegister(e){
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());
  localStorage.setItem('cbn_user', JSON.stringify(data));
  alert('Registrazione completata (demo). Ora puoi procedere agli acquisti!');
  window.location.href = 'index.html';
}
