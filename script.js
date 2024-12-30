const apiUrl = 'https://fakestoreapi.com/products';

async function fetchAndDisplayProducts() {
    try{
        const response = await fetch(apiUrl);
        const products = await response.json();
        displayProducts(products);

    } catch(error) {
        console.log('Error fetching products:' , error);

    }
}

function displayProducts(products) {
    const productList = document.getElementById('product-list')
    productList.innerHTML = '';

    products.forEach(product => {
        const productCard = `
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                <div class="card">
                    <img src= "${product.image}" class="card-img-top mt-4" alt="${product.title}">
                    <div class="card-body">
                        <h4 class="card-title">${product.title}</h4>
                        <p class="card-text">${product.description}</p>
                        <p class="card-text fw-bold">$${product.price}</p>
                    </div>
                </div>
            </div>
        
        `;
        productList.innerHTML += productCard;
        
    });
}


async function searchProduct(event) {
    event.preventDefault();

    const searchInput = document.getElementById('search-input').value.toLowerCase();
    console.log("Search Input:", searchInput); 

    try {
        const response = await fetch(apiUrl);
        const products = await response.json();
        console.log("Fetched Products:", products); 

        const filteredProducts = products.filter(product =>
            product.title.toLowerCase().includes(searchInput)
        );

       console.log("Filtered Products:", filteredProducts); 

        if (filteredProducts.length > 0) {
            displayProducts(filteredProducts);
        } else {
            document.getElementById('product-list').innerHTML = `<p>No products found.</p>`;
        }
    } catch (error) {
        console.lo("Error during search:", error);
    }
}

document.getElementById('search-button').addEventListener('click',searchProduct);
fetchAndDisplayProducts();