//constructor est une méthode qui est utilisée pour créer et initialiser un objet lorsqu'on utilise le mot clé class.
class Message{
    constructor(jsonMessage){
    jsonMessage && Object.assign(this,jsonMessage)
}};