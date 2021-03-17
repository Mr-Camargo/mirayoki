module.exports = {
    name: 'perms',
    description: "Display current permissions",
    execute(message, args, cmd, client, Discord) {

        const adminAlert = new Discord.MessageEmbed()

            .setColor('#55C2FF')
            .setTitle('**Unlimited Power!**')
            .setAuthor(`For ${message.author.username}`)
            .setDescription('You are an **Administrator** of this server so you have all permissions!')
            .setFooter(`@everyone bow to the great ${message.author.username}`)

        if (message.member.permissions.has("ADMINISTRATOR")) {
            message.channel.send(adminAlert);
        } else {
            if (message.member.permissions.has("CREATE_INSTANT_INVITE")) {
                message.channel.send('- You can create invites to this server.');
            } else {
                message.channel.send('- You **CAN´T** create invites to this server.');
            }
            if (message.member.permissions.has("KICK_MEMBERS")) {
                message.channel.send('- You can kick members from this server.   (*dont kick me plz*)');
            } else {
                message.channel.send('- You **CAN´T** kick members from this server.');
            }
            if (message.member.permissions.has("BAN_MEMBERS")) {
                message.channel.send('- You can ban members from this server.');
            } else {
                message.channel.send('- You **CAN´T** ban members from this server.');
            }
            if (message.member.permissions.has("MANAGE_CHANNELS")) {
                message.channel.send('- You can manage channels in this server.');
            } else {
                message.channel.send('- You **CAN´T** manage channels in this server.');
            }
        }
    }
}

// All flags are available at https://discord.js.org/#/docs/main/stable/class/Permissions?scrollTo=s-FLAGS