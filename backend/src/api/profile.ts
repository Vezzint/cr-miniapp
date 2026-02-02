import { Router, Request, Response } from "express";
import { prisma } from "../db";

const router = Router();

router.get("/profile/:userId", async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return res.status(404).json({ error: "not found" });

  res.json({
    id: user.id,
    trophies: user.trophies,
    username: user.username,
    firstName: user.firstName,
  });
});

export default router;
