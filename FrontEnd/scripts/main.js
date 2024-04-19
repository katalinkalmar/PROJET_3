//===récupération des travaux depuis le back-end

// On stocke la réponse du serveur après lui avoir demandé les travaux//
const reponse = await fetch("http://localhost:5678/api/works");
//On récupère la liste des travaux à partir de la réponse du site
let works = await reponse.json();


// On récupère la div qui contiendra les différents travaux
const gallery = document.querySelector(".gallery");
// Ceci est la fonction Afficher_Liste qui sert à afficher tous les éléments d'une liste
function Afficher_Liste(liste) {
    // - On vide la gallery avec InnerHTML avant d'afficher les nouveaux éléments
    gallery.innerHTML = "";

    for (let i = 0; i < liste.length; i++) {
        // On crée une variable  contenant le premier élément des travaux
        let work = liste[i];

        //Je crée un élément figure, puis img, puis figcaption
        const figureElement = document.createElement("figure");
        const imageElement = document.createElement("img");
        const nomElement = document.createElement("figcaption");

        //Configuration des différents éléments
        // Je configure l'attribut src de l'image avec l'URL du work à afficher
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
Afficher_Liste(works);




//===réalisation du filtre des travaux

//J'enregistre la réponse du serveur lorsque je lui demande les catégories
const reponse_categorie = await fetch("http://localhost:5678/api/categories")
// Je stocke dans une constante la liste des catégories des works
const categories = await reponse_categorie.json()
// On récupère l'emplacement des boutons
const ListeBoutons = document.getElementById("liste-de-boutons");


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
    // le bouton cliqué devient le nouveau "dernier bouton actif"
    dernier_bouton_actif = boutonElement;

    boutonElement.style.backgroundColor = "#1D6154";
    boutonElement.style.color = "white";

    //- On affiche, la liste complète
    Afficher_Liste(works);
});

// On incorpore le bouton dans la balise liste-des-boutons
ListeBoutons.appendChild(boutonElement);
let dernier_bouton_actif = boutonElement;
boutonElement.style.backgroundColor = "#1D6154";
boutonElement.style.color = "white";

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

// Par la suite je vais relier les boutons créés de manière dynamique à une fonction qui trie et affiche les travaux par catégorie
function funcFiltrer(categorie) {
    //Ici vient le code pour afficher les objets

    // - On filtre la liste works
    // Je crée une variable qui est ma liste works filtrée ;         

    //Ceci est l'utilisation de la fonction filter pour trier la liste works, la fonction va chercher la catégorie demandée.
    let works_filtres = works.filter(function (work) { return work.categoryId == categorie });

    //- On affiche, à l'aide d'une boucle for, la liste filtrée
    Afficher_Liste(works_filtres);
}


//===Authentification de l'utilisateur

//bouton login/logout
const loginButton = document.getElementById("login-button");

//on récupère le token de l'utilisateur
const token = window.localStorage.getItem("token")
//on regarde si l'utilisateur est authentifié
if (token === null) {
    // parcours utilisateur non authentifié
    loginButton.addEventListener("click", loginFunction)
    const bandeau = document.querySelector(".bandeau")
    bandeau.style.display = "none"

} else {
    // parcours utilisateur authentifié   
    loginButton.innerText = "logout"
    loginButton.addEventListener("click", logoutFunction)

    const bouton_outil = document.querySelector(".js-modal")
    bouton_outil.style.display = "inline-block"
    bouton_outil.addEventListener('click', openModal);

    ListeBoutons.style.display = "none"
}

function logoutFunction() {
    window.localStorage.removeItem("token")
    window.location.reload()
}
function loginFunction() { window.location.href = "login_page.html" }




//===ajout de la fenêtre modal


// cette variable nous permet de savoir si la modale est présente ou non
let modal = null;

// fonction utilisée pour ouvrir la modale
function openModal(e) {
    e.preventDefault();

    // on récupère l'élément html correspondant à la modale
    modal = document.querySelector("#modal");

    // on enlève le display="none" de la modale en le remplacant par null
    // ceci pour afficher la modale
    modal.style.display = null;

    modal.removeAttribute('aria-hidden');
    modal.setAttribute('aria-modal', 'true');

    // on relie les différents boutons de la modale à leur fonction
    modal.addEventListener('click', closeModal);
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal);
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation);

    Afficher_Liste_modal(works);
}

// fonction utilisée pour fermer la modale
const closeModal = function (e) {
    // test avec if pour savoir si une modale est déjà ouverte
    if (modal === null) return;
    e.preventDefault();

    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal');

    // on coupe les liasions des différents boutons de la modale à leur fonction
    modal.removeEventListener('click', closeModal);
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal);
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation);
    
    
    const hideModal = function () {
        // on cache la modale
        modal.style.display = "none";
        modal.removeEventListener('animationend', hideModal);
        // on efface la variavle modal pour dire qu'il n'y a plus de modale à l'écran
        modal = null;
    };
    modal.addEventListener('animationend', hideModal);
};

function stopPropagation(e) { e.stopPropagation(); }

// bouton permettant de passer de la galerie au formulaire
const nextButtonModal = document.querySelector(".js-modal-next")
// bouton permettant de passer du formulaire à la galerie
const returnButtonModal = document.querySelector(".js-modal-return")


const modalGalery = document.querySelector(".js-modal-gallery")
const modalForm = document.querySelector(".js-modal-form")

// on cache le formulaire
modalForm.style.display = "none"
// on cache le bouton le retour quand on est dans la gallerie
returnButtonModal.style.opacity = 0

// le bouton next qui permet ajouter une photo fait disparaitre la galerie pour faire apparaitre le formulaire
nextButtonModal.addEventListener("click", function () {
    // on cache la galerie
    modalGalery.style.display = "none"
    // on affiche le formulaire
    modalForm.style.display = "flex"
    // on fait apparaitre le bouton pour retourner en arrière
    returnButtonModal.style.opacity = 1
})

// le bouton return qui permet de passer du formulaire à la galerie
returnButtonModal.addEventListener("click", function () {
    // on affiche la galerie
    modalGalery.style.display = "flex"
    // on cache le formulaire
    modalForm.style.display = "none"
    // on cache le bouton return
    returnButtonModal.style.opacity = 0
})

function Afficher_Liste_modal(liste) {
    /* on récupère la div modal-content*/
    let modal_content = document.getElementById("modal-content");

    // - On vide la gallery avec InnerHTML avant d'afficher les nouveaux éléments
    modal_content.innerHTML = "";

    let work = null
    for (let i = 0; i < liste.length; i++) {
        // On crée une variable contenant les travaux
        work = liste[i];

        // on crée un bouton
        const button_element = document.createElement("button");
        // on rajoute la class CSS
        button_element.classList.add("modal-card");
        // on définit une fonction anonyme pour chacun des boutons qui appele la fonction pour supprimer les projets
        button_element.addEventListener("click", function () { delete_work(work.id) });


        // on met les images des projets
        const img_element = document.createElement("img");
        img_element.classList.add("modal-card-img");
        img_element.src = work.imageUrl;
        button_element.appendChild(img_element);


        // on met les images des poubelles
        const trash_element = document.createElement("img");
        trash_element.classList.add("modal-card-trash");
        trash_element.src = "./assets/icons/trash.svg";
        button_element.appendChild(trash_element);


        // Dans ma gallery je rajoute un enfant qui est button_element
        modal_content.appendChild(button_element);
    }
}

//=== suppression des travaux existants

function delete_work(id) {
    console.log(id);

    /* D'après le swagger on rajoute le token dans le header*/
    fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
    }).then(function (result) {
        if (result.ok) {
            //suppression du travail dans le html  
            // on filtre notre liste works en retirant celui qui a été supprimé sur le serveur
            works = works.filter(function (work) {
                return work.id !== id
            })
            // on réactualise l'affichage avec la nouvelle liste
            Afficher_Liste(works);
            Afficher_Liste_modal(works);

        } else {
            throw new Error(result.status)
        }

    }).catch(
        //affichage de l'erreur
        (error) => {
            console.log(error)

        }
    )
};

//===envoi d'un nouveau projet au back-end

//On récupère le formulaire pour l'envoi de fichier
const form = document.getElementById("js-modal-form");

form.addEventListener("submit", (event) => {
    event.preventDefault()
    // On stocke les données du formulaire en format FormData   
    const formData = new FormData(form);


    fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData
    }).then(function (reponse) {
        if (reponse.ok) {
            //on formate la réponse en format lisible
            const result = reponse.json();
            result.then(function (work) {
                console.log(work);
                // on rajoute le travail retourné par le serveur à notre liste de work
                works.push(work);
                Afficher_Liste(works);
                Afficher_Liste_modal(works);
            })
        } else {
            throw new Error(reponse.status)
        }

    }).catch((error) => { console.log(error) })

});


// Remplissage du menu déroulant des catégories pour l'ajout de projets dans la modale
const categorieElement = form.querySelector("select");
for (let i = 0; i < categories.length; i++) {
    let optionElement = document.createElement("option");
    optionElement.value = categories[i].id;
    optionElement.innerText = categories[i].name;
    categorieElement.appendChild(optionElement);
}

//Ici vient le code pour l'image de la prévisualisation ajout photo dans modale
const ajout_img = document.querySelector(".ajouter-image")
const preview_img = document.querySelector(".form-image-preview")
const input_img = document.getElementById("input-image")

let image_modale_element = document.createElement("img")
preview_img.appendChild(image_modale_element)

//lorsque l'utilisateur sélectionne une image on appelle la fonction update_image
input_img.addEventListener("change", update_img)

function update_img() {
    // on vérifie qu'il y ait au moins un fichier sélectionné
    if (input_img.files.length !== 0) {
        //on récupère l'image qui est le premier élément de la liste file
        let file = input_img.files[0]

        // si la taille de l'image est inf à 4 Mo
        if (file.size <= 4000000) {
            //on cache le bouton ajouter et on affiche le preview
            preview_img.style.display = "inline"
            ajout_img.style.display = "none"

            //d'après exemple MDN dans input file 
            // on ajoute l'image dans le src de la balise HTML
            image_modale_element.src = window.URL.createObjectURL(file)
        }
    }

    // on regarde si le formulaire est complet avec la fonction 
    update_form()
}

function update_form() {
    // on vérifie si le formulaire est complet

    if(form.reportValidity()){
        // si le formulaire est valide, on enlève disabled du bouton
        document.getElementById("js-modal-valider").disabled = false
    } else {
        // si le formulaire n'est pas valide, on met disabled sur le bouton
        document.getElementById("js-modal-valider").disabled = true
    }
}

// on demande que, à chaque changement, on vérifie si le formulaire est valide avec la fonction update_form
document.querySelector(".inputFileDiv input").addEventListener("change", update_form)
document.querySelector(".inputFileDiv select").addEventListener("change", update_form)