// On stocke la réponse du serveur après lui avoir demandé les travaux//
const reponse = await fetch("http://localhost:5678/api/works");
//On récupère la liste des travaux à partir de la réponse du site
const data = await reponse.json();
console.log(data);
// On récupère la div qui contiendra les différents travaux
const gallery = document.querySelector(".gallery");
console.log(gallery);


for (let i = 0; i < data.length; i++) {
    // On crée une variable (constante) contenant le premier projet des travaux, data est la liste des travaux
    let work = data[i];
    //Je crée un élément figure, puis img, puis figcaption
    const figureElement = document.createElement("figure");
    const imageElement = document.createElement("img");
    const nomElement = document.createElement("figcaption");

    //Configuration des différents éléments
    // Je configure l'attribut src de l'image avec l'URL du projet à afficher
    imageElement.src = work.imageUrl;
    imageElement.alt = work.title;
    // Dans la balise nomElement je veux le innerText et je le définis par dans mon article le nom
    nomElement.innerText = work.title;

    //Dans ma gallery je rajoute un enfant qui est figureElement
    gallery.appendChild(figureElement);
    //On rajoute dans la figure la balise img et figcaption
    figureElement.appendChild(imageElement);
    figureElement.appendChild(nomElement);
}






