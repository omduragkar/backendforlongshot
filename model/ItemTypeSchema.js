const { default: mongoose } = require('mongoose')

const itemTypeSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  requiresRefrigeration: { type: Boolean, default: false }
})

const ItemType = mongoose.model('ItemType', itemTypeSchema)
module.exports = ItemType
