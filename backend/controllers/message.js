/*----------------------------------------logique metier---------------------------------------*/
const Message = require("../models/message");
const fs = require("fs");
/*----------------------------Export de la fonction createMessage pour la création d'un Message----------------------------*/

exports.createMessage = (req, res, next) => {
  const messageObject = JSON.parse(req.body.message);
  delete messageObject._id;
  const message = new Message({
    ...messageObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,});
    message
    .save()
    .then(() => res.status(201).json({ message: "Message enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};
/*----------------------------Export de la fonction modifyMessage pour la modification d'un Message----------------------------*/

exports.modifyMessage = (req, res, next) => {
  const messageObject = req.file
    ? {
        ...JSON.parse(req.body.message),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  Message.updateOne(
    { _id: req.params.id },
    { ...messageObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: "message modifié !" }))
    .catch((error) => res.status(404).json({ error }));
};
/*----------------------------Export de la fonction deleteMessage pour la suppression  d'un Message----------------------------*/

exports.deleteMessage = (req, res, next) => {
  Message.findOne({ _id: req.params.id })
    .then((message) => {
      const filename = message.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Message.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "message supprimé !" }))
          .catch((error) => res.status(404).json({ error }));
      });
    })
    .catch((error) => res.status(404).json({ error }));
};
/*----------------------------Export de la fonction getOneMessage pour la récupération d'un Message----------------------------*/

exports.getOneMessage = (req, res, next) => {
    Message.findOne({ _id: req.params.id })
    .then((message) => res.status(200).json(message))
    .catch((error) => res.status(404).json({ error }));
};
/*----------------------------Export de la fonction getAllMessage pour la récupération de Message----------------------------*/

exports.getAllMessage = (req, res, next) => {
  Message.find()
    .then((message) => res.status(200).json(message))
    .catch((error) => res.status(400).json({ error }));
};

