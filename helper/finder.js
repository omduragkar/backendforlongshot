const Item = require("../model/ItemSchema");
const ItemType = require("../model/ItemTypeSchema");
const StorageSpace = require("../model/StorageSpaceSchema");

const findItemTypeById = async (id)=>await ItemType.findById(id);
const findItemById = async (id)=>await Item.findById(id);
const findStorageById = async (id)=>await StorageSpace.findById(id);

module.exports = {
    findItemTypeById, findItemById, findStorageById
}