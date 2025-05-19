//follow my channel https://whatsapp.com/channel/0029VaX4b6J7DAWqt3Hhu01A

let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text)
    return m.reply(
      `Bro kot lyen non aplikasyon an pa fe m neve non e komsi nan kew gyetmnm w, gade egzanp sa kk \n\nExample : \n${usedPrefix + command} facebook lite \n\n\n Tanpri tape komand la ki te swiv pa non aplikasyon an ou vle download`,
    );

  conn.apk = conn.apk ? conn.apk : {};

  if (text.split("").length <= 2 && !isNaN(text) && m.sender in conn.apk) {
    text = text.replace(/http:\/\/|https:\/\//i, "");
    let dt = conn.apk[m.sender];
    if (dt.download) return m.reply("Ou toujou telechaje!");
    try {
      dt.download = true;
      let data = await aptoide.download(dt.data[text - 1].id);
      let caption = `
Non : ${data.appname}
Devlope : ${data.developer}
`.trim();

      await conn.sendMessage(m.chat, {
        image: { url: data.img },
        caption: caption,
      }, { quoted: m });

      let dl = await conn.getFile(data.link);
      conn.sendMessage(
        m.chat,
        { document: dl.data, fileName: data.appname, mimetype: dl.mime },
        { quoted: m },
      );
    } catch (e) {
      throw e;
    } finally {
      dt.download = false;
    }
  } else {
    let data = await aptoide.search(text);
    let caption = data
      .map((v, i) => {
        return `
${i + 1}. ${v.name}
• Size : ${v.size}
• Version : ${v.version}
• Download : ${v.download}
• Id : ${v.id}
`.trim();
      })
      .join("\n\n");
    let header = `_Ou ka download youn nan yo just ekri, *${usedPrefix + command} 1*_\n\n\n Endike mesaj sa a epi reponn pa tape komand ki te swiv pa nimewo aplikasyon ou vle download, pou egzanp : \n\n *.apk 1* \n\n`;
    m.reply(header + caption);
    conn.apk[m.sender] = {
      download: false,
      data: data,
      time: setTimeout(() => {
        delete conn.apk[m.sender];
      }, 3600000),
    };
  }
};
handler.help = ["apk"];
handler.tags = ["downloader"];
handler.command = /^(apk)$/i;
handler.limit = true 
export default handler;

const aptoide = {
  search: async function (args) {
    let res = await global.fetch(
      `https://ws75.aptoide.com/api/7/apps/search?query=${args}&limit=1000`,
    );
    let ress = {};
    res = await res.json();
    ress = res.datalist.list.map((v) => {
      return {
        name: v.name,
        size: v.size,
        version: v.file.vername,
        id: v.package,
        download: v.stats.downloads,
      };
    });
    return ress;
  },
  download: async function (id) {
    let res = await global.fetch(
      `https://ws75.aptoide.com/api/7/apps/search?query=${id}&limit=1`,
    );
    res = await res.json();
    return {
      img: res.datalist.list[0].icon,
      developer: res.datalist.list[0].store.name,
      appname: res.datalist.list[0].name,
      link: res.datalist.list[0].file.path,
    };
  },
};
