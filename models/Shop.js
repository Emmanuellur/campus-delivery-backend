const mongoose = require('mongoose')

const shopSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  category: { type: String, enum: ['food', 'pharmacy'], required: true },
  emoji:    { type: String, default: '🍽' },
  eta:      { type: Number, default: 15 },
  rating:   { type: Number, default: 4.0 },
  vendorId: { type: String, default: null },
  items: [
    {
      name:  String,
      price: Number,
      time:  Number,
    }
  ],
}, { timestamps: true })

module.exports = mongoose.model('Shop', shopSchema)