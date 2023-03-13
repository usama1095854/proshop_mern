const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const { notFound, errorhandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

mongoose.set('strictQuery', false)

dotenv.config()
connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json({ extended: false }))

app.get('/', (req, res) => {
  res.send('API is running')
})

// Define Routes
app.use('/api/products', require('./routes/productRoute'))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/orders', require('./routes/orderRoute'))
app.use('/api/upload', require('./routes/uploadRoutes'))

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(notFound)
app.use(errorhandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on PORT ${PORT}...`
  )
)
