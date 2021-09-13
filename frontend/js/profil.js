//Récupérer les infos de mon utilisateur que j'ai en session
// Actions:
//> suppression du compte DELETE /user/id
// > modifier ton utilisateur PUT /user/id
const informationClient = JSON.parse(sessionStorage.getItem("user"));
const structurinformationsClient =
    `<div class="infos">
        <h1>Mon profil: ${informationClient.email}</h1>
        <form action="" method="PUT">
          <input id="email"  placeholder="nouvel email">  </input>
           <button id="updateEmail">Modifier</button>
        </form>
        <button class="deleteEmail">Suppression de votre compte </button> 
    </div>
    <div class="alertMessagesContainer">
    </div>`;


const positionInformationClient = document.querySelector(".profil");
positionInformationClient.insertAdjacentHTML(
    "afterbegin",
    structurinformationsClient
);


/**
 * Update EMAIL
 */
 const alertMessagesContainer = document.querySelector(".alertMessagesContainer");

const updateEmail = document.querySelector("#updateEmail"),
    email = document.querySelector('#email');
updateEmail.addEventListener("click", (event) => {
    event.preventDefault();
    fetch(`http://localhost:3000/api/user/${informationClient.userId}`, {
        method: "PUT",
        body: JSON.stringify({email: email.value}),
        headers: {"Content-Type": "application/json"}
    })
        .then(() => {
            location.reload();
            alertMessagesContainer.innerHTML = `<div class="alert alert-success" role="alert">
                                                Email bien modifié
                                            </div>`;
                                            sessionStorage.removeItem("user");
                                            window.location = "login.html";
        })
        .catch((error) => {
            alertMessagesContainer.innerHTML = `<div class="alert alert-danger" role="alert">
                                                une erreur s'est produite : ${JSON.stringify(error.message)}
                                            </div>`;
        });
});


const deleteEmail = document.querySelector(".deleteEmail");
deleteEmail.addEventListener("click", (event) => {
    event.preventDefault();
    fetch(`http://localhost:3000/api/user/${informationClient.userId}`, {
        method: "DELETE",
        body: JSON.stringify({email: email.value}),
        headers: {"Content-Type": "application/json"}
    })
        .then(() => {
            sessionStorage.removeItem("user");
            window.location = "signup.html";
        })
        .catch((error) => {
            alertMessagesContainer.innerHTML = `<div class="alert alert-danger" role="alert">
                                                une erreur s'est produite : ${JSON.stringify(error.message)}
                                            </div>`;
        });
});

/*Btn de deconnexion*/
const btnDeconnexion = document.querySelector(".Deconnexion");
btnDeconnexion.addEventListener("click", (event) => {
    event.preventDefault();

    function SuppSessionStorage(key) {
        sessionStorage.removeItem(key)
    }

    SuppSessionStorage("user");
    window.location = "login.html";


});