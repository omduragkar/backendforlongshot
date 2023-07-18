const { default: mongoose } = require('mongoose')

const itemSchema = new mongoose.Schema({
  itemType: { type: mongoose.Schema.Types.ObjectId, ref: 'ItemType' },
  expirationDate: { type: Date },
  storageSpace: { type: mongoose.Schema.Types.ObjectId, ref: 'StorageSpace' }
})

const Item = mongoose.model('Item', itemSchema)
module.exports = Item
