import axios from "axios";

let handler = async (m, { text }) => {
  if (!text) return m.reply("svp ekri sa w bezwen an pou m ka reponn ou.");

  try {
    let { data } = await axios.get(
      `https://jazxcode.biz.id/ai/blackbox?query=${encodeURIComponent(text)}`
    );

    if (data.status && data.response) {
      m.reply(data.response);
    } else {
      m.reply("Dezole baz server a plen.");
    }
  } catch (error) {
    m.reply("An error occurred while contacting the AI server.");
  }
};

handler.help = ["ai"];
handler.command = ["ai"];
handler.tags = ["ai"];
export default handler;
