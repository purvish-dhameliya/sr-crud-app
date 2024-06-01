const Task = require('../models/Task')

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id })
    res.json(tasks)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.createTask = async (req, res) => {
  const { title, description } = req.body

  try {
    const task = await Task.create({ title, description, userId: req.user.id })
    res.status(201).json(task)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.updateTask = async (req, res) => {
  const { id } = req.params
  const { title, description } = req.body

  try {
    const task = await Task.findById(id)

    if (!task) {
      return res.status(404).json({ message: 'Task not found' })
    }

    if (task.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' })
    }

    if (title) task.title = title
    if (description) task.description = description

    const updatedTask = await task.save()
    res.json(updatedTask)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.deleteTask = async (req, res) => {
  const { id } = req.params

  try {
    const task = await Task.findByIdAndDelete(id)

    if (task.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' })
    }

    res.status(200).json({ message: 'Task removed' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
