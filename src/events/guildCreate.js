const { MessageEmbed } = require('discord.js');

const date = new Date();

const [month, day, year] = [calculateMonth(), date.getDate(), date.getFullYear()];
/* This will give the current day, month, and year
so it can then be displayed on the welcome embed*/

function calculateMonth() {
	let realMonth;
	switch (date.getMonth()) {
		case 0:
			realMonth = 'January';
			break;
		case 1:
			realMonth = 'February';
			break;
		case 2:
			realMonth = 'March';
			break;
		case 3:
			realMonth = 'April';
			break;
		case 4:
			realMonth = 'May';
			break;
		case 5:
			realMonth = 'June';
			break;
		case 6:
			realMonth = 'July';
			break;
		case 7:
			realMonth = 'August';
			break;
		case 8:
			realMonth = 'September';
			break;
		case 9:
			realMonth = 'October';
			break;
		case 10:
			realMonth = 'November';
			break;
		case 11:
			realMonth = 'December';
			break;
	}
	return realMonth;
}


module.exports = {
	name: 'guildCreate',
	once: true,
	async execute(guild, client) {
		const channel = guild.systemChannel;

		const welcomeEmbed = new MessageEmbed()

			.setColor('#EF6565')
			.setTitle('👋🏼 Hey there!')
			.setDescription(`**It's me. <@${process.env.BOT_ID}>!** \n \n Looks like I just arrived here. \n \n I will help make this server work like never before, with faster and powerful features, you will see that **${guild.name}** will become an awesome server!`)
			.addFields(
				{ name: 'How do I start?', value: 'Feel free to explore my commands using **slash commands** (/)!' },
				{ name: 'Need help getting started?', value: 'Make sure to join my support server for any doubts! \n Run `/support` for more information.' }
			)
			.setFooter({ text: `Let's go have some fun! ■ ${month} ${day}, ${year}` });

		const welcomeEmbedDM = new MessageEmbed()

			.setColor('#EF6565')
			.setTitle(`For the owner of *${guild.name}*`)
			.setDescription(`👋🏼 Hey there! \n Let me introduce myself, I am <@${process.env.BOT_ID}>!`)
			.addFields(
				{ name: 'Why am I receiving this?', value: `I do not intend to spam you, but I just wanted to let you know that I was added to a server you own (**${guild.name}**).` },
				{ name: 'Why are you telling *me* this?', value: 'If there was a **system messages channel** on your server I would have sent this over there, but I didn\'t found one. \n \n So I wanted to let you know over here so you know about my presence in your lovely server :heart:' },
				{ name: 'How do I start?', value: 'Feel free to explore my commands using **slash commands** (/)!' },
				{ name: 'Need help getting started?', value: 'Make sure to join my support server for any doubts! \n Run `/support` for more information.' }
			)
			.setFooter({ text: `Let's go have some fun! ■ ${month} ${day}, ${year}` });

		try {
			if (channel) {
				// If there is a System Updates Channel in the guild, Mirayoki will send an arrival message.
				channel.send({ embeds: [welcomeEmbed] });
			} else {
				// If there isn't, Mirayoki will try to contact the owner of the guild.
				client.users.cache.get(guild.ownerId).send({ embeds: [welcomeEmbedDM] });
			}
		} catch (error) {
			// If there is an error while trying to do so, it will be logged.
			console.error(`An error has occured when trying to send an arrival message: ${error}`);
		}
	}
};