const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userID: { type: String, require: true, unique: true},
    clearanceLvl: { type: String, require: true},
    staffUnit: { type: String, require: true},
    gitHubClearance: { type: String, require: true},
    staffPfp: {type: String, require: true},
    language: { type: String, require: true},
    premiumTier: { type: String, require: true},
    serverID: { type: String, require: true},
    coins: { type: Number, default: 150},
    bank: { type: Number}
})

const model = mongoose.model('ProfileModels', profileSchema)

module.exports = model;
