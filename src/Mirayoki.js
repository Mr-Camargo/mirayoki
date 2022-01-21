const { Client, Intents, Collection } = require('discord.js');

const client = new Client({intents: [32767]});

client.commands = new Collection();

require('dotenv').config();

const mongoose = require("mongoose");

const fs = require('fs');

const functions = fs.readdirSync('./src/functions').filter(file=> file.endsWith('.js'));
const eventFiles = fs.readdirSync('./src/events').filter(file=> file.endsWith('.js'));
const commandFolders = fs.readdirSync('./src/commands');

const date = new Date();

console.log(`Started a deploy at ${date}`);
// Once you start running Mirayoki, this timestamp will be displayed on the console.

mongoose.connect(process.env.MONGO_SRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}).then(() => [
    console.log(`Connected succesfully to MongoDB at ${date}`)
    // You will see the exact time that Mirayoki have reached the database.
]).catch((err) => {
    console.log(err);
});

client.on('ready', () => {
    console.log(`Mirayoki has been deployed succesfully at ${date}`);
    // This tells you the exact time Mirayoki have reached Discord's servers.
    // memberCounter(client); (Refer to line 46)
    //client.user.setPresence({ activities: [{ name: 'with discord.js' }] })
        //.then(presence => console.log(`Rich Presence Deployed succesfully as "${presence.activities[0].type} ${presence.activities[0].name}" at ${date}`))
        // This will just print the Rich Presence that you have chosen for Mirayoki.
        //.catch(console.error);
});

/* Not ready yet! (But is going to be a welcoming message :D)
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
(async () => {
    for (file of functions){
        require (`./functions/${file}`)(client);
    }
    client.handleEvents(eventFiles, "./src/events");
    client.handleCommands(commandFolders, "./src/commands");
    client.login(process.env.SECRET_TOKEN);
})();
// This finally logs in Mirayoki into Discord's servers.