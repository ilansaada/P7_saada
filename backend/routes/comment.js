const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/comment");
const auth = require("../middleware/auth");
/*const multer = require('../middleware/multer-config');*/

router.post("/", auth, /*multer*/ commentCtrl.createComment);
router.delete("/:id", auth, /*multer,*/ commentCtrl.deleteComment);
router.put("/:id", auth, /*multer,*/ commentCtrl.modifyComment);
router.get("/", auth, commentCtrl.getAllComment);
router.get("/:id", auth, commentCtrl.getOneComment);

module.exports = router;
