/* This event will trigger when someone joins the server, and create an entry on 
the database if the user has never been seen before. */

const profileModel = require('../../models/profileSchema');

module.exports = async (client, Discord, member) => {
    let profileData;
    try {
        profileData = await profileModel.findOne({ userID: member.id })
        if (!profileData) {
            let profile = await profileModel.create({
                userID: member.id,
                serverID: member.guild.id,
                language: 'en',
                premiumTier: 'free',
                coins: 100,
                bank: 0,
                clearanceLvl: 'None',
                staffUnit: 'None',
                gitHubClearance: 'None',
                staffPfp: 'None'
            });
            profile.save();
        }
    } catch (err) {
        console.log(err)
    }
}