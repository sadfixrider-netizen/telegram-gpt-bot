const { Telegraf } = require("telegraf");
const { OpenAI } = require("openai");

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

bot.on("text", async (ctx) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: ctx.message.text }],
    });

    const reply = completion.choices[0].message.content;
    ctx.reply(reply);
  } catch (err) {
    console.error("Ошибка:", err);
    ctx.reply("Что-то пошло не так…");
  }
});

bot.launch();
