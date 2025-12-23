const cart={items:[],total:0};
const cartCountEl=document.getElementById('cartCount');
const cartListEl=document.getElementById('cartList');
const cartTotalEl=document.getElementById('cartTotal');
const cartDisplay=document.getElementById('cartDisplay');

function saveCart(){localStorage.setItem('ccCart',JSON.stringify(cart));}
function loadCart(){
  const c=localStorage.getItem('ccCart');
  if(c){Object.assign(cart,JSON.parse(c));renderCart();}
}
function renderCart(){
  if(cartCountEl) cartCountEl.textContent=cart.items.reduce((s,i)=>s+i.qty,0);
  if(cartTotalEl) cartTotalEl.textContent=cart.total.toFixed(2);
  if(cartListEl){
    cartListEl.innerHTML='';
    cart.items.forEach(it=>{
      const li=document.createElement('li');
      li.innerHTML=`<span>${it.qty}× ${it.name}</span><span>$${it.price.toFixed(2)}</span>`;
      cartListEl.appendChild(li);
    });
  }
  if(cartDisplay){
    cartDisplay.innerHTML='';
    cart.items.forEach(it=>{
      const div=document.createElement('div');
      div.className='card'; div.style.marginBottom='.5rem';
      div.innerHTML=`<strong>${it.qty}× ${it.name}</strong><span style="float:right">$${it.price.toFixed(2)}</span>`;
      cartDisplay.appendChild(div);
    });
  }
}
function addItem(name,price){
  const ex=cart.items.find(i=>i.name===name);
  if(ex){ex.qty++;ex.price+=price;}
  else{cart.items.push({name,price,qty:1});}
  cart.total=cart.items.reduce((t,i)=>t+i.price,0);
  renderCart();saveCart();
}

document.addEventListener('DOMContentLoaded',()=>{
  loadCart();
  document.querySelectorAll('.card .add').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const card=btn.closest('.card');
      let name=card.dataset.name;
      let price=parseFloat(card.dataset.price);
      const sauceSel=card.querySelector('.sauce');
      if(sauceSel){name+=' ('+sauceSel.value+')';}
      addItem(name,price);
    });
  });
  const customBtn=document.getElementById('buildCustom');
  if(customBtn){
    customBtn.addEventListener('click',()=>{
      const size=document.querySelector('input[name="size"]:checked');
      let name=size.value+' Custom Pizza';
      let price=parseFloat(size.dataset.price);
      const tops=[...document.querySelectorAll('.topping-grid input:checked')].map(t=>t.value);
      if(tops.length){name+=' ('+tops.join(', ')+')';price+=tops.length*1.5;}
      addItem(name,price);
    });
  }
});