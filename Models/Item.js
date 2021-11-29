const Mongoose = require('mongoose')

const Item = new Mongoose.Schema(
    {
        Name: String,
        Icon: { type: String, default: null },
        ID: Number,
        Description: { type: String, default: null },
        Locations: [String],
        Type: { type: String, default: null },
        Images: [String],
        Fields: [Object]
    }
)
const Item_Model = new Mongoose.model('Item', Item)

module.exports = Item_Model