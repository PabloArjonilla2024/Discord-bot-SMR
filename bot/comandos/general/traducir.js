const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const translate = require('translate-google');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("traducir")
    .setDescription("Traducir un texto a distintos idiomas")
    .addStringOption(option => option
      .setName("texto")
      .setDescription("Escribe el texto a traducir")
      .setRequired(true)),
  category: "general",
  usage: "Convertir el texto a humano en vez de IA",
  n: "</traducir:1276173928368181356>",
  async execute(interaction, client) {
    const texto = interaction.options.getString("texto");
    if (texto.length >= 3800)
      return interaction.reply({
        embeds: [new EmbedBuilder()
          .setDescription("El texto debe ser menor a 3800 carácteres.")
          .setColor("Red")
          .setTimestamp()
          .setFooter({ text: 'Bot realizado por ACPARJO', iconURL: client.user.displayAvatarURL() })
        ], ephemeral: false
      })
    await interaction.reply({
      embeds: [new EmbedBuilder()
        .setDescription("Traduciendo...")
        .setColor("Green")
        .setTimestamp()
        .setFooter({ text: 'Bot realizado por ACPARJO', iconURL: client.user.displayAvatarURL() })
      ], ephemeral: false
    }).then(async (a) => {
      await translate(texto, { to: 'it' }).then(async (res) => {
        await translate(res, { to: 'af' }).then(async (res2) => {
          await translate(res2, { to: 'fr' }).then(async (res3) => {
            await translate(res3, { to: 'es' }).then(async (res4) => {
              await a.edit({
                embeds: [new EmbedBuilder()
                  .setDescription(res4)
                  .setColor("Green")
                  .setTimestamp()
                  .setFooter({ text: 'Bot realizado por ACPARJO', iconURL: client.user.displayAvatarURL() })
                ], ephemeral: false
              })
            })
          })
        })
      })
    }).catch(err => {
      return interaction.reply({
        embeds: [new EmbedBuilder()
          .setDescription("Ha ocurrio un error al traducir el texto.")
          .setColor("Red")
          .setTimestamp()
          .setFooter({ text: 'Bot realizado por ACPARJO', iconURL: client.user.displayAvatarURL() })
        ], ephemeral: false
      })
    })
  },
};