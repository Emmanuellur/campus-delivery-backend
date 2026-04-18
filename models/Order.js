const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  student:  { type: String, required: true },
  shop:     { type: String, required: true },
  shopId:   { type: String, required: true },
  items:    { type: Array,  required: true },
  total:    { type: Number, required: true },
  room:     { type: String, required: true },
  status:   { type: String, enum: ['pending', 'in transit', 'delivered', 'cancelled'], default: 'pending' },
  rider:    { type: String, default: null },
  eta:      { type: Number, default: 30 },
  placedAt: { type: Date,   default: Date.now },
}, { timestamps: true })

module.exports = mongoose.model('Order', orderSchema)