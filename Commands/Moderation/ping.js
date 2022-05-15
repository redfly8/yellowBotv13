const { MessageActionRow, MessageButton, CommandInteraction } = require("discord.js");

module.exports = {
    name: "ping",
    description: "sends a reply with the ping buttons.",

    execute(interaction) {
        const row = new MessageActionRow();
        row.addComponents(
            new MessageButton()
                .setCustomId("Ping")
                .setLabel("Ping role")
                .setStyle("SUCCESS"),


        )
        interaction.reply({ components: [row] });
    }
}