const mongoose = require('mongoose')
require('dotenv').config()

const Shop = require('./models/Shop')

const shops = [
  {
    name: 'Mama Put Canteen',
    category: 'food',
    emoji: '🍛',
    eta: 15,
    rating: 4.5,
    items: [
      { name: 'Jollof Rice + Chicken', price: 800, time: 10 },
      { name: 'Fried Rice + Fish',     price: 900, time: 12 },
      { name: 'Egusi Soup + Fufu',     price: 700, time: 15 },
      { name: 'Moi Moi + Pap',         price: 400, time: 8  },
    ]
  },
  {
    name: 'Campus Pharmacy',
    category: 'pharmacy',
    emoji: '💊',
    eta: 10,
    rating: 4.8,
    items: [
      { name: 'Paracetamol (strip)', price: 150, time: 3 },
      { name: 'Vitamin C tablets',   price: 300, time: 3 },
      { name: 'Ibuprofen (strip)',    price: 200, time: 3 },
      { name: 'Hand Sanitizer',      price: 500, time: 3 },
    ]
  },
  {
    name: 'Chukwu Kitchen',
    category: 'food',
    emoji: '🍲',
    eta: 20,
    rating: 4.2,
    items: [
      { name: 'Pepper Soup',      price: 600, time: 10 },
      { name: 'Beans + Plantain', price: 500, time: 12 },
      { name: 'Yam + Egg Sauce',  price: 450, time: 10 },
    ]
  },
  {
    name: 'QuickMeds Store',
    category: 'pharmacy',
    emoji: '🏥',
    eta: 8,
    rating: 4.6,
    items: [
      { name: 'Malaria Test Kit', price: 800, time: 5 },
      { name: 'Bandage Roll',     price: 250, time: 3 },
      { name: 'Cough Syrup',      price: 600, time: 3 },
    ]
  },
  {
    name: 'Buka Express',
    category: 'food',
    emoji: '🍱',
    eta: 25,
    rating: 4.0,
    items: [
      { name: 'Rice + Stew',         price: 600, time: 10 },
      { name: 'Spaghetti + Chicken', price: 750, time: 12 },
      { name: 'Plantain + Beans',    price: 500, time: 8  },
    ]
  },
  {
    name: 'Freshy Bites',
    category: 'food',
    emoji: '🥙',
    eta: 18,
    rating: 4.3,
    items: [
      { name: 'Shawarma',       price: 1200, time: 8  },
      { name: 'Burger + Fries', price: 1500, time: 10 },
      { name: 'Meat Pie x2',   price: 400,  time: 5  },
      { name: 'Chapman Drink',  price: 300,  time: 2  },
    ]
  },
]

async function seed() {
  await mongoose.connect(process.env.MONGO_URI)
  console.log('Connected!')

  await Shop.deleteMany()
  console.log('Cleared old shops')

  await Shop.insertMany(shops)
  console.log('Shops seeded successfully!')

  mongoose.disconnect()
}

seed()