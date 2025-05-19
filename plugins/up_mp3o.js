let handler = async (m, { conn, text }) => {
    let jidny = "120363417830138199@newsletter";
    if (!m.quoted) return m.reply("Répondre à un message audio, bro");

    let [title, customJidny] = text.split('|').map(v => v.trim());

    if (!title) return m.reply("Donne moi le titre de la music bro ?");
    if (customJidny) jidny = customJidny;

    try {
        await conn.sendMessage(jidny, {
            audio: await m.quoted.download(),
            mimetype: "audio/mp4",
            ptt: true,
            contextInfo: {
                forwardingScore: 2001,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: jidny,
                    serverMessageId: 2001,
                    newsletterName: "YO MD | CREATED BY MRLIT.A🔛"
                },
                externalAdReply: {
                    title: title,
                    body: null,
                    thumbnailUrl: "https://telegra.ph/file/a6294049a1863a69154cf.jpg",
                    sourceUrl: "https://instagram.com/shizxy_andy",
                    mediaType: 1,
                    showAdAttribution: true,
                    renderLargerThumbnail: false
                }
            }
        });
        const data = `
{ 
    status: 200,
    success: true,
    dev: "And",
    jid: "${jidny}"
}`;
        m.reply("Succefully");
    } catch (e) {
        m.reply("Bro bon w pa admin nan chaine nan man 😏");
    }
}

handler.help = ['up_mp3o']
handler.tags = ['owner']
handler.command = /^(up_mp3o|upcho)$/i
handler.owner = true
export default handler
