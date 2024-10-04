const { readdirSync } = require('fs');
const path = require("path");

module.exports = async (client) => {
	const eventosPath = path.join(__dirname, "../bot/eventos");
	const eventFiles = await readdirSync(eventosPath);

	for (const file of eventFiles) {
		const filePath = path.join(eventosPath, file);
		const event = require(filePath);
		if (event.once) {
			client.once(event.name, (...args) => event.execute(...args));
		} else {
			client.on(event.name, (interaction) => event.execute(interaction, client));
		}
	}
	console.log(`Se han iniciado correctamente todos los eventos de ${client.user.username}.`);
};