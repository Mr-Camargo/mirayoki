require('dotenv').config();

const profileModel = require('../../models/profileSchema');

module.exports = async (Discord, client, message) => {
    const prefix = process.env.PREFIX;

    let profileData;
    try {
        profileData = await profileModel.findOne({ userID: message.author.id })
        if (!profileData) {
            let profile = await profileModel.create({
                userID: message.author.id,
                serverID: message.guild.id,
                language: 'en',
                premiumTier: 'free',
                coins: 100,
                bank: 0,
                clearanceLvl: 'none',
                staffUnit: 'none',
                gitHubClearance: 'none',
            });
            profile.save();
        }
    } catch (err) {
        console.log(err)
    }

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd) ||
        client.commands.find(a => a.aliases && a.aliases.includes(cmd));

    if (command) command.execute(message, args, cmd, client, Discord, profileData, profileData);
}