const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const connectDB = require('./config/db')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 5000

connectDB();

// Routes
const userRoutes = require('./routes/userRoutes')
const taskRoutes = require('./routes/taskRoutes')

app.use('/api/users', userRoutes)
app.use('/api/tasks', taskRoutes)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
