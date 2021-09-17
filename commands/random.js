module.exports = {
    name: 'random',
    aliases: ['rng'],
    description: 'Generates a random number and returns it on chat.',
    async execute(message, args, cmd, client, Discord, profileData) {

        let minNumber = undefined

        let maxNumber = undefined

        if (args[0] === 'help') {

            const rngHelpEN = new Discord.MessageEmbed()

                .setColor('#55C2FF')
                .setTitle('Generating a random number')
                .setDescription(`Let Mirayoki choose a random number for you.`)
                .addFields(
                    { name: 'Generating up to a maximum number', value: 'By default, if you choose a maximum number, the minimum number **will always be 1,** for example:' },
                    { name: '-rng 1500', value: 'This means Mirayoki will choose a number between **1** and **1500**.' },
                    { name: 'Generating from a minimum to a maximum number', value: 'You can specify from which number to what number you want Mirayoki to choose, example:' },
                    { name: '-rng 100 150', value: 'This will tell Mirayoki to choose a number between **100** and up to **150**.' },
                )
                .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setFooter('May the luck be with you!')

            const rngHelpES = new Discord.MessageEmbed()

                .setColor('#55C2FF')
                .setTitle('Generando un número aleatorio')
                .setDescription(`Deja que Mirayoki elija un número aleatorio por ti.`)
                .addFields(
                    { name: 'Generando hasta un número máximo', value: 'Si eliges un número máximo el número mínimo **siempre será 1.** Por ejemplo:,' },
                    { name: '-rng 1500', value: 'Esto significa que Mirayoki eligirá un número entre **1** y **1500**.' },
                    { name: 'Generando desde un número mínimo a un número máximo.', value: 'Puedes especificar desde que número hasta que número quieres que Mirayoki elija, ejemplo:' },
                    { name: '-random 100 150', value: 'Esto le dirá a Mirayoki que elija un número entre **100** y hasta **150**.' },
                )
                .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setFooter('Que la suerte esté contigo!')

            if (profileData.language == 'en') {
                return message.channel.send(rngHelpEN);
            } else if (profileData.language == 'es') {
                return message.channel.send(rngHelpES);
            }

        } else if (!args[0]) {

            const rngExplanationEN = new Discord.MessageEmbed()

                .setColor('#55C2FF')
                .setTitle('Mutlipurpose randomness.')
                .setDescription(`To get started, try **-random help**`)
                .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))

            const rngExplanationES = new Discord.MessageEmbed()

                .setColor('#55C2FF')
                .setTitle('Aleatoriedad multipropósito.')
                .setDescription(`Para empezar, usa **-random help**`)
                .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))

            if (profileData.language == 'en') {
                return message.channel.send(rngExplanationEN);
            } else if (profileData.language == 'es') {
                return message.channel.send(rngExplanationES);
            }

        } else if (args[0] && args[1]) {

            minNumber = args[0]

            maxNumber = args[1]
            
        } else if (args[0]) {

            minNumber = 1

            maxNumber = args[0]
        }

        if (maxNumber > 50000 || minNumber == 0 || maxNumber == 0 || maxNumber < 0 || minNumber < 0 || maxNumber < minNumber) {

            const invalidNumberRngEN = new Discord.MessageEmbed()

                .setColor('#FF5733')
                .setTitle('You can\'t do that, dear friend.')
                .setDescription(`You can only generate numbers from **1** and up to **50,000**`)
                .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setFooter('For help, use -rng help!')

            const invalidNumberRngES = new Discord.MessageEmbed()

                .setColor('#FF5733')
                .setTitle('No puedes hacer eso amigo mío.')
                .setDescription(`Solo puedes generar números desde **1** y hasta **50,000**`)
                .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setFooter('Para ayuda, usa -rng help!')

            if (profileData.language == 'en') {
                return message.channel.send(invalidNumberRngEN);
            } else if (profileData.language == 'es') {
                return message.channel.send(invalidNumberRngES);
            }
        } else {

            const randomNumber =  Math.floor((Math.random() * maxNumber) + minNumber);

            const rngEN = new Discord.MessageEmbed()

                .setColor('#55C2FF')
                .setTitle('And the chosen one is...')
                .setDescription(`**${randomNumber}.**`)
                .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setFooter(`Generated a number from ${minNumber} to ${maxNumber}`)

            const rngES = new Discord.MessageEmbed()

                .setColor('#55C2FF')
                .setTitle('Y el número es...')
                .setDescription(`**${randomNumber}.**`)
                .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setFooter(`Generé un número desde ${minNumber} hasta ${maxNumber}`)

            if (profileData.language == 'en') {
                return message.channel.send(rngEN);
            } else if (profileData.language == 'es') {
                return message.channel.send(rngES);
            }
        }
    }
}