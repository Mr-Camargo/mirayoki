const Discord = require('discord.js');

require('dotenv').config();

const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });

const mongoose = require("mongoose");

const fs = require('fs');

const memberCounter = require('./counters/member-counter')

const date = new Date();

console.log(`Started a deploy at ${date}`);

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
})

mongoose.connect(process.env.MONGO_SRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}).then(() => [
    console.log(`Connected succesfully to MongoDB at ${date}`)
]).catch((err) => {
    console.log(err);
});

client.once('ready', () => {
    console.log(`Mirayoki has been deployed succesfully at ${date}`);
    memberCounter(client);
    client.user.setActivity('Kwon Eun Bi\'s "Open"', { type: "LISTENING" })
        .then(presence => console.log(`Rich Presence Deployed succesfully as "${presence.activities[0].type} ${presence.activities[0].name}" at ${date}`))
        .catch(console.error);
});

/* Not ready yet!
client.on('guildMemberAdd', guildMember => {
    let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'Member');
    let welcomeChannel = guildMember.guild.channels.cache.find(c => c.name === 'welcome');
    if (welcomeRole) {
        guildMember.roles.add(welcomeRole);
        if (welcomeChannel) {
            guildMember.guild.channels.cache.get('795664960423329793').send(`Welcome <@${guildMember.user.id}>, have a good time!`)
        }
    } else {

    }
}); 
*/

client.login(process.env.SECRET_TOKEN);