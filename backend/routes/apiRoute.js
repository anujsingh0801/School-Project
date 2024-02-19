import { Router } from 'express';
import { getAllStudents } from '../controllers/studentController'

const router = Router();

router.get('/allstudents', getAllStudents)

export default router