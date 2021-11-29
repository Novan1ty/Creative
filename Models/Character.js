const Mongoose = require('mongoose')

const Character = new Mongoose.Schema(
    {
        Name: String,
        Avatar: { type: String, default: null },
        Species: { type: String, default: null },
        Gender: { type: String, default: null },
        ID: Number,
        Images: [String],
        Fields: [Object]
    }
)
const Character_Model = new Mongoose.model('Character', Character)

module.exports = Character_Model