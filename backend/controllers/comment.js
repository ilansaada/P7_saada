/*----------------------------------------logique metier---------------------------------------*/
const Comment = require("../models/comment");
const fs = require("fs");
const sequelize = require("../models");

/*----------------------------Export de la fonction createMessage pour la création d'un Message----------------------------*/

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


/*----------------------------Export de la fonction deleteMessage pour la suppression  d'un Message----------------------------*/

exports.deleteComment= (req, res, next) => {
    sequelize.Comment.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then(() => res.status(200).json({ message: "commentaire supprimé!" }))
      .catch((err) => res.status(404).json({ err }));
  };
