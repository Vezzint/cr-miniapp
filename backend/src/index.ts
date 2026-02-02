import express from "express";
import cors from "cors";
import { bot } from "./bot";
import apiRouter from "./api";
import { prisma } from "./db";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", apiRouter);

const PORT = process.env.PORT || 4000;

async function main() {
  await prisma.$connect();
  app.listen(PORT, () => {
    console.log("API listening on", PORT);
  });

  bot.launch();
}

main().catch(console.error);
