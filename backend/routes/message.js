const express = require('express')
const router = express.Router();
const messageCtrl = require('../controllers/message');
const auth = require('../middleware/auth');
/*const multer = require('../middleware/multer-config');*/

router.post("/", /*auth,/*multer,*/ messageCtrl.createMessage);

router.put("/:id", /*auth,*/ /*multer,*/ messageCtrl.modifyMessage);

router.delete("/:id", /*à retirer auth,*/  messageCtrl.deleteMessage);

router.get("/", /*auth,*/ messageCtrl.getAllMessage);

router.get("/:id", /*auth,*/  messageCtrl.getOneMessage);



module.exports = router ;