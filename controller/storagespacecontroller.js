const response = require('../helper/response');
const Item = require('../model/ItemSchema');
const StorageSpace = require('../model/StorageSpaceSchema')
/**
 * @swagger
 * @param {name, maximumLimit, refrigeration} req
 * @param {*} res
 *
 * @swagger
 * /storageSpaces/create:
 * post:
 * description: Create a new storage space
 * responses:
 * 200:
 * description: Storage space created
 * 500:
 * description: Internal server error
 *
 *
 */
const storageSpaceCreate = async (req, res) => {
  console.log({first: req.body});
  try {
    const { name, maximumLimit, refrigeration } = req.body
    const storageSpace = await StorageSpace.create({
      name,
      maximumLimit,
      refrigeration
    })
    response(res, 200, 'Storage space created', storageSpace, false);
  } catch (error) {
    response(res, 500, 'Internal server error', error, true);
  }
}

/**
 * @desc Get all storage spaces
 * @route GET /storageSpaces
 * @access Public
 * @returns {Array} Array of storage space objects
 */
const getStorageSpaces = async (req, res) => {
  try {
    const storageSpaces = await StorageSpace.find()
    response(res, 200, 'All Storage Spaces', storageSpaces, false);
  } catch (error) {
    response(res, 500,  'Internal server error', error, true);
  }
}

/**
 * @desc Get all items in a storage space
 * @route GET /storageSpaces/:id
 * @access Public
 * @returns {Array} Array of item objects
 */
const singleStorageSpace = async (req, res) => {
  try {
    const allItems = await Item.find({
      storageSpace:req.params.id
    })
    if (!allItems) {
      response(res, 404, 'Storage space not found', null, true);
    }else{
      response(res, 200, 'All Items in StorageSpaces', allItems, false);
    }
    
  } catch (error) {
    response(res, 500, 'Internal server error', error, true);
  }
}

/**
 * @desc Update a storage space
 * @route PUT /storageSpaces/update/:id
 * @access Public
 * @returns {Object} Updated storage space object
 * @param {string} name - Storage space name
 * @param {number} maximumLimit - Maximum number of items that can be stored in the space
 * @param {boolean} refrigeration - Whether the space is refrigerated or not
 */
const updateStorageSpaceSingle =  async (req, res) => {
    try {
      const { name } = req.body
      const storageSpace = await StorageSpace.findByIdAndUpdate(
        req.params.id,
        { name },
        { new: true }
      )
      if (!storageSpace) {
        response(res, 404, 'Storage space not found', null, true );
      }else{
        response(res, 200, 'Success, storageSpace', false)
      }
    } catch (error) {
      response(res, 500, 'Internal server error' , true)
    }
  }

/**
 * @desc Delete a storage space
 * @route DELETE /storageSpaces/delete/:id
 * @access Public
 * @returns {Object} Deleted storage space object
 * 
 */
const deleteSingleStorageSpace = async (req, res) => {
    try {
      const storageSpace = await StorageSpace.findById(req.params.id)
      if (!storageSpace) {
        response(res, 404, 'Storage space not found', null, true );
      }else{
        const itemsInStorageSpace = await Item.find({
          storageSpace: storageSpace._id
        })
        if (itemsInStorageSpace.length > 0) {
          response(res, 400, 'Storage space is not empty' , itemsInStorageSpace , true)
        }else{
          let awaitData = await StorageSpace.findByIdAndDelete(storageSpace._id);
          response(res, 200, 'Storage space deleted successfully' , awaitData , false)
        }
      }
    } catch (error) {
      console.log(error)
      response(res, 500, 'Internal server error'  , error , true);
    }
  }
module.exports = {
  storageSpaceCreate,
  getStorageSpaces,
  singleStorageSpace,
  updateStorageSpaceSingle,
  deleteSingleStorageSpace
}
