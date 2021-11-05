const UserId = JSON.parse(sessionStorage.getItem("user")).userId;
const header = {
  'Accept': 'application/json',
  'Content-Type':'application/json',
  'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem("user")).token,
}
/*-------------------------------------------fonction qui supprime un message--------------------------------*/
function deleteMessage(messageId) {
  fetch(`http://localhost:3000/api/message/${messageId}`, {
    method: "DELETE",
    headers: header,
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
fetch("http://localhost:3000/api/message",
{headers:header},
)

  .then((data) => data.json())
  .then((jsonListMessage) => {
    for (let jsonMessage of jsonListMessage) {
      let message = new Message(jsonMessage);
      card.innerHTML += `
   
    <div class= "allMessage">
    <div class="cardMessage">
            <div class="message" id="${message.id}">
            <a href="posts.html?id=${message.id}"><h2>${message.title}</h2></a>
                <p>${message.content}</p>
                <button class="deleteMessage">supprimer votre message</button>
            </div>
            </div>
    </div>`;
      /*----------------------------------------supprimer les messages---------------------------------------------*/

      const BtnDeleteMessage = document.querySelector(".deleteMessage");
      if (UserId == message.userId || UserId == 1) {
        //  block of code to be executed if the condition is true
       BtnDeleteMessage.addEventListener("click", (event) => {
        event.preventDefault();
        /*récuperation de l'element séléctionné*/
        deleteMessage(BtnDeleteMessage.parentNode.getAttribute("id"));
      });
    }else{
      BtnDeleteMessage.addEventListener("click", (event) => {
       window.alert("vous n'etes pas autorisé à supprimer ce message"); 
      }
      
      )}}
    
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
    headers: header,
  })
    .then(() => {
      location.reload();
    })
    .catch((error) => {
      card.innerHTML = `<div class = container_error>
      <p>l'erreur suivante a été remontée : ${error}</p>
    </div>`;
    });
});


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
