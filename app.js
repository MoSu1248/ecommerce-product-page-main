
  let count = 0;
  let counter = 1 ; 
  let mobileCounter = 1 ; 

  let cart = {
    items: [], 
  };

  let sharedDisplay ; 
  const quantityButtons = document.querySelectorAll('.btn');
  const decrement = document.querySelector('.decrement');

  const addToCartBtn = document.querySelector('.product__btn')
  const countNo = document.querySelector('.count')

  const imgBtns = document.querySelectorAll('.img-btns');

  const lightimgBtns = document.querySelectorAll('.lightbox_img-btns');

  const img = document.querySelectorAll('product__btn-img');
  const displayImg = document.querySelector('.product-display__thumbnail');
  const lightBox_displayImg = document.querySelector('.lightbox_product-display__thumbnail');
  
  const cartToggle = document.getElementById('cartToggle');
  const cartDropdown = document.getElementById('cartDropdown');

  const lightBox = document.querySelector('.lightbox')
  const lightBox_close = document.querySelector('.lightbox_close');

  const arrowBtns = document.querySelectorAll('.img-arrow') 
  const cartCount = document.querySelector('.cart_count')

  const mobileArrows = document.querySelectorAll('.img-arrow__mobile');

  quantityButtons.forEach(button =>{

    button.addEventListener('click', ()=>{
      
      if (button.value == 'increment') {
          count += 1; 
          countNo.innerHTML = `${count}`;
          decrementCheck(count);
      }

      else if(button.value == "decrement"){
        count -= 1; 
        decrementCheck(count);
        countNo.innerHTML = `${count}`;
      }
      
    })
  })

  function decrementCheck(params){
  if (count  === 0 ) {
            decrement.classList.add('disabled')
        }     
        else{
          decrement.classList.remove('disabled')
        }
  }
 
  addToCartBtn.addEventListener('click', ()=>{

    const product = {
    id: 1,
    name: 'Fall Limited Edition Sneakers',
    price: 125.0,
    quantity: count,
    image: 'images/image-product-1-thumbnail.jpg'
  };
    addToCart(product);

    count = 0; 
    countNo.innerHTML = `${count}`;
    decrement.classList.add('disabled')
  })

  imgBtns.forEach(imgBtn =>{
    imgBtn.addEventListener('click', ()=>{

      imgBtns.forEach(b=>{b.classList.remove('active')})
      
      imgBtn.classList.add('active');

      displayImg.src = `/images/${imgBtn.value}.jpg`
      lightBox_displayImg.src = `/images/${imgBtn.value}.jpg`
      sharedDisplay = imgBtn.value
    })
  })

displayImg.addEventListener('click' , () =>{
  lightBox.classList.add('display')


  lightimgBtns.forEach(b => b.classList.remove('active'));

  lightimgBtns.forEach(imgBtn => {
      if (imgBtn.value === sharedDisplay) {
        imgBtn.classList.add('active');
      }
    });
})

lightBox_close.addEventListener('click' ,()=>{
  lightBox.classList.remove('display')

} ) 

lightimgBtns.forEach(imgBtn =>{
    imgBtn.addEventListener('click', ()=>{

      lightimgBtns.forEach(b=>{b.classList.remove('active')})
      
      imgBtn.classList.add('active');

      lightBox_displayImg.src = `/images/${imgBtn.value}.jpg`
      
    })
  })

arrowBtns.forEach(button => {
  button.addEventListener('click', () => {

    if (button.value === 'next') {
      counter++;
      if (counter === 5) {
        counter = 1;
      }
    }
    else{
      counter--
      if (counter === 0) {
        counter = 4;
      }
    }

    lightBox_displayImg.src = `/images/image-product-${counter}.jpg`;

    lightimgBtns.forEach(b => b.classList.remove('active'));

    lightimgBtns.forEach(imgBtn => {
      if (imgBtn.value === `image-product-${counter}`) {
        imgBtn.classList.add('active');
      }
    });
  });
});

function addToCart(product) {
   if (count === 0) return; 

  const existing = cart.items.find(item => item.id === product.id);

  if (existing) {
    existing.quantity += product.quantity;
  } else {
    cart.items.push(product);
  }

  updateCartUI();
}


cartToggle.addEventListener('click', () => {
  cartDropdown.style.display = cartDropdown.style.display === 'block' ? 'none' : 'block';
});

function updateCartUI() {
  const cartContent = document.querySelector('.cart-content');

  cartContent.innerHTML = '';

  if (cart.items.length  === 0) {
    cartContent.innerHTML = '<p>Your cart is empty.</p>';
  }
  
  console.log(cart.items.length);

  
  cart.items.forEach(item =>{
    const total = (item.price * item.quantity).toFixed(2);
    cartCount.innerHTML = `${item.quantity}`
    
      const itemHTML = `
      <div>
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}" class="cart-item-thumb" />
          <div class="cart-item-details">
            <p>${item.name}</p>
            <p>$${item.price.toFixed(2)} × ${item.quantity} <strong>$${total}</strong></p>
          </div>
          <button class="delete-btn" data-id="${item.id}"><img src="./images/icon-delete.svg" alt="" class="cart_delete"></button>
        </div>
        <button class="checkout-btn">Checkout</button>
      </div>
    `;

    cartContent.innerHTML = itemHTML;
    })
  
    document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      
      const deleteBtn = e.target.closest('.delete-btn');

      const id = parseInt(deleteBtn.dataset.id);      

      cart.items = cart.items.filter(item => item.id !== id);
      updateCartUI();
    });
  });
}

mobileArrows.forEach(mobilebutton => {
      const productMobile = document.querySelector('.product-mobile');
    mobilebutton.addEventListener('click', () => {

    if (mobilebutton.value === 'next') {
      mobileCounter++;
      if (mobileCounter === 5) {
        mobileCounter = 1;
      }
    }
    else{
      mobileCounter--
      if (mobileCounter === 0) {
        mobileCounter = 4;
      }
    }

    productMobile.src = `/images/image-product-${mobileCounter}.jpg`;

  });
});