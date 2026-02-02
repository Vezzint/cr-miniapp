import { Telegraf, Markup } from "telegraf";
import { BOT_TOKEN, WEBAPP_URL } from "./config";

export const bot = new Telegraf(BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply(
    "Добро пожаловать в Clash Royale Mini Season!",
    Markup.inlineKeyboard([
      Markup.button.webApp("Открыть мини-игру", WEBAPP_URL)
    ])
  );
});
