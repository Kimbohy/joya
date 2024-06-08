// fetch the data from ../data/robe.json
let robe = [];
const container = document.querySelector(".block_nouveaute")
fetch('./assets/data/robe.json')
    .then(response => response.json())
    .then(data => {
        robe = data.produits;
        addProduct(robe, container);
    })
    .catch(error => console.error(error));

const addProduct = (produits, container)=>{
    produits.forEach(produit => {
        container.innerHTML += `
        <div class="nouveaute">
                    <div class="photo">
                        <img src="./assets/img/${produit.imageUrl}" alt="">
                    </div>
                    <div class="details_produit">
                        <h3 class="nom">${produit.name}</h3>
                        <h3 class="prix">${produit.prix}€</h3>
                        <div>

                        </div>
                    </div>
                </div>
        `
    });
}