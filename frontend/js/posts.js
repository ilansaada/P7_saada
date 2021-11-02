/*-------------------------------------------fonction qui supprime un commentaire--------------------------------*/
function deleteComment(commentId) {
  fetch(`http://localhost:3000/api/comment/${commentId}`, {
    method: "DELETE",
    headers: {'Accept': 'application/json',
    'Content-Type':'application/json',
    'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem("user")).token,},
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

//------------------------------------récupération de la chaine de requette dans l'url pour récup un message-------------------------------------------
const queryString_url_id = window.location.search;
const urlSearchParams = new URLSearchParams(queryString_url_id);
const card = document.querySelector(".card")
/*----------------------------------Afin d'extraire l'id----------------------------------*/
const id = urlSearchParams.get("id");
/*----------------------------------récuperation du message avec l'id en paramètre----------------------------------*/
fetch(`http://localhost:3000/api/message/${id}`, 
{
    method: "GET",
    headers: {'Accept': 'application/json',
    'Content-Type':'application/json',
    'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem("user")).token,},
  })

  .then((data) => data.json())
  .then((message) => {
    document.querySelector(".container").innerHTML += `<div class="cardMessage">
                <div class="details">
                    <h2>${message.title}</h2>
                    <div class="description">
                        <p>${message.content}</p>
                    </div>
                </div>
            </div>`;

    //-----------------------------------------Ajouter un commentaire-----------------------------------------
  const btnAddComment = document.querySelector(".btnAddComment")
  btnAddComment.addEventListener("click", (event) => {
  event.preventDefault();
  
  /*récuperer la valeur de l'input*/ 
  const addComment = document.querySelector(".addComment")
  const UserId = JSON.parse(sessionStorage.getItem("user")).userId;

  fetch(`http://localhost:3000/api/comment/`, {
    method: "POST",
    body: JSON.stringify(
      {
      userId:UserId,
      content: addComment.value
      }
    ),
    headers: {'Accept': 'application/json',
    'Content-Type':'application/json',
    'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem("user")).token,},
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
});
//---------------------------------------Afficher le commentaire  --------------------------------------------------------------------
fetch(`http://localhost:3000/api/comment/`, 
{headers:  
  {
    'Accept': 'application/json',
    'Content-Type':'application/json',
    'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem("user")).token
  }
})

.then((data) => data.json())
.then((jsonListComment) => {
  for (let jsonComment of jsonListComment) {
    let comment = new Comment(jsonComment);
    card.innerHTML += `
 
  <div class= "allComments">
    <div class="cardComments">
      <div class="comment" id="${comment.id}">
        <p>${comment.content}</p>
        <button class="deleteComment">supprimer votre comment</button>
      </div>
    </div>
  </div>`}
 //----------------------Supprimer un commentaire---------------
 const BtnDeleteComment = document.querySelector(".deleteComment");
 BtnDeleteComment.addEventListener("click", (event) => {
   event.preventDefault();
   /*récuperation de l'element séléctionné*/
   deleteComment(BtnDeleteComment.parentNode.getAttribute("id"));
 });
})
.catch(() => {
 
    card.innerHTML = `<div class = container_error>
    <p>Pas de commentaire pour l'instant n'hésitez pas à etre le premier:</p>
  </div>`;
  });

  
  
 