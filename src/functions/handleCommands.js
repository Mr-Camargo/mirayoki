const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const fs = require('fs');
const color = require('cli-color');
const date = new Date();

const clientId = process.env.BOT_ID;
const guildId = process.env.TESTING_SERVER_ID;
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

		const rest = new REST({ version: '10' }).setToken(process.env.SECRET_TOKEN);
		// This will be Discord's API that will be used to register application commands

		(async () => {
			try {
				console.log(color.blue('API'), 'Started updating application commands', color.blackBright(`at ${date}`));
				module.exports = function() {
					return 'Passed checks';
				};
				try {
					await rest.put(
						Routes.applicationGuildCommands(clientId, guildId),
						{ body: client.commandArray },
					);
				} catch (error) {
					console.log(color.red('ERROR'), color.blackBright(`at ${date}`) `Application commands were not updated in testing server: ${error}`);
				}
				/* This will update the application commands for
                the development server, making them available instantly. */

				await rest.put(
					Routes.applicationCommands(clientId),
					{ body: client.commandArray },
				);
				/* This will update the application commands for all servers,
                which may take up to one hour to be available on all of them. */

				console.log(color.blue('API'), 'Updated application commands', color.blackBright(`at ${date}`));
			} catch (error) {
				console.log(color.red('ERROR'), color.blackBright(`at ${date}`), `Application commands were not updated: ${error}`);
			}
		})();

	};
};