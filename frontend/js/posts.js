//récupération de la chaine de requette dans l'url
const queryString_url_id = window.location.search;
const urlSearchParams = new URLSearchParams(queryString_url_id);
/*----------------------------------Afin d'extraire l'id----------------------------------*/
const id = urlSearchParams.get("id");
/*----------------------------------Apppel avec l'id en paramètre----------------------------------*/
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
                    <h4>Titre du message: ${message.title}</h4>
                    <div class="description">
                        <p>Contenu du Message: ${message.content}</p>
                    </div>
                </div>
            </div>`;

    //selection du btn
    /*Ajouter un commentaire*/
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
      //location.reload();
    })
    .catch((error) => {
      card.innerHTML = `<div class = container_error>
      <p>l'erreur suivante a été remontée : ${error}</p>
    </div>`;
    });
});
});
fetch(`http://localhost:3000/api/message/${id}`, 
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
   
    <div class= "allComment">
    <div class="cardComment">
            <div class="comment" id="${comment.id}">
            <h2>Titre: ${comment.title}</h2>
                <p>Corps du commentaire: ${comment.content}</p>
                <button class="deleteComment"> Supprimer votre commentaire</button>
            </div>` }})