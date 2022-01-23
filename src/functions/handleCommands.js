const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const date = new Date();

const clientId = process.env.BOT_ID;
const guildId = '834499596968656897';
// This Guild ID is from the development server

module.exports = (client) => {
    client.handleCommands = async (commandFolders, path) => {
        client.commandArray = [];
        for (folder of commandFolders) {
            const commandFiles = fs.readdirSync(`${path}/${folder}`).filter(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                const command = require(`../commands/${folder}/${file}`);
                // Set a new item in the Collection
                // With the key as the command name and the value as the exported module
                client.commands.set(command.data.name, command);
                client.commandArray.push(command.data.toJSON());
            }
        }

        const rest = new REST({ version: '9' }).setToken(process.env.SECRET_TOKEN);
        // This will be Discord's API that will be used to register application commands

        (async () => {
            try {
                console.log(`Started updating application commands at ${date}`);

                await rest.put(
                    Routes.applicationGuildCommands(clientId, guildId),
                    { body: client.commandArray },
                );
                /* This will update the application commands for 
                the development server, making them available instantly. */

                await rest.put(
                    Routes.applicationCommands(clientId),
                    { body: client.commandArray },
                );
                /* This will update the application commands for all servers,
                which may take up to one hour to be available on all of them. */             

                console.log(`Updated application commands at ${date}`);
            } catch (err) {
                console.error(err);
            }
        })();

    }
}