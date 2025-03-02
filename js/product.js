const apiUrl = "https://v2.api.noroff.dev/square-eyes";
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

async function fetchProductDetails() {
    try {
        const response = await fetch(`${apiUrl}/${productId}`);
        if (!response.ok) throw new Error("Product not found");
        const json = await response.json();
        const product = json.data;
        document.getElementById("movie-section").innerHTML = `
            <div>
                <img src="${product.image.url}" width="250" alt="${product.title}">
            </div>
            <div class="movie movie-2">
                <h1>${product.title}</h1>
                <p>${product.description}</p>
                <p>Rating: ${product.rating}</p>
                <p>Price: ${product.price}</p>
                <p>Genre: ${product.genre}</p>
                <button onclick="addToCart('${product.id}', '${product.title}', ${product.price},'${product.image.url}')">Add to Cart</button>
            </div>
        `;
    } catch (error) {
        console.error("Error fetching product details:", error);
    }
}

function addToCart(id, title, price, image) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let existingProduct = cart.find(item => item.id === id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ id, title, price, image, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cart-count").textContent = cart.length;
}

document.addEventListener("DOMContentLoaded", updateCartCount);

fetchProductDetails();
