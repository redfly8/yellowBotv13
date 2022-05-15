const { Client, CommandInteraction } = require("discord.js")



module.exports = {
    id: "Ping",
    permission: "BAN_MEMBERS",
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */

    execute(interaction, client) {
        const pingrole = interaction.guild.roles.cache.get('931644626031509584');

        if (interaction.member.roles.cache.has('931644626031509584')) {
            interaction.reply({ content: "You now wont be notified if someone needs help in game anymore.", ephemeral: true })
            interaction.member.roles.remove(pingrole);
        } else {
            interaction.member.roles.add(pingrole);
            interaction.reply({ content: "You will now receive a ping if someone needs help in game. if you don't want that anymore, just klick the button again.", ephemeral: true })

        }

    }
}