/*----------------------------------------logique metier---------------------------------------*/
const Message = require("../models/message");
const fs = require("fs");
const sequelize = require("../models");

/*----------------------------Export de la fonction createMessage pour la création d'un Message----------------------------*/

exports.createMessage = (req, res, next) => {
 sequelize.User.findOne({ where: { id: req.body.id} })
    .then((user) => {
      sequelize.Message.create({
        userId: req.body.id,
        content: req.body.content,
        title: req.body.title,
      })
        
        .then(() => res.status(201).json({ message: "Message créé !" }))
        
        .catch((error) => {
          res.status(400).json({ error: "erreur" });
        });
    })
    .catch((error) => res.status(500).json({ error: "erreur" }));
};

/*----------------------------Export de la fonction modifyMessage pour la modification d'un Message----------------------------*/

exports.modifyMessage = (req, res, next) => {
  
  sequelize.Message.updateOne(
  )
  .then(() => res.status(200).json({ message: "message modifié !" }))
  .catch((error) => res.status(404).json({ error }));
};
/*----------------------------Export de la fonction deleteMessage pour la suppression  d'un Message----------------------------*/

exports.deleteMessage = (req, res, next) => {
  sequelize.Message.findOne({ where: { id: req.body.id} })
    .then((message) => {
      const filename = message.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Message.destroy({ id: req.params.id })
          .then(() => res.status(200).json({ message: "message supprimé !" }))
          .catch((error) => res.status(404).json({ error }));
      });
    })
    .catch((error) => res.status(404).json({ error }));
};
/*----------------------------Export de la fonction getOneMessage pour la récupération d'un Message----------------------------*/

exports.getOneMessage = (req, res, next) => {
  sequelize.Message.findOne({ id: req.params.id })
    .then((message) => res.status(200).json(message))
    .catch((error) => res.status(404).json({ error }));
};
/*----------------------------Export de la fonction getAllMessage pour la récupération de Message----------------------------*/

exports.getAllMessage = (req, res, next) => {
  sequelize.Message.findAll()
    .then((message) => res.status(200).json(message))
    .catch((error) => res.status(400).json({ error }));
};
