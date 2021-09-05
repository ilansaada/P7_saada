//Récupérer les infos de mon utilisateur que j'ai en session
// Actions:
//> suppression du compte DELETE /user/id
// > modifier ton utilisateur PUT /user/id
const informationClient = JSON.parse(
  sessionStorage.getItem("valeursForm")
);
const structurinformationsClient = `
    <div class="infos">
        <h1>Mon profil: ${informationClient}</h1>
        <input  placeholder="nouvel email">  </input>
        <button class="modify">Modifier</button>
        <button class="delete">Suppression</button> 
    </div>`;
const positionInformationClient = document.querySelector(".profil");
positionInformationClient.insertAdjacentHTML(
  "afterbegin",
  structurinformationsClient
);

//updateProfile.addEventListener(('click') => {
//fetch
//fetch('http://localhost:3000/api/user/${userId}')//update
// body : {email: la valeur de mon input email}
//});

//deleteUser.addEventListener()
// un bouton "supprimer le compte" >>> en rouge
