const User = require('../models/User')
const jwt = require('jsonwebtoken')

const generateToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body

  try {
    const user = await User.create({ username, email, password })
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id)
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id)
      })
    } else {
      res.status(401).json({ message: 'Invalid email or password' })
    }
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.createUser = async (req, res) => {
  const { username, email, password } = req.body

  try {
    const user = await User.create({ username, email, password })
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id)
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({})
    res.json(users)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.updateUser = async (req, res) => {
  const { id } = req.params
  const { username, email } = req.body

  try {
    const user = await User.findById(id)

    if (user) {
      user.username = username || user.username
      user.email = email || user.email

      const updatedUser = await user.save()
      res.json(updatedUser)
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.deleteUser = async (req, res) => {
  const { id } = req.params

  try {
    const user = await User.findByIdAndDelete(id)

    if (user) {
      res.status(200).json({ message: 'User removed' })
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
