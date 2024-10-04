const { ActivityType, Events } = require("discord.js");
const Recordatorio = require('../../schemas/recordatorios.js');
const moment = require('moment');

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    console.log("Evento ready iniciado")
    client.user.setPresence({
      activities: [{
        name: `hacer la tarea`,
        type: ActivityType.Listening
      }],
      status: 'online',
    });

    /*
    const now = moment().tz('Europe/Madrid').toDate();
    const reminders = await Recordatorio.find({ time: { $gt: now } });
  
    reminders.forEach(reminder => {
      const reminderTime = moment(reminder.time).tz('Europe/Madrid').toDate();
      const delay = reminderTime.getTime() - Date.now();
      const recordatorio_usuario = new EmbedBuilder()
        .setTitle("⏰ ¡Has recibido un Nuevo Recordatorio!")
        .setDescription(`Vengo a recordarte lo siguiente:\n "${reminder.message}"`)
        .setColor("Green")
        .setTimestamp()
        .setFooter({ text: 'Bot realizado por ACPARJO', iconURL: client.user.displayAvatarURL() })
      if (delay > 0) {
        setTimeout(async () => {
          try {
            const user = await client.users.fetch(reminder.userId);
            if (user) {
              await user.send({ embeds: [recordatorio_usuario] });
              await Recordatorio.deleteOne({ userId: user.id });
            }
          } catch (error) {
            console.error(`Error enviando el recordatorio al usuario ${reminder.userId}:`, error);
          }
        }, delay);
      }
    })*/
  }
}