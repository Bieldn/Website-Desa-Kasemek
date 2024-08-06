// scripts.js
document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: 'Product 1', price: 100, image: 'https://via.placeholder.com/200', favorite: false },
        { id: 2, name: 'Product 2', price: 200, image: 'https://via.placeholder.com/200', favorite: false },
        { id: 3, name: 'Product 3', price: 300, image: 'https://via.placeholder.com/200', favorite: false },
    ];

    const cart = [];
    const favorites = [];

    const productContainer = document.getElementById('product-list');
    const favoritesContainer = document.getElementById('favorites-list');
    const cartContainer = document.getElementById('cart-items');
    const checkoutContainer = document.getElementById('checkout-items');

    function renderProducts() {
        productContainer.innerHTML = '';
        products.forEach(product => {
            const productCard = `
                <div class="col-md-4">
                    <div class="card">
                        <img src="${product.image}" class="card-img-top" alt="${product.name}">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">$${product.price}</p>
                            <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
                            <button class="btn btn-secondary" onclick="toggleFavorite(${product.id})">${product.favorite ? 'Remove from Favorites' : 'Add to Favorites'}</button>
                        </div>
                    </div>
                </div>
            `;
            productContainer.insertAdjacentHTML('beforeend', productCard);
        });
    }

    function renderFavorites() {
        favoritesContainer.innerHTML = '';
        favorites.forEach(product => {
            const favoriteCard = `
                <div class="col-md-4">
                    <div class="card">
                        <img src="${product.image}" class="card-img-top" alt="${product.name}">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">$${product.price}</p>
                            <button class="btn btn-danger" onclick="removeFromFavorites(${product.id})">Remove</button>
                        </div>
                    </div>
                </div>
            `;
            favoritesContainer.insertAdjacentHTML('beforeend', favoriteCard);
        });
    }

    function renderCart() {
        cartContainer.innerHTML = '';
        cart.forEach(product => {
            const cartItem = `
                <div class="card">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">$${product.price}</p>
                        <button class="btn btn-danger" onclick="removeFromCart(${product.id})">Remove</button>
                    </div>
                </div>
            `;
            cartContainer.insertAdjacentHTML('beforeend', cartItem);
        });
    }

    function renderCheckout() {
        checkoutContainer.innerHTML = '';
        let total = 0;
        cart.forEach(product => {
            const checkoutItem = `
                <div class="card">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">$${product.price}</p>
                    </div>
                </div>
            `;
            checkoutContainer.insertAdjacentHTML('beforeend', checkoutItem);
            total += product.price;
        });
        checkoutContainer.insertAdjacentHTML('beforeend', `<h3>Total: $${total}</h3>`);
    }

    window.addToCart = function(id) {
        const product = products.find(p => p.id === id);
        if (!cart.includes(product)) {
            cart.push(product);
            renderCart();
            renderCheckout();
        }
    }

    window.removeFromCart = function(id) {
        const index = cart.findIndex(p => p.id === id);
        if (index > -1) {
            cart.splice(index, 1);
            renderCart();
            renderCheckout();
        }
    }

    window.toggleFavorite = function(id) {
        const product = products.find(p => p.id === id);
        product.favorite = !product.favorite;
        if (product.favorite) {
            favorites.push(product);
        } else {
            const index = favorites.findIndex(p => p.id === id);
            favorites.splice(index, 1);
        }
        renderProducts();
        renderFavorites();
    }

    window.removeFromFavorites = function(id) {
        const index = favorites.findIndex(p => p.id === id);
        if (index > -1) {
            favorites.splice(index, 1);
            const product = products.find(p => p.id === id);
            product.favorite = false;
            renderProducts();
            renderFavorites();
        }
    }

    renderProducts();
});
