(function () {
  const addButtons = document.querySelectorAll('.js-add-to-cart');
  const overlay = document.getElementById('overlay');
  const loader = document.getElementById('loader');
  const cart = document.getElementById('site-cart');
  const cartButton = document.getElementById('cartButton');
  const cartButtonDesktop = document.getElementById('cartButtonDesktop');
  const cartClose = document.getElementById('cartClose');
  const dynamicItems = document.getElementById('dynamicItems');
  let lastFocused = null;

  function openCart(withLoader = true) {
    lastFocused = document.activeElement;
    document.body.style.overflow = 'hidden';
    overlay.classList.add('overlay--active');
    cart.setAttribute('aria-hidden', 'false');
    if (withLoader && loader) {
      loader.classList.add('loader--active');
      setTimeout(() => {
        loader.classList.remove('loader--active');
        cart.classList.add('cart--open');
        if (cartButton) cartButton.setAttribute('aria-expanded', 'true');
        if (cartButtonDesktop) cartButtonDesktop.setAttribute('aria-expanded', 'true');
        cart.querySelector('.cart__close').focus();
      }, 1000);
    } else {
      if (loader) loader.classList.remove('loader--active');
      cart.classList.add('cart--open');
      if (cartButton) cartButton.setAttribute('aria-expanded', 'true');
      if (cartButtonDesktop) cartButtonDesktop.setAttribute('aria-expanded', 'true');
      cart.querySelector('.cart__close').focus();
    }
  }

  function closeCart() {
    cart.classList.remove('cart--open');
    overlay.classList.remove('overlay--active');
    if (loader) loader.classList.remove('loader--active');
    document.body.style.overflow = '';
    if (cartButton) cartButton.setAttribute('aria-expanded', 'false');
    if (cartButtonDesktop) cartButtonDesktop.setAttribute('aria-expanded', 'false');
    cart.setAttribute('aria-hidden', 'true');
    if (lastFocused) lastFocused.focus();
  }

  // Add-to-cart: add item and open cart with loader
  addButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const wrapper = document.createElement('div');
      wrapper.className = 'cart-item';
      wrapper.innerHTML = `
        <img class="cart-item__img" src="images/food.png" alt="Natures Menu Dog Food Can Chicken">
        <div class="cart-item__content">
          <p class="cart-item__title">Natures Menu Dog Food Can Chicken</p>
          <div class="cart-item__price">£22.81</div>
        </div>`;
      dynamicItems.appendChild(wrapper);
      openCart(true);
    });
  });

  if (cartButton) {
    cartButton.addEventListener('click', function () {
      openCart(false);
    });
  }
  if (cartButtonDesktop) {
    cartButtonDesktop.addEventListener('click', function () {
      openCart(false);
    });
  }

  cartClose.addEventListener('click', closeCart);
  overlay.addEventListener('click', function () {
    if (cart.classList.contains('cart--open')) {
      closeCart();
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && cart.classList.contains('cart--open')) {
      closeCart();
    }
  });

  // Accessibility
  overlay.setAttribute('role', 'presentation');
  cart.setAttribute('aria-hidden', 'true');
})();