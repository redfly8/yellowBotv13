const { MessageActionRow, MessageButton, CommandInteraction } = require("discord.js");
const CONFIG = require('../../Structures/config.json');

module.exports = {
    name: "ping",
    description: "sends a reply with the ping buttons.",
    roleID:`${CONFIG.DCMODROLEID}`,
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @returns 
     */

    execute(interaction) {
        const pingroleid = CONFIG.PINGROLEID;
        if (!interaction.member.permissions.has("MANAGE_MESSAGES")) {
            return interaction.reply({ content: "You need the message managing permission for this.", ephemeral: true })
        }
        if (!pingroleid) { return interaction.reply({ content: "It seems like your server hasn't got this command set up. Contact the bot admin (for now only wolf :P) and tell him to check the config.json and the config README files. ", ephemeral: true }) }
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