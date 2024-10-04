const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('conversion')
    .setDescription('Convertir número en diferentes bases')
    .addStringOption(option => option
      .setName('base')
      .addChoices(
        { name: 'Binario', value: 'binario' },
        { name: 'Octal', value: 'octal' },
        { name: 'Hexadecimal', value: 'hexadecimal' },
        { name: 'Decimal', value: 'decimal' },
      )
      .setDescription('Escribe la base numérica del número')
      .setRequired(true))
    .addStringOption(option => option
      .setName('numero')
      .setDescription('Ingresa el número')
      .setRequired(true)),
  category: "unosmr",
  usage: "Convertir un número a las demás bases",
  n: "</conversion:1276173927852544054>",
  async execute(interaction, client) {

    const baseSeleccionada = interaction.options.getString('base');
    const numero = interaction.options.getString('numero');

    let numeroDecimal;

    switch (baseSeleccionada) {
      case 'binario':
        numeroDecimal = parseInt(numero, 2);
        break;
      case 'decimal':
        numeroDecimal = parseInt(numero, 10);
        break;
      case 'hexadecimal':
        numeroDecimal = parseInt(numero, 16);
        break;
      case 'octal':
        numeroDecimal = parseInt(numero, 8);
        break;
      default:
        return interaction.reply({
          embeds: [new EmbedBuilder()
            .setDescription('Selecciona una base numérica válida: binario, decimal, hexadecimal u octal.')
            .setColor("Red")
            .setTimestamp()
            .setFooter({ text: 'Bot realizado por ACPARJO', iconURL: client.user.displayAvatarURL() })
          ], ephemeral: false
        });
    }

    const numeroBinario = numeroDecimal.toString(2);
    const numeroHexadecimal = numeroDecimal.toString(16);
    const numeroOctal = numeroDecimal.toString(8);

    await interaction.reply({
      embeds: [new EmbedBuilder()
        .setDescription(`**Número en Decimal:** ${numeroDecimal}\n**Número en Binario:** ${numeroBinario}\n**Número en Hexadecimal:** ${numeroHexadecimal}\n**Número en Octal:** ${numeroOctal}`)
        .setColor("Green")
        .setTimestamp()
        .setFooter({ text: 'Bot realizado por ACPARJO', iconURL: client.user.displayAvatarURL() })
      ], ephemeral: false
    });
  },
};
