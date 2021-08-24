const User = require("../models/user");
const bcrypt = require("bcrypt");
const sequelize = require("../models");

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
