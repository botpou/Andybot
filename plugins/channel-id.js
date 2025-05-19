import { generateWAMessageFromContent } from '@adiwajshing/baileys';

let handler = async (m, { text, conn }) => {
  if (!text) return m.reply('bro banm lien channel lan man.');
  if (!text.includes('https://whatsapp.com/channel/')) return m.reply('Invalid link provided.');
  
  let result = text.split('https://whatsapp.com/channel/')[1];
  let res = await conn.newsletterMetadata('invite', result);
  
  let teks = `*ID:* ${res.id}\n*Non:* ${res.name}\n*kantite abone:* ${res.subscribers}\n*Status:* ${res.state}\n*Verified:* ${res.verification === 'VERIFIED' ? 'Verified' : 'Not Verified'}`;

  await m.reply(teks);
};

handler.help = handler.command = ['channel-id'];
handler.tags = ['tools'];
handler.limit = true;

export default handler;
