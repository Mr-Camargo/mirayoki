const { Client, Intents, Collection } = require('discord.js');

const client = new Client({intents: [32767]});

client.commands = new Collection();

require('dotenv').config();

const fs = require('fs');

const functions = fs.readdirSync('./src/functions').filter(file=> file.endsWith('.js'));
const eventFiles = fs.readdirSync('./src/events').filter(file=> file.endsWith('.js'));
const commandFolders = fs.readdirSync('./src/commands');

const date = new Date();

console.log(`Started a deploy at ${date}`);
// Once you start running Mirayoki, this timestamp will be displayed on the console.

(async () => {
    for (file of functions){
        require (`./functions/${file}`)(client);
    }
    client.handleEvents(eventFiles, "./src/events");
    client.handleCommands(commandFolders, "./src/commands");
    client.dbLogin();
    client.login(process.env.SECRET_TOKEN);
})();
// This finally logs in Mirayoki into Discord's servers.