//appel à l'API fetch avec la méthode globale fetch() afin de récupérer des ressources à travers le réseau de manière asynchrone.
/*-----------------------------------ecouter le btn envoyer formulaire-----------------------------------*/
const btnEnvoyerFormulaire = document.querySelector("#envoyer_formulaire");
const formulaire = document.querySelector(".formulaire");
const alertMessagesContainer = document.querySelector('#alert_messages');

btnEnvoyerFormulaire.addEventListener("click", (event) => {
  event.preventDefault();
  //recuperation des valeurs du formulaire
  const user = {
    password: document.querySelector("#Password").value,
    email: document.querySelector("#Email").value,
};
  /*-----------------------------------validation du form-----------------------------------*/

  function controlEmail() {
      return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(user.email);
  }

  // function controlPassword() {
  //       // controle de la validation de l'email avec RegExs.
  //     return isValid('/', user.password);
  // }
  /*----------------------------------- si le formulaire est bon le mettre dans le local storage-----------------------------------*/
  if (controlEmail()) {// && controlPassword()
    sessionStorage.setItem("user", JSON.stringify(user));
    fetch("http://localhost:3000/api/user/signup", {
        method: "POST",
        body: JSON.stringify({email: user.email, password: user.password}),
        headers: { "Content-Type" : "application/json"}
    })
    .then((data) => data.json())
    .then((data) => {
        if(data != undefined) {
            if (data.error) {
                data.error.errors.forEach((error) => {
                    alertMessagesContainer.innerHTML = `<div class="alert alert-danger" role="alert">
        une erreur s'est produite : ${JSON.stringify(error.message)}
        </div>`;
                });
            } else {
                window.location = "login.html";
            }
        }
    })
    .catch((error) => {
        formulaire.innerHTML = `<div class="alert alert-danger" role="alert">
        une erreur s'est produite : ${JSON.stringify(error.message)}
        </div>`;
  })} else {
    alertMessagesContainer.innerHTML = `<div class="alert alert-danger" role="alert">
    une erreur s'est produite : l'email ou le mot de passe fourni n'est pas conforme 
    </div>`;
  }});