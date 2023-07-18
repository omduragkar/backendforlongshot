const express = require('express')
const StorageSpace = require('../model/StorageSpaceSchema')
const { removeItemController, getAllItemController, createItemController } = require('../controller/itemController')

const router = express.Router()
/**
 */
// Create a new item
router.post('/', createItemController);

// Get all items
router.get('/', getAllItemController);

// Remove an item
router.delete('/:id', removeItemController);

module.exports = router
