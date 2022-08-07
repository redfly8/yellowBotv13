const { CommandInteraction, MessageEmbed, Client } = require("discord.js");
const { db } = require("../../Models/infractions");
const DB = require('../../Models/infractions');
const CONFIG = require('../../Structures/config.json')


module.exports = {
    name: "ban",
    description: "ban a member",
    permission: "ADMINISTRATOR",
    roleID:`${CONFIG.DCADMINROLEID}`,
    options: [
        {
            name: "member",
            description: "Select who you want to ban",
            type: "USER",
            required: true

        },
        {
            name: "reason",
            description: "State why you are banning that member.",
            type: "STRING",
            required: true
        },
        {
            name: "messagedelete",
            description: "Select a number of days if you want to clear the message history for that time. Max: 7 days.",
            type: "INTEGER",
            required: false,
            choices: [
                { name: "1", value: 1 },
                { name: "2", value: 2 },
                { name: "3", value: 3 },
                { name: "4", value: 4 },
                { name: "5", value: 5 },
                { name: "6", value: 7 },
                { name: "7", value: 7 },





            ]
        }
    ],

    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */


    async execute(interaction, client) {

        const repchannel = client.channels.cache.get(CONFIG.DCREPID)

        const { options, guild, member } = interaction;


        const Reason = options.getString("reason");
        const Msgdel = options.getInteger("messagedelete");
        const Target = options.getMember("member");



        const Failembed = new MessageEmbed()
            .setColor("YELLOW");

        const Succembed = new MessageEmbed()
            .setColor("DARK_GREEN");

        if (interaction.member.id == Target.id) {
            Failembed.setDescription("You can not ban yourself.")
            return interaction.reply({ embeds: [Failembed] });
        }
        if (Target.roles.highest.position > interaction.member.roles.highest.position) {
            Failembed.setDescription("You can not ban someone with a higher role.")
            return interaction.reply({ embeds: [Failembed] });
        }

        if (Target.permissions.has("BAN_MEMBERS")) {
            Failembed.setDescription("Out of security reasons you can not ban someone with banning perms using this bot.")
            return interaction.reply({ embeds: [Failembed] });
        }

        if (!interaction.member.permissions.has("BAN_MEMBERS")) {
            Failembed.setDescription("You do not have banning permissions. Don't try to (ab)use such moderation tools or you will be banned!");
            repchannel.send({ content: `<@&${CONFIG.DCADMINROLEID}>,${interaction.user} (${interaction.user.tag}) just tried to BAN ${Target} with reason ${Reason} but did not have sufficient permissions.` })
            return interaction.reply({ embeds: [Failembed] })
        }
        if (Target.user.tag == client.user.tag) {
            Failembed.setDescription("You can't ban this bot using this bot... If you want to remove it, please use the built in kicking or banning function.");
            return interaction.reply({ embeds: [Failembed], ephemeral: true })
        }

        Succembed.addFields(
            { name: "Admin:", value: `${interaction.user.tag}` },
            { name: "Target:", value: `${Target}` },
            { name: "Reason:", value: `${Reason}` },
        )
        Succembed.setTitle(`⛔ **Ban** ⛔`)







        try {
            let banmachine = await Target.send(`You have been banned from ${interaction.guild.name} by ${interaction.user.tag} for ${Reason}.`);
            Target.ban({ days: Msgdel, reason: Reason })
            Succembed.setFooter(`✅This info was also sent to the user.✅`)




        } catch {
            Target.ban({ days: Msgdel, reason: Reason })
            Succembed.setFooter(`❗This info was not sent to the user since the DM could not be sent.❗`)



        }
        repchannel.send({ embeds: [Succembed] })
        interaction.reply({ content: "✅ Ban successful.", ephemeral: true })
    }
}
