var mongoose = require('mongoose');
const batchSchema = mongoose.Schema({
    _id :{
        type : String
    },
    size :{
        type : String
    },
    color:{
        type : String
    },
    quantity :{
        type : Number
    }
}, { versionKey: false });


module.exports = mongoose.model('batchs',batchSchema);