const { EmbedBuilder, Events } = require('discord.js');
const Pagina_definicion = require("../../schemas/pagina_definicion.js");
const Pagina_instruccion = require("../../schemas/pagina_instruccion.js");
const embeds = require("../../extras/embeds.js");
const boton = require("../../extras/boton.js");

module.exports = {
  name: Events.InteractionCreate,
  once: false,
  async execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) {
      console.log(`No se ha encontrado el comando ${interaction.commandName}.`);
      return;
    }

    try {
      await command.execute(interaction, client);
    } catch (error) {
      console.log(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ content: '¡Hubo un error al ejecutar este comando!', ephemeral: true });
      } else {
        await interaction.reply({ content: '¡Hubo un error al ejecutar este comando!', ephemeral: true });
      }
    }

    if (interaction.isButton() && interaction.customId == "cerrar") {
      await interaction.update({
        embeds: [new EmbedBuilder()
          .setDescription("El canal único se eliminará en 5 segundos.")
          .setColor("Green")
          .setTimestamp()
        ], ephemeral: true
      })
      setTimeout(async () => interaction.channel.delete(), 5000);
    }

    if (interaction.isButton() && interaction.customId == "anterior_definicion") {
      let pagina_existe = await Pagina_definicion.findOne({ Usuario: interaction.user.id })

      const pages = [embeds.embed1(), embeds.embed2(), embeds.embed3(), embeds.embed4(), embeds.embed5(), embeds.embed6()];

      const pagina_actualizada = await Pagina_definicion.findOneAndUpdate(
        { Usuario: interaction.user.id },
        {
          $set:
            { Pag: Math.max(0, pagina_existe.Pag - 1) }
        },
        { new: true }
      );

      await interaction.update({ embeds: [pages[pagina_actualizada.Pag]], components: [boton.atras_siguiente_definiciones()], ephmeral: true });

    }

    if (interaction.isButton() && interaction.customId == "siguiente_definicion") {
      let pagina_existe = await Pagina_definicion.findOne({ Usuario: interaction.user.id })

      const pages = [embeds.embed1(), embeds.embed2(), embeds.embed3(), embeds.embed4(), embeds.embed5(), embeds.embed6()];

      const pagina_actualizada = await Pagina_definicion.findOneAndUpdate(
        { Usuario: interaction.user.id },
        {
          $set:
            { Pag: Math.min(pagina_existe.Pag + 1, pages.length - 1) }
        },
        { new: true }
      );

      await interaction.update({ embeds: [pages[pagina_actualizada.Pag]], components: [boton.atras_siguiente_definiciones()], ephmeral: true });

    }

    if (interaction.isButton() && interaction.customId == "anterior_instrucciones") {
      let pagina_existe = await Pagina_instruccion.findOne({ Usuario: interaction.user.id })

      const pages = [embeds.embed1_instrucciones(), embeds.embed2_instrucciones(), embeds.embed3_instrucciones(), embeds.embed4_instrucciones(), embeds.embed5_instrucciones()];

      const pagina_actualizada = await Pagina_instruccion.findOneAndUpdate(
        { Usuario: interaction.user.id },
        {
          $set:
            { Pag: Math.max(0, pagina_existe.Pag - 1) }
        },
        { new: true }
      );

      await interaction.update({ embeds: [pages[pagina_actualizada.Pag]], components: [boton.atras_siguiente_instrucciones()] });
    }

    if (interaction.isButton() && interaction.customId == "siguiente_instrucciones") {
      let pagina_existe = await Pagina_instruccion.findOne({ Usuario: interaction.user.id })

      const pages = [embeds.embed1_instrucciones(), embeds.embed2_instrucciones(), embeds.embed3_instrucciones(), embeds.embed4_instrucciones(), embeds.embed5_instrucciones()];

      const pagina_actualizada = await Pagina_instruccion.findOneAndUpdate(
        { Usuario: interaction.user.id },
        {
          $set:
            { Pag: Math.min(pagina_existe.Pag + 1, pages.length - 1) }
        },
        { new: true }
      );

      await interaction.update({ embeds: [pages[pagina_actualizada.Pag]], components: [boton.atras_siguiente_instrucciones()] });

    }
  }
}