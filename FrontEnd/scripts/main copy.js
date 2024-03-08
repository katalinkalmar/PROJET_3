// On stocke la réponse du serveur après lui avoir demandé les travaux//
const reponse = await fetch("http://localhost:5678/api/works");
//On récupère la liste des travaux à partir de la réponse du site
const works = await reponse.json();
console.log(works);
// On récupère la div qui contiendra les différents travaux
const gallery = document.querySelector(".gallery");



for (let i = 0; i < works.length; i++) {
    // On crée une variable (constante) contenant le premier projet des travaux, works est la liste des works
    let work = works[i];
    //Je crée un élément figure, puis img, puis figcaption
    const figureElement = document.createElement("figure");
    const imageElement = document.createElement("img");
    const nomElement = document.createElement("figcaption");

    //Configuration des différents éléments
    // Je configure l'attribut src de l'image avec l'URL du projet à afficher
    imageElement.src = work.imageUrl;
    imageElement.alt = work.title;
    // Dans la balise nomElement je veux le innerText et je le définis par, dans mon work,le nom
    nomElement.innerText = work.title;

    //Dans ma gallery je rajoute un enfant qui est figureElement
    gallery.appendChild(figureElement);
    //On rajoute dans la figure la balise img et figcaption
    figureElement.appendChild(imageElement);
    figureElement.appendChild(nomElement);
}

//J'enregistre la réponse du serveur lorsque je lui demande les catégories
const reponse_categorie = await fetch("http://localhost:5678/api/categories")
// Je stocke dans une constante la liste des catégories des works
const categories = await reponse_categorie.json()
console.log(categories)

// Je fais un bouton de tout;  Ici viendra le code pour le bouton tout
var btn1 = document.getElementById("tous");
btn1.addEventListener("click", funcFiltrer1);
function funcFiltrer1() {
    console.log("bouton_tous")
    // Ici vient le code pour afficher tous les travaux (works)
     // - On vide la gallery avec InnerHTML (voir cours OC)
  
    //- On affiche, à l'aide d'une boucle for, la liste complète
}

var btn2 = document.getElementById("objets");
btn2.addEventListener("click", funcFiltrer2);
function funcFiltrer2() {
    console.log("bouton_objet")
    //Ici vient le code pour afficher les objets
    // - On vide la gallery avec InnerHTML (voir cours OC)
    // - On filtre la liste works
    //- On affiche, à l'aide d'une boucle for, la liste filtrée
}


// Je crée une variable qui est ma liste works filtrée ;   point: je veux ; filter est une boucle cachée
let works_filtres = works.filter(function(work){return work.categoryId == 3})
console.log(works_filtres)

