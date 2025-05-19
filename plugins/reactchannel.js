/*
FEATURE: REACT TO WHATSAPP CHANNEL 😹
*/

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw ("Veuillez saisir le lien d’un canal WhatsApp au format correct. exemple :\n\n*.reactchannel* https://whatsapp.com/channel/0029VaX4b6J7DAWqt3Hhu01A/475");

  const match = text.match(/https:\/\/whatsapp\.com\/channel\/(\w+)(?:\/(\d+))?/);
  if (!match) throw ("URL non valide. Veuillez vérifier.");

  const channelId = match[1];
  const chatId = match[2];
  if (!chatId) throw ("L’identifiant de chat ne se trouve pas dans le lien fourni.");

  // Your default channel ID
  const defaultChannelId = "120363417830138199@newsletter";

  conn.newsletterMetadata("invite", channelId || defaultChannelId).then(data => {
    if (!data) throw ("Newsletter not found or an error occurred.");

    conn.newsletterReactMessage(data.id, chatId, text.split(" ").slice(1).join(" ") || "🇮​🇳​🇫​🇱​🇺​🇪​🇳​🇨​🇪​🇺​🇷​🇸​");
  });

  m.reply("Success");
}

handler.help = ['reactchannel'];
handler.command = ['reactchannel'];
handler.tags = ['owner'];
handler.owner = true
export default handler;
