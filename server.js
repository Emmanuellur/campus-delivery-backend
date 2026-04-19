const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://campus-delivery-frontend.vercel.app',
    /\.vercel\.app$/
  ],
  credentials: true
}))
app.use(express.json())

// Routes
app.use('/api/auth',   require('./routes/auth'))
app.use('/api/orders', require('./routes/orders'))
app.use('/api/shops',  require('./routes/shops'))
app.use('/api/smart', require('./routes/smart'))
app.use('/api/admin', require('./routes/admin'))

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Campus Delivery API is running!' })
})

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected!')
    app.listen(5000, () => console.log('Server running on port 5000'))
  })
  .catch(err => console.log(err))