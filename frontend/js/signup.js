//appel à l'API fetch avec la méthode globale fetch() afin de récupérer des ressources à travers le réseau de manière asynchrone.
/*-----------------------------------ecouter le btn envoyer formulaire-----------------------------------*/
const btnEnvoyerFormulaire = document.querySelector("#envoyer_formulaire");
btnEnvoyerFormulaire.addEventListener("click", (event) => {
  event.preventDefault();
  //recuperation des valeurs du formulaire
  const valeursForm = {
    password: document.querySelector("#exampleInputPassword1").value,
    email: document.querySelector("#exampleInputEmail1").value,
  };
  console.log(valeursForm)

  /*-----------------------------------validation du form-----------------------------------*/
 
  /*----------------------------------- si le formulaire est bon le mettre dans le session storage-----------------------------------*/

    /*-----------------------------------envoi vers le server-----------------------------------*/
    const formulaire = document.querySelector(".formulaire");
    const alertMessagesContainer = document.querySelector('#alert_messages');

fetch("http://localhost:3000/api/user/signup", {
    method: "POST",
    body: JSON.stringify({email: valeursForm.email, password: valeursForm.password}),
    headers: { "Content-Type" : "application/json"}
})
.then((data) => data.json())
.then((data) => {
    if(data.error.errors.length > 0){
        data.error.errors.forEach((error) => {
            alertMessagesContainer.innerHTML = `<div class="alert alert-danger" role="alert">
    une erreur s'est produite mais : ${JSON.stringify(error.message)}
    </div>`;
        });
    } else {
        alertMessagesContainer.innerHTML = `<div class="alert alert-success" role="alert">
    Compte bien créé !
    </div>    `;
        window.location = "echanges.html";
    }

})
.catch((error) => {
    formulaire.innerHTML = `<div class="alert alert-danger" role="alert">
    une erreur s'est produite ok : ${error}
    </div>`;
});
});