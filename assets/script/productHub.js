function changePage(page) {
    if (window.location.href.includes('index.html')) {
        localStorage.setItem('selectedPage', page);
        window.location.href = './assets/pages/product.html';
    } else {
        localStorage.setItem('selectedPage', page);
        fetchProduct(page, document.querySelector(".article"));
    }
}

let productData = [];

function fetchProduct(page, container) {
    let dataPath = window.location.href.includes('index.html') ? `./assets/data/${page}.json` : `../data/${page}.json`;
    fetch(dataPath)
        .then(response => response.json())
        .then(data => {
            console.log(productData);
            productData = data.produits;
            addProduct(productData, container);
        })
        .catch(error => console.error(error));
}

const addProduct = (produits, container) => {
    container.innerHTML = '';
    produits.forEach(produit => {
        let url = window.location.href.includes('index.html') ? "./assets/" + produit.imageUrl : "../" + produit.imageUrl;
        console.log(url);
        container.innerHTML += `
        <div class="nouveaute">
            <div class="photo">
                <img src="${url}" alt="">
            </div>
            <div class="details_produit">
                <h3 class="nom">${produit.name}</h3>
                <h3 class="prix">${produit.prix}€</h3>
            </div>
        </div>
        `;
    });
    setPath();
}


const setPath = () => {
    const pathContainer = document.querySelector('.link');
    let curentPage = localStorage.getItem('selectedPage');
    pathContainer.innerHTML = `
                <img src="../img/accueil.svg" alt="iconHome" style="width: 20px;" onclick="window.location.href = '../../index.html';">
                <p>/</p>
                <p><a href="">Tous les produits</a></p> 
                <p>/</p>
                <p><a href="" id="onpage">${curentPage}</a></p>
                `;
};


window.onload = () => {
    if (window.location.href.includes('index.html')) {
        let container = document.querySelector(".block_nouveaute");
        fetchProduct('robe', container);
    } else {
        let container = document.querySelector(".article");
        fetchProduct(localStorage.getItem('selectedPage'), container);
    }
}