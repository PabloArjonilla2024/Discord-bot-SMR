const fs = require("fs");
const { REST, Routes } = require('discord.js');
const path = require('path');

module.exports = async (client) => {
    const foldersPath = path.join(__dirname, '../bot/comandos');
    const commandFolders = fs.readdirSync(foldersPath);
    const commands = [];

    for (const folder of commandFolders) {
        const commandsPath = path.join(foldersPath, folder);

        if (fs.lstatSync(commandsPath).isDirectory()) {
            const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                const filePath = path.join(commandsPath, file);
                const command = require(filePath);
                if ('data' in command && 'execute' in command) {
                    commands.push(command.data.toJSON());
                    client.commands.set(command.data.name, command);
                } else {
                    console.log(`El comando en ${filePath} no tiene las propiedades "data" o "execute".`);
                }
            }
        }
    }

    const rest = new REST().setToken(process.env.BOT_TOKEN);

    (async () => {
        try {
            await rest.put(
                Routes.applicationGuildCommands(process.env.BOT_ID, process.env.GUILD_ID),
                { body: commands },
            );

            console.log(`Se han iniciado correctamente todos los slash.`);
        } catch (error) {
            console.error(error);
        }
    })();
}