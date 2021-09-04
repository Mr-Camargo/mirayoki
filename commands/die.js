module.exports = {
    name: 'die',
    aliases: ['roll'],
    description: 'Throws a die, and returns the result on chat',
    async execute(message, args, cmd, client, Discord, profileData) {
        if (args[0] === 'help') {

            const dieHelpEN = new Discord.MessageEmbed()

                .setColor('#55C2FF')
                .setTitle('How to throw a die')
                .setDescription(`Using Mirayoki, it's easier than ever to throw a die!`)
                .addFields(
                    { name: 'Example dices', value: 'To get started, you can use an example die from here:' },
                    { name: '-die', value: 'Throws a standard, 6-faced die.', inline: true },
                    { name: '-die 4', value: 'Throws a 4-faced die.', inline: true },
                    { name: '-die 8', value: 'Throws 8-faced die.', inline: true },
                    { name: '-die 10', value: 'Throws 10-faced die, useful for D&D.', inline: true },
                    { name: '-die 20', value: 'Throws 20-faced die, useful for D&D.', inline: true },
                    { name: '-die 60', value: 'Throws a 60-faced die.', inline: true },
                    { name: 'Other dice', value: 'You can throw a die with as many faces you want (up to 120), just type the number of faces you want your die to have after the -die command.' },
                )
                .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setFooter('May the luck be with you!')

                const dieHelpES = new Discord.MessageEmbed()

                .setColor('#55C2FF')
                .setTitle('Como tirar un dado')
                .setDescription(`Con Mirayoki, tirar un dado es más fácil que nunca!`)
                .addFields(
                    { name: 'Ejemplos de dados', value: 'Puedes comenzar a usar dados con alguno de los ejemplos debajo:' },
                    { name: '-die', value: 'Tira un dado estándar de 6 caras.', inline: true },
                    { name: '-die 4', value: 'Tira un dado de 4 caras.', inline: true },
                    { name: '-die 8', value: 'Tira un dado de 8 caras.', inline: true },
                    { name: '-die 10', value: 'Tira un dado de 10 caras, útil para C&D.', inline: true },
                    { name: '-die 20', value: 'Tira un dado de 20 caras, útil para C&D.', inline: true },
                    { name: '-die 60', value: 'Tira un dado de 60 caras.', inline: true },
                    { name: 'Otros dados', value: 'Puedes tirar un dado con el número de caras de tu preferencia, solo escribe el número de caras que quieres que tenga tu dado después del commando -die.' },
                )
                .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setFooter('Que la suerte esté contigo!')

                if (profileData.language == 'en') {
                    return message.channel.send(dieHelpEN);
                } else if (profileData.language == 'es') {
                    return message.channel.send(dieHelpES);
                }

        } else {

            let numberFaces = args[0]

            if (!args[0]) {
                numberFaces = 6
            } else if (args[0] > 120 || args[0] < 3) {

                const InvalidDieEN = new Discord.MessageEmbed()

                .setColor('#FF5733')
                .setTitle('You can\'t throw that die.')
                .setDescription(`You can only throw dice with up to **120** faces and with at least **3** faces.`)
                .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setFooter('For help, use -die help!')

                const InvalidDieES = new Discord.MessageEmbed()

                .setColor('#FF5733')
                .setTitle('No puedes tirar ese dado.')
                .setDescription(`Solo puedes tirar dados con hasta **120** caras y por lo menos con **3** caras.`)
                .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setFooter('Para ayuda, usa -die help!')

                if (profileData.language == 'en') {
                    return message.channel.send(InvalidDieEN);
                } else if (profileData.language == 'es') {
                    return message.channel.send(InvalidDieES);
                }
            }

            const DieResult = Math.floor(Math.random() * numberFaces) + 1;

            const DieEN = new Discord.MessageEmbed()

                .setColor('#55C2FF')
                .setTitle('You threw a die...')
                .setDescription(`**${DieResult}.**`)
                .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setFooter('For more dice, use -die help!')

            const DieES = new Discord.MessageEmbed()

                .setColor('#55C2FF')
                .setTitle('Tiraste un dado...')
                .setDescription(`**${DieResult}.**`)
                .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setFooter('Para más dados, usa -die help!')

            if (profileData.language == 'en') {
                return message.channel.send(DieEN);
            } else if (profileData.language == 'es') {
                return message.channel.send(DieES);
            }
        }
    }
}