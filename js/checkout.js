function displayCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cart-items");
    cartContainer.innerHTML = "";

    let total = 0;
    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        cartContainer.innerHTML += `
            <div class="movie">
                <img src="${item.image}" alt="${item.title}">
                <p>${item.title} - $${item.price} (${item.quantity})</p>
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
    });

    document.getElementById("cart-total").innerText = `Total: $${total.toFixed(2)}`;
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
    updateCartCount();
}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cart-count").textContent = cart.length;
}


document.addEventListener("DOMContentLoaded", updateCartCount);

displayCart();
