//appel à l'API fetch avec la méthode globale fetch() afin de récupérer des ressources à travers le réseau de manière asynchrone.
/*-----------------------------------ecouter le btn envoyer formulaire-----------------------------------*/
const message = document.querySelector('.message');
const btnEnvoyerFormulaire = document.querySelector("#envoyer_formulaire");
btnEnvoyerFormulaire.addEventListener("click", (event) => {
  event.preventDefault();
  //recuperation des valeurs du formulaire
  const user = {
    password: document.querySelector("#exampleInputPassword1").value,
    email: document.querySelector("#exampleInputEmail1").value,
};


const formulaire = document.querySelector(".formulaire");
const alertMessagesContainer = document.querySelector('#alert_messages');


fetch("http://localhost:3000/api/user/login", {
    method: "POST",
    body: JSON.stringify({email: user.email, password: user.password}),
    headers: { "Content-Type" : "application/json"}
})
.then((data) => data.json())
.then((data) => {
    console.log(JSON.stringify(data));
    if(data != undefined) {
        if (data.error) {
            data.error.errors.forEach((error) => {
                alertMessagesContainer.innerHTML = `<div class="alert alert-danger" role="alert">
    une erreur s'est produite : ${JSON.stringify(error.message)}
    </div>`;
            });
        } else {
          sessionStorage.setItem("user", JSON.stringify(data));
    //         message.innerHTML = `<div class="alert alert-success" role="alert">
    // Session créée !
    // </div>    `;
            window.location = "echanges.html";
        }
    }
}).catch((error) => {
    message.innerHTML = `<div class="alert alert-danger" role="alert">
    une erreur s'est produite : ${JSON.stringify('email/mt de passe incorrect')}
    </div>`;
})})