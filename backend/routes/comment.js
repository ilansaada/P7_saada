const express = require('express'); 
const router = express.Router();
const commentCtrl = require('../controllers/comment'); 
/*const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');*/

router.post('/', /*auth, multer,*/commentCtrl.createComment);
router.delete("/:id", /*auth, multer,*/commentCtrl.deleteComment);

module.exports = router;