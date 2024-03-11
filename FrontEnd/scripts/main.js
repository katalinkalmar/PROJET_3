// On stocke la réponse du serveur après lui avoir demandé les travaux//
const reponse = await fetch("http://localhost:5678/api/works");
//On récupère la liste des travaux à partir de la réponse du site
const works = await reponse.json();
console.log(works);
// On récupère la div qui contiendra les différents travaux
const gallery = document.querySelector(".gallery");



//J'enregistre la réponse du serveur lorsque je lui demande les catégories
const reponse_categorie = await fetch("http://localhost:5678/api/categories")
// Je stocke dans une constante la liste des catégories des works
const categories = await reponse_categorie.json()
console.log(categories)

// On récupère l'emplacement des boutons
const ListeBoutons = document.getElementById("liste-de-boutons");


// Création du bouton "Tous"
// On crée la balise input

const boutonElement = document.createElement("input");
//On rajoute les attributs id, value, type
boutonElement.id = "Tous";
boutonElement.value = "Tous";
boutonElement.type = "button";
// On incorpore le bouton dans la balise liste-des-boutons
ListeBoutons.appendChild(boutonElement);

// Création des boutons pour chaque catégorie
for (let i = 0; i < categories.length; i++) {
    let categorieActuelle = categories[i];
    let boutonElement = document.createElement("input");
    boutonElement.id = categorieActuelle.name;
    boutonElement.value = categorieActuelle.name;
    boutonElement.type = "button";
    ListeBoutons.appendChild(boutonElement);
}

// Je fais un bouton de tout;  Ici viendra le code pour le bouton tout
// Je relie le btn1 à la fonction à la fonction funcFiltrer1
var btn1 = document.getElementById("tous");
btn1.addEventListener("click", funcFiltrer1);
function funcFiltrer1() {
    console.log("bouton_tous")
    // Ici vient le code pour afficher tous les travaux (works)
    // - On vide la gallery avec InnerHTML (voir cours OC)
    gallery.innerHTML = "";
    //- On affiche, la liste complète, à l'aide de la fonction Afficher_Liste, 
    Afficher_Liste(works)
}

// On répète les mêmes étapes que bour le btn1

var btn2 = document.getElementById("objets");
btn2.addEventListener("click", funcFiltrer2);
function funcFiltrer2() {
    console.log("bouton_objet")
    //Ici vient le code pour afficher les objets
    // - On vide la gallery avec InnerHTML (voir cours Mettre à jour l'affichage de la page web OC)
    gallery.innerHTML = "";
    // - On filtre la liste works
    // Je crée une variable qui est ma liste works filtrée ;          point: je veux ; filter est une boucle cachée
    //Ceci est l'utilisation de la fonction filter pour trier la liste works

    let works_filtres = works.filter(function (work) { return work.categoryId == 1 })
    //- On affiche, à l'aide d'une boucle for, la liste filtrée
    Afficher_Liste(works_filtres)
}

var btn3 = document.getElementById("appartements");
btn3.addEventListener("click", funcFiltrer3);
function funcFiltrer3() {
    console.log("bouton_objet")
    //Ici vient le code pour afficher les objets
    // - On vide la gallery avec InnerHTML (voir cours Mettre à jour l'affichage de la page web OC)
    gallery.innerHTML = "";
    // - On filtre la liste works
    // Je crée une variable qui est ma liste works filtrée ;          point: je veux ; filter est une boucle cachée
    //Ceci est l'utilisation de la fonction filter pour trier la liste works

    let works_filtres = works.filter(function (work) { return work.categoryId == 2 })
    //- On affiche, à l'aide d'une boucle for, la liste filtrée
    Afficher_Liste(works_filtres)
}

var btn4 = document.getElementById("hotels-et-restaurants");
btn4.addEventListener("click", funcFiltrer4);
function funcFiltrer4() {
    console.log("bouton_objet")
    //Ici vient le code pour afficher les objets
    // - On vide la gallery avec InnerHTML (voir cours Mettre à jour l'affichage de la page web OC)
    gallery.innerHTML = "";
    // - On filtre la liste works
    // Je crée une variable qui est ma liste works filtrée ;          point: je veux ; filter est une boucle cachée
    //Ceci est l'utilisation de la fonction filter pour trier la liste works

    let works_filtres = works.filter(function (work) { return work.categoryId == 3 })
    //- On affiche, à l'aide d'une boucle for, la liste filtrée
    Afficher_Liste(works_filtres)
}




// Ceci est la fonction Afficher_Liste qui sert à afficher tous les éléments d'une liste
function Afficher_Liste(liste) {
    for (let i = 0; i < liste.length; i++) {
        // On crée une variable (constante) contenant le premier projet des travaux, works est la liste des works
        let work = liste[i];
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
}

// On appoelle la fonction Afficher_Liste avec comme paramètre works pour afficher la liste complète des travaux lorsque l'utilisateur accède au site 
Afficher_Liste(works)

// Par la suite je vais relier les boutons créés de manière dynamique à une fonction qui trie et affiche les travaux