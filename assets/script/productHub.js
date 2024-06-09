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
        container.innerHTML += `
        <div class="nouveaute">
            <div class="photo"  onclick="imageClick('${url}','${produit.name}','${produit.prix}')">
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

function imageClick(imageUrl, _name, prix) {
    container = document.querySelector('.article');
    let path='..';
    if (container == null) {
        container = document.querySelector('.block_nouveaute');
        path='assets';
    }
    container.innerHTML = `
    <div class="new">
    <div class="infoprod">
        <div class="imgProd">
            <img src="${imageUrl}" alt="">
        </div>
        <div class="prodInfo">
            <div class="titreETprix">
                <h1>${_name}</h1> <br>
                <h2 id="price">${prix} € </h2>
            </div>
            <div class="ajoutPanier">
                <span>size</span>
                <select id="size">
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                </select> <br><br>
                <span>Quantite</span>
                <input id="quantite" type="number" value="1" min="1"> <br><br>
                <button id="ajout" onclick="ajout('${_name}','${prix}')">AJOUTER AU PANIER</button>
            </div>
        </div>
    </div>
    <ul>
        <li>
            <img src="./${path}/img/rea_customer_service.png" alt="" class="miniIcon">
            <span>Service  client au 06 54 94 19</span>
        </li>
        <li>
            <img src="./${path}/img/reassurance-joya-le-store-moyens-paiements.png" alt=""class="miniIcon">
            <span>Paiement sécurisé &3x sans frais avec Aima</span>
        </li>
        <li>
            <img src="./${path}/img/rea_pdt_shipping.png" alt="" class="miniIcon">
            <span>Livraison offerte avec Mondial Relay à partir de 100 €</span>
        </li>
        <li>
            <img src="./${path}/img/rea_click_collect.png" alt="" class="miniIcon">
            <span>Click et collect à la Grande Motte</span>
        </li>
    </ul>
    </div>
    `;
}

function ajout(_name ,prix) {
    // clique sur le bouton ajout
    let pointure=parseFloat(document.getElementById("size").value)
    let quantite=parseFloat(document.getElementById("quantite").value)
    price=parseFloat(prix)
    let totalPrice=price*quantite;
    document.querySelector('.article').innerHTML +=`
                                <div id="result"></div>`;
    document.querySelector('body').innerHTML +=`
                              <div class="opacity" onclick="back()"></div>`;
                             console.log("click");
    document.getElementById("result").innerHTML=`<p>vous avez acheté le produit : ${_name}</p> <br> 
                                   <p>De pointure : ${pointure}</p> <br> <p>Quantité : ${quantite}</p> <br> <h2>TOTALPRICE :${totalPrice} €</h2>
                                   <button class="confirm">CONFIRMER</button>`;
    
    document.querySelector('.confirm').onclick=function(){
       let panier=parseInt(document.getElementById("panierStock").innerText);
       panier=panier+1;
       document.getElementById("panierStock").textContent=panier;


    // Get the product information
    let productInfo = {
        name: _name,
        price: prix,
        size: document.getElementById("size").value,
        quantity: document.getElementById("quantite").value,
        url: document.querySelector('.imgProd img').src
    };
    let newelement=document.createElement('li');
    newelement.innerHTML=`<p>vous avez acheté le produit : ${_name}</p> <br> 
    <p>De pointure : ${pointure}</p> <br> <p>Quantité : ${quantite}</p> <br> <h2>TOTALPRICE :${totalPrice} €</h2>`;
    let listPan=document.getElementById("panierList");
    listPan.appendChild(newelement);
    }
}

const back = () => {
    document.querySelector('#result').remove();
    document.querySelector('.opacity').remove();
}

// change the property of #panierRender to display: block or none
function panier(){
changeStatus("PanierRender");
}


function changeStatus(id){
    let panier=document.getElementById(id);
    if(panier.style.display=="none"){
        panier.style.display="block";
    } else {
        panier.style.display="none";
    }
}

const masquer = () => {
    document.getElementById("PanierRender").style.display="none";
}