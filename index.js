const { Telegraf } = require('telegraf');
const { Configuration, OpenAIApi } = require('openai');

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

bot.start((ctx) => ctx.reply('Привет! Я твой персональный GPT-бот.'));

bot.on('text', async (ctx) => {
  const userMessage = ctx.message.text;

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: userMessage }],
    });
    const botReply = response.data.choices[0].message.content;
    ctx.reply(botReply);
  } catch (error) {
    ctx.reply('Ошибка при обращении к OpenAI API.');
  }
});

bot.launch();
console.log('Бот запущен');