const command_handler = require("../../handlers/command_handler");
require('dotenv').config();

module.exports = (Discord, client, message) =>{
   const prefix = process.env.PREFIX;
   // IMPORTANT: If you want to change globally the prefix

   if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd);

    if(command) command.execute(client, message, args, Discord)
}