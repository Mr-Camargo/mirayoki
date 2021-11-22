/* This model is used when creating a new database entry, either 
when a new user joins the server and is not yet registered, 
or when a user sends a message and is not registered neither. */

const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userID: { type: String, require: true, unique: true },
    // We need the User ID in order to identify users
    clearanceLvl: { type: String, require: true },
    /* The Clearance Level is given to Slash Staff members 
    in order to access administrative features within Mirayoki. */
    staffUnit: { type: String, require: true },
    /* The Staff Unit is given to Staff members so 
    it's easier to identify their role in Slash. */
    gitHubClearance: { type: String, require: true },
    /* Github Clearance represents the control a user has
    under the GitHub Repository of Mirayoki. */
    staffPfp: { type: String, require: true },
    /* Staff members must provide a real picture of themselves
    so it's easier to identify them as humans. 
    It is also displayed when staff members run the -dev command*/
    language: { type: String, require: true },
    /* This sets the language that Mirayoki will be using with an 
    specific user, the default is English. */
    premiumTier: { type: String, require: true },
    /* This is not implemented yet, but it will be used to check
    if a user is subscribed to the Premium version of Mirayoki
    (don't worry it will not be that expensive as other bots hehehe) */
    serverID: { type: String, require: true },
    /* This string is filled with the server ID where the profile was created, 
    sometimes this helps us identify problems within an specific server.*/
    coins: { type: Number, default: 150 },
    /* This specifies how many coins a user has, by default, 
    this is set to 150 each user. */
    bank: { type: Number }
    /* This other one specifies how many coins a user has in their bank,
    which helps protect their money from muggers.*/
})

const model = mongoose.model('ProfileModels', profileSchema)

module.exports = model;
