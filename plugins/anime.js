import axios from "axios";
import * as cheerio from "cheerio";

let handler = async (m, { conn, args }) => {
  let category = args[0]?.toLowerCase();
  if (!category || !["trending", "upcoming", "top", "seasonal"].includes(category)) {
    return m.reply("❌ Tanpri chwazi yon kategori ki valab: `trending` أو `upcoming` أو `top` أو `seasonal`.");
  }

  try {
    const data = await fetchAnimeData();
    const animeList = data[category];

    if (!animeList.length) {
      return m.reply("❌ Pa gen anime yo te jwenn nan kategori sa a.");
    }

    let response = `📺 *meni ${category.toUpperCase()} Anime*\n\n`;
    animeList.slice(0, 5).forEach((anime, index) => {
      response += `${index + 1}. *${anime.title}*\n🔗 [Lyen](${anime.link})\n\n`;
    });

    await conn.sendMessage(m.chat, { text: response }, { quoted: m });
  } catch (error) {
    console.error("Error fetching anime data:", error);
    m.reply("❌ Yon erè ki te fèt pandan y ap pwan done anime. Eseye ankò pitaا.");
  }
};

handler.help = ["anime"];
handler.tags = ["tools"];
handler.command = ["anime"];

export default handler;

const fetchAnimeData = async () => {
  const response = await axios.get("https://anilist.co");
  const $ = cheerio.load(response.data);

  const extractAnime = (selector) =>
    $(selector)
      .map((i, el) => ({
        title: $(el).find(".title").text().trim(),
        link: "https://anilist.co" + $(el).find("a.cover").attr("href"),
        image: $(el).find("img.image").attr("src"),
      }))
      .get();

  return {
    trending: extractAnime(".landing-section.trending .results .media-card"),
    upcoming: extractAnime(".landing-section.nextSeason .results .media-card"),
    top: extractAnime(".landing-section.top .results .media-card"),
    seasonal: extractAnime(".landing-section.season .results .media-card"),
  };
};
