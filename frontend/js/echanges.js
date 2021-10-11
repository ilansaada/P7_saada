const UserId = JSON.parse(sessionStorage.getItem("user")).userId;
console.log(UserId)
function deleteMessage(messageId){
  fetch(`http://localhost:3000/api/message/${messageId}`, {
    method: "DELETE",
    body: JSON.stringify(
      {id:messageId}
      ),
    headers: { "Content-Type": "application/json" },
  })
    .then(() => {
     
    })
    .catch((error) => {
      alertMessagesContainer.innerHTML = `<div class="alert alert-danger" role="alert">
                                          une erreur s'est produite : ${JSON.stringify(
                                            error.message
                                          )}
                                      </div>`;
    });

}
const card = document.querySelector(".card");
fetch("http://localhost:3000/api/message")
  .then((data) => data.json())
  .then((jsonListMessage) => {
    for (let jsonMessage of jsonListMessage) {
      let message = new Message(jsonMessage);
      card.innerHTML += `
   
    <div class= "allMessage">
        <div class="cardMessage">
            <div class="message" id="${message.id}">
                <h2>Titre: ${message.title}</h4>
                <p>Corps du message: ${message.content}</p>
                <button class="deleteMessage">supprimer votre message</button>
            </div>
            <div class="commentaires">
                <input  placeholder="commentaire">
                <button class="addComment">Ajouter un commentaire</button>
                <button class="deleteComment">supprimer votre commentaire</button>

                </div>
        </div>
    </div>`;
      const BtnDeleteMessage = document.querySelector(".deleteMessage");
      console.log(BtnDeleteMessage)
      BtnDeleteMessage.addEventListener("click", (event) => {
        event.preventDefault();
        deleteMessage()
        });
    }
  })
  .catch((error) => {
    card.innerHTML = `<div class = container_error>
      <p>l'erreur suivante a été remontée : ${error}</p>
    </div>`;
  });

/*Ajouter un message*/
  const btnAddMessage = document.querySelector(".addMessage");
  btnAddMessage.addEventListener("click", (event) => {
  event.preventDefault();
  const title = document.querySelector("#title")
  const content = document.querySelector("#content")

  fetch(`http://localhost:3000/api/message/`, {
    method: "POST",
    body: JSON.stringify(
      {
      UserId:UserId,
      title: title.value,
      content: content.value}
      ),
    headers: { "Content-Type": "application/json" },
  })
    .then(() => {
    })
    .catch((error) => {
      error
    });
});

/*Ajouter un commentaire
  const btnAddComment = document.querySelector(".addComment");
  btnAddComment.addEventListener("click", (event) => {
  event.preventDefault();
}*/

/*Btn de deconnexion*/
const btnDeconnexion = document.querySelector(".Deconnexion");
btnDeconnexion.addEventListener("click", (event) => {
  event.preventDefault();
  function SuppSessionStorage(key) {
    sessionStorage.removeItem(key);
  }
  SuppSessionStorage("user");
  window.location = "login.html";
});
