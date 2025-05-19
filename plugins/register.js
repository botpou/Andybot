

import { createHash } from 'crypto'
import fetch from 'node-fetch'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { text, usedPrefix, command }) {
// let idUser = await conn.groupMetadata(idgc)
    /*
if (Object.values(idUser.participants).find(user => user.id == m.sender)) {
*/
// nama
let namae = conn.getName(m.sender)
// database 
let user = global.db.data.users[m.sender]
// profile
const pp = await conn.profilePictureUrl(m.sender, "image").catch((_) => "https://telegra.ph/file/ee60957d56941b8fdd221.jpg")
// checking user
  if (user.registered === true) throw `bro ou anrejistre nan database la deja man sorry siw ap kreye kn lot kont ekri sa *${usedPrefix}unreg*`
  // input 
  if (!Reg.test(text)) return m.reply(`bro banm non avel laj ou\nEgzanp: .daftar Andy.17`)
  let [_, name, splitter, age] = text.match(Reg)
  if (!name) throw 'Bro ou bliye mete non w 👀'
  if (!age) throw 'ou bliye mete laj ou baz'
  age = parseInt(age)
  if (age > 30) throw 'C’est le début de la journée -_-'
  if (age < 5) throw 'ou pranm pou on kalanbe ki rete ave w ou panse on ti bebe ap ka use mwen ? 🤔;!'
  user.name = name.trim()
  user.age = age
  user.regTime = + new Date
  user.registered = true
  let sn = createHash('md5').update(m.sender).digest('hex')
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.fromMe ? conn.user.jid : m.sender
  let cap = `
╭━━「 *Informatyon*
│• *Nonw:* ${name}
│• *laj:* ${age} an
│• *Status:* _Success_
│• *Serial Number:* ${sn}
╰╾•••
`
await conn.sendMessage(m.chat, { text: cap,
contextInfo:
					{
						"externalAdReply": {
							"title": " ✔️ S U C C E S S  R E G I S T E T",
							"body": "",
							"showAdAttribution": true,
							"mediaType": 1,
							"sourceUrl": '',
							"thumbnailUrl": pp,
							"renderLargerThumbnail": true

						}
					}}, m)
					/*} else {
					await conn.reply(m.chat, '📢 انضم إلى مجموعة Silana Bot لتتمكن من التسجيل والوصول إلى مميزات البوت 😉', null)
					} */
}
handler.help = [ 'register']
handler.tags = ['infobot']

handler.command = /^(daftar|verify|reg(ister)?)$/i

export default handler

function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]
}