import { watchFile, unwatchFile } from 'fs'
import fs from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'

/*
Setting
*/
global.setting = {
 clearSesi: false, // trash cleaner sessions 
 clearTmp: true, // tmp trash cleaner
 addReply: true, // create with thumbnail in message
 idgc: '1203633158824185@g.us' // id gc buat join only
 }

global.info = {
 nomerbot : '50955343978',
 pairingNumber : '50955343978',
 figlet: 'yomd', // create a start console display
 nomorwa : '50955343978',
 nameown : 'Shizzy Andy',
 nomerown : '13056978303',
 packname : 'sticker by ',
 author : 'YO MD',
 namebot : '乂 YO MD',
 wm : 'YO MD.',
 stickpack : 'Whatsapp',
 stickauth : 'YO MD',
 jid: '@s.whatsapp.net'
}

// Thumbnail 
global.media = {
 ppKosong : 'https://i.ibb.co/3Fh9V6p/avatar-contact.png',
 didyou : 'https://telegra.ph/file/e40219cc8d472025f18b6.jpg',
 rulesBot : 'https://telegra.ph/file/7cd8985216ffd3c376238.jpg',
 thumbnail : 'https://telegra.ph/file/a6294049a1863a69154cf.jpg',
 thumb : 'https://telegra.ph/file/a6294049a1863a69154cf.jpg',
 logo : 'https://telegra.ph/file/a6294049a1863a69154cf.jpg',
 unReg : 'https://telegra.ph/file/ef02d1fdd59082d05f08d.jpg',
 registrasi : 'https://telegra.ph/file/a6294049a1863a69154cf.jpg',
 confess : 'https://telegra.ph/file/bfef7e33bc60dd2608ac6.jpg',
 access : 'https://telegra.ph/file/5c35d4a180b9074a9f11b.jpg',
 tqto : 'https://telegra.ph/file/221aba241e6ededad0fd5.jpg',
 spotify : 'https://telegra.ph/file/d888041549c7444f1212b.jpg',
 weather : 'https://telegra.ph/file/5b35ba4babe5e31595516.jpg',
 gempaUrl : 'https://telegra.ph/file/03e70dd45a9dc628d84c9.jpg',
 akses : 'https://telegra.ph/file/6c7b9ffbdfb0096e1db3e.jpg',
 wel : 'https://telegra.ph/file/9dbc9c39084df8691ebdd.mp4',
 good : 'https://telegra.ph/file/1c05b8c019fa525567d01.mp4',
 sound: 'https://pomf2.lain.la/f/ymca9u8.opus'
}
// Social media
global.url = {
 sig: 'https://instagram.com/',
 sgh:  'https://instagram.com/',
 sgc: 'https://whatsapp.com/channel/0029VaX4b6'
}
// Donasi
global.payment = {
 psaweria: 'https://saweria.co/mamad',
 ptrakterr: '-',
 pdana: '0823427570'
}
// Info Wait
global.msg = {
 wait: '⏱️ *Veuillez patienter*\n\> Nous essayons de répondre à votre demande ...',
 eror: '🤖 *Information Bot*\n\> Sorry for the inconvenience in using *YO MD*. There was an error in the system while executing the command.'
}
 
// api_id web suntik
global.apiId = {
 smm: '4524',
 lapak: '300672'
}

// Apikey
global.api = {
 user: '-', // api_id antinsfw 
 screet: '-', // api_screet nsfw after that, replace it yourself
 uptime: '-',
 xyro: '-',
 lol: 'GataDiosV2',
 smm: '-',
 lapak: '-',
 prodia: '-',
 bing: '1-HLkal9xPklSXn8H_NYBhugb9UnCJKJEzQp4Rk_PxP4xxBCqtm_Os-93cXF8mtFeqde_ZGjnx2C1MM4PCS0gH8mzdX5tJ5aoaDC4G0VruZATWvvOQlHs2UBDNID5PR4MtskWzX69idiBidGDqVwfNBNZYgqb3cgqkLbyEeZnWHxxrhO3es3O8YOI5wd8Y0a31_OiLKTAzwS1ba-wvcBP9khAHrUkuQpzXuoybpwfwpQ'

}
global.APIs = {
    xyro: "https://api.xyroinee.xyz",
    nightTeam: "https://api.tioxy.my.id",
    lol: "https://api.lolhumaan.xyz",
    smm: "https://smmnusantara.id",
    lapak: "https://panel.lapaksosmed.com"
}

//Apikey
global.APIKeys = {
    "https://api.xyroinee.xyz": "vRFLiyLPWu",
    "https://api.lolhumaan.xyz": "GataDiosV2"
}

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'settings.js'"))
  import(`${file}?update=${Date.now()}`)
})