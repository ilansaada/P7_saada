//constructor est une méthode qui est utilisée pour créer et initialiser un objet lorsqu'on utilise le mot clé class.
class Comment{
    constructor(jsonComment){
    jsonComment && Object.assign(this,jsonComment)
}};