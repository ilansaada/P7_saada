const User = require("../models/user");
const bcrypt = require("bcrypt");
const sequelize = require("../models");
const jwt = require("jsonwebtoken");
/*----------------------------Export de la fonction sigunp pour la création d'un Utilisateur----------------------------*/

exports.signup = async (req, res, next) => {
  /*validation sequelize*/
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      sequelize.User.create({
        email: req.body.email,
        password: hash,
      })
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
/*----------------------------Export de la fonction login pour la connexion d'un utilisateur----------------------------*/

exports.login = (req, res, next) => {
  sequelize.User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      /*Il pense que c'est toujours ilan@email.com*/
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user.id,
            token: jwt.sign(
              {
                userId: user.id,
              },
              "RANDOM_TOKEN_SECRET",
              { expiresIn: "24h" }
            ),
            email: user.email,
            isAdmin:1
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
/*----------------------------Export de la fonction modifyuser pour la modification d'un utilisateur----------------------------*/

exports.modifyUser = (req, res, next) => {
  const id = req.params.id;
  const email = req.body.email;
  sequelize.User.findOne({where: {id: id}})
      .then((user) => {
          if (!user) {
              return res.status(401).json({error: "Utilisateur non trouvé !"});
          }
          user.update({
              email: email,
          })
              .then(() => res.status(201).json({message: "Utilisateur modifié !"}))
              .catch((error) => res.status(400).json({error}));
      })
      .catch((error) => res.status(500).json({error}));
};
/*----------------------------Export de la fonction deleteUser pour la suppression d'un utilisateur----------------------------*/

exports.deleteUser = (req, res, next) => {
  sequelize.User.findOne({ where: { id: req.params.id } })
    .then((user) => {
      user.destroy()
        .then(() => res.status(200).json({ message: "utilisateur supprimé !" }))
        .catch((error) => res.status(404).json({ error }));
    })
    .catch((error) => res.status(404).json({ error }));
};
