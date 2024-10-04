const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const math = require("math-expression-evaluator");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("calculo")
    .setDescription("Hacer una operación matemática")
    .addStringOption(option => option
      .setName("cuenta")
      .setDescription("Escribe la cuenta matemática")
      .setRequired(true)),
  category: "general",
  usage: "Hacer una cuenta matemática",
  n: "</calculo:1276173928368181353>",
  async execute(interaction, client) {
    const calculo = interaction.options.getString("cuenta");

    try {
      const resultado = math.eval(calculo);
      const suma = new EmbedBuilder()
        .setDescription(`Operación:\n\`\`\`js\n${calculo}\`\`\`\n\nResultado:\n\`\`\`js\n${resultado}\`\`\``)
        .setTitle("Calculadora")
        .setTimestamp()
        .setFooter({ text: 'Bot realizado por ACPARJO', iconURL: client.user.displayAvatarURL() });

      await interaction.reply({ embeds: [suma], ephemeral: false });
    } catch (error) {
      await interaction.reply({
        embeds: [new EmbedBuilder()
          .setDescription("Hubo un error al realizar la operación matemática.")
          .setColor("Red")
          .setTimestamp()
          .setFooter({ text: 'Bot realizado por ACPARJO', iconURL: client.user.displayAvatarURL() })
        ], ephemeral: false
      });
    }
  },
};
