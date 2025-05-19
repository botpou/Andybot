import { toAudio } from '../lib/converter.js'

let handler = async (m, { conn, usedPrefix, command }) => {
    let chat = global.db.data.chats[m.chat]
    let q = m.quoted ? m.quoted : m
    let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''
    
    if (!/video|audio/.test(mime)) throw `Veuillez répondre avec une vidéo ou une note vocale que vous souhaitez convertir en audio/mp3 en utilisant la légende *${usedPrefix + command}*`
    
    let media = await q.download?.()
    if (!media) throw 'Impossible de télécharger des médias'
    
    let audio = await toAudio(media, 'mp4')
    if (!audio.data) throw 'Impossible de convertir des médias en audio'
    
    conn.sendFile(m.chat, audio.data, 'audio.mp3', '', m, null, { mimetype: 'audio/mp4', asDocument: chat.useDocument })
}

handler.help = ['tomp3']
handler.tags = ['tools']
handler.command = /^to(mp3|a(udio)?)$/i
handler.limit = true 
export default handler
