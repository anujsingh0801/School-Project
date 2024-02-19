import { Router } from "express";
import { getAllStudents } from "../controllers/studentController.js";

const apiRoutes = Router();

apiRoutes.get("/allstudents", getAllStudents);

export default apiRoutes;
