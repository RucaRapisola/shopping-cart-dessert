fetch("data.json").then(function(response){
    return response.json();
})
.then(function(products){
    let placeholder = document.querySelector("#data-output");
    let out = "";

    for(let product of products){
        console.log(product);
        out+= `
            <div class="unique-dessert">
                <div class="picture-button-dessert">
                    <img class= "image-dessert" src='${product.image.desktop}'>
                    <div>
                        <button id="increase-amount" class="add-to-cart-button" data-item-id="waffle">
                            <img class="icon-button" src="assets/images/icon-add-to-cart.svg">
                            <p class="add-to-cart-text">Add to Cart</p>
                        </button>
                    </div>
                </div>
                <div class="info-dessert">
                    <p class="category-dessert-text">${product.category}</p>
                    <p class="name-dessert-text">${product.name}</p>
                    <p class="price-dessert-text">${product.price.toFixed(2)}</p>
                </div>
            </div>
        `
    }

    placeholder.innerHTML = out;
})
