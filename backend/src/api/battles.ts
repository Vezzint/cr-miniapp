import { Router } from "express";
import { prisma } from "../db";

const router = Router();

router.post("/battle/start", async (req, res) => {
  const { userId, modeId } = req.body as { userId: number; modeId: number };

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return res.status(404).json({ error: "user not found" });

  const mode = await prisma.mode.findUnique({ where: { id: modeId } });
  if (!mode) return res.status(404).json({ error: "mode not found" });

  const season = await prisma.season.findFirst({ where: { isActive: true } });

  // простейшая логика боя: 50/50
  const roll = Math.random();
  let result: "win" | "lose" | "draw" = "draw";
  let delta = 0;

  if (roll < 0.45) {
    result = "win";
    delta = 30;
  } else if (roll > 0.55) {
    result = "lose";
    delta = -20;
  }

  const battle = await prisma.battle.create({
    data: {
      userId: user.id,
      modeId: mode.id,
      seasonId: season?.id,
      result,
      deltaTrophies: delta,
    },
  });

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: { trophies: user.trophies + delta },
  });

  res.json({
    battleId: battle.id,
    result,
    delta,
    trophies: updatedUser.trophies,
  });
});

export default router;
