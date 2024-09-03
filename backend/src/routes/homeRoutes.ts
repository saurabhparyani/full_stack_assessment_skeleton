import { getHomesByUser, updateUsers } from "../controllers/homeController";
import { Router } from "express";

const router = Router();

router.get("/find-by-user", getHomesByUser);
router.put("/update-users", updateUsers);

export default router;