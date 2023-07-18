const express = require('express')
const StorageSpace = require('../model/StorageSpaceSchema')
const { removeItemController, getAllItemController, createItemController, modifyItemController } = require('../controller/itemController')

const router = express.Router()
/**
 */
// Create a new item
router.post('/create', createItemController);

// Get all items
router.get('/', getAllItemController);

// Update an item
router.put('/:id', modifyItemController);


// Remove an item
router.delete('/:id', removeItemController);

module.exports = router
