const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const CONFIG = require('../../Structures/config.json')

module.exports = {
    name: "magic8",
    description: "ask a question and the bot will answer.",
    options: [
        {
            name: "question",
            description: "what do you want to ask the bot",
            required: true,
            type: "STRING"
        },
        {
            name: "public",
            description: "Do you want the answer to be visible to the whole channel defaultyes",
            type: "STRING",
            required: false,
            choices: [
                {
                    name: "yes",
                    value: "yes"
                },
                {
                    name: "no",
                    value: "no"
                }
            ]
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    execute(interaction, client) {
        const question = interaction.options.getString("question");
        const ephemeral = interaction.options.getString("public")

        var possAnswers = new Array("yes", "no", "maybe", "right now", "well, most definately not.", "hmmm, let me think...", "outlook is good.", "very doubtful", "kinda unsure tbh", "sure, go ahead")
        let num = Math.floor(Math.random() * 10)

        const answer = possAnswers[num];

        if (ephemeral == "yes" || !ephemeral) {
            let Response = new MessageEmbed()
                .setTitle('magic8')
                .setDescription(`**${interaction.member}** asked me **${question}**.\n \n My answer is: **${answer}**`)
            interaction.reply({ embeds: [Response], ephemeral: false })
        } else {
            interaction.reply({ content: answer, ephemeral: true });
        }
    }
}