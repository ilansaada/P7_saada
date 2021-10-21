const UserId = JSON.parse(sessionStorage.getItem("user")).userId;
/*-------------------------------------------fonction qui supprime un message--------------------------------*/
function deleteMessage(messageId) {
  fetch(`http://localhost:3000/api/message/${messageId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  })
    .then(() => {
      location.reload();
    })
    .catch((error) => {
      alertMessagesContainer.innerHTML = `<div class="alert alert-danger" role="alert">
                                          une erreur s'est produite : ${JSON.stringify(
                                            error.message
                                          )}
                                      </div>`;
    });
}
/*----------------------------------------afficher les messages---------------------------------------------*/
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
                <input  class="comment" placeholder="commentaire">
                <button class="addComment">Ajouter un commentaire</button>
                <button class="deleteComment">supprimer votre commentaire</button>

                </div>
        </div>
    </div>`;
      /*----------------------------------------supprimer les messages---------------------------------------------*/

      const BtnDeleteMessage = document.querySelector(".deleteMessage");
      BtnDeleteMessage.addEventListener("click", (event) => {
        event.preventDefault();
        /*récuperation de l'element séléctionné*/
        deleteMessage(BtnDeleteMessage.parentNode.getAttribute("id"));
      });
    }
  })
  .catch((error) => {
    card.innerHTML = `<div class = container_error>
      <p>l'erreur suivante a été remontée : ${error}</p>
    </div>`;
  });

/*----------------------------------------------------Ajouter un message-------------------------------------*/
const btnAddMessage = document.querySelector(".addMessage");
btnAddMessage.addEventListener("click", (event) => {
  event.preventDefault();
  const title = document.querySelector("#title");
  const content = document.querySelector("#content");

  fetch(`http://localhost:3000/api/message/`, {
    method: "POST",
    body: JSON.stringify({
      UserId: UserId,
      title: title.value,
      content: content.value,
    }),
    headers: { "Content-Type": "application/json" },
  })
    .then(() => {
      location.reload();
    })
    .catch((error) => {
      error;
    });
});

/*Ajouter un commentaire
  const btnAddComment = recuperer le btn ajout d'un commentaire ;
  btnAddComment.addEventListener("click", (event) => {
  event.preventDefault();
  /*
  récuperer la valeur de l'input 
  const comment = document.querySelector(".comment")

  fetch(`http://localhost:3000/api/comment/`, {
    method: "POST",
    body: JSON.stringify(
      {
      UserId:UserId,
      comment: comment.value
      }
    ),
    headers: { "Content-Type": "application/json" },
  })
    .then(() => {
      location.reload();
    })
    .catch((error) => {
      error
    });
});*/

/*-------------------------------------------------Btn de deconnexion-------------------------------------*/
const btnDeconnexion = document.querySelector(".Deconnexion");
btnDeconnexion.addEventListener("click", (event) => {
  event.preventDefault();
  function SuppSessionStorage(key) {
    sessionStorage.removeItem(key);
  }
  SuppSessionStorage("user");
  window.location = "login.html";
});
