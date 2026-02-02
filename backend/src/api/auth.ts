import { Request, Response, Router } from "express";
import crypto from "crypto";
import { BOT_SECRET } from "../config";
import { prisma } from "../db";

const router = Router();

function checkTelegramAuth(initData: string) {
  const urlParams = new URLSearchParams(initData);
  const hash = urlParams.get("hash");
  if (!hash) return null;
  urlParams.delete("hash");
  const dataCheckString = Array.from(urlParams.entries())
    .map(([k, v]) => `${k}=${v}`)
    .sort()
    .join("\n");

  const secretKey = crypto
    .createHmac("sha256", "WebAppData")
    .update(BOT_SECRET)
    .digest();

  const calcHash = crypto
    .createHmac("sha256", secretKey)
    .update(dataCheckString)
    .digest("hex");

  if (calcHash !== hash) return null;

  const userJson = urlParams.get("user");
  if (!userJson) return null;
  return JSON.parse(userJson);
}

router.post("/auth", async (req: Request, res: Response) => {
  const { initData } = req.body as { initData: string };
  const userData = checkTelegramAuth(initData);
  if (!userData) {
    return res.status(401).json({ error: "invalid auth" });
  }

  const tgId = BigInt(userData.id);
  const user = await prisma.user.upsert({
    where: { telegramId: tgId },
    update: {
      username: userData.username,
      firstName: userData.first_name,
      lastName: userData.last_name,
    },
    create: {
      telegramId: tgId,
      username: userData.username,
      firstName: userData.first_name,
      lastName: userData.last_name,
    },
  });

  res.json({
    user: {
      id: user.id,
      trophies: user.trophies,
      username: user.username,
      firstName: user.firstName,
    },
  });
});

export default router;
