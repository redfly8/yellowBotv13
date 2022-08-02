const { ContextMenuInteraction, MessageEmbed } = require("discord.js");


module.exports = {
    name: "userinfo",
    type: "USER",


    /**
     * 
     * @param {ContextMenuInteraction} interaction 
     */

    async execute(interaction) {
        if (!interaction.member.permissions.has("ADMINISTRATOR")) { return interaction.reply({ content: "For privacy reasons you need the administrator flag to use this command.", ephemeral: true }) }
        const target = await interaction.guild.members.fetch(interaction.targetId);

        const Response = new MessageEmbed()
            .setColor("DARK_BLUE")
            .setAuthor(target.user.tag, target.user.avatarURL({ dynamic: true, size: 512 }))
            .setThumbnail(target.user.avatarURL({ dynamic: true, size: 512 }))
            .addField("ID", `${target.user.id}`)
            .addField("Roles:", `${target.roles.cache.map(r => r).join(" ").replace("@everyone", "") || "None"}`)
            .addField("Member Since", `<t:${parseInt(target.joinedTimestamp / 1000)}:R>`, true)
            .addField("Discord user Since", `<t:${parseInt(target.user.createdTimestamp / 1000)}:R>`, true)

        interaction.reply({ embeds: [Response], ephemeral: true })

    }


}