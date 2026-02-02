import { Router } from "express";
import { prisma } from "../db";

const router = Router();

router.get("/modes", async (_req, res) => {
  const modes = await prisma.mode.findMany();
  res.json(modes);
});

export default router;
