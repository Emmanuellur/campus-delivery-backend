const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
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

app.get('/seed', async (req, res) => {
  const Shop = require('./models/Shop')
  const shops = [
    { name: 'Mama Put Canteen', category: 'food', emoji: '🍛', eta: 15, rating: 4.5, items: [{ name: 'Jollof Rice + Chicken', price: 800, time: 10 }, { name: 'Fried Rice + Fish', price: 900, time: 12 }, { name: 'Egusi Soup + Fufu', price: 700, time: 15 }, { name: 'Moi Moi + Pap', price: 400, time: 8 }] },
    { name: 'Campus Pharmacy', category: 'pharmacy', emoji: '💊', eta: 10, rating: 4.8, items: [{ name: 'Paracetamol (strip)', price: 150, time: 3 }, { name: 'Vitamin C tablets', price: 300, time: 3 }, { name: 'Ibuprofen (strip)', price: 200, time: 3 }, { name: 'Hand Sanitizer', price: 500, time: 3 }] },
    { name: 'Chukwu Kitchen', category: 'food', emoji: '🍲', eta: 20, rating: 4.2, items: [{ name: 'Pepper Soup', price: 600, time: 10 }, { name: 'Beans + Plantain', price: 500, time: 12 }, { name: 'Yam + Egg Sauce', price: 450, time: 10 }] },
    { name: 'QuickMeds Store', category: 'pharmacy', emoji: '🏥', eta: 8, rating: 4.6, items: [{ name: 'Malaria Test Kit', price: 800, time: 5 }, { name: 'Bandage Roll', price: 250, time: 3 }, { name: 'Cough Syrup', price: 600, time: 3 }] },
    { name: 'Buka Express', category: 'food', emoji: '🍱', eta: 25, rating: 4.0, items: [{ name: 'Rice + Stew', price: 600, time: 10 }, { name: 'Spaghetti + Chicken', price: 750, time: 12 }, { name: 'Plantain + Beans', price: 500, time: 8 }] },
    { name: 'Freshy Bites', category: 'food', emoji: '🥙', eta: 18, rating: 4.3, items: [{ name: 'Shawarma', price: 1200, time: 8 }, { name: 'Burger + Fries', price: 1500, time: 10 }, { name: 'Meat Pie x2', price: 400, time: 5 }, { name: 'Chapman Drink', price: 300, time: 2 }] },
  ]
  await Shop.deleteMany()
  await Shop.insertMany(shops)
  res.json({ message: 'Shops seeded!', count: shops.length })
})

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected!')
    app.listen(process.env.PORT || 5000, () => console.log('Server running on port 5000'))
  })
  .catch(err => console.log(err))