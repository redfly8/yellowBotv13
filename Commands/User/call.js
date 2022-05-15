const { CommandInteraction, MessageEmbed, Client, MessageActionRow, MessageButton } = require("discord.js");



module.exports = {
    name: "calladmin",
    description: "Call admin help.",
    options: [
        {
            name: "server",
            description: "Tell us what server the problem is in.",
            type: "STRING",
            required: true,
            choices: [
                { name: "silage", value: "silage" },
                { name: "grain", value: "grain" },
                { name: "private", value: "private" }
            ]

        },


        {
            name: "player",
            description: "Tell the admin who is breaking rules (if not needed just type X)",
            type: "STRING",
            required: true
        },
        {
            name: "description",
            description: "describe the problem.",
            type: "STRING",
            required: true
        }


    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    execute(interaction, client) {
        const Server = interaction.options.getString("server");

        const Description = interaction.options.getString("description");
        const Player = interaction.options.getString("player")
        const role = interaction.guild.roles.cache.get("923173795982901268")
        const response = new MessageEmbed()
            .setTitle(`❗A user (${interaction.user.tag}) needs help:`)
            .setColor("YELLOW")
            .addFields(
                { name: "Server:", value: `${Server}` },
                { name: "Name:", value: `${Player}` },
                { name: "Description", value: `${Description}` },
                { name: "Urgency:", value: `<@&${role.id}>` }

            );


        //HERE
        const channel = client.channels.cache.get("973649151227203584");

        const respembed = new MessageEmbed()
            .setTitle("✅ Success.")
            .setDescription("Your report was sent. Thank you for reporting and we hope the issue will be resolved soon.")

        const row = new MessageActionRow();
        row.addComponents(
            new MessageButton()
                .setCustomId("resolved")
                .setLabel("resolved")
                .setStyle("SUCCESS"),
            new MessageButton()
                .setCustomId("declined")
                .setLabel("decline")
                .setStyle("DANGER")



        )



        interaction.reply({ embeds: [respembed], ephemeral: false })
        channel.send({ embeds: [response], components: [row], content: `<@&${role.id}>` })







    }
}
