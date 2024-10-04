const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

function createButtons(botones) {
  return new ActionRowBuilder().addComponents(
    botones.map(button => (
      new ButtonBuilder()
        .setCustomId(button.id)
        .setLabel(button.label)
        .setStyle(button.style)
    ))
  );
}

function createButtonsEmoji(botones) {
  return new ActionRowBuilder().addComponents(
    botones.map(button => (
      new ButtonBuilder()
        .setCustomId(button.id)
        .setEmoji(button.emoji)
        .setStyle(button.style)
    ))
  );
}

module.exports = {
  botones_ayuda: () => createButtonsEmoji([
    { id: "GENERAL", emoji: "🌎", style: ButtonStyle.Secondary },
    { id: "UNOSMR", emoji: "1️⃣", style: ButtonStyle.Secondary },
    { id: "DOSSMR", emoji: "2️⃣", style: ButtonStyle.Secondary }
  ]),
  atras_siguiente_definiciones: () => createButtons([
    { id: 'anterior_definicion', label: 'Anterior', style: ButtonStyle.Primary },
    { id: 'siguiente_definicion', label: 'Siguiente', style: ButtonStyle.Primary }
  ]),
  atras_siguiente_instrucciones: () => createButtons([
    { id: 'anterior_instrucciones', label: 'Anterior', style: ButtonStyle.Primary },
    { id: 'siguiente_instrucciones', label: 'Siguiente', style: ButtonStyle.Primary }
  ]),
}