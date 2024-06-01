const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getUsers,
  updateUser,
  deleteUser,
  createUser
} = require('../controllers/userController')

router.route('/register').post(registerUser).get(getUsers)
router.route('/create').post(createUser)
router.route('/login').post(loginUser)

router.route('/:id').put(updateUser).delete(deleteUser)

module.exports = router
