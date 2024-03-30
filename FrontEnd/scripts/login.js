// Je récupère les paramètres

const form = document.querySelector('form');
const box = document.querySelector('.loginbox');
// Je soumets le formulaire
form.addEventListener("submit", async function (event) {

    // On empêche le comportement par défaut
    event.preventDefault();
    console.log("Il n’y a pas eu de rechargement de page");

    // On récupère les deux inputs, on récupère leur valeur avec le ".value" et on les affiche

    const email = document.getElementById("email").value;
    const mdp = document.getElementById("mdp").value;

    console.log(email);
    console.log(mdp);

    //on structure les informations dans un format JSON, tel que c'est demandé dans le Swagger
    const login_info = {
        email: email,
        password: mdp

    };
    // Création de la charge utile au format JSON
    const chargeUtile = JSON.stringify(login_info);

    // Je me connecte au serveur 

    //try:je prévois une erreur et je mets en place de quoi l'intercepter

    try {
        // body: ce que j'envoie au serveur, chargeUtile est une variable, la version string de login_info
        let reponse_login = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: chargeUtile
        });

        if (reponse_login.ok) {
            let login_token = await reponse_login.json();

            console.log(login_token);
            let token = login_token.token;
            window.localStorage.setItem("token", token);
            // Redirection vers la page principale  
            window.location.href = "index.html";
        } else {

            throw new Error(reponse_login.status);
        }

        // en cas d'erreur intercepté dans le try, j'exécute le code suivant:
    } catch (error) {
        //je préviens le développeur
        console.log("identification erronnée");

        //je préviens l'utilisateur
        const error_element = document.createElement("h3");
        error_element.innerText = "Identification erronnée"
        box.appendChild(error_element)

    }


});

