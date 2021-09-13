//Récupérer les infos de mon utilisateur que j'ai en session
// Actions:
//> suppression du compte DELETE /user/id
// > modifier ton utilisateur PUT /user/id
const informationClient = JSON.parse(
  sessionStorage.getItem("user")
);
const structurinformationsClient = `
    <div class="infos">
        <h1>Mon profil: ${informationClient}</h1>
        <input  placeholder="nouvel email">  </input>
        <button id="updateEmail">Modifier</button>
        <button class="deleteEmail">Suppression</button> 
    </div>`;
const positionInformationClient = document.querySelector(".profil");
positionInformationClient.insertAdjacentHTML(
  "afterbegin",
  structurinformationsClient
);

/*const updateEmail = document.querySelector("#updateEmail");
updateEmail.addEventListener("click", (event) => {
  event.preventDefault();
  fetch("http://localhost:3000/api/user"/*mettre l'id, {
    method: "PUT",
    body: JSON.stringify({email: imput.value}),
    headers: { "Content-Type" : "application/json"}
})    


const deleteEmail = document.querySelector("#deleteEmail");
deleteEmail.addEventListener("click", (event) => {
  event.preventDefault();
  fetch("http://localhost:3000/api/user"/*mettre l'id, {
    method: "DELETE",
    body: JSON.stringify({email: imput.value}),
    headers: { "Content-Type" : "application/json"}
})   
*/
/*Btn de deconnexion*/
const btnDeconnexion = document.querySelector(".Deconnexion");
btnDeconnexion.addEventListener("click", (event) => {
  event.preventDefault();
  function SuppSessionStorage(key){
    sessionStorage.removeItem(key)
}
SuppSessionStorage("user");
window.location = "login.html";

    
});