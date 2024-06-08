let jupe = [];
const container = document.querySelector(".article");
fetch('../data/jupe.json')
    .then(response => response.json())
    .then(data => {
        jupe = data.produits;
    addProduct(jupe, container);
    console.log(jupe);
    })
    .catch(error => console.error(error));

const addProduct = (produits, container) =>{
    produits.forEach(produit => {
        container.innerHTML += `
        <div class="nouveaute">
                    <div class="photo">
                        <img src="./${produit.imageUrl}" alt="">
                    </div>
                    <div class="details_produit">
                        <h3 class="nom">${produit.name}</h3>
                        <h3 class="prix">${produit.prix}€</h3>
                    </div>
                </div>
        `
    });   
}