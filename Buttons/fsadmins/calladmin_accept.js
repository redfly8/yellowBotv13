const { Client, CommandInteraction, MessageEmbed, ButtonInteraction } = require("discord.js");

module.exports = {
    id: "resolved",

    /**
     * 
     * @param {ButtonInteraction} interaction 
     * @param {Client} client 
     */


    execute(interaction, client) {
        const embed = interaction.message.embeds[0];
        interaction.message.edit({ embeds: [embed.setColor("GREY")], components: [] })

    }
}