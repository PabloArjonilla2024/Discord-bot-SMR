const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("isos")
    .setDescription("Conseguir las isos que quieras")
    .addStringOption(option => option
      .setName("iso")
      .setDescription("Selecciona la ISO que deseas")
      .addChoices(
        { name: 'Ubuntu Server', value: 'ubuntus' },
        { name: 'Ubuntu Escritorio', value: 'ubuntue' },
        { name: 'Linux Mint', value: 'linuxm' },
        { name: 'Windows Server', value: 'windowss' },
        { name: 'Windows 10', value: 'windows10' },
        { name: 'Windows 11', value: 'windows11' },
      )
      .setRequired(true)),
  category: "dossmr",
  usage: "Obtener enlaces para las ISO",
  n: "</isos:1276173928368181351>",
  async execute(interaction, client) {
    const isos = interaction.options.getString("iso")
    switch (isos) {
      case "ubuntus": {
        return interaction.reply({
          embeds: [new EmbedBuilder()
            .setDescription(`Para descargar Ubuntu Servidor haz click [aquí](https://mega.nz/file/EekXEQaY#MMK-gMQYaPYQoYuj2v0TShP9GKuSeYGOpRFB8RIpJK8)`)
            .setColor("Green")
            .setTimestamp()
            .setFooter({ text: 'Bot realizado por ACPARJO', iconURL: client.user.displayAvatarURL() })
          ], ephemeral: false
        })
      } break;
      case "ubuntue": {
        return interaction.reply({
          embeds: [new EmbedBuilder()
            .setDescription(`Para descargar Ubuntu Escritorio haz click [aquí](https://mega.nz/file/df0FHDaA#YHE6FR0or8YWbMXJDlybiyx2PdZ3-ZffkTnHHZyjc1g)`)
            .setColor("Green")
            .setTimestamp()
            .setFooter({ text: 'Bot realizado por ACPARJO', iconURL: client.user.displayAvatarURL() })
          ], ephemeral: false
        })
      } break;
      case "linuxm": {
        return interaction.reply({
          embeds: [new EmbedBuilder()
            .setDescription(`Para descargar Linux Mint haz click [aquí](https://mega.nz/file/BaUhkbLZ#D8QKk_CdgJviZpgkUCz37qhsuVw-5fLXe_x8R1zzJPM)`)
            .setColor("Green")
            .setTimestamp()
            .setFooter({ text: 'Bot realizado por ACPARJO', iconURL: client.user.displayAvatarURL() })
          ], ephemeral: false
        })
      } break;
      case "windowss": {
        return interaction.reply({
          embeds: [new EmbedBuilder()
            .setDescription(`Para descargar Windows Servidor haz click [aquí](https://mega.nz/file/Ue932KKb#AJwQTs03aQOCrjhr5Ir0sDwKQDkHLO3P4BMgu-9rjvI)`)
            .setColor("Green")
            .setTimestamp()
            .setFooter({ text: 'Bot realizado por ACPARJO', iconURL: client.user.displayAvatarURL() })
          ], ephemeral: false
        })
      } break;
      case "windows10": {
        return interaction.reply({
          embeds: [new EmbedBuilder()
            .setDescription(`Para descargar Windows 10 haz click [aquí](https://mega.nz/file/QL0XwBTQ#yHpZvU61nIsFM_iscOm2A9AJHnzVbwl2YS1X4TSllV4)`)
            .setColor("Green")
            .setTimestamp()
            .setFooter({ text: 'Bot realizado por ACPARJO', iconURL: client.user.displayAvatarURL() })
          ], ephemeral: false
        })
      } break;
      case "windows11": {
        return interaction.reply({
          embeds: [new EmbedBuilder()
            .setDescription(`Para descargar Windows 11 haz click [aquí](https://mega.nz/file/YSNyiZLR#OEB5GW3ClYoQV4VjtzcdVYnWvYWLRBbP7DugVP9Itws)`)
            .setColor("Green")
            .setTimestamp()
            .setFooter({ text: 'Bot realizado por ACPARJO', iconURL: client.user.displayAvatarURL() })
          ], ephemeral: false
        })
      } break;
    }
  },
};
