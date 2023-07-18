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
 * @swagger
 * @param {} req
 * @param {*} res
 *
 * @swagger
 * /storageSpaces:
 * get:
 * description: Get all storage spaces
 * responses:
 * 200:
 * description: Array of storage space objects
 * 500:
 * description: Internal server error
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
 *  @swagger  
 * @param {*} req 
 * @param {*} res 
 * @returns 
 * 
 * @swagger
 * /storageSpaces/{id}:
 * get:
 * description: Get a single storage space
 * responses:
 * 200:
 * description: Storage space object
 * 404:
 * description: Storage space not found
 * 500:
 * description: Internal server error
 * 
 */
const singleStorageSpace = async (req, res) => {
  try {
    const storageSpace = await StorageSpace.findById(req.params.id)
    if (!storageSpace) {
      response(res, 404, 'Storage space not found', null, true);
    }else{
      response(res, 200, 'All Storage Spaces', storageSpace, false);
    }
    
  } catch (error) {
    response(res, 500, 'Internal server error', error, true);
  }
}
/**
 * 
 *   @swagger  
 * @param {
 * * name
 * * } req
 * @param {*
 * * 
 * } res 
 * @returns
 * 
 * @swagger
 * /storageSpaces/{id}:
 * put:
 * description: Update a single storage space
 * responses:
 * 200:
 * description: Storage space object
 * 404:
 * description: Storage space not found
 * 500:
 * description: Internal server error
 *  
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
   * 
   * @param {*} req 
   * @param {*} res 
   * @returns 
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
