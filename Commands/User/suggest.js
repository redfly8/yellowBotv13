const { CommandInteraction, MessageEmbed, Client } = require("discord.js");

const { options } = require("nodemon/lib/config");
const CONFIG = require('../../Structures/config.json')

module.exports = {
    name: "suggest",
    description: "Create a suggestion",
    roleID:`${CONFIG.DEVROLEID}`,
    options: [
        {
            name: "type",
            description: "Select a category.",
            required: true,
            type: "STRING",
            choices: [
                {
                    name: "Bot feature",
                    value: "bot feature."
                },
                {
                    name: "Mod for the private server",
                    value: "mod for private."
                },
                {
                    name: "General discord related suggestion",
                    value: "discord suggestion."
                }

            ]

        },
        {
            name: "name",
            description: "Provide a name for your idea",
            type: "STRING",
            required: true
        },
        {
            name: "description",
            description: "Describe your idea",
            type: "STRING",
            required: true
        }

    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const { options } = interaction;

        const modchannel = client.channels.cache.get("975081716991529014");
        const generalsuggchan = client.channels.cache.get("975081776282222634");
        const botfeaturechan = client.channels.cache.get("975081685462962186");

        const type = options.getString("type");
        const name = options.getString("name");
        const funcs = options.getString("description")
        const user = interaction.user
        const Response = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`${interaction.member} suggested a ${type}`)
            .addField("Name", `${name}`, false)
            .addField("Description:", `${funcs}`, false)
            .setFooter(user.tag, user.avatarURL({ dynamic: true, size: 512 }))
        interaction.reply({ content: "Your idea is being sent to the correct channel.", ephemeral: true })

        switch (type) {
            case "bot feature.":
                let msg = await botfeaturechan.send({ embeds: [Response] })
                msg.react('✅')
                msg.react('⛔')

                break;
            case "mod for private.":
                let msg2 = await modchannel.send({ embeds: [Response] })
                msg2.react('✅')
                msg2.react('⛔')

                break
            case "discord suggestion.":
                let msg3 = await generalsuggchan.send({ embeds: [Response] })
                msg3.react('✅')
                msg3.react('⛔')



        }

    }
}