const Discord = require('discord.js');

require('dotenv').config();

const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });

const mongoose = require("mongoose");

const fs = require('fs');

const memberCounter = require('./counters/member-counter')

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
})

mongoose.connect(process.env.MONGO_SRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}).then(()=>[
    console.log('Connected succesfully to MongoDB')
]).catch((err) =>{
    console.log(err);
});

client.once('ready', () => {
    console.log('Mirayoki has been deployed succesfully.');
    memberCounter(client);
    client.user.setActivity('IZ*ONE', { type: "LISTENING" })
        .then(presence => console.log(`RP Deployed succesfully as "${presence.activities[0].type} ${presence.activities[0].name}"`))
        .catch(console.error);
});

client.on('guildMemberAdd', guildMember =>{
    let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'Member');

    guildMember.roles.add(welcomeRole);
    guildMember.guild.channels.cache.get('795664960423329793').send(`Welcome <@${guildMember.user.id}>, have a good time!`)
});

client.login(process.env.SECRET_TOKEN);