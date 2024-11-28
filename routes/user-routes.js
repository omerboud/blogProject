const express = require('express');
const router = express.Router();
const { register, login, getAllUsers , getUserById,logOut , deleteUser} = require('../controllers/user-controller');

router.post('/register', register);
router.post('/login', login);
router.get('/getAllUsers', getAllUsers);
router.get('/getUserById', getUserById);
router.get('/logout', logOut);
router.delete('/deleteUser/:username', deleteUser);
module.exports = router;