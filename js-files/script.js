let cartQuantity = 0;
let cartItems = [];

const cartText = document.getElementById("cart-text");
const orderDiv = document.querySelector(".order-div");

cartText.textContent = `Your Cart(${cartQuantity})`;

function updateCartText() {
    cartText.textContent = `Your Cart(${cartQuantity})`;
}

function updateButton(button) {
    button.innerHTML = `
        <img class="icon-button" src="assets/images/icon-add-to-cart.svg">
        <p class="add-to-cart-text">Add to Cart</p>`;
    button.classList.remove("added");
    button.dataset.added = "false";
}

function addItemToCart(itemName, itemPrice) {
    const existingItem = cartItems.find(item => item.name === itemName);

    if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.quantity * itemPrice;
    } else {
        cartItems.push({
            name: itemName,
            price: itemPrice,
            quantity: 1,
            totalPrice: itemPrice
        });
    }
    cartQuantity++;
    updateCartText();
    updateOrderDiv();
}

function updateItemQuantity(button, quantity, itemName, itemPrice) {
    button.innerHTML = `
        <button class="decrease-quantity">-</button>
        <p class="item-quantity">${quantity}</p>
        <button class="increase-quantity">+</button>
    `;

    const increaseBtn = button.querySelector(".increase-quantity");
    const decreaseBtn = button.querySelector(".decrease-quantity");

    increaseBtn.addEventListener("click", () => {
        quantity++;
        button.querySelector(".item-quantity").textContent = quantity;
        addItemToCart(itemName, itemPrice);
    });

    decreaseBtn.addEventListener("click", () => {
        if (quantity > 1) {
            quantity--;
            button.querySelector(".item-quantity").textContent = quantity;
            const item = cartItems.find(item => item.name === itemName);
            item.quantity--;
            item.totalPrice = item.quantity * itemPrice;
            cartQuantity--;
        } else if (quantity === 1) {
            quantity--;
            cartQuantity--;
            cartItems = cartItems.filter(item => item.name !== itemName);
            updateButton(button); 
        }
        updateCartText();
        updateOrderDiv();
    });
}

function updateOrderDiv() {
    if (cartQuantity > 0) {
        let orderDetails = cartItems.map(item => {
            return `
                <div class="dessert-detail">
                  <p class="name-dessert-order">${item.name}</p>
                  <div class="price-amount">
                    <p class="amount-price-order1">${item.quantity}x</p>
                    <p class="amount-price-order2">@ $${item.price.toFixed(2)}</p>
                    <p class="amount-price-order3">$${item.totalPrice.toFixed(2)}</p>
                  </div>
                </div>
            `;
        }).join('');

        const totalPrice = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

        orderDiv.innerHTML = `
            <p id="cart-text" class="order-text">Your Cart (${cartQuantity})</p>
            <div class="order-details">
                ${orderDetails}
            </div>
            <div class="order-total">
              <p class="total-para">Order Total</p>
              <p class="amount-para"> $${totalPrice.toFixed(2)} </p>
            </div>
            <div class="button-conf-area">
              <div class="center-conf">
                <button id="confirm-order-button" class="confirm-order-butt">
                  <p>Confirm Order</p>
                </button>
              </div>
            </div>
        `;
        
        document.getElementById("confirm-order-button").addEventListener("click", () => {
          document.getElementById("details").innerHTML = orderDetails;
          document.getElementById("total-details").innerHTML = `
                <p class="total-para">Order Total</p>
                <p class="amount-para"> $${totalPrice.toFixed(2)} </p>`;
          document.querySelector(".popup").style.display = "block";
          document.getElementById("overlay").style.display = "block";

          console.log(document.querySelectorAll(".add-to-cart-button"));
          document.querySelectorAll(".add-to-cart-button").forEach(button => {
            button.disabled = true;
            button.classList.add("disabled");
          });
        });

        document.querySelector(".popup button").addEventListener("click", () => {
          document.getElementById("overlay").style.display = "none";
          
          document.querySelectorAll(".add-to-cart-button").forEach(button => {
              button.disabled = false;
              button.classList.remove("disabled");
          });

          location.reload();
        });
      
    } else {
        orderDiv.innerHTML = `
            <p id="cart-text" class="order-text">Your Cart (0)</p>
            <div class="image-empty-div">
                <img class="image-empty" src="assets/images/illustration-empty-cart.svg">
            </div>
            <p class="order-info">Your added items will appear here</p>
        `;
    }
}

function markButtonAsAdded(button) {
  button.innerHTML = `<p class="add-to-cart-text">Added to Cart</p>`;
  button.classList.add("added");
}

document.addEventListener("click", (event) => {
    const button = event.target.closest(".add-to-cart-button");
    
    if (button && button.dataset.added !== "true") {
        const itemName = button.closest(".unique-dessert").querySelector(".name-dessert-text").textContent;

        const itemPriceText = button.closest(".unique-dessert").querySelector(".price-dessert-text").textContent;
        const itemPrice = parseFloat(itemPriceText.replace(",", "."));

        button.dataset.added = "true";
        markButtonAsAdded(button);
        addItemToCart(itemName, itemPrice);
        updateItemQuantity(button, 1, itemName, itemPrice);
    }
});