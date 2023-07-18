const express = require('express')
const StorageSpace = require('../model/StorageSpaceSchema')
const {
  storageSpaceCreate,
  singleStorageSpace,
  getStorageSpaces,
  updateStorageSpaceSingle,
  deleteSingleStorageSpace
} = require('../controller/storagespacecontroller')
const router = express.Router()

/**
 * OWNER @omduragkar
 * POST /storageSpaces/create
 * NO AUTHENTICATION REQUIRED
 * Create a new storage space
 * @returns {Object} Storage space object
 * @throws {500} Internal server error
 * @param {string} name - Storage space name
 * @param {number} maximumLimit - Maximum number of items that can be stored in the space
 * @param {boolean} refrigeration - Whether the space is refrigerated or not
 * @example
 * POST /storageSpaces/create
 * {
 * "name": "Fridge",
 * "maximumLimit": 10,
 * "refrigeration": true
 * }
 * {
 * "_id": "60b9b6b9e6b3b1b4c8f7b0a1",
 *  "name": "Fridge",
 * "maximumLimit": 10,
 * "refrigeration": true,
 * "__v": 0
 * }
 *
 */
router.post('/create', storageSpaceCreate)

/**
 * OWNER @omduragkar
 * GET /storageSpaces
 * NO AUTHENTICATION REQUIRED
 * Get all storage spaces
 * @returns {Array} Array of storage space objects
 * @throws {500} Internal server error
 * @example
 * GET /storageSpaces
 * [
 * {
 * "_id": "60b9b6b9e6b3b1b4c8f7b0a1",
 * "name": "Fridge",
 * "maximumLimit": 10,
 * "refrigeration": true,
 * "__v": 0
 * },
 * {
 * "_id": "60b9b6b9e6b3b1b4c8f7b0a2",
 * "name": "Pantry",
 * "maximumLimit": 20,
 * "refrigeration": false,
 * "__v": 0
 * }
 * ]
 */
// *TODO: List of items in the storage spaces. Done
router.get('/', getStorageSpaces)

/**
 * OWNER @omduragkar
 * GET /storageSpaces/:id
 * NO AUTHENTICATION REQUIRED
 * Get a single storage space
 * @returns {Object} Storage space object
 * @throws {500} Internal server error
 * @example
 * GET /storageSpaces/60b9b6b9e6b3b1b4c8f7b0a1
 * {
 * "_id": "60b9b6b9e6b3b1b4c8f7b0a1",
 * "name": "Fridge",
 * "maximumLimit": 10,
 * "refrigeration": true,
 * "__v": 0
 * }
 *
 */

router.get('/:id', singleStorageSpace)

// Rename a storage space
/**
 * OWNER @omduragkar
 * PUT /storageSpaces/update/:id
 * NO AUTHENTICATION REQUIRED
 * Update a storage space
 * @returns {Object} Updated storage space objectZ
 */
router.put('/update/:id', updateStorageSpaceSingle);

/**
 * OWNER @omduragkar
 * DELETE /storageSpaces/delete/:id
 * NO AUTHENTICATION REQUIRED
 * Delete a storage space
 * @returns {Object} Deleted storage space object
 */
// Delete a storage space
router.delete('/delete/:id', deleteSingleStorageSpace)

module.exports = router
