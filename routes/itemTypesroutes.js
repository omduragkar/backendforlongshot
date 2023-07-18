const express = require('express')

const {
  createItemTypesController,
  renameItemTypesController,
  deleteItemTypesController
} = require('../controller/itemtypescontroller')

const router = express.Router()

// Create a new item type
router.post('/create', createItemTypesController)


// Rename an item type
router.put('/:id', renameItemTypesController)

// Delete an item type
router.delete('/delete/:id', deleteItemTypesController)

module.exports = router
