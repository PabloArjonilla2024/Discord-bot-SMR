const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("red")
    .setDescription("Calculo de red")
    .addStringOption(option => option
      .setName('ip')
      .setDescription('Escribe la dirección IP')
      .setRequired(true))
    .addIntegerOption(option => option
      .setName('cidr')
      .setDescription('Escribe la máscara en CIDR')
      .setRequired(true)
      .setMinValue(1)
      .setMaxValue(32)),
  category: "dossmr",
  usage: "Obtener información sobre una red",
  n: "</red:1276173928368181352>",
  async execute(interaction, client) {
    const ip = interaction.options.getString("ip");
    const cidr = interaction.options.getInteger("cidr");

    if (isNaN(cidr) || cidr < 0 || cidr > 32)
      return interaction.reply({
        embeds: [new EmbedBuilder()
          .setDescription('La máscara CIDR debe ser un número entre 0 y 32.')
          .setColor("Red")
          .setTimestamp()
        ]
      });

    const subnetMask = calculateSubnetMask(cidr);
    const networkAddress = calculateNetworkAddress(ip, subnetMask);
    const broadcastAddress = calculateBroadcastAddress(networkAddress, subnetMask);
    const numberOfHosts = Math.pow(2, 32 - cidr) - 2;
    const firstIPAddress = calculateFirstIPAddress(networkAddress);
    const lastIPAddress = calculateLastIPAddress(broadcastAddress);

    return interaction.reply({
      embeds: [new EmbedBuilder()
        .setColor("Green")
        .setTimestamp()
        .setDescription(`**Dirección de Red:** ${networkAddress}\n**Máscara de Subred:** ${subnetMask}\n**Broadcast:** ${broadcastAddress}\n**Host que caben:** ${numberOfHosts}\n**Primer Host:** ${firstIPAddress}\n**Último Host:** ${lastIPAddress}`)
        .setFooter({ text: 'Bot realizado por ACPARJO', iconURL: client.user.displayAvatarURL() })
      ]
    })
  }
}
function calculateSubnetMask(cidr) {
  const subnetMask = '1'.repeat(cidr) + '0'.repeat(32 - cidr);
  return `${parseInt(subnetMask.slice(0, 8), 2)}.${parseInt(subnetMask.slice(8, 16), 2)}.${parseInt(subnetMask.slice(16, 24), 2)}.${parseInt(subnetMask.slice(24), 2)}`;
}

function calculateNetworkAddress(ip, subnetMask) {
  const ipParts = ip.split('.');
  const subnetParts = subnetMask.split('.');
  const networkParts = [];

  for (let i = 0; i < 4; i++) {
    networkParts.push(parseInt(ipParts[i]) & parseInt(subnetParts[i]));
  }

  return networkParts.join('.');
}

function calculateBroadcastAddress(networkAddress, subnetMask) {
  const networkParts = networkAddress.split('.');
  const subnetParts = subnetMask.split('.');
  const broadcastParts = [];

  for (let i = 0; i < 4; i++) {
    broadcastParts.push(parseInt(networkParts[i]) | (255 - parseInt(subnetParts[i])));
  }

  return broadcastParts.join('.');
}
function calculateFirstIPAddress(networkAddress) {
  const networkParts = networkAddress.split('.');
  networkParts[3]++;
  return networkParts.join('.');
}

function calculateLastIPAddress(broadcastAddress) {
  const broadcastParts = broadcastAddress.split('.');
  broadcastParts[3]--;
  return broadcastParts.join('.');
}