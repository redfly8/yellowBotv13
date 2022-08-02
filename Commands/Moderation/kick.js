const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const mongoose = require("mongoose");
const CONFIG = require('../../Structures/config.json')


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

    async execute(interaction, client) {
        const repchannelid = CONFIG.DCREPID;
        const repchannel = client.channels.cache.get(repchannelid);
        const Target = interaction.options.getMember("member");
        const Reason = interaction.options.getString("reason");

        const Failembed = new MessageEmbed()
            .setColor("RED")
            .setTitle("Fail...")
        const Repembed = new MessageEmbed()
            .setColor("DARK_ORANGE")
            .setTitle("⛔ Kick ⛔")
        const Succembed = new MessageEmbed()
            .setColor("GREEN")
            .setTitle("✅Success✅")

        if (!interaction.member.permissions.has("KICK_MEMBERS")) {
            Failembed.setDescription("You do not have kicking permissions. Do not try to abuse moderation tools or you will be banned!")
            repchannel.send({ content: `<@&${CONFIG.DCADMINROLEID}>,${interaction.user} (${interaction.user.tag}) just tried to kick ${Target} with reason ${Reason} but did not have sufficient permissions.` })
            return interaction.reply({ embeds: [Failembed], ephemeral: true });

        }
        if (interaction.user.tag == Target.user.tag) {
            Failembed.setDescription("You can't kick or ban yourself...")
            return interaction.reply({ embeds: [Failembed], ephemeral: true })
        }
        if (Target.user.tag == client.user.tag) {
            Failembed.setDescription("I can't kick myself... If you want to remove this bot, use the manual kicking or banning function.")
            return interaction.reply({ embeds: [Failembed], ephemeral: true })
        }
        if (Target.roles.highest.position > interaction.member.roles.highest.position) {
            Failembed.setDescription("You can't kick someone with higher roles than you.");
            return interaction.reply({ embeds: [Failembed], ephemeral: true })


        }

        try {
            await Target.send(`You have been kicked from ${interaction.guild.name} by ${interaction.user.tag}. Reason: ${Reason}`);
            Target.kick(`${Reason}`);
            Repembed.setFooter("✅ This info was also sent to the user.✅")
        } catch {
            Target.kick(`${Reason}`);
            Repembed.setFooter("❗This info was not sent to the user since the DM could not be sent.❗")
        }
        Repembed.addFields(
            { name: "Admin:", value: `${interaction.user.tag}` },
            { name: "Target:", value: `${Target.user.tag}` },
            { name: "Reason:", value: `${Reason}` }

        )
        Succembed.setDescription(` ${Target.user.tag} was kicked from the server.`)
        repchannel.send({ embeds: [Repembed] })
        interaction.reply({ embeds: [Succembed], ephemeral: true });
    }

}