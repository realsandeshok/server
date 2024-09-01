const express = require('express')
const {registerUser, authUser, getUsers, deleteUser} = require('../controllers/userContoller')
const { protect, admin } = require('../middleware/auth')
const router = express.Router()

router.post('/register', protect, admin, registerUser);
router.post('/authUser', authUser);
router.get('/', protect, admin, getUsers);
router.delete('/:id', deleteUser);

module.exports = router;