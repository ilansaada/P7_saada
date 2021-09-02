//appel à l'API fetch avec la méthode globale fetch() afin de récupérer des ressources à travers le réseau de manière asynchrone.
/*-----------------------------------ecouter le btn envoyer formulaire-----------------------------------*/
const btnEnvoyerFormulaire = document.querySelector("#envoyer_formulaire");
btnEnvoyerFormulaire.addEventListener("click", (Element) => {
  Element.preventDefault();
  //recuperation des valeurs du formulaire
  const valeursForm = {
    password: document.querySelector("#exampleInputPassword1").value,
    email: document.querySelector("#exampleInputEmail1").value,
  };
  console.log(valeursForm)

  /*-----------------------------------validation du form-----------------------------------*/
 
  /*----------------------------------- si le formulaire est bon le mettre dans le session storage-----------------------------------*/

    /*-----------------------------------envoi vers le server-----------------------------------*/
    const signupForm = document.querySelector("#signup");
    const formulaire = document.querySelector(".formulaire");
    
        let signupFormData = new FormData(signupForm);
        fetch("http://localhost:3000/api/user/signup", {
            method: "POST",
            body: signupFormData,
        })
        .then((data) => data.json())
        .then(() => {
            formulaire.innerHTML = `<div class="alert alert-success" role="alert">
            Compte bien créé !
            </div>    `;
            window.location = "echanges.html";
        })
        .catch((error) => {
            formulaire.innerHTML = `<div class="alert alert-danger" role="alert">
            une erreur s'est produite : ${error}
            </div>`;
        });
});


