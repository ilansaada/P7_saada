/*----------------------------------------logique metier---------------------------------------*/
const Message = require("../models/message");
const fs = require("fs");
const sequelize = require("../models");

/*----------------------------Export de la fonction createMessage pour la création d'un Message----------------------------*/

exports.createMessage = (req, res, next) => {
  const message = {
    
    UserId: req.body.id,
    content: req.body.content,
    title: req.body.title,
  };
  sequelize.Message.create(message)
    .then(() => {
      res.status(200).json({ message: "message créé !" });
    })
    .catch((err) => res.status(500).json({ err }));
};


/*----------------------------Export de la fonction modifyMessage pour la modification d'un Message----------------------------*/


exports.modifyMessage = (req, res, next) => {
  const message = {
    UserId: req.body.UserId,
    title: req.body.title,
    content: req.body.content
  };
  sequelize.Message.update(message, {
    where: { id: req.params.id },
    returning: true, //Option Sequelize qui permet de retourner le message
    plain: true,
  })
    .then(() => res.status(200).json({ message: "message modifié" }))
    .catch((err) => res.status(404).json({ err }));
};
/*----------------------------Export de la fonction deleteMessage pour la suppression  d'un Message----------------------------*/

exports.deleteMessage = (req, res, next) => {
  sequelize.Message.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => res.status(200).json({ message: "message supprimé!" }))
    .catch((err) => res.status(404).json({ err }));
};
/*----------------------------Export de la fonction getOneMessage pour la récupération d'un Message----------------------------*/

/*----------------------------Export de la fonction getAllMessage pour la récupération de tout Messages----------------------------*/


