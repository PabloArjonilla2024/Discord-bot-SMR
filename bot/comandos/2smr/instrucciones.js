const { SlashCommandBuilder } = require('discord.js');
const Pagina = require("../../../schemas/pagina_instruccion.js");
const embeds = require("../../../extras/embeds.js");
const boton = require("../../../extras/boton.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("instrucciones")
    .setDescription("Ver instrucciones de como hacer cálculos de redes"),
  category: "dossmr",
  usage: "Instrucciones para el cálculo de redes",
  n: "</instrucciones:1276173927852544060>",
  async execute(interaction, client) {
    let pagina_existe = await Pagina.findOne({ Usuario: interaction.user.id })
    if (!pagina_existe) {
      pagina_existe = new Pagina({
        Usuario: interaction.user.id,
        Pag: 0
      });
      await pagina_existe.save();
    }

    const pages = [embeds.embed1_instrucciones(), embeds.embed2_instrucciones(), embeds.embed3_instrucciones(), embeds.embed4_instrucciones(), embeds.embed5_instrucciones()];

    interaction.reply({ embeds: [pages[pagina_existe.Pag]], components: [boton.atras_siguiente_instrucciones()], ephemeral: true });
  }
}