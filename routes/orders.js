const router  = require('express').Router()
const Order   = require('../models/Order')
const protect = require('../middleware/auth')

router.post('/', protect, async (req, res) => {
  try {
    const order = await Order.create({ ...req.body, student: req.user.email })
    res.json(order)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/', protect, async (req, res) => {
  try {
    let orders
    if (req.user.role === 'student') {
      orders = await Order.find({ student: req.user.email }).sort({ placedAt: -1 })
    } else if (req.user.role === 'rider') {
      orders = await Order.find({
        $or: [
          { status: 'pending' },
          { status: 'in transit', rider: req.user.email },
          { status: 'delivered', rider: req.user.email },
        ]
      }).sort({ placedAt: -1 })
    }
    res.json(orders)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
    if (!order) return res.status(404).json({ message: 'Order not found' })
    res.json(order)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.patch('/:id/status', protect, async (req, res) => {
  try {
    const { status, rider } = req.body
    const update = { status }
    if (rider) update.rider = rider
    const order = await Order.findByIdAndUpdate(req.params.id, update, { new: true })
    res.json(order)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router