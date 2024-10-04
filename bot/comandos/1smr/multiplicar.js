const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('multiplicar')
    .setDescription('Multiplicar números')
    .addStringOption(option => option
      .setName('base')
      .addChoices(
        { name: 'Binario', value: 'binario' },
        { name: 'Octal', value: 'octal' },
        { name: 'Hexadecimal', value: 'hexadecimal' },
        { name: 'Decimal', value: 'decimal' },
      )
      .setDescription('Escribe qué tipo de operación deseas hacer')
      .setRequired(true))
    .addStringOption(option => option
      .setName('primernumero')
      .setDescription('Ingresa el primer número para el cálculo')
      .setRequired(true))
    .addStringOption(option => option
      .setName('segundonumero')
      .setDescription('Ingresa el segundo número para el cálculo')
      .setRequired(true)),
  category: "unosmr",
  usage: "Realizar una operación de multiplicación",
  n: "</multiplicar:1276173927852544057>",
  async execute(interaction, client) {
    const primernumero = interaction.options.getString('primernumero');
    const segundonumero = interaction.options.getString('segundonumero');
    const baseSeleccionada = interaction.options.getString('base');

    let numero1Decimal, numero2Decimal;

    switch (baseSeleccionada) {
      case 'binario':
        numero1Decimal = parseInt(primernumero, 2);
        numero2Decimal = parseInt(segundonumero, 2);
        break;
      case 'decimal':
        numero1Decimal = parseInt(primernumero, 10);
        numero2Decimal = parseInt(segundonumero, 10);
        break;
      case 'hexadecimal':
        numero1Decimal = parseInt(primernumero, 16);
        numero2Decimal = parseInt(segundonumero, 16);
        break;
      case 'octal':
        numero1Decimal = parseInt(primernumero, 8);
        numero2Decimal = parseInt(segundonumero, 8);
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

    const resultadoDecimal = numero1Decimal * numero2Decimal;

    switch (baseSeleccionada) {
      case 'binario':
        await interaction.reply({
          embeds: [new EmbedBuilder()
            .setDescription(`El resultado de la multiplicación en binario es: ${resultadoDecimal.toString(2)}`)
            .setColor("Green")
            .setTimestamp()
            .setFooter({ text: 'Bot realizado por ACPARJO', iconURL: client.user.displayAvatarURL() })
          ], ephemeral: false
        });
        break;
      case 'decimal':
        await interaction.reply({
          embeds: [new EmbedBuilder()
            .setDescription(`El resultado de la multiplicación en decimal es: ${resultadoDecimal}`)
            .setColor("Green")
            .setTimestamp()
            .setFooter({ text: 'Bot realizado por ACPARJO', iconURL: client.user.displayAvatarURL() })
          ], ephemeral: false
        });
        break;
      case 'hexadecimal':
        await interaction.reply({
          embeds: [new EmbedBuilder()
            .setDescription(`El resultado de la multiplicación en hexadecimal es: ${resultadoDecimal.toString(16)}`)
            .setColor("Green")
            .setTimestamp()
            .setFooter({ text: 'Bot realizado por ACPARJO', iconURL: client.user.displayAvatarURL() })
          ], ephemeral: false
        });
        break;
      case 'octal':
        await interaction.reply({
          embeds: [new EmbedBuilder()
            .setDescription(`El resultado de la multiplicación en octal es: ${resultadoDecimal.toString(8)}`)
            .setColor("Green")
            .setTimestamp()
            .setFooter({ text: 'Bot realizado por ACPARJO', iconURL: client.user.displayAvatarURL() })
          ], ephemeral: false
        });
        break;
    }
  },
};
