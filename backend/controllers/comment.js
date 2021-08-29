/*----------------------------------------logique metier---------------------------------------*/
const Comment = require("../models/comment");
const fs = require("fs");
const sequelize = require("../models");

/*----------------------------Export de la fonction createMessage pour la création d'un Message----------------------------*/

exports.createComment = (req, res, next) => {
 sequelize.User.findOne({ where: { id: req.body.id} })
    .then((user) => {
      sequelize.Comment.create({
        userId: req.body.id,
        content: req.body.content,
      })
        .then(() => res.status(201).json({ message: "Commentaire créé !" }))
        .catch((error) => {
          res.status(400).json({ error: "erreur" });
        });
    })
    .catch((error) => res.status(500).json({ error: "erreur" }));
};


/*----------------------------Export de la fonction deleteMessage pour la suppression  d'un Message----------------------------*/

exports.deleteComment= (req, res, next) => {
  sequelize.Comment.findOne({ where: { id: req.body.id} })
    .then((comment) => {
      const filename = message.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Comment.destroy({ id: req.params.id })
          .then(() => res.status(200).json({ message: "commentaire supprimé !" }))
          .catch((error) => res.status(404).json({ error }));
      });
    })
    .catch((error) => res.status(404).json({ error }));
};

