// On stocke la réponse du serveur après lui avoir demandé les travaux//
const reponse = await fetch("http://localhost:5678/api/works");
//On récupère la liste des travaux à partir de la réponse du site
const works = await reponse.json();
//J'enregistre la réponse du serveur lorsque je lui demande les catégories
const reponse_categorie = await fetch("http://localhost:5678/api/categories")
// Je stocke dans une constante la liste des catégories des works
const categories = await reponse_categorie.json()

// On récupère la div qui contiendra les différents travaux
const gallery = document.querySelector(".gallery");
// On récupère l'emplacement des boutons
const ListeBoutons = document.getElementById("liste-de-boutons");

//on récupère le token de l'utilisateur
const token = localStorage.getItem("token")

//on regarde si l'utilisateur est authentifié
if (token === null) {
    // parcours utilisateur non authentifié
} else {
    // parcours utilisateur authentifié   
}

// Maintenant on s'attaque aux boutons dynamiques.
// Création du bouton "Tous"
// On crée la balise input qui sont les boutons de la liste-de-boutons

const boutonElement = document.createElement("input");
//On rajoute les attributs id, value, type 
boutonElement.id = "Tous";
boutonElement.value = "Tous";
boutonElement.type = "button";

boutonElement.addEventListener("click", function () {
    dernier_bouton_actif.style.backgroundColor = "white";
    dernier_bouton_actif.style.color = "#1D6154";
    dernier_bouton_actif = boutonElement;

    boutonElement.style.backgroundColor = "#1D6154";
    boutonElement.style.color = "white"

    // - On vide la gallery avec InnerHTML (voir cours Mettre à jour l'affichage de la page web OC)
    gallery.innerHTML = "";

    //- On affiche, la liste complète
    Afficher_Liste(works)
});

// On incorpore le bouton dans la balise liste-des-boutons
ListeBoutons.appendChild(boutonElement);
let dernier_bouton_actif = boutonElement;
boutonElement.style.backgroundColor = "#1D6154";
boutonElement.style.color = "white"

// Création des boutons pour chaque catégorie
for (let i = 0; i < categories.length; i++) {
    let categorieActuelle = categories[i];
    let boutonElement = document.createElement("input");
    boutonElement.id = categorieActuelle.name;
    boutonElement.value = categorieActuelle.name;
    boutonElement.type = "button";
    boutonElement.addEventListener("click", function () {
        dernier_bouton_actif.style.backgroundColor = "white";
        dernier_bouton_actif.style.color = "#1D6154";
        dernier_bouton_actif = boutonElement;

        boutonElement.style.backgroundColor = "#1D6154";
        boutonElement.style.color = "white"
        funcFiltrer(categorieActuelle.id);

    });
    ListeBoutons.appendChild(boutonElement);
}


// Ceci est la fonction Afficher_Liste qui sert à afficher tous les éléments d'une liste
function Afficher_Liste(liste) {
    for (let i = 0; i < liste.length; i++) {
        // On crée une variable  contenant le premier élément des travaux

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

// On appelle la fonction Afficher_Liste avec comme paramètre works,
// pour afficher la liste complète des travaux lorsque l'utilisateur accède au site 

Afficher_Liste(works)

// Par la suite je vais relier les boutons créés de manière dynamique à une fonction qui trie et affiche les travaux
function funcFiltrer(categorie) {
    //Ici vient le code pour afficher les objets
    // - On vide la gallery avec InnerHTML (voir cours Mettre à jour l'affichage de la page web OC)
    gallery.innerHTML = "";
    // - On filtre la liste works
    // Je crée une variable qui est ma liste works filtrée ;         

    //Ceci est l'utilisation de la fonction filter pour trier la liste works
    let works_filtres = works.filter(function (work) { return work.categoryId == categorie })

    //- On affiche, à l'aide d'une boucle for, la liste filtrée
    Afficher_Liste(works_filtres)
}

// ----- code de la modale-----
let modal = null

let previouslyFocusedElement = null

const openModal = async function (e) {
    e.preventDefault()
    const target = e.target.getAttribute('href')

    modal = document.querySelector(target)

    previouslyFocusedElement = document.querySelector(':focus')
    modal.style.display = null

    modal.removeAttribute('aria-hidden')
    modal.setAttribute('aria-modal', 'true')
    modal.addEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)



    Afficher_Liste_modal(works)
}

const closeModal = function (e) {
    if (modal === null) return
    if (previouslyFocusedElement !== null) previouslyFocusedElement.focus()
    e.preventDefault()

    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
    const hideModal = function () {
        modal.style.display = "none"
        modal.removeEventListener('animationend', hideModal)
        modal = null
    }
    modal.addEventListener('animationend', hideModal)
}

const stopPropagation = function (e) { e.stopPropagation() }

document.querySelector('.js-modal').addEventListener('click', openModal)


function Afficher_Liste_modal(liste) {
    /* on récupère la div modal-content*/
    let modal_content = document.getElementById("modal-content");
    for (let i = 0; i < liste.length; i++) {
        // On crée une variable  contenant le premier élément des travaux
        let work = liste[i];

        const button_element = document.createElement("button");
        button_element.classList.add("modal-card");
        // on définit une fonction anonyme pour chacun des boutons
        button_element.addEventListener("click", function () { delete_work(work.id) })





        const img_element = document.createElement("img");
        img_element.classList.add("modal-card-img");
        img_element.src = work.imageUrl;
        button_element.appendChild(img_element)






        const trash_element = document.createElement("img");
        trash_element.classList.add("modal-card-trash");
        trash_element.src = "./assets/icons/trash.svg";
        button_element.appendChild(trash_element);


        //Dans ma gallery je rajoute un enfant qui est figureElement
        modal_content.appendChild(button_element);
    }
}


function delete_work(id) {
    console.log(id)
    /* D'après le swagger on rajoute le token dans le header*/
    fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
    })
}

//On récupère parmi les formularies celui qui s'appelle fileinfo
const form = document.forms.namedItem("fileinfo");

form.addEventListener("submit", (event) => {
    // On stocke les données du formulaire en format FormData   
    const formData = new FormData(form);

    const request = new XMLHttpRequest();
    request.open("POST", "http://localhost:5678/api/works",true);
    request.setRequestHeader("Authorization", `Bearer ${token}`);
    request.send(formData);
    event.preventDefault();
},
    false,
);

// Remplissage du select pour les catégories
const categorieElement = form.querySelector("select");
for (let i = 0; i < categories.length; i++) {
    let optionElement = document.createElement("option");
    optionElement.value = categories[i].id;
    optionElement.innerText = categories[i].name;
    categorieElement.appendChild(optionElement);
}
