const { findItemTypeById, findStorageById } = require('../helper/finder')
const response = require('../helper/response')
const Item = require('../model/ItemSchema')
const StorageSpace = require('../model/StorageSpaceSchema')

module.exports.createItemController = async (req, res) => {
  try {
    const { itemType, expirationDate, storageSpace } = req.body
    //  Get date in ISOString: ex: 2023-11-23T11:15:52.925Z
    // console.log(req.body, new Date(expirationDate));
    if (new Date(expirationDate).getTime() > new Date().getTime()) {
      const findItype = await findItemTypeById(itemType)
      const findStype = await findStorageById(storageSpace)
      const countItem = await Item.find({
        storageSpace
      }).count()
      if (countItem < findStype.maximumLimit) {
        if (findItype.requiresRefrigeration == findStype.refrigeration) {
          const item = await Item.create({
            itemType,
            expirationDate,
            storageSpace
          })
          if (!item) {
            throw new Error('Unable to create Item')
          } else {
          }
          response(res, 200, 'Success', item, false)
        } else {
          response(
            res,
            404,
            "Unable to create due to Items that require refrigeration can't be stored in a non-refrigerated space",
            null,
            true
          )
        }
      } else {
        response(res, 404, 'Maximum limit reached!', null, true)
      }
    } else {
      response(
        res,
        404,
        'Unable to create due to Date provided is not in future!',
        null,
        true
      )
    }
  } catch (error) {
    response(res, 500, 'Internal server error', error, true)
  }
}

module.exports.getAllItemController = async (req, res) => {
  try {
    const { page = 1, limit = 10, sortBy = 'expirationDate' } = req.query
    const items = await Item.find()
      .sort(sortBy)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('itemType storageSpace')
    response(res, 200, 'success', items, false)
  } catch (error) {
    response(res, 500, 'Internal server error', error, false)
  }
}

module.exports.removeItemController = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
    if (!item) {
      response(res, 404, 'Item not found', null, true)
    }
    await item.deleteOne()
    response(res, 200, 'Item deleted successfully', null, false)
  } catch (error) {
    console.log(error)
    response(res, 500, 'Internal server error', error, true)
  }
}

module.exports.modifyItemController = async (req, res) => {
  const { changestorageSpaceId } = req.body
  const findStype = await findStorageById(changestorageSpaceId)
  const countItem = await Item.find({
    storageSpace: changestorageSpaceId
  }).count()
  if (findStype.maximumLimit > countItem) {
    const itemUpdate = await Item.findByIdAndUpdate(req.params.id, {
      storageSpace: changestorageSpaceId
    })
    // console.log({itemUpdate})
    if (!itemUpdate) {
      response(res, 500, 'Internal Update Issue!', null, true)
    } else {
      response(res, 200, 'Success!', itemUpdate, false)
    }
  } else {
    response(res, 404, 'Maximum storage space reached!', null, true)
  }
}
