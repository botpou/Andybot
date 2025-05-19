import axios from "axios";

let handler = async (m, { text }) => {
    if (!text) throw "Tanpri antre kesyon 📝";
    
    try {
        let { data } = await axios.post("https://ai.clauodflare.workers.dev/chat", {
            "model": "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b",
            "messages": [{
                "role": "user",
                "content": text
            }]
        });

        if (!data.success) throw JSON.stringify(data, null, 2);
        
        let response = data.data.response.split("</think>").pop().trim();
        m.reply(response);
    } catch (error) {
        m.reply("Yon erè ki te fèt pandan y ap trete demann lan ❌");
    }
};

handler.help = handler.command = ['deepseek'];
handler.tags = ['ai'];
handler.limit = true
export default handler;
