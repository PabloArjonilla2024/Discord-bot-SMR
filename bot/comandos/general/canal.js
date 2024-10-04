const { ChannelType, PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("canal")
    .setDescription("Crear un canal único"),
  category: "general",
  usage: "Crear un canal único",
  n: "</canal:1276173928368181354>",
  async execute(interaction, client) {
    const miembro_rol = interaction.member.roles.cache.has("1107572341644480562");
    if (!miembro_rol) return interaction.reply({
      embeds: [new EmbedBuilder()
        .setDescription(`Debes tener el rol SMR para poder usar este comando.`)
        .setColor("Red")
        .setTimestamp()
        .setFooter({ text: 'Bot realizado por ACPARJO', iconURL: client.user.displayAvatarURL() })
      ], ephemeral: false
    });
    const canalcreado = interaction.guild.channels.cache.find(channel =>
      channel.type === ChannelType.GuildText && channel.name.startsWith("canal-") && channel.name.endsWith(interaction.member.user.username)
    );
    if (canalcreado)
      return interaction.reply({
        embeds: [new EmbedBuilder()
          .setDescription(`Ya tienes un canal único abierto: ${canalcreado}`)
          .setColor("Red")
          .setTimestamp()
          .setFooter({ text: 'Bot realizado por ACPARJO', iconURL: client.user.displayAvatarURL() })
        ], ephemeral: false
      });

    const canal_usuario = await interaction.guild.channels.create({
      name: `canal-${interaction.member.user.username}`,
      type: ChannelType.GuildText,
      parent: process.env.ID_CATEGORIA_CANAL_UNICO,
      permissionOverwrites: [
        {
          id: interaction.guild.id,
          deny: [PermissionsBitField.Flags.ViewChannel]
        },
        {
          id: interaction.member.id,
          allow: [PermissionsBitField.Flags.ViewChannel]
        }
      ]
    });

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('cerrar')
          .setLabel('Eliminar canal ❌')
          .setStyle(ButtonStyle.Secondary)
      );

    await canal_usuario.send({
      content: `${interaction.member.user}`, embeds: [new EmbedBuilder()
        .setDescription(`Este será tu canal propio, para eliminar el canal, reacciona al botón.`)
        .setColor("Green")
        .setTimestamp()
        .setFooter({ text: 'Bot realizado por ACPARJO', iconURL: client.user.displayAvatarURL() })
      ],
      components: [row]
    });

    await interaction.reply({
      embeds: [new EmbedBuilder()
        .setDescription(`Tu canal único es: ${canal_usuario}`)
        .setColor("Green")
        .setTimestamp()
        .setFooter({ text: 'Bot realizado por ACPARJO', iconURL: client.user.displayAvatarURL() })
      ], ephemeral: false
    });
  }
}