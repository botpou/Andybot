import axios from "axios";

let handler = async (m, { conn, args }) => {
  try {
    if (!args[0]) {
      return m.reply("Plizz bwo dim kisa ou anvi jenere a.\nExample: .aimage a dog flying in space");
    }
    
    const prompt = args.join(' ');
    m.reply("Bro fon ti tann me map travay pou, ok 🙂...");
    
    const url = `https://1yjs1yldj7.execute-api.us-east-1.amazonaws.com/default/ai_image?prompt=${encodeURIComponent(prompt)}&aspect_ratio=1:1&link=writecream.com`;
    
    const headers = {
      "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Mobile Safari/537.36",
      "Referer": "https://www.writecream.com/ai-image-generator-free-no-sign-up/",
    };
    
    const response = await axios.get(url, { headers });
    
    if (response.data && response.data.image_link) {
      await conn.sendFile(m.chat, response.data.image_link, 'ai-image.jpg', `Men imaj la oui ✨🙏: "${prompt}"`, m);
    } else {
      m.reply("Failed to generate image. Please try again later.");
    }
  } catch (error) {
    console.error(error);
    m.reply("An error occurred while generating the image. Please try again.");
  }
}

handler.help = ['aimage'];
handler.command = /^(aimage|aiimg)$/i;
handler.tags = ['ai'];
handler.limit = true;
export default handler;
