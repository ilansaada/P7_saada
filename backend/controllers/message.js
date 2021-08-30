/*----------------------------------------logique metier---------------------------------------*/
const Message = require("../models/message");
const fs = require("fs");
const sequelize = require("../models");

/*----------------------------Export de la fonction createMessage pour la création d'un Message----------------------------*/

exports.createMessage = (req, res, next) => {
  const message = {
    UserId: req.body.userId,
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
    content: req.body.content,
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
exports.getOneMessage = (req, res, next) => {
  const id = req.params.id;
  sequelize.Message.findByPk(id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(500).json({ err }));
};

/*----------------------------Export de la fonction getAllMessage pour la récupération de tout Messages----------------------------*/

exports.getAllMessage = (req, res, next) => {
  sequelize.Message.findAll({
    attributes: ["title", "content", "userId"],
  })
    .then((message) => {
      res.status(200).json(message);
    })
    .catch((error) => res.status(500).json({ error: "erreur bdd" }));
};
