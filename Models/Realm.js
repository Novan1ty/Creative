const Mongoose = require('mongoose')

const Realm = new Mongoose.Schema(
    {
        Name: String,
        Icon: { type: String, default: null },
        Banner: { type: String, default: null },
        ID: Number,
        Description: { type: String, default: null },
        Locations: [String],
        Aliases: [String],
        Type: { type: String, default: null },
        Images: [String],
        Fields: [Object]
    }
)
const Realm_Model = new Mongoose.model('Realm', Realm)

module.exports = Realm_Model