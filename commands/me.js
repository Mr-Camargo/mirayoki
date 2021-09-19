const { guildMember } = require("discord.js");

module.exports = {
    name: 'me',
    description: 'Gives you information about your Discord status.',
    async execute(message, args, cmd, client, Discord, profileData) {

        let user = null

        let checkingOtherUser = null

        if (!args[0]) {
            user = message.author;
            checkingOtherUser = false
        } else if (args[0]) {
            if (message.mentions.members.first()) {
                user = message.mentions.users.first()
                if (user == message.author) {
                    checkingOtherUser = false
                } else if (user) {
                    checkingOtherUser = true
                }
            } else {
                if (args[0] == 'help') {
                    user = undefined
                    checkingOtherUser = undefined
                } else {
                    user = message.author
                    checkingOtherUser = false
                }
            }
        }

        if (user && !checkingOtherUser) {

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
                    { name: `Status`, value: userStatus + '\n' + activities },
                    { name: 'Joined Discord:', value: user.createdAt },
                    { name: `Roles on ${message.guild.name}`, value: '' + member.roles.cache.map(r => r).join(' | ') + '' },
                )
                .setFooter('You are beautiful!')

            return message.channel.send(meEN)

        } else if (user && checkingOtherUser) {
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

            const themEN = new Discord.MessageEmbed()
                .setColor('#55C2FF')
                .setTitle(`This is **${user.username}**.`)
                .setThumbnail(user.avatarURL({ dynamic: true }))
                .addFields(
                    { name: 'Username', value: user.tag },
                    { name: 'Server Nickname', value: member.displayName },
                    { name: 'User ID', value: user.id },
                    { name: `Status`, value: userStatus + '\n' + activities },
                    { name: 'Joined Discord:', value: user.createdAt },
                    { name: `Roles on ${message.guild.name}`, value: '' + member.roles.cache.map(r => r).join(' | ') + '' },
                )
                .setFooter('You and them are beautiful!')

            return message.channel.send(themEN)
        } else if (user == undefined && checkingOtherUser == undefined) {

            const helpEN = new Discord.MessageEmbed()

            .setColor('#55C2FF')
                .setTitle(`How to check someone's public information`)
                .setDescription(`With Mirayoki, you can see more in-depth details about yourself or someone else!`)
                .addFields(
                    { name: 'What can you check', value: 'Mirayoki respects user privacy, that\'s why we ask to the Discord\'s API to give us information about a user, and Mira just displays that information for you.'},
                    { name: 'Username', value: 'Your Username at Discord is how people can mention/befriend you.', inline: true },
                    { name: 'Server Nickname', value: 'This is how you are named **in this server only**.', inline: true },
                    { name: 'User ID', value: 'This unique identifier is given to you when you first create your Discord account, and never changes.', inline: true },
                    { name: 'Status', value: 'Your online status.', inline: true },
                    { name: 'Joined Discord', value: 'This is the exact date and time you created your Discord account, provided by Discord\'s API.', inline: true },
                    { name: `Roles on ${message.guild.name}`, value: `Lists all your roles on **${message.guild.name} ONLY**.`, inline: true },
                    { name: 'How to check', value: 'Know how to use the -me command.'},
                    { name: `-me`, value: 'This provides all the information about you.', inline: true },
                    { name: '-me @Sum1Else', value: 'This provides all the information about someone else you mention.', inline: true },
                )
                .setFooter('If you are still having trouble, be sure to type -support for more help!')

                return message.channel.send(helpEN)

        } else {
            const errorEN = new Discord.MessageEmbed()

                .setColor('#FF5733')
                .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setTitle(`Error`)
                .setDescription(`Something bad happened while trying to get data for this user!`)

            return message.channel.send(errorEN)
        }
    }
}