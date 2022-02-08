const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('quote')
		.setDescription('Save those memorable moments on a quotes channel.')
		.addStringOption(option => option.setName('message').setDescription('The text you want to quote').setRequired(true))
		.addChannelOption(option => option.setName('channel').setDescription('The channel where you will send the quote').setRequired(true))
		.addUserOption(option => option.setName('author').setDescription('If you are quoting someone else\'s message, mention who is the author')),

	async execute(interaction, client) {

		let quote = interaction.options.getString('message');
		/* This will get all the content on the 'message' string */

		let user;
		// This variable will hold the user who will appear as the author of the quote

		if (interaction.options.getUser('author')) {
			/* If an author is chosen, set user as the author chosen. */
			user = interaction.options.getUser('author');
		} else {
			/* Else, the user who executed the command will be the author. */
			user = interaction.user;
		}

		const date = new Date();

		const [month, day, year] = [calculateMonth(), date.getDate(), date.getFullYear()];
		/* This will give the current day, month, and year
        so it can then be displayed on the quote embed*/

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
		/* This function adds a number to the month array because arrays start at 0,
        so it would be werid for January to be Month 0, and December to be Month 11 */

		const channelOption = interaction.options.getChannel('channel');
		const channel = client.channels.cache.get(channelOption.id);
		// These variables will hold the channel that was chosen on the option and its ID

		const dontQuoteMe = new MessageEmbed()
			.setColor('#FF5733')
			.setTitle('Error')
			.setDescription('You cannot make Mirayoki the author of a quote.');

		const sentQuote = new MessageEmbed()
			.setColor('#55C2FF')
			.setTitle('Quote sent')
			.setDescription(`You just quoted *"${quote}"*, and will be preserved, for life, in the <#${channel.id}> channel.`)
			.setFooter({ text: `Sent on ${month} ${day}, ${year}` });

		const finalQuote = new MessageEmbed()
			.setColor('#FFC300')
			.setAuthor({ name: user.tag, iconURL: user.displayAvatarURL() })
			.setDescription(`*${quote}*`)
			.setFooter({ text: `${month} ${day}, ${year}` });

		if (channelOption.isText()) {
			// If the channel the used specified is a text one ...
			if (user.id === process.env.BOT_ID) {
				// If the author of the quote is Mirayoki ...
				return interaction.reply({ embeds: [dontQuoteMe], ephemeral: true });
				// ... returns an error message.
			} else {
				// However, if the user provided a valid quote...
				channel.send({ embeds: [finalQuote] }).then(() => {
					// ... it is sent to the 'quotes' channel ...
					return interaction.reply({ embeds: [sentQuote] });
					// ... and returns a success message.
				}).catch((err) => {
					throw err;
					/* In case something goes internally wrong, an error 
                   will be logged into the console for developers to see and solve. */
				});
			}
		} else if (channelOption.isVoice()) {
			// If the channel the user mentioned is not a text channel but a voice channel ...
			const thatsAVoiceChannel = new MessageEmbed()
				.setColor('#FF5733')
				.setTitle('Error')
				.setDescription(`Looks like <#${channel.id}> is a voice channel.`);
			return interaction.reply({ embeds: [thatsAVoiceChannel], ephemeral: true });
			// ... returns an error message.
		} else if (!channelOption.isText() && !channelOption.isVoice()) {
			// If the channel the user mentioned is not a text channel neither a voice one ...
			const invalidChannel = new MessageEmbed()
				.setColor('#FF5733')
				.setTitle('Error')
				.setDescription('Looks like the channel you mentioned is not a text channel.');
			return interaction.reply({ embeds: [invalidChannel], ephemeral: true });
			// ... returns an error message.
		}
	}
};