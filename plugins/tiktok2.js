import axios from "axios";

let handler = async (m, { args }) => {
  if (!args[0]) {
    return m.reply("❌ Veuillez entrer un lien vidéo TikTok.");
  }

  let url = args[0];
  try {
    let result = await Tiktok(url);
    if (!result || result.code !== 0) {
      return m.reply("❌ Vidéo introuvable. Assurez-vous que le lien est correct.");
    }

    let { title, play, cover, author } = result.data;

    let message = `🎵 *TikTok Video*\n\n`;
    message += `📌 *Adresse:* ${title || "غير متوفر"}\n`;
    message += `👤 *auteur:* ${author.nickname} (@${author.unique_id})\n`;
    message += `🔗 *Lien vidéo :* ${url}`;

    await conn.sendMessage(
      m.chat,
      { image: { url: cover }, caption: message },
      { quoted: m }
    );

    await conn.sendMessage(
      m.chat,
      { video: { url: play }, caption: "🎥 *Vidéo sans filigrane*" },
      { quoted: m }
    );
  } catch (error) {
    console.error("TikTok API Error:", error);
    m.reply("❌ Une erreur s’est produite lors de la récupération de la vidéo.");
  }
};

handler.help = ["tiktok2"];
handler.tags = ["downloader"];
handler.command = ["tiktok2"];

export default handler;

const Tiktok = async (url) => {
  try {
    let params = new URLSearchParams();
    params.append("url", url);

    let { data } = await axios.post("https://tikwm.com/api/", params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        Cookie: "current_language=en",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36",
      },
    });

    if (!data || typeof data.code !== "number") {
      throw new Error("Invalid API response");
    }

    return data;
  } catch (error) {
    throw new Error(`Tiktok API Error: ${error.message}`);
  }
};
