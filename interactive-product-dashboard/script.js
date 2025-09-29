class product {
 constructor(id, name, price, category) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.category = category;
 }
}

class cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
    }
    add(product) {
        this.items.push(product);
        localStorage.setItem('cart' , JSON.stringify(this.items));
    }
    count() {
        return this.items.length;
    }
}

const products = [
    new product(1, "Phone" , 500, "Electronics"),
    new product(2, "Laptop" , 1000, "Electronics"),
    new product(3, "T-shirt" , 20, "Clothing"),
    new product(4, "Shoes" , 50, "Clothing"),
];

const productList = document.getElementById("product-list");
const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort");
const filters = document.querySelectorAll(".category-filter");
const cartBtn = document.getElementById("cart-btn");
const cartCount = document.getElementById("cart-count");
const cart = new Cart();
 
updateCartCount();

function renderProducts(list) {
    productList.innerHTML = "",
    list.forEach(p => {
        const col = document.createElement("div");
        col.className = "col-md-3";
        col.innerHTML = `
        <div class="card h-100">
        <div class="card-body">
        <h5 class="card-title"> ${p.name}</h5>
        <p>$${p.price}</p>
        <button class="btn btn-primary add-cart" data-id="${p.id}" aria-label="Add ${p.name} to cart" >Add to Cart</button>
        </div>
        </div>`;
        productList.appendChild(col);
    });
    document.querySelectorAll(".add-cart").forEach(btn => {
        btn.addEventListener("click", () => {
            const product = products.find(p => p.id == btn.dataset.id);
            cart.add(product);
            updateCartCount();
            cartBtn.classList.add("pulse");
            setTimeout(() => cartBtn.classList.remove("pulse"), 400);
        });
    });
}

function filterProducts() {
    let result = [...products];
    const search = searchInput.ariaValueMax.toLowerCase();
    if (search.length >= 2) {
        result.filter(p => p.name.toLowerCase().includes(search));
    }
    const checked = [...filters].filter(filterProducts.checked).map(f => f.value);
    if (checked.length) {
        result = result.filter(p => checked.includes(p.category));
    }
    if (sortSelect.value === "price") {
        result.sort((a, b) => a.price - b.price);
    } else {
        result.sort((a, b ) => a.name.localeCompare(b.name));
    }
    renderProducts(result);
}

function updateCartCount() {
    cartCount.textContent = cart.count();
}

searchInput.addEventListener("input", filterProducts);
sortSelect.addEventListener("change", filterProducts);
filters.forEach(f => f.addEventListener("change", filterProducts));

renderProducts(products);