const { guildMember } = require("discord.js");

module.exports = {
    name: 'me',
    description: 'Gives you information about your Discord status.',
    async execute(message, args, cmd, client, Discord, profileData) {
        
        if (!args[0]) {
            var user = message.author;
        } else var user = message.mentions.users.first()

        const member = message.guild.member(user);

        const activities = [];
        for (const activity of user.presence.activities.values()) {
            switch (activity.type) {
                case 'PLAYING':
                    activities.push(`Playing **${activity.name}**`);
                    break;
                case 'LISTENING':
                    if (user.bot) activities.push(`Listening to **${activity.name}**`);
                    else activities.push(`Listening to **${activity.details}** by **${activity.state}**`);
                    break;
                case 'WATCHING':
                    activities.push(`Watching **${activity.name}**`);
                    break;
                case 'STREAMING':
                    activities.push(`Streaming **${activity.name}**`);
                    break;
                case 'CUSTOM_STATUS':
                    customStatus = activity.state;
                    break;
            }
        }

        let userStatus = null

        if (user.presence.status == "online") {
            userStatus = ":green_circle: Online"
        } else if (user.presence.status == "idle") {
            userStatus = ":crescent_moon: Idle"
        } else if (user.presence.status == "dnd") {
            userStatus = ":no_entry: Do Not Disturb"
        } else if (user.presence.status == "offline") {
            userStatus = ":white_circle: Invisible/Offline"
        }

        const meEN = new Discord.MessageEmbed()
            .setColor('#55C2FF')
            .setTitle(`This is you.`)
            .setDescription(`And you are **${user.username}**.`)
            .setThumbnail(user.avatarURL({ dynamic: true }))
            .addFields(
                { name: 'Username', value: user.tag },
                { name: 'Server Nickname', value: member.displayName },
                { name: 'User ID', value: user.id },
                { name: `Status`, value: userStatus + '\n \n' + activities },
                { name: 'Joined Discord:', value: user.createdAt },
                { name: `Roles on ${message.guild.name}`, value: '' + member.roles.cache.map(r => r).join(' | ') + '' },
            )
            .setFooter('You are beautiful!')

        return message.channel.send(meEN)
    }
}