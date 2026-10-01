const mongoose = require('mongoose')
require('dotenv').config()

const Shop = require('./models/Shop')

const shops = [
  {
    name: 'Madam Blessing Canteen',
    category: 'food',
    emoji: '🍛',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS9YFCCIRs6EnphCUkm3NBFgjxg8OoaLRehd8-l3nj0g&s=10',
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
    name: 'Remisix wellness',
    category: 'pharmacy',
    emoji: '💊',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
    eta: 10,
    rating: 4.8,
    items: [
      { name: 'Paracetamol (strip)', price: 150, time: 3 },
      { name: 'Vitamin C tablets',   price: 300, time: 3 },
      { name: 'Ibuprofen (strip)',    price: 200, time: 3 },
      { name: 'Hand Sanitizer',       price: 500, time: 3 },
    ]
  },
  {
    name: 'Yeshua Kitchen',
    category: 'food',
    emoji: '🍲',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScqF5tRE2gw6mKUUoK4VAsJNttIJBT6TocA6foLGBqVw&s=10',
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
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400',
    eta: 8,
    rating: 4.6,
    items: [
      { name: 'Malaria Test Kit', price: 800, time: 5 },
      { name: 'Bandage Roll',     price: 250, time: 3 },
      { name: 'Cough Syrup',      price: 600, time: 3 },
    ]
  },
  {
    name: 'Buka 9ine kitchen',
    category: 'food',
    emoji: '🍱',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN81vro8ZqIVIkdWDCt2Q-ugCcbob3XB-cE3Rs-BU4St1lMh-GK4l9HFU&s=10',
    eta: 25,
    rating: 4.0,
    items: [
      { name: 'Rice + Stew',         price: 600, time: 10 },
      { name: 'Spaghetti + Chicken', price: 750, time: 12 },
      { name: 'Plantain + Beans',    price: 500, time: 8  },
    ]
  },
  {
    name: 'Lala Sandwich',
    category: 'food',
    emoji: '🥙',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7WtoBBrXQnigZRGECT86pjcPpxtedk0oaqSVzxx7nsw&s=10',
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