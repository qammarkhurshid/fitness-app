var mongoose = require('mongoose');

var storeSchema = new mongoose.Schema({
    username: { type: String },
    update_id: { type: String },
    ts: { type: Number },
    stepCount: { type: Number }
})

module.exports = mongoose.model('store', storeSchema);