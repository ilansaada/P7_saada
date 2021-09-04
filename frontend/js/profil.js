//Récupérer les infos de mon utilisateur que j'ai en session
// Actions:
//> suppression du compte DELETE /user/id
// > modifier ton utilisateur PUT /user/id
const informationClient = JSON.parse(
  sessionStorage.getItem("valeursForm[email]")
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

// générer un input dans lequel tu vas mettre l'email de ton utilisateur avec la possiblité de le changer
// un input vide dans lequel l'utilsiateur peut changer son mot de passe
//form.innerHTML =+ '<input type="text" value="${User.email}}">'
// un bouton "sauvegarder" >> success
//updateProfile.addEventListener(('click') => {
//fetch
//fetch('http://localhost:3000/api/user/${userId}')//update
// body : {email: la valeur de mon input email}
//});

//deleteUser.addEventListener()
// un bouton "supprimer le compte" >>> en rouge
