import { getAllUsers, getUsersByHome } from "../controllers/userController";
import { Router } from "express";

const router = Router();

router.get("/find-all", getAllUsers);
router.get("/find-by-home", getUsersByHome);

export default router;