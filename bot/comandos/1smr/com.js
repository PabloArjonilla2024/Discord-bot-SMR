const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('com')
        .setDescription('Calcula el complemento a 1 y a 2 de un número binario.')
        .addIntegerOption(option => option
            .setName('numero')
            .setDescription('Ingresa el número')
            .setRequired(true)),
    category: "unosmr",
    usage: "Complemento C1 y C2",
    n: "</com:1276173927852544053>",
    async execute(interaction, client) {
        try {
            const decimalNumber = interaction.options.getInteger('numero');

            if (isNaN(decimalNumber)) {
                return interaction.reply({
                    embeds: [new EmbedBuilder()
                        .setDescription('El valor ingresado no es un número válido.')
                        .setColor("Red")
                        .setTimestamp()
                        .setFooter({ text: 'Bot realizado por ACPARJO', iconURL: client.user.displayAvatarURL() })
                    ], ephemeral: false
                });
            }

            const result = performComplementOperations(decimalNumber, 8);
            await interaction.reply({
                embeds: [new EmbedBuilder()
                    .setColor("Green")
                    .setTimestamp()
                    .setDescription(`Decimal: ${result.decimal}\nBinario: ${result.binary}\nComplemento a 1: ${result.onesComplement}\nComplemento a 2: ${result.twosComplement}`)
                    .setFooter({ text: 'Bot realizado por ACPARJO', iconURL: client.user.displayAvatarURL() })
                ]
            });

        } catch (error) {
            return interaction.reply({
                embeds: [new EmbedBuilder()
                    .setDescription("Ha ocurrido un error")
                    .setColor("Red")
                    .setTimestamp()
                    .setFooter({ text: 'Bot realizado por ACPARJO', iconURL: client.user.displayAvatarURL() })
                ], ephemeral: false
            })
        }
    }
};

function decimalToBinary(decimal, bits) {
    const unsignedBinary = Math.abs(decimal).toString(2);
    const binary = decimal < 0
        ? twosComplement(unsignedBinary).padStart(bits, '1')
        : unsignedBinary.padStart(bits, '0');

    return binary;
}


function onesComplement(binary) {
    return binary
        .split('')
        .map(bit => (bit === '0' ? '1' : '0'))
        .join('');
}

function twosComplement(binary) {
    const onesComp = onesComplement(binary);
    const sum = decimalToBinary(parseInt(onesComp, 2) + 1, binary.length);
    return sum.slice(-binary.length);
}

function performComplementOperations(decimalNumber, bits) {
    const binaryRepresentation = decimalToBinary(decimalNumber, bits);
    const onesComplementResult = onesComplement(binaryRepresentation);
    const twosComplementResult = twosComplement(binaryRepresentation);

    return {
        decimal: decimalNumber,
        binary: binaryRepresentation,
        onesComplement: onesComplementResult,
        twosComplement: twosComplementResult,
    };
}