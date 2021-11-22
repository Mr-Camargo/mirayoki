// This code doesn't work yet

/* module.exports = {
    name: 'reactionrole',
    description: "Sets up a reaction role message!",
    async execute(message, args, cmd, client, Discord, profileData) {
        const channel = '795758779999453264';
        const poyosTeamRole = message.guild.roles.cache.find(role => role.name === "poyos");
        const pikasTeamRole = message.guild.roles.cache.find(role => role.name === "pikas");
 
        const poyosTeamEmoji = '👋';
        const pikasTeamEmoji = '❌';
 
        let embed = new Discord.MessageEmbed()
            .setColor('#e42643')
            .setTitle('Choose a team')
            .setDescription('Choosing a team will allow you to interact with your teammates!\n\n'
                + `${poyosTeamEmoji} for poyo team\n`
                + `${pikasTeamEmoji} for pika team`);
 
        let messageEmbed = await message.channel.send(embed);
        messageEmbed.react(poyosTeamEmoji);
        messageEmbed.react(pikasTeamEmoji);
 
        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
 
            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === poyosTeamEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(poyosTeamRole);
                }
                if (reaction.emoji.name === pikasTeamEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(pikasTeamRole);
                }
            } else {
                return;
            }
 
        });
 
        client.on('messageReactionRemove', async (reaction, user) => {
 
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
 
 
            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === poyosTeamEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(poyosTeamRole);
                }
                if (reaction.emoji.name === pikasTeamEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(pikasTeamRole);
                }
            } else {
                return;
            }
        });
    }
 
}  */