import { Router } from "express";
import {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController.js";

const apiRoutes = Router();

apiRoutes.get("/allstudents", getAllStudents);
apiRoutes.post("/createStudent", createStudent);
apiRoutes.post("/updateStudent", updateStudent);
apiRoutes.post("/deleteStudent", deleteStudent);

export default apiRoutes;
