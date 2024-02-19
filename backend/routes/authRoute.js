import { Router } from "express";
import {
  loginAuth,
  registerAuth,
  logoutAuth,
} from "../controllers/authController.js";

const authRoutes = Router();

authRoutes.post("/login", loginAuth);
authRoutes.post("/register", registerAuth);
authRoutes.post("/logout", logoutAuth);

export default authRoutes;
