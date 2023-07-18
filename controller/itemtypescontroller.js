const response = require('../helper/response')
const ItemType = require('../model/ItemTypeSchema')

module.exports.createItemTypesController = async (req, res) => {
  try {
    const { name, requiresRefrigeration } = req.body
    const itemType = await ItemType.create({ name, requiresRefrigeration })
    response(res, 200, "Success", itemType, false);
  } catch (error) {
    response(res, 500, "Internal server error", error, true);
  }
}



module.exports.renameItemTypesController = async (req, res) => {
  try {
    const { name } = req.body
    const itemType = await ItemType.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    )
    if (!itemType) {
      response(res, 404, 'Item type not found' , null, true);
    }
    else{
      response(res, 200, 'Success' , itemType, true);

    }
 } catch (error) {
    response(res, 500, 'Internal server error' , error, true);
  }
}

module.exports.deleteItemTypesController = async (req, res) => {
  try {
    const itemType = await ItemType.findById(req.params.id)
    if (!itemType) {
      response(res, 404, 'Item type not found', null , true);
      
    }else{
      const itemsWithItemType = await Item.find({ itemType: itemType._id })
      if (itemsWithItemType.length > 0) {
        response(res, 400, 'Item type is still in use', null , true);
      }else{
        await itemType.remove()
        response(res, 200, 'Item type deleted successfully', null , false);
      }
    }
  } catch (error) {
    
    response(res, 500, 'Internal server error', error , true);

  }
}
