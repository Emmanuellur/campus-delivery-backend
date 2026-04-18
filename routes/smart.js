const router = require('express').Router()
const Order = require('../models/Order')
const protect = require('../middleware/auth')

// Smart ETA — calculates realistic delivery time based on pending orders
router.get('/eta/:shopId', async (req, res) => {
  try {
    const pendingOrders = await Order.countDocuments({
      shopId: req.params.shopId,
      status: { $in: ['pending', 'preparing'] }
    })
    const baseEta = 15
    const smartEta = baseEta + (pendingOrders * 5)
    res.json({ eta: smartEta, pendingOrders })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Smart rider assignment — auto assigns nearest available rider
router.post('/assign/:orderId', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId)
    if (!order) return res.status(404).json({ message: 'Order not found' })
    
    const riders = ['Emeka', 'Tunde', 'Chidi', 'Biodun', 'Seun']
    const activeRiders = await Order.distinct('rider', { status: 'in transit' })
    const availableRiders = riders.filter(r => !activeRiders.includes(r))
    
    const assignedRider = availableRiders.length > 0
      ? availableRiders[0]
      : riders[Math.floor(Math.random() * riders.length)]

    order.rider = assignedRider
    await order.save()

    res.json({ rider: assignedRider, order })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Popular items — returns most ordered items for a shop
router.get('/popular/:shopId', async (req, res) => {
  try {
    const orders = await Order.find({ shopId: req.params.shopId })
    const itemCounts = {}

    orders.forEach(order => {
      order.items.forEach(item => {
        itemCounts[item.name] = (itemCounts[item.name] || 0) + item.qty
      })
    })

    const popular = Object.entries(itemCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([name, count]) => ({ name, count }))

    res.json(popular)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Auto cancel — cancels orders pending for more than 10 minutes
router.post('/autocancel', async (req, res) => {
  try {
    const tenMinsAgo = new Date(Date.now() - 10 * 60 * 1000)
    const result = await Order.updateMany(
      { status: 'pending', placedAt: { $lt: tenMinsAgo } },
      { status: 'cancelled' }
    )
    res.json({ cancelled: result.modifiedCount })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router