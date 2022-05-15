const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const mongoose = require("mongoose");


module.exports = {
    name: "kick",
    description: "kicks a member and logs this.",
    permission: "KICK_MEMBERS",

    options: [
        {
            name: "member",
            description: "select the member you want to kick.",
            required: true,
            type: "USER"
        },
        {
            name: "reason",
            description: "select why you are kicking the member.",
            required: true,
            type: "STRING"
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */

    execute(interaction, client) {
        const repchannel = client.channels.cache.get("957360683924742204");
        const Target = interaction.options.getUser("member");
        const Reason = interaction.options.getString("reason");

        const Failembed = new MessageEmbed()
            .setColor("RED")
            .setTitle("Fail...")
        const Succembed = new MessageEmbed()
            .setColor("DARK_GREEN")
            .setTitle("⛔⛔ Ban ⛔⛔")
    }

}