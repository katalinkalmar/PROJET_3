// Je fais un bouton de tous;  Ici viendra le code pour le bouton tous
// Je relie le btn1 à la fonction funcFiltrer1
let btn1 = document.getElementById("tous");
btn1.addEventListener("click", funcFiltrer1);
function funcFiltrer1() {
    console.log("bouton_tous")
    // Ici vient le code pour afficher tous les travaux (works)
    // - On vide la gallery avec InnerHTML (voir cours OC)
    gallery.innerHTML = "";
    //- On affiche, la liste complète, à l'aide de la fonction Afficher_Liste
    Afficher_Liste(works)
}

// On répète les mêmes étapes que pour le btn1
// Je fais des console.log pour vérifier que la fonction fonctionne

let btn2 = document.getElementById("objets");
btn2.addEventListener("click", funcFiltrer2);
function funcFiltrer2() {
    console.log("bouton_objet")
    
    // - On vide la gallery avec InnerHTML (voir cours Mettre à jour l'affichage de la page web OC)
    gallery.innerHTML = "";
    // - On filtre la liste works
    // Je crée une letiable qui est ma liste works filtrée ;         
    //Ceci est l'utilisation de la fonction filter pour trier la liste works

    let works_filtres = works.filter(function (work) {
        return work.categoryId == 1
    })
    //- On affiche, la liste complète, à l'aide de la fonction Afficher_Liste
    Afficher_Liste(works_filtres)
}

let btn3 = document.getElementById("appartements");
btn3.addEventListener("click", funcFiltrer3);
function funcFiltrer3() {
    console.log("bouton_objet")
    //Ici vient le code pour afficher les objets
    // - On vide la gallery avec InnerHTML (voir cours Mettre à jour l'affichage de la page web OC)
    gallery.innerHTML = "";
    // - On filtre la liste works
    // Je crée une letiable qui est ma liste works filtrée ;         
    //Ceci est l'utilisation de la fonction filter pour trier la liste works

    let works_filtres = works.filter(function (work) {
        return work.categoryId == 2
    })
    //- On affiche, à l'aide d'une boucle for, la liste filtrée
    Afficher_Liste(works_filtres)
}

let btn4 = document.getElementById("hotels-et-restaurants");

btn4.addEventListener("click", funcFiltrer4);

function funcFiltrer4() {
    console.log("bouton_objet")
    //Ici vient le code pour afficher les objets
    // - On vide la gallery avec InnerHTML (voir cours Mettre à jour l'affichage de la page web OC)
    gallery.innerHTML = "";
    // - On filtre la liste works
    // Je crée une letiable qui est ma liste works filtrée ;         
    //Ceci est l'utilisation de la fonction filter pour trier la liste works

    let works_filtres = works.filter(function (work) { return work.categoryId == 3 })
    //- On affiche, à l'aide d'une boucle for, la liste filtrée
    Afficher_Liste(works_filtres)
}
