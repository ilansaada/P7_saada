/*----------------------------------------la logique metier---------------------------------------*/
const Comment = require("../models/comment");
const fs = require("fs");
const sequelize = require("../models");

/*----------------------------Export de la fonction createMessage pour la création d'un commentaire----------------------------*/

exports.createComment = (req, res, next) => {
  const comment = {
    UserId: req.body.userId,
    content: req.body.content,
  };
  sequelize.Comment.create(comment)
    .then(() => {
      res.status(200).json({ message: "commentaire créé !" });
    })
    .catch((err) => res.status(500).json({ err }));
};
/*----------------------------Export de la fonction modifyComment pour la modification d'un Commentaire----------------------------*/

exports.modifyComment = (req, res, next) => {
  const comment = {
    UserId: req.body.UserId,
    title: req.body.title,
    content: req.body.content,
  };
  sequelize.Comment.update(comment, {
    where: { id: req.params.id },
    returning: true, //Option Sequelize qui permet de retourner le commentaire
    plain: true,
  })
    .then(() => res.status(200).json({ message: "commentaire modifié" }))
    .catch((err) => res.status(404).json({ err }));
};

/*----------------------------Export de la fonction deleteMessage pour la suppression  d'un commentaire----------------------------*/

exports.deleteComment= (req, res, next) => {
    sequelize.Comment.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then(() => res.status(200).json({ message: "commentaire supprimé!" }))
      .catch((err) => res.status(404).json({ err }));
  };

  /*----------------------------Export de la fonction getOneComment pour la récupération d'un commentaire----------------------------*/
exports.getOneComment = (req, res, next) => {
  const id = req.params.id;
  sequelize.Comment.findByPk(id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(500).json({ err }));
};

/*----------------------------Export de la fonction getAllComment pour la récupération de tout les commentaires----------------------------*/

exports.getAllComment = (req, res, next) => {
  sequelize.Comment.findAll()
    .then((comment) => {
      res.status(200).json(comment);
    })
    .catch((error) => res.status(500).json({ error: "erreur bdd" }));
};
