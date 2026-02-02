import { Router } from "express";
import { prisma } from "../db";

const router = Router();

router.get("/rewards/current", async (_req, res) => {
  const season = await prisma.season.findFirst({ where: { isActive: true } });
  if (!season) return res.json({ season: null, rewards: [] });

  res.json({
    season: {
      id: season.id,
      name: season.name,
      startDate: season.startDate,
      endDate: season.endDate
    },
    rewardsConfig: [
      { tier: "gold", minTrophies: 2000 },
      { tier: "silver", minTrophies: 1200 },
      { tier: "bronze", minTrophies: 600 }
    ]
  });
});

export default router;
