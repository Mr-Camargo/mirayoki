const Discord = require('discord.js');

require('dotenv').config();

const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });

// IMPORTANT: If you want to change globally the prefix, go to .env file

const fs = require('fs');

const memberCounter = require('./counters/member-counter')

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
})

client.once('ready', () => {
    console.log('Mirayoki has been deployed succesfully.');
    memberCounter(client);
    client.user.setActivity('K-Pop', { type: "LISTENING" })
        .then(presence => console.log(`Rich Prescence Deployed succesfully as "${presence.activities[0].type} ${presence.activities[0].name}"`))
        .catch(console.error);
});

client.on('guildMemberAdd', guildMember =>{
    let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'Member');

    guildMember.roles.add(welcomeRole);
    guildMember.guild.channels.cache.get('795664960423329793').send(`Welcome <@${guildMember.user.id}>, have a good time!`)
});

client.login(process.env.SECRET_TOKEN);