const card = document.querySelector(".card");
fetch("http://localhost:3000/api/message")
  .then((data) => data.json())
  .then((jsonListMessage) => {
    for (let jsonMessage of jsonListMessage) {
      let message = new Message(jsonMessage);
      card.innerHTML += `
   
    <div class= "allMessage">
        <div class="cardMessage">
            <div class="message">
                <h2>Titre: ${message.title}</h4>
                <p>Corps du message: ${message.content}</p>
                <div class="btn">
                    <button class="deleteMessage">supprimer votre message</button>
                </div>
            </div>
            <div class="commentaires">
                <input  placeholder=" commentaire ">  </input>
                <button class="addComment">Ajouter un commentaire</button>
            </div>
        </div>
    </div>
          `;
    }
  })
  .catch((error) => {
    card.innerHTML = `<div class = container_error>
      <p>l'erreur suivante a été remontée : ${error}</p>
    </div>`;
  });

  /*const btnDeleteMessage = document.querySelector(".deleteMessage");
  btnDeleteMessage.addEventListener("click", (event) => {
  event.preventDefault();*/
