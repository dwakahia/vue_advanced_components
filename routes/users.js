const express = require('express');
const router = express.Router();
const isAuth = require('../middlewares/is_auth')
const {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    login,
    registerUser
} = require('../controllers/users_controller');


//users auth
router.post('/login', login)
router.post('/register', registerUser)

//users crud
router.get('/', isAuth, getUsers)
router.post('/create', isAuth, createUser)
router.get('/:id', isAuth, getUserById)
router.put('/update/:id', isAuth, updateUser)
router.delete('/delete/:id', isAuth, deleteUser)


module.exports = router;