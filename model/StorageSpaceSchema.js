const { default: mongoose } = require('mongoose')

const storageSpaceSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  maximumLimit: { type: Number },
  refrigeration: { type: Boolean, default: false }
})

const StorageSpace = mongoose.model('StorageSpace', storageSpaceSchema)
module.exports = StorageSpace
