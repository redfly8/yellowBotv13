const { Client, CommandInteraction, MessageEmbed, ButtonInteraction } = require("discord.js");

module.exports = {
    id: "declined",

    /**
     * 
     * @param {ButtonInteraction} interaction 
     * @param {Client} client 
     */


    execute(interaction, client) {
        const embed = interaction.message.embeds[0];
        interaction.message.edit({ embeds: [embed.setColor("B06B6B").setDescription(`❌  declined by ${interaction.user}`)], components: [] })

    }
}