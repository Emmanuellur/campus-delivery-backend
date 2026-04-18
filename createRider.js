const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
require('dotenv').config()

const User = require('./models/User')

const riders = [
  { name: 'Emeka Okafor',  email: 'emeka@campusdelivery.com',  password: 'rider123' },
  { name: 'Tunde Balogun', email: 'tunde@campusdelivery.com',  password: 'rider123' },
  { name: 'Chidi Nwosu',   email: 'chidi@campusdelivery.com',  password: 'rider123' },
]

async function createRiders() {
  await mongoose.connect(process.env.MONGO_URI)
  console.log('Connected!')

  for (const rider of riders) {
    const existing = await User.findOne({ email: rider.email })
    if (existing) {
      console.log(`${rider.name} already exists, skipping`)
      continue
    }
    const hashed = await bcrypt.hash(rider.password, 10)
    await User.create({ ...rider, password: hashed, role: 'rider' })
    console.log(`Created rider: ${rider.name}`)
  }

  console.log('Done!')
  mongoose.disconnect()
}

createRiders()