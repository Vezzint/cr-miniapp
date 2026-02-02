import { Router } from "express";
import auth from "./auth";
import profile from "./profile";
import modes from "./modes";
import battles from "./battles";
import rewards from "./rewards";

const router = Router();

router.use("/auth", auth);
router.use("/profile", profile);
router.use("/modes", modes);
router.use("/battles", battles);
router.use("/rewards", rewards);

export default router;
