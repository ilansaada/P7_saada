const express = require('express'); 
const router = express.Router();
const userCtrl = require('../controllers/user'); 

router.post('user/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.put("/:id",userCtrl.modifyUser);
router.delete("/:id", userCtrl.deleteUser);


console.log('route');





module.exports = router;
