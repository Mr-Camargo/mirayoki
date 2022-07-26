const { EmbedBuilder, SlashCommandBuilder, ChannelType } = require('discord.js');
const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);
module.exports = {
	data: new SlashCommandBuilder()
		.setName('quote')
		.setDescription('Save those memorable moments on a quotes channel.')
		.addStringOption(option => option.setName('message').setDescription('The text you want to quote').setRequired(true))
		.addChannelOption(option => option.setName('channel').setDescription('The channel where you will send the quote').setRequired(true))
		.addUserOption(option => option.setName('author').setDescription('If you are quoting someone else\'s message, mention who is the author')),

	async execute(interaction, client) {
		try {
			const quote = interaction.options.getString('message');
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

			const channelOption = interaction.options.getChannel('channel');
			const channel = client.channels.cache.get(channelOption.id);
			// These variables will hold the channel that was chosen on the option and its ID

			const dontQuoteMe = new EmbedBuilder()
				.setColor('#FF5733')
				.setTitle('Error')
				.setDescription('You cannot make Mirayoki the author of a quote.');

			const sentQuote = new EmbedBuilder()
				.setColor('#55C2FF')
				.setTitle('Quote sent')
				.setDescription(`You have successfully sent a quote to the ${channelOption} channel. It will be preserved for life there.`)
				.addFields(
					{ name: 'Your quote:', value: trim(quote, 1024) }
				);

			const longQuote = new EmbedBuilder()
				.setColor('#FF5733')
				.setTitle('Error')
				.setDescription('That is a very long quote.')
				.addFields(
					{ name: 'Try again?', value: 'Maybe you want to make your quote smaller. If so, here it is so you don\'t have to write it all over again.' },
					{ name: 'Your quote', value: trim(quote, 1024) }
				);

			const finalQuote = new EmbedBuilder()
				.setColor('#FFC300')
				.setAuthor({ name: user.tag, iconURL: user.displayAvatarURL() })
				.setDescription(`*${trim(quote, 1022)}*`)
				.setFooter({ text: `From #${interaction.channel.name}` });

			if (channelOption.type === ChannelType.GuildText) {
				// If the channel the used specified is a text one ...
				if (user.id === process.env.BOT_ID) {
					// If the author of the quote is Mirayoki ...
					return await interaction.reply({ embeds: [dontQuoteMe], ephemeral: true });
					// ... returns an error message.
				} else {
					if (quote.length >= 1022) {
						return await interaction.reply({ embeds: [longQuote], ephemeral: true });
					} else if (user.id !== interaction.user.id) {
						sentQuote.addFields(
							{ name: 'Author:', value: `${user}` }
						);
						finalQuote.setFooter({ text: `From #${interaction.channel.name} - Quoted by ${interaction.user.tag}` });
						// This conditional will make the user who provided the quote visible if they are authoring someone else.
					}
					// However, if the user provided a valid quote...
					channel.send({ embeds: [finalQuote] }).then(() => {
						// ... it is sent to the 'quotes' channel ...
						return interaction.reply({ embeds: [sentQuote] });
						// ... and returns a success message.
					}).catch((error) => {
						throw error;
						/* In case something goes internally wrong, an error
					   will be logged into the console for developers to see and solve. */
					});
				}
			} else if (channelOption.type === ChannelType.GuildVoice) {
				// If the channel the user mentioned is not a text channel but a voice channel ...
				const thatsAVoiceChannel = new EmbedBuilder()
					.setColor('#FF5733')
					.setTitle('Error')
					.setDescription(`Looks like ${channelOption} is a voice channel.`);
				return await interaction.reply({ embeds: [thatsAVoiceChannel], ephemeral: true });
				// ... returns an error message.
			} else {
				// If the channel the user mentioned is not a text channel neither a voice one ...
				const invalidChannel = new EmbedBuilder()
					.setColor('#FF5733')
					.setTitle('Error')
					.setDescription('Looks like the channel you mentioned is not a text channel.');
				return await interaction.reply({ embeds: [invalidChannel], ephemeral: true });
				// ... returns an error message.
			}
		} catch (error) {
			const unknownError = new EmbedBuilder()
				.setColor('#FF5733')
				.setTitle('Unknown Error')
				.setDescription(`${error}`)
				.setFooter({ text: 'If the error persists, please contact support using /support' });

			return await interaction.reply({ embeds: [unknownError] });
		}
	}
};