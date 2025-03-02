const apiUrl = "https://v2.api.noroff.dev/square-eyes?genre=Comedy";

async function fetchProducts() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch products");

        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

function displayProducts(products) {
    const productContainer = document.getElementById("product-list");
    productContainer.innerHTML = "";
    products.data.forEach((product) => {
        productContainer.innerHTML += `
        <div class="movie">
        <a href="/product/index.html?id=${product.id}">
                <img src="${product.image.url}" alt="${product.title}">
                </a>
                <button onclick="addToCart('${product.id}', '${product.title}', ${product.price},'${product.image.url}')">Add to Cart</button>
                </div>
        `;

    });
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


fetchProducts();
