const router = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/User')

router.post('/create-rider', async (req, res) => {
  try {
    const { name, email, password, secret } = req.body
    if (secret !== process.env.ADMIN_SECRET) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
    const existing = await User.findOne({ email })
    if (existing) return res.status(400).json({ message: 'Email already exists' })
    const hashed = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, password: hashed, role: 'rider' })
    res.json({ message: 'Rider created!', user })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router