const { SlashCommandBuilder } = require('discord.js');
const Pagina = require("../../../schemas/pagina_definicion.js");
const embeds = require("../../../extras/embeds.js");
const boton = require("../../../extras/boton.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("definiciones")
    .setDescription("Ver definiciones del temario"),
  category: "unosmr",
  usage: "Ver definiciones del temario",
  n: "</definiciones:1276173927852544055>",
  async execute(interaction, client) {
    let pagina_existe = await Pagina.findOne({ Usuario: interaction.user.id })
    if (!pagina_existe) {
      pagina_existe = new Pagina({
        Usuario: interaction.user.id,
        Pag: 0
      });
      await pagina_existe.save();
    }

    const pages = [embeds.embed1(), embeds.embed2(), embeds.embed3(), embeds.embed4(), embeds.embed5(), embeds.embed6()];

    interaction.reply({ embeds: [pages[pagina_existe.Pag]], components: [boton.atras_siguiente_definiciones()] });
  }
}