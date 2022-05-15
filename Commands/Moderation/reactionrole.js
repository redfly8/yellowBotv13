const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const nodemon = require("nodemon");

module.exports = {
    name: "reactionrole",
    description: "set up a reaction role message.",
    permission: "ADMINISTRATOR",
    options: [
        {
            name: "role",
            description: "select which role you can get by reacting to the message.",
            required: true,
            type: "ROLE"
        },
        {
            name: "title",
            description: "sets a title for your final, nicely formatted embed.",
            required: true,
            type: "STRING"
        },
        {
            name: "reactions",
            description: "select how many reactions (numbers) you want to be added. (max: 5)",
            required: true,
            type: "INTEGER"

        },
        {
            name: "description",
            description: "sets the text for the outputted message. Describe your role and what you can do with it.",
            required: false,
            type: "STRING"
        }


    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const Role = interaction.options.getRole("role");
        const Title = interaction.options.getString("title");
        const Description = interaction.options.getString("description");
        const Reactions = interaction.options.getInteger("reactions");

        if (Reactions > 5) return interaction.reply({ content: "I can not add more than 5 numbers to the reactions." })

        var Response = new MessageEmbed()
            .setTitle(`${Title}`)
            .setFooter(`by: ${interaction.user.tag} role: ${Role.name}`)

        if (!Description) {

            var messagend = await interaction.channel.send({ embeds: [Response], ephemeral: false });

            for (let x = 0; x < Reactions; x++) {
                switch (x) {
                    case 0:
                        messagend.react('1️⃣');
                        break;
                    case 1:
                        messagend.react('2️⃣');
                        break;
                    case 2:
                        messagend.react('3️⃣');
                        break;
                    case 3:
                        messagend.react('4️⃣');
                        break;
                    case 4:
                        messagend.react('5️⃣');
                        break;
                }

            }
            interaction.reply({ content: "Created! =)" })

        } else {
            Response.setDescription(`Description`);
            interaction.reply({ embeds: [Response], ephemeral: false })

        }
    }
}