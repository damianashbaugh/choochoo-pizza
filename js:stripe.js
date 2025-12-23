{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 document.addEventListener('DOMContentLoaded',()=>\{\
  const stripe=Stripe('pk_test_YOUR_PUBLISHABLE_KEY'); // <-- replace with your real pk_test key\
  const checkoutBtn=document.getElementById('checkoutBtn');\
  if(!checkoutBtn)return;\
\
  checkoutBtn.addEventListener('click',()=>\{\
    if(cart.items.length===0)\{alert('Your cart is empty.');return;\}\
    const isDelivery=document.querySelector('input[name="service"]:checked').value==='delivery';\
    if(isDelivery)cart.total+=3;\
\
    fetch('https://api.stripe.com/v1/checkout/sessions',\{\
      method:'POST',\
      headers:\{\
        'Content-Type':'application/json',\
        'Authorization':'Bearer pk_test_YOUR_PUBLISHABLE_KEY' // same key\
      \},\
      body:JSON.stringify(\{\
        payment_method_types:['card'],\
        mode:'payment',\
        line_items:cart.items.map(it=>(\{\
          price_data:\{\
            currency:'usd',\
            product_data:\{name:it.name\},\
            unit_amount:Math.round(it.price*100)\
          \},\
          quantity:it.qty\
        \})),\
        success_url:location.origin+'/success.html',\
        cancel_url:location.origin+'/cancel.html'\
      \})\
    \}).then(r=>r.json())\
    .then(session=>stripe.redirectToCheckout(\{sessionId:session.id\}))\
    .catch(err=>\{console.error(err);alert('Checkout failed.');\});\
  \});\
\});}